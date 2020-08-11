import React, {useContext} from 'react';
import {
  ScrollView,
  View,
  ViewPropTypes,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView';
import MessageView from '../MessageView';
import Status from '../../service/Status';
import {SPACING} from '../../constants/index';
import {ThemeContext} from '../../theme';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  footer: PropTypes.element,
  scrollable: PropTypes.bool,
  status: PropTypes.oneOf(Object.values(Status)),
  errorMessage: PropTypes.string,
  style: ViewPropTypes.style,
};

const defaultProps = {
  status: Status.SUCCESS,
  errorMessage: '',
  style: {},
  footer: <></>,
};

// NOTE: Can add functionality to show some fallback message in case of empty view
const GenericTemplate = ({
  children,
  footer,
  /**
   * If set true, `ScrollView` would be root element
   * rather than normal `View`
   */
  backgroundColor,
  scrollable,
  status,
  errorMessage,
  padding,
  style,
}) => {
  const {theme} = useContext(ThemeContext);
  const ViewGroup = scrollable ? ScrollView : View;

  if (status === Status.ERROR) {
    return <MessageView type="error" message={errorMessage} />;
  }

  if (status === Status.DEFAULT || status === Status.LOADING) {
    return <LoadingView />;
  }

  return (
    <SafeAreaView style={styles.container(backgroundColor, theme)}>
      <StatusBar
        barStyle={theme.appbar.barStyle}
        backgroundColor={theme.appbar.statusBarColor}
      />
      <ViewGroup style={[styles.content(padding), style]}>{children}</ViewGroup>
      {footer}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: (backgroundColor, theme) => ({
    flex: 1,
    backgroundColor: backgroundColor ? backgroundColor : theme.backgroundColor,
  }),
  content: (padding) => ({
    flex: 1,
    padding: padding ? SPACING.extraLarge : 10,
  }),
  stickyFooter: {},
});

GenericTemplate.propTypes = propTypes;

GenericTemplate.defaultProps = defaultProps;

export default GenericTemplate;
