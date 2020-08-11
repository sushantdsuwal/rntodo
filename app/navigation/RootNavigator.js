import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeContext} from '../theme';
import {
  LoginScreen,
  ChangeLanguageScreen,
  GetStartedScreen,
  PhoneVerificationCodeScreen,
  ForgotPasswordScreen,
  PasswordVerificationScreen,
  PhoneVerifiedScreen,
} from '../screens';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NVAIGTION_TO_CHANGE_LANGUAGE_SCREEN,
  NAVIGATION_TO_GET_STARTED_SCREEN,
  NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN,
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
  NAVIGATION_TO_PASSWORD_VERIFICATION_SCREEN,
  NAVIGATION_TO_PHONE_VERIFIED_SCREEN,
} from './routes';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const {} = useContext(ThemeContext);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={NAVIGATION_TO_LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={NVAIGTION_TO_CHANGE_LANGUAGE_SCREEN}
        component={ChangeLanguageScreen}
      />
      <Stack.Screen
        name={NAVIGATION_TO_GET_STARTED_SCREEN}
        component={GetStartedScreen}
      />
      <Stack.Screen
        name={NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN}
        component={PhoneVerificationCodeScreen}
      />
      <Stack.Screen
        name={NAVIGATION_TO_FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={NAVIGATION_TO_PASSWORD_VERIFICATION_SCREEN}
        component={PasswordVerificationScreen}
      />
      <Stack.Screen
        name={NAVIGATION_TO_PHONE_VERIFIED_SCREEN}
        component={PhoneVerifiedScreen}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  </SafeAreaProvider>
);

export default RootNavigator;
