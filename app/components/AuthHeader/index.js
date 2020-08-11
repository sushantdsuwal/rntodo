import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Text from '../Text';
import {ThemeContext} from '../../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import images from '../../assets/images';

export default function AuthHeader({
  back,
  title,
  intro,
  logo,
  constainerStyle,
}) {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);

  return (
    <View>
      {back ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.seperator} />
      )}

      <View style={[styles.containerStyle, constainerStyle && constainerStyle]}>
        <View style={[styles.logo]}>
          {logo && <Image source={images.logo} style={styles.image} />}
        </View>
        <Text invert style={[styles.titleText(theme, intro)]}>
          {title}
        </Text>
        {intro && (
          <Text invert style={styles.intro} type={'subheading'}>
            {intro}
          </Text>
        )}
      </View>
    </View>
  );
}

AuthHeader.defaultProps = {};

const styles = StyleSheet.create({
  containerStyle: {
    // flex: 1,
    marginVertical: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperator: {
    marginVertical: 9,
  },
  titleText: (theme, intro) => ({
    // marginTop: intro ? -40 : 0,
    marginBottom: 18,
    lineHeight: 40,
    fontSize: 25,
    textAlign: 'center',
  }),
  introText: {
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 18,
  },
  logo: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  intro: {
    textAlign: 'center',
  },
});
