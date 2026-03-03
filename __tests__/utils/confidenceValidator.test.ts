import {
  validateConfidence,
  getConfidenceThreshold,
} from '../../src/utils/confidenceValidator';

describe('confidenceValidator', () => {
  describe('validateConfidence', () => {
    it('should return acceptable for confidence >= 0.7', () => {
      const result = validateConfidence(0.85);
      expect(result.isAcceptable).toBe(true);
      expect(result.warningMessage).toBeNull();
    });

    it('should return acceptable for confidence exactly 0.7', () => {
      const result = validateConfidence(0.7);
      expect(result.isAcceptable).toBe(true);
      expect(result.warningMessage).toBeNull();
    });

    it('should return not acceptable for confidence < 0.7', () => {
      const result = validateConfidence(0.5);
      expect(result.isAcceptable).toBe(false);
      expect(result.warningMessage).toBe(
        'Background noise detected. Please speak clearly.',
      );
    });

    it('should handle confidence of 0', () => {
      const result = validateConfidence(0);
      expect(result.isAcceptable).toBe(false);
      expect(result.confidence).toBe(0);
    });

    it('should handle confidence of 1', () => {
      const result = validateConfidence(1);
      expect(result.isAcceptable).toBe(true);
      expect(result.confidence).toBe(1);
    });

    it('should clamp confidence above 1 to 1', () => {
      const result = validateConfidence(1.5);
      expect(result.confidence).toBe(1);
      expect(result.isAcceptable).toBe(true);
    });

    it('should clamp negative confidence to 0', () => {
      const result = validateConfidence(-0.5);
      expect(result.confidence).toBe(0);
      expect(result.isAcceptable).toBe(false);
    });

    it('should return correct confidence value', () => {
      const result = validateConfidence(0.65);
      expect(result.confidence).toBe(0.65);
    });
  });

  describe('getConfidenceThreshold', () => {
    it('should return 0.7', () => {
      expect(getConfidenceThreshold()).toBe(0.7);
    });
  });
});
