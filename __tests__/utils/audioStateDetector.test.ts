import {
  checkVolumeState,
  getVolumeWarningMessage,
} from '../../src/utils/audioStateDetector';

describe('audioStateDetector', () => {
  it('should return not muted by default when native modules unavailable', async () => {
    const state = await checkVolumeState();
    expect(state.isMuted).toBe(false);
    expect(state.currentVolume).toBe(1.0);
  });

  it('should return volume warning message', () => {
    const message = getVolumeWarningMessage();
    expect(message).toBe('Please unmute device to hear questions');
  });

  it('should return a VolumeState object', async () => {
    const state = await checkVolumeState();
    expect(state).toHaveProperty('isMuted');
    expect(state).toHaveProperty('currentVolume');
  });

  it('should return numeric currentVolume', async () => {
    const state = await checkVolumeState();
    expect(typeof state.currentVolume).toBe('number');
  });

  it('should return boolean isMuted', async () => {
    const state = await checkVolumeState();
    expect(typeof state.isMuted).toBe('boolean');
  });
});
