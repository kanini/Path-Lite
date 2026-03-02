export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  HospitalSelection: undefined;
  PatientDashboard: undefined;
};

export type RootStackNavigationProp = import('@react-navigation/stack').StackNavigationProp<RootStackParamList>;
export type RootStackRouteProp<RouteName extends keyof RootStackParamList> =
  import('@react-navigation/native').RouteProp<RootStackParamList, RouteName>;
