import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Background,
  Button,
  Header,
  PokeLoader,
  TextInput,
} from '../components';
import { listUserInfo } from '../store/user/userSettingSlice';
import { useAppDispatch, useAppSelector } from './../store/hooks';
import Logo from './../components/Logo';
import { nameValidator } from '../helpers/nameValidator';
import { emailValidator } from '../helpers/emailValidator';
import { displayNameValidator } from '../helpers/displayNameValidator';

const UserSetting = () => {
  const [name, setName] = useState({ value: '', error: '' });
  const [displayName, setDisplayName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });

  const profile = useAppSelector(state => state?.userSetting);
  const loading = useAppSelector(state => state.userSetting.loading);

  console.log(profile);

  const onSignUpPressed = async () => {
    try {
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const displayNameError = displayNameValidator(displayName.value);
      if (emailError || nameError || displayNameError) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setDisplayName({ ...displayName, error: displayNameError });
        return;
      }

      const account = {
        user_name: name.value,
        email: email.value,
        avatar: '',
        display_name: displayName.value,
        bio: '',
        company: '',
        address: '',
      };
    } catch (error) {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      {loading && <PokeLoader />}
      {!loading && (
        <Background>
          <Header>User Infomation</Header>
          <Logo title={profile?.avatarURL} />
          <TextInput
            label="Username"
            returnKeyType="next"
            value={profile?.name || name.value}
            onChangeText={(text: any) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={profile?.email || email.value}
            onChangeText={(text: any) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Display Name"
            returnKeyType="next"
            value={profile?.display_name || displayName.value}
            onChangeText={(text: any) =>
              setDisplayName({ value: text, error: '' })
            }
            error={!!displayName.error}
            errorText={displayName.error}
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Edit
          </Button>
        </Background>
      )}
    </View>
  );
};

export default UserSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
