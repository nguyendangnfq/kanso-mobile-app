import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../theme/theme';
import { nameValidator } from '../helpers/nameValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login } from '../store/user/loginSlice';
import { Background, Button, Header, TextInput } from '../components';

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const loading = useAppSelector(state => state.login.loading);
  const status = useAppSelector(state => state.login.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status) {
      navigation.navigate('Main');
    }
  }, [status]);

  const onLoginPressed = async () => {
    try {
      const emailError = nameValidator(name.value);
      const passwordError = passwordValidator(password.value);
      if (emailError || passwordError) {
        setName({ ...name, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      const dataLogin = {
        user_name: name.value,
        password: password.value,
      };
      await dispatch(login(dataLogin));
    } catch (error) {
      return null;
    }
  };

  return (
    <Background>
      <Header>Welcome back to Kanso</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: any) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        autoCapitalize="none"
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
      <Button mode="contained" onPress={onLoginPressed} loading={loading}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Register')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
