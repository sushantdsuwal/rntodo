import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

class OtpInputs extends React.Component {
  static defaultProps = {
    inputCode: 4,
  };

  state = {otp: [], focusedIndex: null};
  otpTextInput = [];

  componentDidMount() {
    this.otpTextInput[0].focus();
  }

  renderInputs() {
    const inputs = Array(this.props.inputCode).fill(0);
    const txt = inputs.map((i, j) => (
      <View
        key={j}
        style={[
          styles.inputWrapper,
          this.props.inputWrapper && this.props.inputWrapper,
          styles.focusInputWrapperStyle(j === this.state.focusedIndex),
        ]}>
        <TextInput
          selectionColor="red"
          onFocus={() => this.setState({focusedIndex: j})}
          onBlur={() => this.setState({focusedIndex: null})}
          style={[
            styles.inputStyle,
            styles.focusInputStyle(j === this.state.focusedIndex),
          ]}
          value={this.state.otp[j]}
          keyboardType="numeric"
          onChangeText={(v) => this.focusNext(j, v)}
          onKeyPress={(e) => this.focusPrevious(e.nativeEvent.key, j)}
          ref={(ref) => (this.otpTextInput[j] = ref)}
        />
      </View>
    ));
    return txt;
  }

  focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0) {
      this.otpTextInput[index - 1].focus();
    }
  }

  focusNext(index, value) {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.otp;
    otp[index] = value;
    this.setState({otp});
    this.props.getOtp(otp.join(''));
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.gridPad}>{this.renderInputs()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gridPad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    borderWidth: 1,
    width: 55,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },

  focusInputWrapperStyle: (isFocus) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  }),

  inputStyle: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  focusInputStyle: () => ({}),
});

export default OtpInputs;
