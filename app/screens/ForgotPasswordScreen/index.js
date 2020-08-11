import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import {
  Text,
  Button,
  GenericView,
  TextInput,
  AuthHeader,
} from '../../components';
import images from '../../assets/images';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordFocused: false,
      phoneNumber: '',
      phoneValidate: false,
      modalVisible: false,
    };
  }

  forgotPasswordHandler = async () => {};

  render() {
    return (
      <GenericView
        padding
        scrollable
        backgroundColor={'rgba(254, 0, 0, 0.72))'}
        footer={
          <TouchableOpacity
            style={styles.footer}
            onPress={this.forgotPasswordHandler}>
            <Image source={images.SubmitArrow} />
          </TouchableOpacity>
        }>
        <AuthHeader back title="Forgot Password" />
        <View style={styles.formWrapper}>
          <TextInput
            invert
            label="Phone Number"
            hasError={this.state.phoneValidate}
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={(phoneNumber) =>
              this.setState({phoneNumber: phoneNumber, phoneValidate: false})
            }
            refs={this.myTextInput}
            value={this.state.phoneNumber}
            returnKeyType="go"
            blurOnSubmit={true}
          />
        </View>
      </GenericView>
    );
  }
}

const styles = StyleSheet.create({
  formWrapper: {
    flex: 2,
    maxHeight: '100%',
    width: '100%',
    alignItems: 'center',
  },
  loginBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
  backText: {
    color: 'red',
    textAlign: 'right',
    marginTop: 10,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForgotPasswordScreen;
