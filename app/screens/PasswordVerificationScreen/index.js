import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import {AuthHeader, GenericView, TextInput, Button} from '../../components';
import {NAVIGATION_TO_PHONE_VERIFIED_SCREEN} from '../../navigation/routes';
import images from '../../assets/images';

export default function PasswordVerificationScreen({navigation}) {
  const [state, setState] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    state: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <GenericView
      padding
      backgroundColor={'rgba(254, 0, 0, 0.72))'}
      footer={
        <TouchableOpacity
          style={styles.footer}
          onPress={() =>
            navigation.navigate(NAVIGATION_TO_PHONE_VERIFIED_SCREEN)
          }>
          <Image source={images.SubmitArrow} />
        </TouchableOpacity>
      }>
      <AuthHeader
        back
        title={'Set Password'}
        intro={'Add password for your account'}
      />
      <View style={styles.formWrapper}>
        <TextInput
          invert
          label="Password"
          containerStyle={styles.inputParentStyleMarginBottom}
          onChangeText={(password) =>
            setState((prevState) => ({
              ...prevState,
              password: password,
            }))
          }
          value={state.password}
        />
        <TextInput
          invert
          label="Confirm Password"
          containerStyle={styles.inputParentStyleMarginBottom}
          onChangeText={(confirmPassword) =>
            setState((prevState) => ({
              ...prevState,
              confirmPassword: confirmPassword,
            }))
          }
          value={state.confirmPassword}
        />
      </View>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 50,
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
  formWrapper: {},
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
