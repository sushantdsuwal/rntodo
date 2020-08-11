import React, {useContext} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {TYPOGRAPHY} from '../../constants';
import {ThemeContext} from '../../theme';

// Possible value for prop "type" for Text
const HEADING = 'heading';
const SUB_HEADING = 'subheading';
const BODY = 'body';
const LABEL = 'label';

const propTypes = {
  type: PropTypes.oneOf([HEADING, SUB_HEADING, BODY, LABEL]),
  bold: PropTypes.bool,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

const defaultProps = {
  type: BODY,
  bold: false,
  style: {},
};

// NOTE: Improve comments quality
const Text = ({
  /**
   * @type prop helps style Text with pre default styling define in
   * typography.js. Possible value of type can be:
   * 1. 'heading'
   * 2. 'subheading'
   * 3. 'body'
   * 4. 'label'
   *
   * default value: 'body'
   */
  type,
  /**
   * @bold prop is a boolean, if enabled will use bold version of the
   * type mentioned.
   *
   * default value: false
   */
  bold,
  invert,
  /**
   * @style prop will overwrite the predefined styling for Text defined by
   * @type prop
   */
  style,
  ...props
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <RNText
      style={StyleSheet.flatten([
        getTextStyle(type, bold, theme),
        invert && {color: '#fff'},
        style,
      ])}
      {...props}
    />
  );
};

const getTextStyle = (type, bold, theme) => {
  let style = '';
  switch (type) {
    case HEADING:
      style = 'headingText';
      break;
    case SUB_HEADING:
      style = 'subheadingText';
      break;
    case LABEL:
      style = 'labelText';
      break;
    default:
      style = 'bodyText';
  }
  if (bold) {
    style += 'Bold';
  }
  return TYPOGRAPHY[style](theme);
};

Text.propTypes = propTypes;

Text.defaultProps = defaultProps;

export default Text;
