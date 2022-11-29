import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../theme/theme';
import { nameValidator } from '../helpers/nameValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { useAppDispatch } from './../store/hooks';
import { login } from '../store/user/loginSlice';
import { Background, Button, Header, TextInput } from '../components';

export default function LoginScreen({ navigation }: any) {
  const [name, setName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const dispatch = useAppDispatch();

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
      navigation.replace('Main');
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
      <Button mode="contained" onPress={onLoginPressed}>
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
