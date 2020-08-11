import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {phoneNumber} from '../../utils/validators';
import images from '../../assets/images';
import {GenericView, AuthHeader, TextInput, Text} from '../../components';
import {NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN} from '../../navigation/routes';

export default function Signup({navigation}) {
  const [state, setState] = useState({
    phoneNumber: '',
    phoneValidateError: '',
  });

  const onPressContinue = () => {
    if (phoneNumber(state.phoneNumber)) {
      navigation.navigate(NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN);
      setState({...state, phoneValidateError: ''});
    } else {
      setState({...state, phoneValidateError: 'phone number is not valid'});
    }
  };

  return (
    <GenericView
      padding
      scrollable
      footer={
        <TouchableOpacity style={styles.footer} onPress={onPressContinue}>
          <Image source={images.SubmitArrow} />
        </TouchableOpacity>
      }
      backgroundColor={'rgba(254, 0, 0, 0.72))'}>
      <AuthHeader
        back
        title={"Let's Get Started"}
        intro={
          'Contact your administrator for verification of your \n phone number'
        }
      />
      <View>
        <TextInput
          leftIcon={<Text style={{color: '#000'}}>+977</Text>}
          invert
          errorMessage={state.phoneValidateError}
          label={'Phone Number'}
          containerStyle={styles.inputParentStyleMarginBottom}
          onChangeText={(number) =>
            setState({phoneNumber: number, phoneValidateError: false})
          }
          value={state.phoneNumber}
          returnKeyType="go"
          blurOnSubmit={true}
        />
      </View>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  loginText: {
    color: 'red',
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
