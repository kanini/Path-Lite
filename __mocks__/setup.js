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
