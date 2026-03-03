/**
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {HospitalProvider} from './src/context/HospitalContext';
import {AIVoiceProvider} from './src/context/AIVoiceContext';
import {initializeVoiceServices} from './src/services/initializeVoiceServices';

LogBox.ignoreLogs([
  'new NativeEventEmitter',
]);

function App(): React.JSX.Element {
  useEffect(() => {
    initializeVoiceServices();
  }, []);

  return (
    <SafeAreaProvider>
      <AIVoiceProvider>
        <HospitalProvider>
          <RootNavigator />
        </HospitalProvider>
      </AIVoiceProvider>
    </SafeAreaProvider>
  );
}

export default App;
