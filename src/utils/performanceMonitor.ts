const PERFORMANCE_THRESHOLD_MS = 300;

export const measureSearchPerformance = (
  searchFn: () => void,
  queryLength: number,
): number => {
  const startTime = performance.now();
  searchFn();
  const endTime = performance.now();
  const duration = endTime - startTime;

  if (__DEV__ && duration > PERFORMANCE_THRESHOLD_MS) {
    console.warn(
      `Search performance warning: ${duration.toFixed(2)}ms (threshold: ${PERFORMANCE_THRESHOLD_MS}ms) for query length ${queryLength}`,
    );
  }

  return duration;
};

export const logPerformanceMetric = (
  operation: string,
  duration: number,
): void => {
  if (__DEV__) {
    console.log(`[Performance] ${operation}: ${duration.toFixed(2)}ms`);
  }
};
