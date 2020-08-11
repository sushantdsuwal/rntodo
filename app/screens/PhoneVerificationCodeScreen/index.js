import React, {useState} from 'react';
import {StyleSheet, View, Alert, TouchableOpacity, Image} from 'react-native';
import {OtpInputs, AuthHeader, GenericView, Text} from '../../components';
import {NAVIGATION_TO_PASSWORD_VERIFICATION_SCREEN} from '../../navigation/routes';
import images from '../../assets/images';

export default function PhoneVerification({navigation}) {
  const [state, setState] = useState({
    phoneNumeber: '',
    phoneValidate: false,
    otp: '',
  });

  const getOtp = (otp) => {
    setState({...state, otp});
  };

  const onPressVerify = () => {
    if (state.otp.length === 6) {
      navigation.navigate(NAVIGATION_TO_PASSWORD_VERIFICATION_SCREEN);
    } else {
      Alert.alert('Invalid Code!');
    }
  };

  return (
    <GenericView
      padding
      Scrollable
      backgroundColor={'rgba(254, 0, 0, 0.72))'}
      footer={
        <TouchableOpacity style={styles.footer} onPress={onPressVerify}>
          <Image source={images.SubmitArrow} />
        </TouchableOpacity>
      }>
      <AuthHeader
        back
        title={'Enter \nThe Access Code'}
        intro={
          'Please enter the four-digit access code we \nsent to your phone number.'
        }
      />
      <View style={styles.formWrapper}>
        <OtpInputs
          inputCode={6}
          getOtp={(otp) => getOtp(otp)}
          containerStyle={styles.otpInputStyle}
        />

        <View style={styles.flexRow}>
          <Text invert style={[styles.introText]}>
            Did't get the code?{' '}
          </Text>
          <Text
            style={[styles.resendText]}
            onPress={() => Alert.alert('Code resend')}>
            Resend
          </Text>
        </View>
      </View>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  continueBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  flexRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    marginTop: 7,
  },
  resendText: {
    color: 'yellow',
  },
  otpInputStyle: {
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
