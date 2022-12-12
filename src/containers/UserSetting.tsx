import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  Background,
  Button,
  Header,
  PokeLoader,
  TextInput,
} from '../components';
import { useAppDispatch, useAppSelector } from './../store/hooks';
import Logo from './../components/Logo';
import { emailValidator } from '../helpers/emailValidator';
import { displayNameValidator } from '../helpers/displayNameValidator';
import { editUser } from '../store/user/userSettingSlice';

const UserSetting = () => {
  const profile = useAppSelector(state => state?.userSetting);

  const [displayName, setDisplayName] = useState({
    value: profile?.display_name,
    error: '',
  });
  const [email, setEmail] = useState({ value: profile?.email, error: '' });
  const [company, setCompany] = useState(profile?.company);
  const [location, setLocation] = useState(profile?.location);
  const [bio, setBio] = useState(profile?.bio);

  const loading = useAppSelector(state => state.userSetting.loading);
  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);
  const dispatch = useAppDispatch();

  // console.log(profile);

  const onEditUser = async () => {
    try {
      const emailError = emailValidator(email.value);
      const displayNameError = displayNameValidator(displayName.value);
      if (emailError || displayNameError) {
        setEmail({ ...email, error: emailError });
        setDisplayName({ ...displayName, error: displayNameError });
        return;
      }

      const account = {
        owner: token || vice_token,
        display_name: displayName.value,
        bio: bio,
        email: email.value,
        avatar: '',
        company: company,
        address: location,
      };
      dispatch(editUser(account));
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
            label="Bio"
            returnKeyType="next"
            value={bio}
            onChangeText={(text: any) => setBio(text)}
          />
          <TextInput
            label="Company"
            returnKeyType="next"
            value={company}
            onChangeText={(text: any) => setCompany(text)}
          />
          <TextInput
            label="Location"
            returnKeyType="next"
            value={location}
            onChangeText={(text: any) => setLocation(text)}
          />
          <TextInput
            label="Display Name"
            returnKeyType="next"
            value={displayName.value}
            onChangeText={(text: any) =>
              setDisplayName({ value: text, error: '' })
            }
            error={!!displayName.error}
            errorText={displayName.error}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text: any) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <Button
            mode="contained"
            onPress={onEditUser}
            style={{ marginTop: 24 }}
          >
            Saved Profile
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
