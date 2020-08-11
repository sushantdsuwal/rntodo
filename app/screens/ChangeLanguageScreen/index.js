/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {GenericView} from '../../components/';
import {LocalizationContext} from '../../locale/LocalizationContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChangeLanguageScreen = ({navigation}) => {
  const {translations, appLanguage, setAppLanguage} = useContext(
    LocalizationContext,
  );

  const handleSetLanguage = async (language) => {
    setAppLanguage(language);
  };

  return (
    <GenericView padding style={{flex: 1, padding: 20}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name={'chevron-left'} size={30} />
        <Text>{translations.BACK}</Text>
      </TouchableOpacity>
      <Text style={{marginTop: 20, fontSize: 20, textAlign: 'center'}}>
        {translations.LANGUAGE_SETTINGS}
      </Text>

      {translations.getAvailableLanguages().map((item) => (
        <View key={item}>
          <TouchableOpacity
            style={{
              paddingVertical: 20,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => handleSetLanguage(item)}>
            <Text style={{fontSize: 16}}>{item}</Text>
            {appLanguage === item ? (
              <Text style={{marginLeft: 30}}>√</Text>
            ) : null}
          </TouchableOpacity>
        </View>
      ))}
    </GenericView>
  );
};

export default ChangeLanguageScreen;
