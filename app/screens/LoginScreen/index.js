import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  GenericView,
  AuthHeader,
  Text,
  TextInput,
  Button,
} from '../../components';
import {LocalizationContext} from '../../locale/LocalizationContext';
import {
  NAVIGATION_TO_GET_STARTED_SCREEN,
  NVAIGTION_TO_CHANGE_LANGUAGE_SCREEN,
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
} from '../../navigation/routes';

export default function LoginScreen({navigation}) {
  const {translations} = React.useContext(LocalizationContext);
  const [state, setState] = React.useState({
    isPasswordFocused: false,
    userName: '',
    userNameValidate: false,
    password: '',
    passwordValidate: false,
  });

  const navigateToForgetPassword = () => {
    navigation.navigate(NAVIGATION_TO_FORGOT_PASSWORD_SCREEN);
  };

  const loginHandler = async () => {};

  return (
    <GenericView
      padding
      scrollable
      footer={
        <Text
          style={styles.textCenter}
          onPress={() =>
            navigation.navigate(NVAIGTION_TO_CHANGE_LANGUAGE_SCREEN)
          }>
          {translations.CHANGE_LANGUAGE}
        </Text>
      }>
      <AuthHeader title="" intor="" logo />

      <View style={styles.formWrapper}>
        <TextInput
          label="Phone Number/ UserName"
          containerStyle={styles.inputParentStyleMarginBottom}
          hasError={state.userNameValidate}
          onChangeText={(userName) => setState({...state, userName: userName})}
          value={state.userName}
        />
        <TextInput
          label="Password"
          errorMessage={'Invalid'}
          containerStyle={styles.inputParentStyleMarginBottom}
          password={true}
          onChangeText={(password) =>
            setState({...state, password: password, passwordValidate: false})
          }
          blurOnSubmit={true}
        />
        <Button
          title="Sign In"
          onPress={loginHandler}
          style={styles.loginBtn}
        />
        <Text
          style={[styles.forgotPassword]}
          onPress={navigateToForgetPassword}>
          Forgot Password ?
        </Text>
        <Button
          primary={false}
          title="Already have a code?"
          onPress={() => navigation.navigate(NAVIGATION_TO_GET_STARTED_SCREEN)}
          style={styles.registerBtn}
        />
      </View>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: '#FFF',
  },

  formWrapper: {},

  loginBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  registerBtn: {
    marginTop: 30,
  },
  forgotPassword: {
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
});
