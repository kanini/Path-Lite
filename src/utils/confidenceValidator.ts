const CONFIDENCE_THRESHOLD = 0.7;

export interface ConfidenceValidationResult {
  isAcceptable: boolean;
  confidence: number;
  warningMessage: string | null;
}

export function validateConfidence(
  confidence: number,
): ConfidenceValidationResult {
  const clamped = Math.max(0, Math.min(1, confidence));
  const isAcceptable = clamped >= CONFIDENCE_THRESHOLD;

  return {
    isAcceptable,
    confidence: clamped,
    warningMessage: isAcceptable
      ? null
      : 'Background noise detected. Please speak clearly.',
  };
}

export function getConfidenceThreshold(): number {
  return CONFIDENCE_THRESHOLD;
}
