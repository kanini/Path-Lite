import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {
  RootStackNavigationProp,
  RootStackRouteProp,
} from '../../navigation/types';
import Input from '../../components/common/Input';
import GenderToggle, {Gender} from '../../components/common/GenderToggle';
import SelectField from '../../components/common/SelectField';
import DatePickerField from '../../components/common/DatePickerField';
import PickerModal from '../../components/common/PickerModal';
import {AIVoiceIcon} from '../../components';
import {useConversationalFlow} from '../../hooks/useConversationalFlow';
import {VoiceState} from '../../types/voice';
import {ConversationState} from '../../types/conversation';
import {patientStorage} from '../../storage/PatientStorage';
import type {Patient} from '../../models';
import {useHospital} from '../../context/HospitalContext';
import {usePatients} from '../../context/PatientContext';
import {colors} from '../../styles/colors';
import {typography} from '../../styles/typography';
import {spacing, borderRadius} from '../../styles/spacing';

interface TreatmentFormData {
  firstName: string;
  middleName: string;
  lastName: string;
  mrn: string;
  dob: string;
  gender: Gender | '';
  admissionNumber: string;
  roomNumber: string;
  treatmentLocation: string;
  hbsag: string;
  hbsagDateDrawn: string;
  hbsagSource: string;
  hbsab: string;
  hbsabDateDrawn: string;
  hbsabSource: string;
}

// Define questions outside component to prevent re-initialization
const FORM_QUESTIONS = [
  "What is the patient's medical record number or MRN?",
  "What is the patient's first name?",
  "What is the patient's middle name? Say 'skip' if not applicable.",
  "What is the patient's last name?",
  "What is the patient's date of birth? Please say it in month, day, year format.",
  "What is the patient's gender? Say male or female.",
  "What is the admission number? Say 'skip' if not available.",
  "What is the room number?",
  "What is the treatment location? Your options are: OR, Bedside, ICU-CCU, ER, or Multi-Tx Room.",
  "What is the HBsAg status? Your options are: Positive, Negative, or Unknown.",
  "When was the HBsAg test drawn? Please say the date in month, day, year format, or say 'skip' if not available.",
  "What is the HBsAg source? Your options are: Lab, CWOW, DaVita, or Manual Entry. Say 'skip' if not available.",
  "What is the HBsAb value? Your options are: Immuno10, Immuno20, Immuno30, Non-Immune, or Unknown.",
  "When was the HBsAb test drawn? Please say the date in month, day, year format, or say 'skip' if not available.",
  "What is the HBsAb source? Your options are: Lab, CWOW, DaVita, or Manual Entry. Say 'skip' if not available.",
];

const TreatmentFormScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RootStackRouteProp<'TreatmentForm'>>();
  const {selectedHospital} = useHospital();
  const {refreshPatients} = usePatients();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const {width} = Dimensions.get('window');
  const isMobile = width < 768;

  const {
    conversationState,
    currentQuestionIndex,
    currentAnswer,
    startConversation,
    stopConversation,
    setValidationCallback,
  } = useConversationalFlow(FORM_QUESTIONS);

  const handleVoiceIconPress = async () => {
    if (conversationState === ConversationState.IDLE) {
      await startConversation();
    } else {
      await stopConversation();
    }
  };

  const treatmentLocations = ['OR', 'Bedside', 'ICU-CCU', 'ER', 'Multi-Tx Room'];
  const hbsagOptions = ['Positive', 'Negative', 'Unknown'];
  const hbsabOptions = ['Immuno10', 'Immuno20', 'Immuno30', 'Non-Immune', 'Unknown'];
  const sourceOptions = ['Lab', 'CWOW', 'DaVita', 'Manual Entry'];

  // Validation callback for voice answers
  const validateAnswer = useCallback((answer: string, questionIndex: number): {isValid: boolean; errorMessage?: string} => {
    const trimmedAnswer = answer.trim().toLowerCase();
    
    // Check for skip command on optional fields
    const optionalFields = [2, 6, 10, 11, 13, 14]; // middleName, admissionNumber, hbsagDateDrawn, hbsagSource, hbsabDateDrawn, hbsabSource
    if (optionalFields.includes(questionIndex) && (trimmedAnswer === 'skip' || trimmedAnswer === 'none' || trimmedAnswer === '')) {
      return {isValid: true};
    }
    
    // Validate based on question type
    switch (questionIndex) {
      case 4: // DOB
      case 10: // HBsAg date drawn
      case 13: // HBsAb date drawn
        if (trimmedAnswer === '') {
          if (questionIndex === 4) {
            return {isValid: false, errorMessage: 'Date of birth is required. Please provide the date in month, day, year format.'};
          }
          return {isValid: true}; // Optional date fields
        }
        const parsedDate = parseSpokenDate(answer);
        if (!isValidDate(parsedDate)) {
          return {
            isValid: false,
            errorMessage: 'That date is not acceptable. Please provide a valid date in month, day, year format. For example, January 15, 1990.'
          };
        }
        return {isValid: true};
      
      case 8: // Treatment location
        if (trimmedAnswer === '') {
          return {isValid: false, errorMessage: 'Treatment location is required. Please choose one of the following: OR, Bedside, ICU-CCU, ER, or Multi-Tx Room.'};
        }
        const matchedLocation = matchSelectOption(answer, treatmentLocations);
        if (!treatmentLocations.includes(matchedLocation)) {
          return {
            isValid: false,
            errorMessage: 'Please choose one of the available options: OR, Bedside, ICU-CCU, ER, or Multi-Tx Room.'
          };
        }
        return {isValid: true};
      
      case 9: // HBsAg status
        if (trimmedAnswer === '') {
          return {isValid: false, errorMessage: 'HBsAg status is required. Please choose one of the following: Positive, Negative, or Unknown.'};
        }
        const matchedHbsag = matchSelectOption(answer, hbsagOptions);
        if (!hbsagOptions.includes(matchedHbsag)) {
          return {
            isValid: false,
            errorMessage: 'Please choose one of the available options: Positive, Negative, or Unknown.'
          };
        }
        return {isValid: true};
      
      case 11: // HBsAg source
        if (trimmedAnswer === 'skip' || trimmedAnswer === 'none' || trimmedAnswer === '') {
          return {isValid: true};
        }
        const matchedHbsagSource = matchSelectOption(answer, sourceOptions);
        if (!sourceOptions.includes(matchedHbsagSource)) {
          return {
            isValid: false,
            errorMessage: 'Please choose one of the available options: Lab, CWOW, DaVita, or Manual Entry. You can also say skip.'
          };
        }
        return {isValid: true};
      
      case 12: // HBsAb value
        if (trimmedAnswer === '') {
          return {isValid: false, errorMessage: 'HBsAb value is required. Please choose one of the following: Immuno10, Immuno20, Immuno30, Non-Immune, or Unknown.'};
        }
        const matchedHbsab = matchSelectOption(answer, hbsabOptions);
        if (!hbsabOptions.includes(matchedHbsab)) {
          return {
            isValid: false,
            errorMessage: 'Please choose one of the available options: Immuno10, Immuno20, Immuno30, Non-Immune, or Unknown.'
          };
        }
        return {isValid: true};
      
      case 14: // HBsAb source
        if (trimmedAnswer === 'skip' || trimmedAnswer === 'none' || trimmedAnswer === '') {
          return {isValid: true};
        }
        const matchedHbsabSource = matchSelectOption(answer, sourceOptions);
        if (!sourceOptions.includes(matchedHbsabSource)) {
          return {
            isValid: false,
            errorMessage: 'Please choose one of the available options: Lab, CWOW, DaVita, or Manual Entry. You can also say skip.'
          };
        }
        return {isValid: true};
      
      case 5: // Gender
        if (trimmedAnswer === '') {
          return {isValid: false, errorMessage: 'Gender is required. Please say male or female.'};
        }
        const isMale = trimmedAnswer.includes('male') || trimmedAnswer === 'mail' || trimmedAnswer === 'mel' || trimmedAnswer === 'mal';
        const isFemale = trimmedAnswer.includes('female');
        const gender = isMale && !isFemale ? 'Male' : isFemale ? 'Female' : '';
        if (!gender) {
          return {
            isValid: false,
            errorMessage: 'Please say either male or female.'
          };
        }
        return {isValid: true};
      
      default:
        // For other required fields, just check if not empty
        const requiredFields = [0, 1, 3, 7]; // mrn, firstName, lastName, roomNumber
        if (requiredFields.includes(questionIndex) && trimmedAnswer === '') {
          return {isValid: false, errorMessage: 'This field is required. Please provide a value.'};
        }
        return {isValid: true};
    }
  }, [treatmentLocations, hbsagOptions, hbsabOptions, sourceOptions]);

  const voiceState = 
    conversationState === ConversationState.LISTENING
      ? VoiceState.LISTENING
      : conversationState === ConversationState.SPEAKING ||
        conversationState === ConversationState.PROCESSING
      ? VoiceState.ACTIVE
      : VoiceState.INACTIVE;

  const voiceStatusLabel =
    conversationState === ConversationState.LISTENING
      ? 'AI Voice — Listening'
      : conversationState === ConversationState.SPEAKING
      ? 'AI Voice — Speaking'
      : conversationState === ConversationState.PROCESSING
      ? 'AI Voice — Processing'
      : conversationState !== ConversationState.IDLE
      ? 'AI Voice — Active'
      : 'AI Voice — Inactive';
  const voiceStatusSub =
    conversationState === ConversationState.SPEAKING
      ? 'AI is asking a question'
      : conversationState === ConversationState.LISTENING
      ? 'Listening for your answer'
      : conversationState === ConversationState.IDLE
      ? 'Tap to start voice input'
      : 'Processing your response';

  const [formData, setFormData] = useState<TreatmentFormData>({
    firstName: '',
    middleName: '',
    lastName: '',
    mrn: '',
    dob: '',
    gender: '',
    admissionNumber: '',
    roomNumber: '',
    treatmentLocation: '',
    hbsag: '',
    hbsagDateDrawn: '',
    hbsagSource: '',
    hbsab: '',
    hbsabDateDrawn: '',
    hbsabSource: '',
  });

  const [showTreatmentLocationPicker, setShowTreatmentLocationPicker] = useState(false);
  const [showHBsAgPicker, setShowHBsAgPicker] = useState(false);
  const [showHBsAbPicker, setShowHBsAbPicker] = useState(false);
  const [showSourcePicker, setShowSourcePicker] = useState(false);
  const [activeSourceField, setActiveSourceField] = useState<'hbsag' | 'hbsab' | null>(null);

  // Helper to check if a field is currently being asked by AI
  const isFieldActive = (fieldName: string): boolean => {
    if (conversationState === ConversationState.IDLE) return false;
    
    const fieldMap: {[key: number]: string} = {
      0: 'mrn',
      1: 'firstName',
      2: 'middleName',
      3: 'lastName',
      4: 'dob',
      5: 'gender',
      6: 'admissionNumber',
      7: 'roomNumber',
      8: 'treatmentLocation',
      9: 'hbsag',
      10: 'hbsagDateDrawn',
      11: 'hbsagSource',
      12: 'hbsab',
      13: 'hbsabDateDrawn',
      14: 'hbsabSource',
    };
    
    return fieldMap[currentQuestionIndex] === fieldName;
  };

  // Helper function to match voice input to select options
  const matchSelectOption = (answer: string, options: string[]): string => {
    const lowerAnswer = answer.toLowerCase().trim();
    
    // Normalize answer by removing spaces, hyphens, and special characters for better matching
    const normalizedAnswer = lowerAnswer.replace(/[\s\-_]/g, '');
    
    // Try exact match first (case-insensitive)
    const exactMatch = options.find(opt => opt.toLowerCase() === lowerAnswer);
    if (exactMatch) return exactMatch;
    
    // Try normalized match (handles "immuno 10" → "immuno10", "non immune" → "nonimmune")
    const normalizedMatch = options.find(opt => 
      opt.toLowerCase().replace(/[\s\-_]/g, '') === normalizedAnswer
    );
    if (normalizedMatch) return normalizedMatch;
    
    // Try partial match
    const partialMatch = options.find(opt => 
      opt.toLowerCase().includes(lowerAnswer) || lowerAnswer.includes(opt.toLowerCase())
    );
    if (partialMatch) return partialMatch;
    
    // Try normalized partial match
    const normalizedPartialMatch = options.find(opt => {
      const normalizedOpt = opt.toLowerCase().replace(/[\s\-_]/g, '');
      return normalizedOpt.includes(normalizedAnswer) || normalizedAnswer.includes(normalizedOpt);
    });
    if (normalizedPartialMatch) return normalizedPartialMatch;
    
    // Return original answer if no match
    return answer;
  };

  // Helper function to validate date format and range
  const isValidDate = (dateString: string): boolean => {
    if (!dateString || dateString.trim() === '') return false;
    
    const parts = dateString.split('/');
    if (parts.length !== 3) return false;
    
    const month = parseInt(parts[0]);
    const day = parseInt(parts[1]);
    const year = parseInt(parts[2]);
    
    if (isNaN(month) || isNaN(day) || isNaN(year)) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 1900 || year > 2100) return false;
    
    // Try to create a date object to check validity
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && 
           date.getMonth() === month - 1 && 
           date.getDate() === day;
  };

  // Helper function to parse spoken dates to mm/dd/yyyy format
  const parseSpokenDate = (spokenDate: string): string => {
    if (!spokenDate || spokenDate.trim() === '') return '';
    
    const monthMap: {[key: string]: string} = {
      'january': '01', 'jan': '01',
      'february': '02', 'feb': '02',
      'march': '03', 'mar': '03',
      'april': '04', 'apr': '04',
      'may': '05',
      'june': '06', 'jun': '06',
      'july': '07', 'jul': '07',
      'august': '08', 'aug': '08',
      'september': '09', 'sep': '09', 'sept': '09',
      'october': '10', 'oct': '10',
      'november': '11', 'nov': '11',
      'december': '12', 'dec': '12'
    };

    const parts = spokenDate.toLowerCase().trim().split(/\s+/);
    
    if (parts.length >= 3) {
      const monthName = parts[0];
      const day = parts[1];
      let year = parts[2];
      
      // Convert 2-digit year to 4-digit
      if (year.length === 2) {
        const yearNum = parseInt(year);
        year = yearNum < 50 ? `20${year}` : `19${year}`;
      }
      
      const month = monthMap[monthName];
      if (month) {
        const dayPadded = day.padStart(2, '0');
        return `${month}/${dayPadded}/${year}`;
      }
    }
    
    // Return original if can't parse
    return spokenDate;
  };

  // Update form fields as voice answers are received
  useEffect(() => {
    if (currentAnswer !== null) {
      const answer = currentAnswer.text.trim();
      const answerIndex = currentAnswer.index;
      
      console.log('[TreatmentForm] Processing answer:', answer, 'for question index:', answerIndex);
      
      // Map question index to form field
      switch (answerIndex) {
        case 0: // MRN
          if (answer.length > 0) {
            setFormData(prev => ({...prev, mrn: answer}));
          }
          break;
        case 1: // First name
          if (answer.length > 0) {
            setFormData(prev => ({...prev, firstName: answer}));
          }
          break;
        case 2: // Middle name
          // Empty answer, "none", or "skip" means no middle name
          setFormData(prev => ({...prev, middleName: answer.toLowerCase() === 'none' || answer.toLowerCase() === 'skip' || answer === '' ? '' : answer}));
          break;
        case 3: // Last name
          if (answer.length > 0) {
            setFormData(prev => ({...prev, lastName: answer}));
          }
          break;
        case 4: // DOB
          if (answer.length > 0) {
            const parsedDate = parseSpokenDate(answer);
            console.log('[TreatmentForm] Parsed DOB:', answer, '->', parsedDate);
            setFormData(prev => ({...prev, dob: parsedDate}));
          }
          break;
        case 5: // Gender
          if (answer.length > 0) {
            const lowerAnswer = answer.toLowerCase();
            const isMale = lowerAnswer.includes('male') || lowerAnswer === 'mail' || lowerAnswer === 'mel' || lowerAnswer === 'mal';
            const isFemale = lowerAnswer.includes('female');
            const gender = isMale && !isFemale ? 'Male' : isFemale ? 'Female' : '';
            setFormData(prev => ({...prev, gender: gender as Gender}));
          }
          break;
        case 6: // Admission number
          // Optional field - handle skip
          if (answer.toLowerCase() === 'skip' || answer.toLowerCase() === 'none' || answer === '') {
            setFormData(prev => ({...prev, admissionNumber: ''}));
          } else {
            setFormData(prev => ({...prev, admissionNumber: answer}));
          }
          break;
        case 7: // Room number
          if (answer.length > 0) {
            setFormData(prev => ({...prev, roomNumber: answer}));
          }
          break;
        case 8: // Treatment location
          if (answer.length > 0) {
            const matchedLocation = matchSelectOption(answer, treatmentLocations);
            setFormData(prev => ({...prev, treatmentLocation: matchedLocation}));
          }
          break;
        case 9: // HBsAg status
          if (answer.length > 0) {
            const matchedHbsag = matchSelectOption(answer, hbsagOptions);
            setFormData(prev => ({...prev, hbsag: matchedHbsag}));
          }
          break;
        case 10: // HBsAg date drawn
          // Optional field - handle skip
          if (answer.toLowerCase() === 'skip' || answer.toLowerCase() === 'none' || answer === '') {
            setFormData(prev => ({...prev, hbsagDateDrawn: ''}));
          } else {
            const parsedHbsagDate = parseSpokenDate(answer);
            console.log('[TreatmentForm] Parsed HBsAg date:', answer, '->', parsedHbsagDate);
            setFormData(prev => ({...prev, hbsagDateDrawn: parsedHbsagDate}));
          }
          break;
        case 11: // HBsAg source
          // Optional field - handle skip
          if (answer.toLowerCase() === 'skip' || answer.toLowerCase() === 'none' || answer === '') {
            setFormData(prev => ({...prev, hbsagSource: ''}));
          } else {
            const matchedHbsagSource = matchSelectOption(answer, sourceOptions);
            setFormData(prev => ({...prev, hbsagSource: matchedHbsagSource}));
          }
          break;
        case 12: // HBsAb value
          if (answer.length > 0) {
            const matchedHbsab = matchSelectOption(answer, hbsabOptions);
            setFormData(prev => ({...prev, hbsab: matchedHbsab}));
          }
          break;
        case 13: // HBsAb date drawn
          // Optional field - handle skip
          if (answer.toLowerCase() === 'skip' || answer.toLowerCase() === 'none' || answer === '') {
            setFormData(prev => ({...prev, hbsabDateDrawn: ''}));
          } else {
            const parsedHbsabDate = parseSpokenDate(answer);
            console.log('[TreatmentForm] Parsed HBsAb date:', answer, '->', parsedHbsabDate);
            setFormData(prev => ({...prev, hbsabDateDrawn: parsedHbsabDate}));
          }
          break;
        case 14: // HBsAb source
          // Optional field - handle skip
          if (answer.toLowerCase() === 'skip' || answer.toLowerCase() === 'none' || answer === '') {
            setFormData(prev => ({...prev, hbsabSource: ''}));
          } else {
            const matchedHbsabSource = matchSelectOption(answer, sourceOptions);
            setFormData(prev => ({...prev, hbsabSource: matchedHbsabSource}));
          }
          break;
      }
    }
  }, [currentAnswer]);

  // Register validation callback
  useEffect(() => {
    setValidationCallback(validateAnswer);
  }, [setValidationCallback]);

  useEffect(() => {
    const loadPatient = async () => {
      const mrnParam = route.params?.mrn;
      const searchCriteria = route.params?.searchCriteria;
      
      if (!mrnParam && !searchCriteria) {
        setFormData(prev => ({
          ...prev,
          firstName: '',
          middleName: '',
          lastName: '',
          mrn: '',
          dob: '',
          gender: '',
          admissionNumber: '',
          roomNumber: '',
          treatmentLocation: '',
        }));
        return;
      }
      
      if (searchCriteria && !mrnParam) {
        setFormData(prev => ({
          ...prev,
          firstName: searchCriteria.firstName || '',
          lastName: searchCriteria.lastName || '',
          mrn: searchCriteria.mrn || '',
          dob: searchCriteria.dob || '',
          admissionNumber: searchCriteria.admissionNumber || '',
        }));
        return;
      }
      
      if (!mrnParam) {
        return;
      }

      try {
        const patient = await patientStorage.getPatientByMRN(mrnParam);
        
        if (patient) {
          const dobDate = typeof patient.dob === 'string' ? new Date(patient.dob) : patient.dob;
          const formattedDob = dobDate.toLocaleDateString('en-US');
          
          // Format HBsAg date if it exists
          let formattedHbsagDate = '';
          if (patient.hbsAgDate) {
            const hbsagDate = typeof patient.hbsAgDate === 'string' ? new Date(patient.hbsAgDate) : patient.hbsAgDate;
            formattedHbsagDate = hbsagDate.toLocaleDateString('en-US');
          }
          
          // Format HBsAb date if it exists
          let formattedHbsabDate = '';
          if (patient.hbsAbDate) {
            const hbsabDate = typeof patient.hbsAbDate === 'string' ? new Date(patient.hbsAbDate) : patient.hbsAbDate;
            formattedHbsabDate = hbsabDate.toLocaleDateString('en-US');
          }
          
          setFormData(prev => ({
            ...prev,
            firstName: patient.firstName,
            middleName: patient.middleName ?? '',
            lastName: patient.lastName,
            mrn: patient.mrn,
            dob: formattedDob,
            gender: patient.gender as Gender,
            admissionNumber: patient.admissionNumber ?? '',
            roomNumber: patient.roomNumber,
            treatmentLocation: patient.treatmentLocation,
            hbsag: patient.hbsAgStatus || '',
            hbsagDateDrawn: formattedHbsagDate,
            hbsagSource: patient.hbsAgSource || '',
            hbsab: patient.hbsAbValue ? patient.hbsAbValue.toString() : '',
            hbsabDateDrawn: formattedHbsabDate,
            hbsabSource: patient.hbsAbSource || '',
          }));
        } else {
        }
      } catch (error) {
        console.error('TreatmentForm - Error loading patient:', error);
      }
    };

    loadPatient();
  }, [route.params?.mrn, route.params?.searchCriteria]);

  const handleFieldChange = (field: keyof TreatmentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid = (): boolean => {
    return (
      formData.firstName.trim().length > 0 &&
      formData.lastName.trim().length > 0 &&
      formData.mrn.trim().length > 0 &&
      formData.dob.trim().length > 0 &&
      formData.gender !== '' &&
      formData.treatmentLocation.trim().length > 0 &&
      formData.roomNumber.trim().length > 0 &&
      formData.hbsag.trim().length > 0 &&
      formData.hbsab.trim().length > 0
    );
  };

  const handleSave = useCallback(async () => {
    if (!isFormValid()) {
      console.log('[TreatmentForm] Form validation failed, cannot save');
      return;
    }

    try {
      console.log('[TreatmentForm] Starting patient save...');
      console.log('[TreatmentForm] Form data:', JSON.stringify(formData, null, 2));
      
      // Parse the date string back to Date object
      const dobParts = formData.dob.split('/');
      console.log('[TreatmentForm] DOB parts:', dobParts);
      const dobDate = new Date(
        parseInt(dobParts[2]), // year
        parseInt(dobParts[0]) - 1, // month (0-indexed)
        parseInt(dobParts[1]) // day
      );
      console.log('[TreatmentForm] Parsed DOB date:', dobDate);

      // Parse HBsAg and HBsAb date strings if they exist
      let hbsagDate: Date | null = null;
      if (formData.hbsagDateDrawn) {
        const hbsagParts = formData.hbsagDateDrawn.split('/');
        hbsagDate = new Date(
          parseInt(hbsagParts[2]),
          parseInt(hbsagParts[0]) - 1,
          parseInt(hbsagParts[1])
        );
      }

      let hbsabDate: Date | null = null;
      if (formData.hbsabDateDrawn) {
        const hbsabParts = formData.hbsabDateDrawn.split('/');
        hbsabDate = new Date(
          parseInt(hbsabParts[2]),
          parseInt(hbsabParts[0]) - 1,
          parseInt(hbsabParts[1])
        );
      }

      // Create patient object - convert empty strings to null for optional fields
      const patient: Patient = {
        schemaVersion: '1.0.0',
        mrn: formData.mrn,
        firstName: formData.firstName,
        middleName: formData.middleName || null,
        lastName: formData.lastName,
        dob: dobDate,
        gender: formData.gender as any,
        admissionNumber: formData.admissionNumber || null,
        treatmentLocation: formData.treatmentLocation as any,
        roomNumber: formData.roomNumber,
        hbsAgStatus: formData.hbsag as any,
        hbsAgDate: hbsagDate,
        hbsAgSource: formData.hbsagSource && formData.hbsagSource.trim() !== '' ? (formData.hbsagSource as any) : null,
        hbsAbValue: formData.hbsab ? parseInt(formData.hbsab.replace(/\D/g, '')) || null : null,
        hbsAbDate: hbsabDate,
        hbsAbSource: formData.hbsabSource && formData.hbsabSource.trim() !== '' ? (formData.hbsabSource as any) : null,
        createdAt: new Date(),
      };

      console.log('[TreatmentForm] Patient object created:', JSON.stringify(patient, null, 2));
      
      // Save to storage using patientStorage
      console.log('[TreatmentForm] Calling patientStorage.savePatient...');
      await patientStorage.savePatient(patient);
      console.log('[TreatmentForm] Patient saved successfully');
      
      // Refresh the patient list in the dashboard
      console.log('[TreatmentForm] Refreshing patient list...');
      await refreshPatients();
      console.log('[TreatmentForm] Patient list refreshed');
      
      console.log('[TreatmentForm] Navigating back to dashboard...');
      navigation.goBack();
      console.log('[TreatmentForm] Save complete!');
    } catch (error) {
      console.error('[TreatmentForm] Error saving patient:', error);
      console.error('[TreatmentForm] Error details:', JSON.stringify(error, null, 2));
      // You might want to show an error message to the user here
    }
  }, [formData, navigation, refreshPatients]);

  // Auto-save when conversation completes
  const prevConversationStateRef = useRef(conversationState);
  useEffect(() => {
    const wasActive = prevConversationStateRef.current !== ConversationState.IDLE;
    const isNowIdle = conversationState === ConversationState.IDLE;
    
    if (wasActive && isNowIdle && currentQuestionIndex >= FORM_QUESTIONS.length) {
      // Conversation just completed - auto-save if form is valid
      if (isFormValid()) {
        console.log('[TreatmentForm] Conversation completed, auto-saving patient...');
        handleSave();
      } else {
        console.log('[TreatmentForm] Conversation completed but form is invalid');
      }
    }
    
    prevConversationStateRef.current = conversationState;
  }, [conversationState, currentQuestionIndex, handleSave]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderSidebar = () => (
    <View style={styles.leftNav}>
      <View style={styles.leftNavHospital}>
        <Text style={styles.hospitalName}>
          {selectedHospital?.name?.toUpperCase() || 'SELECT A HOSPITAL'}
        </Text>
        <Text style={styles.treatmentType}>Hemodialysis</Text>
      </View>
      <View style={styles.patientSummaryCard}>
        <Text style={styles.pscName}>
          {formData.firstName && formData.lastName
            ? `${formData.firstName}${formData.middleName ? ' ' + formData.middleName.charAt(0) + '.' : ''} ${formData.lastName}`
            : '—'}
        </Text>
        <Text style={styles.pscDetail}>
          {formData.gender && formData.dob ? `${formData.gender} · Age` : '—'}
        </Text>
        <Text style={styles.pscMrn}>MRN: {formData.mrn || '—'}</Text>
        <Text style={styles.pscHep}>
          HBsAg: {formData.hbsag || '—'} | HBsAb: {formData.hbsab || '—'}
        </Text>
      </View>
      <Text style={styles.sectionGroupHeader}>HD BILLING</Text>
      <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
        <Text style={styles.navItemText}>Patient Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navItemText}>Primary Care Nurse Report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navItemText}>Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navItemText}>Wait Time</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navItemText}>Treatment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navItemText}>ACOI Questions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navItemText}>Cancel Billing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navItemText}>Review and Submit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        {isMobile && (
          <TouchableOpacity onPress={() => setSidebarVisible(true)}>
            <Text style={styles.hamburger}>☰</Text>
          </TouchableOpacity>
        )}
        {!isMobile && (
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.headerButton}>Done</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Patient Treatment</Text>
        <TouchableOpacity onPress={handleSave} disabled={!isFormValid()}>
          <Text
            style={[
              styles.headerButtonPrimary,
              !isFormValid() && styles.headerButtonDisabled,
            ]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {isMobile && (
        <Modal
          visible={sidebarVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSidebarVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalSidebar}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Navigation</Text>
                <TouchableOpacity onPress={() => setSidebarVisible(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>{renderSidebar()}</ScrollView>
            </View>
          </View>
        </Modal>
      )}

      <View style={styles.splitPanel}>
        {!isMobile && renderSidebar()}

        <ScrollView
          key={route.params?.mrn || 'new'}
          style={styles.mainContent}
          contentContainerStyle={styles.mainContentScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.voiceHeader} testID="ai-voice-area">
            <AIVoiceIcon
              state={voiceState}
              onPress={handleVoiceIconPress}
              size={48}
            />
            <View style={styles.voiceHeaderText}>
              <Text style={styles.voiceStatusLabel}>{voiceStatusLabel}</Text>
              <Text style={styles.voiceStatusSub}>{voiceStatusSub}</Text>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionHeaderLabel}>Demographics & Admission</Text>

            <Input
              label="Medical Record Number (MRN)"
              value={formData.mrn}
              onChangeText={value => handleFieldChange('mrn', value)}
              placeholder="[Enter]"
              keyboardType="numeric"
              mandatory
              accessibilityLabel="Medical Record Number"
              highlighted={isFieldActive('mrn')}
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldFull}>
                <Input
                  label="Patient First Name"
                  value={formData.firstName}
                  onChangeText={value => handleFieldChange('firstName', value)}
                  placeholder="[Enter]"
                  mandatory
                  accessibilityLabel="First Name"
                  highlighted={isFieldActive('firstName')}
                />
              </View>
              <View style={styles.fieldHalf}>
                <Input
                  label="Middle Initial / Name"
                  value={formData.middleName}
                  onChangeText={value => handleFieldChange('middleName', value)}
                  placeholder="[Enter]"
                  accessibilityLabel="Middle Name"
                  highlighted={isFieldActive('middleName')}
                />
              </View>
            </View>

            <Input
              label="Patient Last Name"
              value={formData.lastName}
              onChangeText={value => handleFieldChange('lastName', value)}
              placeholder="[Enter]"
              mandatory
              accessibilityLabel="Last Name"
              highlighted={isFieldActive('lastName')}
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldHalf}>
                <DatePickerField
                  label="DOB"
                  value={formData.dob}
                  onChange={value => handleFieldChange('dob', value)}
                  placeholder="mm/dd/yyyy"
                  mandatory
                  testID="dob-picker"
                  highlighted={isFieldActive('dob')}
                />
              </View>
              <View style={styles.fieldHalf}>
                <Input
                  label="Admission / Encounter Number"
                  value={formData.admissionNumber}
                  onChangeText={value => handleFieldChange('admissionNumber', value)}
                  placeholder="[Enter]"
                  accessibilityLabel="Admission Number"
                  highlighted={isFieldActive('admissionNumber')}
                />
              </View>
            </View>

            <GenderToggle
              value={formData.gender}
              onChange={(gender: Gender) => handleFieldChange('gender', gender)}
              mandatory
              testID="gender-toggle"
              highlighted={isFieldActive('gender')}
            />

            <SelectField
              label="Treatment Location"
              value={formData.treatmentLocation}
              onPress={() => setShowTreatmentLocationPicker(true)}
              mandatory
              testID="treatment-location-select"
              highlighted={isFieldActive('treatmentLocation')}
            />

            <Input
              label="Room Number"
              value={formData.roomNumber}
              onChangeText={value => handleFieldChange('roomNumber', value)}
              placeholder="[Enter]"
              mandatory
              accessibilityLabel="Room Number"
              highlighted={isFieldActive('roomNumber')}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionHeaderLabel}>Clinical Intake</Text>
            <TouchableOpacity style={styles.importLink}>
              <Text style={styles.importLinkText}>⬇ Import Hepatitis B result from CWOW</Text>
            </TouchableOpacity>

            <SelectField
              label="HBsAg"
              value={formData.hbsag}
              onPress={() => setShowHBsAgPicker(true)}
              mandatory
              testID="hbsag-select"
              highlighted={isFieldActive('hbsag')}
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldHalf}>
                <DatePickerField
                  label="Date Drawn"
                  value={formData.hbsagDateDrawn}
                  onChange={value => handleFieldChange('hbsagDateDrawn', value)}
                  placeholder="mm/dd/yyyy"
                  testID="hbsag-date-picker"
                  highlighted={isFieldActive('hbsagDateDrawn')}
                />
              </View>
              <View style={styles.fieldHalf}>
                <SelectField
                  label="Source"
                  value={formData.hbsagSource}
                  onPress={() => {
                    setActiveSourceField('hbsag');
                    setShowSourcePicker(true);
                  }}
                  testID="hbsag-source-select"
                  highlighted={isFieldActive('hbsagSource')}
                />
              </View>
            </View>

            <SelectField
              label="HBsAb"
              value={formData.hbsab}
              onPress={() => setShowHBsAbPicker(true)}
              mandatory
              testID="hbsab-select"
              highlighted={isFieldActive('hbsab')}
            />

            <View style={styles.fieldRow}>
              <View style={styles.fieldHalf}>
                <DatePickerField
                  label="Date Drawn"
                  value={formData.hbsabDateDrawn}
                  onChange={value => handleFieldChange('hbsabDateDrawn', value)}
                  placeholder="mm/dd/yyyy"
                  testID="hbsab-date-picker"
                  highlighted={isFieldActive('hbsabDateDrawn')}
                />
              </View>
              <View style={styles.fieldHalf}>
                <SelectField
                  label="Source"
                  value={formData.hbsabSource}
                  onPress={() => {
                    setActiveSourceField('hbsab');
                    setShowSourcePicker(true);
                  }}
                  testID="hbsab-source-select"
                  highlighted={isFieldActive('hbsabSource')}
                />
              </View>
            </View>

            <View style={styles.davitaMpi}>
              <Text style={styles.davitaMpiLabel}>DaVita MPI</Text>
              <Text style={styles.davitaMpiValue}>Based on imported data from DaVita</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <PickerModal
        visible={showTreatmentLocationPicker}
        title="Treatment Location"
        options={treatmentLocations}
        selectedValue={formData.treatmentLocation}
        onSelect={value => handleFieldChange('treatmentLocation', value)}
        onClose={() => setShowTreatmentLocationPicker(false)}
        testID="treatment-location-picker-modal"
      />

      <PickerModal
        visible={showHBsAgPicker}
        title="HBsAg"
        options={hbsagOptions}
        selectedValue={formData.hbsag}
        onSelect={value => handleFieldChange('hbsag', value)}
        onClose={() => setShowHBsAgPicker(false)}
        testID="hbsag-picker-modal"
      />

      <PickerModal
        visible={showHBsAbPicker}
        title="HBsAb"
        options={hbsabOptions}
        selectedValue={formData.hbsab}
        onSelect={value => handleFieldChange('hbsab', value)}
        onClose={() => setShowHBsAbPicker(false)}
        testID="hbsab-picker-modal"
      />

      <PickerModal
        visible={showSourcePicker}
        title="Source"
        options={sourceOptions}
        selectedValue={
          activeSourceField === 'hbsag'
            ? formData.hbsagSource
            : formData.hbsabSource
        }
        onSelect={value => {
          if (activeSourceField === 'hbsag') {
            handleFieldChange('hbsagSource', value);
          } else {
            handleFieldChange('hbsabSource', value);
          }
        }}
        onClose={() => {
          setShowSourcePicker(false);
          setActiveSourceField(null);
        }}
        testID="source-picker-modal"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  header: {
    height: spacing.headerHeight,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerButton: {
    ...typography.labelMd,
    color: colors.primary,
    fontSize: 15,
    fontWeight: '500',
  },
  headerButtonPrimary: {
    ...typography.labelMd,
    color: colors.white,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    fontSize: 14,
    fontWeight: '600',
    overflow: 'hidden',
  },
  headerButtonDisabled: {
    backgroundColor: colors.neutral300,
  },
  headerTitle: {
    ...typography.headingLg,
    color: colors.neutral900,
    fontSize: 20,
    fontWeight: '600',
  },
  splitPanel: {
    flex: 1,
    flexDirection: 'row',
  },
  leftNav: {
    width: 200,
    backgroundColor: colors.neutral100,
    borderRightWidth: 1,
    borderRightColor: colors.neutral300,
  },
  leftNavHospital: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  hospitalName: {
    ...typography.labelSm,
    color: colors.neutral900,
    fontSize: 12,
    fontWeight: '600',
  },
  treatmentType: {
    ...typography.bodySm,
    color: colors.neutral700,
    fontSize: 12,
    marginTop: 2,
  },
  patientSummaryCard: {
    padding: 10,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
    gap: 3,
  },
  pscName: {
    ...typography.labelMd,
    color: colors.neutral900,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  pscDetail: {
    ...typography.bodySm,
    color: colors.neutral700,
    fontSize: 11,
  },
  pscMrn: {
    ...typography.bodySm,
    color: colors.neutral500,
    fontSize: 11,
  },
  pscHep: {
    ...typography.bodySm,
    color: colors.neutral500,
    fontSize: 11,
  },
  sectionGroupHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 4,
    ...typography.labelSm,
    color: colors.neutral500,
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: 'center',
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  navItemActive: {
    backgroundColor: colors.primaryLight,
    borderLeftColor: colors.primary,
  },
  navItemText: {
    ...typography.bodyMd,
    color: colors.neutral700,
    fontSize: 13,
    lineHeight: 17,
  },
  mainContent: {
    flex: 1,
  },
  mainContentScroll: {
    padding: spacing.md,
  },
  hamburger: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  modalSidebar: {
    width: '80%',
    maxWidth: 300,
    height: '100%',
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral300,
  },
  modalTitle: {
    ...typography.headingMd,
    fontSize: 18,
    fontWeight: '600',
  },
  modalClose: {
    fontSize: 24,
    color: colors.neutral700,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeaderLabel: {
    ...typography.labelMd,
    color: colors.neutral500,
    marginBottom: spacing.md,
  },
  voiceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.neutral300,
    gap: spacing.md,
  },
  voiceHeaderText: {
    flex: 1,
  },
  voiceStatusLabel: {
    ...typography.labelMd,
    fontWeight: '600',
    color: colors.neutral900,
  },
  voiceStatusSub: {
    ...typography.bodySm,
    color: colors.neutral500,
    marginTop: 2,
  },
  fieldRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  fieldFull: {
    flex: 1,
  },
  fieldHalf: {
    flex: 1,
  },
  importLink: {
    marginBottom: spacing.lg,
  },
  importLinkText: {
    ...typography.labelMd,
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  davitaMpi: {
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.neutral100,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: colors.neutral300,
    gap: 2,
  },
  davitaMpiLabel: {
    ...typography.bodySm,
    color: colors.neutral500,
    fontSize: 11,
  },
  davitaMpiValue: {
    ...typography.bodyMd,
    color: colors.neutral700,
    fontSize: 13,
    fontStyle: 'italic',
  },
});

export default TreatmentFormScreen;
