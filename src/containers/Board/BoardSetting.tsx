import React from 'react';
import { Divider, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from '../../components';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteProject, renameProject } from '../../store/project/projectSlice';

type BoardSettingProps = {
  route: any;
  navigation: any;
};

const BoardSetting = (props: BoardSettingProps) => {
  const { route, navigation } = props;

  const dispatch = useAppDispatch();
  const idProject = route.params.idProject;
  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);

  const handleChangeName = async (value: any) => {
    const newValue = {
      newNameProject: value.name,
      idProject: idProject,
      idUser: token || vice_token,
    };
    await dispatch(renameProject(newValue));
    navigation.replace('Main');
  };

  const handleDeleteProject = async () => {
    await dispatch(deleteProject(idProject));
    navigation.replace('Main');
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Project Name</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              label="Project Name"
            />
          )}
          name="name"
        />
        {errors.name && <Text style={styles.textError}>This is required.</Text>}
        <Button mode="contained" onPress={handleSubmit(handleChangeName)}>
          Rename
        </Button>
      </View>
      <View style={styles.highRiskContainer}>
        <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>
          High risk settings
        </Text>
        <Divider style={{ marginBottom: 20 }} />
        <View style={styles.titleView}>
          <Text style={styles.titleText}>Delete this project</Text>
          <Text style={styles.descriptionText}>
            Once you delete a repository, there is no going back. Please be
            certain.
          </Text>
        </View>
        <Button
          mode="contained"
          style={styles.deleteButton}
          onPress={handleDeleteProject}
        >
          Delete Project
        </Button>
      </View>
    </View>
  );
};

export default BoardSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleView: {
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontStyle: 'italic',
  },
  formContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
  },
  highRiskContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderColor: 'red',
    borderWidth: 1,
  },
  label: {
    color: 'black',
    marginLeft: 0,
    marginBottom: 10,
  },
  textError: {
    color: 'red',
  },

  deleteButton: {
    backgroundColor: 'red',
  },
});
