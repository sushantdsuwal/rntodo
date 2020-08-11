import React, {useContext} from 'react';
import {
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Spinner from '../Spinner';
import {ThemeContext} from '../../theme';
import {DIMENS, SPACING, TYPOGRAPHY} from '../../constants';

const SOLID = 'solid';
const OUTLINE = 'outline';
const CLEAR = 'clear';

const defaultLoadingProps = (type, theme) => ({
  color: type === 'solid' ? theme.white : theme.primaryColor,
  size: 'small',
});

const TouchReceptor =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf([SOLID, OUTLINE, CLEAR]),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  style: ViewPropTypes.style,
};

const defaultProps = {
  type: SOLID,
  onPress: () => {},
  disabled: false,
  style: {},
  loading: false,
  primary: true,
};

/**
 * @todo Add different styling of @param disabled is true
 */
const Button = ({
  /**
   * type can be
   * 1. 'solid'
   * 2. 'outline'
   */
  type,
  /**
   * backgroundColor primary or something else
   */
  primary,
  /**
   * text to be shown in button
   */
  title,
  /**
   * click listener
   */
  onPress,
  /**
   * set true to disable onPress and custom style
   */
  disabled,
  /**
   *  If true, show spinner
   */
  loading,
  /**
   * custom style for button
   */
  style,
}) => {
  const {theme} = useContext(ThemeContext);

  const containerStyle = StyleSheet.flatten([
    styles.button(type, primary, theme),
    style,
    disabled && styles.disabled(type, theme),
  ]);

  const titleStyle = StyleSheet.flatten([
    styles.title(type, theme),
    disabled && styles.disabledTitle(theme),
  ]);

  return (
    <TouchReceptor onPress={!loading && onPress} disabled={disabled}>
      <View style={containerStyle}>
        {loading && !disabled ? (
          <Spinner
            style={styles.loading}
            {...defaultLoadingProps(type, theme)}
          />
        ) : (
          <Text style={titleStyle}>{title}</Text>
        )}
      </View>
    </TouchReceptor>
  );
};

const styles = StyleSheet.create({
  button: (type, primary, theme) => ({
    flexDirection: 'row',
    padding: SPACING.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      type === SOLID
        ? primary
          ? theme.primaryColor
          : theme.red
        : theme.transparent,
    borderWidth: type === OUTLINE ? StyleSheet.hairlineWidth : 0,
    borderColor: primary ? theme.primaryColor : theme.red,
    borderRadius: DIMENS.borderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  }),
  disabled: (type, theme) => ({
    backgroundColor: type === SOLID ? theme.disabledColor : theme.transparent,
    borderColor: theme.disabledDarkColor,
  }),
  title: (type, theme) => ({
    ...TYPOGRAPHY.buttonText,
    color: type === SOLID ? theme.white : theme.primaryColor,
  }),
  disabledTitle: (theme) => ({
    color: theme.disabledDarkColor,
  }),
  loading: {
    marginVertical: 2,
  },
});

Button.propTypes = propTypes;

Button.defaultProps = defaultProps;

export default Button;
