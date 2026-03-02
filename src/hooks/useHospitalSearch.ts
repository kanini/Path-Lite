import {useState, useMemo, useCallback, useRef, useEffect} from 'react';
import type {Hospital} from '../models';
import {sanitizeSearchInput} from '../utils/searchUtils';
import {measureSearchPerformance} from '../utils/performanceMonitor';

const DEBOUNCE_DELAY_MS = 300;

export const useHospitalSearch = (hospitals: Hospital[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sortedHospitals = useMemo(() => {
    return [...hospitals].sort((a, b) => a.name.localeCompare(b.name));
  }, [hospitals]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchQuery === '') {
      setDebouncedQuery('');
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, DEBOUNCE_DELAY_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const filteredHospitals = useMemo(() => {
    if (!debouncedQuery) {
      return sortedHospitals;
    }

    const performSearch = () => {
      const sanitizedQuery = sanitizeSearchInput(debouncedQuery);

      if (!sanitizedQuery) {
        return sortedHospitals;
      }

      return sortedHospitals.filter(hospital => {
        const nameMatch = hospital.name.toLowerCase().indexOf(sanitizedQuery) !== -1;
        const codeMatch = hospital.code.toLowerCase().indexOf(sanitizedQuery) !== -1;
        const addressMatch = hospital.address.toLowerCase().indexOf(sanitizedQuery) !== -1;
        return nameMatch || codeMatch || addressMatch;
      });
    };

    let result: Hospital[] = [];
    measureSearchPerformance(() => {
      result = performSearch();
    }, debouncedQuery.length);

    return result;
  }, [sortedHospitals, debouncedQuery]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    searchQuery,
    filteredHospitals,
    handleSearchChange,
    clearSearch,
  };
};
