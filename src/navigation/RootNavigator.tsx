import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from '../context/AuthContext';
import {HospitalProvider} from '../context/HospitalContext';
import {PatientProvider} from '../context/PatientContext';
import LoginScreen from '../screens/auth/LoginScreen';
import HospitalSelectionScreen from '../screens/hospital/HospitalSelectionScreen';
import PatientDashboardScreen from '../screens/dashboard/PatientDashboardScreen';
import TreatmentFormScreen from '../screens/treatment/TreatmentFormScreen';
import type {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator(): React.JSX.Element {
  return (
    <AuthProvider>
      <HospitalProvider>
        <PatientProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="HospitalSelection"
                component={HospitalSelectionScreen}
              />
              <Stack.Screen
                name="PatientDashboard"
                component={PatientDashboardScreen}
              />
              <Stack.Screen
                name="TreatmentForm"
                component={TreatmentFormScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PatientProvider>
      </HospitalProvider>
    </AuthProvider>
  );
}

export default RootNavigator;
