import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../theme/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import { phoneValidator } from '../helpers/phoneValidator';
import { displayNameValidator } from '../helpers/displayNameValidator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register } from '../store/user/registerSlice';
import { Button, Header, TextInput } from '../components';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [displayName, setDisplayName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const loading = useAppSelector(state => state.register.loading);
  const status = useAppSelector(state => state.register.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status) {
      navigation.navigate('Main');
    }
  }, [status]);

  const onSignUpPressed = async () => {
    try {
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      const phoneError = phoneValidator(phone.value);
      const displayNameError = displayNameValidator(displayName.value);
      if (
        emailError ||
        passwordError ||
        nameError ||
        phoneError ||
        displayNameError
      ) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        setPhone({ ...phone, error: phoneError });
        setDisplayName({ ...displayName, error: displayNameError });
        return;
      }

      const account = {
        user_name: name.value,
        email: email.value,
        password: password.value,
        avatar: '',
        display_name: displayName.value,
        phone: phone.value,
        bio: '',
        company: '',
        address: '',
      };
      await dispatch(register(account));
    } catch (error) {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header>Create Account</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: any) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
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
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: any) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text: any) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
      />
      <TextInput
        label="Display Name"
        returnKeyType="next"
        value={displayName.value}
        onChangeText={(text: any) => setDisplayName({ value: text, error: '' })}
        error={!!displayName.error}
        errorText={displayName.error}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
        loading={loading}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
