import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';

const DropDown = () => {
  const { i18n } = useTranslation();
  const handleChangeLanguages = (val: string) => {
    i18n.changeLanguage(val);
  };
  return (
    <RNPickerSelect
      placeholder={{
        label: 'Select a languages',
      }}
      onValueChange={(value: any) => handleChangeLanguages(value)}
      items={[
        { label: 'English', value: 'en' },
        { label: 'Vietnamese', value: 'vi' },
      ]}
    />
  );
};

export default DropDown;
