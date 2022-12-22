import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import Button from '../../Button';

type Props = {
  onSubmit: (value: any) => void;
  editData: any;
};

const EditDetailTaskForm = (props: Props) => {
  const { onSubmit, editData } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: editData.name,
    },
  });
  return (
    <View>
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.textError}>This is required.</Text>}
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Modify
      </Button>
    </View>
  );
};

export default EditDetailTaskForm;

const styles = StyleSheet.create({
  label: {
    color: 'black',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  dateContainer: {
    // flex: 1,
    position: 'relative',
    zIndex: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textError: {
    color: 'red',
  },
});
