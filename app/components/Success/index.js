import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from '../../theme';
import Button from '../Button';
import Text from '../Text';
import PropTypes from 'prop-types';

Success.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

Success.defaultProps = {
  onPress: () => {},
  btnText: 'Continue',
};

export default function Success({
  icon,
  title,
  caption,
  onPress,
  btnText,
  containerStyle,
  attributes,
}) {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={styles.containerStyle}>
      {icon}
      <Text style={styles.titleText(theme)} type="heading">
        {title}
      </Text>
      <Text style={styles.descriptionText} type="subheading">
        {caption}
      </Text>
      <Button
        title={btnText}
        onPress={onPress}
        style={styles.loginBtn}
        {...attributes}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: (theme) => ({
    marginVertical: 10,
    color: theme.primaryColor,
  }),
  descriptionText: {
    marginBottom: 25,
    textAlign: 'center',
  },
});
