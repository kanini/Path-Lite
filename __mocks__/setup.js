jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(() => Promise.resolve(true)),
  getGenericPassword: jest.fn(() => Promise.resolve({username: 'test', password: 'test'})),
  resetGenericPassword: jest.fn(() => Promise.resolve(true)),
  SECURITY_LEVEL: {
    ANY: 'ANY',
    SECURE_SOFTWARE: 'SECURE_SOFTWARE',
    SECURE_HARDWARE: 'SECURE_HARDWARE',
  },
}));

jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/documents',
  CachesDirectoryPath: '/mock/caches',
  DownloadDirectoryPath: '/mock/downloads',
  ExternalDirectoryPath: '/mock/external',
  ExternalStorageDirectoryPath: '/mock/external-storage',
  TemporaryDirectoryPath: '/mock/temp',
  LibraryDirectoryPath: '/mock/library',
  PicturesDirectoryPath: '/mock/pictures',
  writeFile: jest.fn(() => Promise.resolve()),
  readFile: jest.fn(() => Promise.resolve('')),
  readDir: jest.fn(() => Promise.resolve([])),
  mkdir: jest.fn(() => Promise.resolve()),
  moveFile: jest.fn(() => Promise.resolve()),
  copyFile: jest.fn(() => Promise.resolve()),
  unlink: jest.fn(() => Promise.resolve()),
  exists: jest.fn(() => Promise.resolve(true)),
  stat: jest.fn(() => Promise.resolve({size: 0, isFile: () => true, isDirectory: () => false})),
  getFSInfo: jest.fn(() => Promise.resolve({totalSpace: 1000000, freeSpace: 500000})),
}));

jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => {
    const storage = new Map();
    return {
      set: jest.fn((key, value) => {
        storage.set(key, value);
      }),
      getString: jest.fn((key) => storage.get(key)),
      getNumber: jest.fn((key) => storage.get(key)),
      getBoolean: jest.fn((key) => storage.get(key)),
      delete: jest.fn((key) => {
        storage.delete(key);
      }),
      clearAll: jest.fn(() => {
        storage.clear();
      }),
      getAllKeys: jest.fn(() => Array.from(storage.keys())),
      contains: jest.fn((key) => storage.has(key)),
    };
  }),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    dispatch: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
    key: 'test-route',
    name: 'TestScreen',
  }),
  NavigationContainer: ({children}) => children,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(() => ({
    Navigator: ({children}) => children,
    Screen: ({children}) => children,
  })),
}));

jest.mock('@react-native-voice/voice', () => {
  const listeners = {};
  return {
    __esModule: true,
    default: {
      start: jest.fn(() => Promise.resolve()),
      stop: jest.fn(() => Promise.resolve()),
      destroy: jest.fn(() => Promise.resolve()),
      removeAllListeners: jest.fn(),
      isAvailable: jest.fn(() => Promise.resolve(true)),
      isRecognizing: jest.fn(() => Promise.resolve(false)),
      set onSpeechStart(fn) { listeners.onSpeechStart = fn; },
      get onSpeechStart() { return listeners.onSpeechStart; },
      set onSpeechEnd(fn) { listeners.onSpeechEnd = fn; },
      get onSpeechEnd() { return listeners.onSpeechEnd; },
      set onSpeechResults(fn) { listeners.onSpeechResults = fn; },
      get onSpeechResults() { return listeners.onSpeechResults; },
      set onSpeechError(fn) { listeners.onSpeechError = fn; },
      get onSpeechError() { return listeners.onSpeechError; },
      set onSpeechPartialResults(fn) { listeners.onSpeechPartialResults = fn; },
      get onSpeechPartialResults() { return listeners.onSpeechPartialResults; },
      _listeners: listeners,
    },
  };
});

jest.mock('react-native-permissions', () => {
  const RESULTS = {
    UNAVAILABLE: 'unavailable',
    DENIED: 'denied',
    LIMITED: 'limited',
    GRANTED: 'granted',
    BLOCKED: 'blocked',
  };
  const PERMISSIONS = {
    IOS: { MICROPHONE: 'ios.permission.MICROPHONE' },
    ANDROID: { RECORD_AUDIO: 'android.permission.RECORD_AUDIO' },
  };
  return {
    RESULTS,
    PERMISSIONS,
    check: jest.fn(() => Promise.resolve(RESULTS.GRANTED)),
    request: jest.fn(() => Promise.resolve(RESULTS.GRANTED)),
    openSettings: jest.fn(() => Promise.resolve()),
  };
});

jest.mock('expo-speech', () => ({
  speak: jest.fn((text, options) => {
    if (options?.onStart) setTimeout(() => options.onStart(), 0);
    if (options?.onDone) setTimeout(() => options.onDone(), 10);
  }),
  stop: jest.fn(() => Promise.resolve()),
  isSpeakingAsync: jest.fn(() => Promise.resolve(false)),
  getAvailableVoicesAsync: jest.fn(() => Promise.resolve([])),
}));

jest.mock('@react-native-community/slider', () => {
  const {View} = require('react-native');
  const React = require('react');
  return {
    __esModule: true,
    default: React.forwardRef((props, ref) =>
      React.createElement(View, {
        ...props,
        ref,
        testID: props.testID || 'slider',
      }),
    ),
  };
});
