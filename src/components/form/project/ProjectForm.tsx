import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../Button';
import TextInput from '../../TextInput';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createProject } from '../../../store/project/projectSlice';

const ProjectForm = () => {
  const [name, setName] = useState({ value: '', error: '' });
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);

  const navigation = useNavigation();

  const handleCreateProject = async () => {
    try {
      const dataProject = {
        name: name.value,
        owner: token || vice_token,
      };
      await dispatch(createProject(dataProject));
      navigation.goBack();
    } catch (error) {
      return null;
    }
  };
  return (
    <View style={styles.formView}>
      <TextInput
        label="Project Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: any) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        autoCapitalize="none"
      />
      <Button mode="contained" onPress={handleCreateProject}>
        Add
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Cancle
      </Button>
    </View>
  );
};

export default ProjectForm;

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
