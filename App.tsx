/**
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import {HospitalProvider} from './src/context/HospitalContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <HospitalProvider>
        <RootNavigator />
      </HospitalProvider>
    </SafeAreaProvider>
  );
}

export default App;
