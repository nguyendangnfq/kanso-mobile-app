import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SegmentedButtons, Switch } from 'react-native-paper';
import Button from '../../Button';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { Picker } from '@react-native-picker/picker';

type EditKanbanFormProps = {
  onSubmit: (value: any) => void;
  data: any;
  boardData: any;
};

const EditKanbanForm = (props: EditKanbanFormProps) => {
  const { onSubmit, data, boardData } = props;

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title,
      priority: data?.priority,
      start_time: data?.start_time,
      end_time: data?.end_time,
      is_completed: false,
      parent: 'not',
    },
  });

  return (
    <ScrollView nestedScrollEnabled={true}>
      <Text style={styles.label}>Title</Text>
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
        name="title"
      />
      {errors.title && <Text style={styles.textError}>This is required.</Text>}

      <Text style={styles.label}>Priority</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <SegmentedButtons
            style={{ justifyContent: 'center' }}
            value={value}
            onValueChange={onChange}
            buttons={[
              {
                value: 'High',
                label: 'High',
              },
              {
                value: 'Medium',
                label: 'Medium',
              },
              { value: 'Low', label: 'Low' },
            ]}
          />
        )}
        name="priority"
      />
      {errors.priority && (
        <Text style={styles.textError}>This is required.</Text>
      )}

      <Text style={styles.label}>Complete</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Switch value={value} onValueChange={onChange} />
        )}
        name="is_completed"
      />

      <View>
        <Text style={styles.label}>Start Date</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Text onPress={() => setOpenStartDate(true)}>
                {value ? value : moment(startDate).format('YYYY-MM-DD')}
              </Text>
              <DatePicker
                modal
                mode="date"
                open={openStartDate}
                minimumDate={new Date()}
                date={new Date()}
                onConfirm={date => {
                  setOpenStartDate(false);
                  onChange(moment(date).format('YYYY-MM-DD'));
                  setStartDate(date);
                }}
                onCancel={() => {
                  setOpenStartDate(false);
                }}
              />
            </>
          )}
          name="start_time"
        />
        {errors.start_time && (
          <Text style={styles.textError}>This is required.</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>End Date</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Text onPress={() => setOpenEndDate(true)}>
                {value ? value : moment(endDate).format('YYYY-MM-DD')}
              </Text>
              <DatePicker
                modal
                mode="date"
                open={openEndDate}
                minimumDate={new Date()}
                date={new Date()}
                onConfirm={date => {
                  setOpenEndDate(false);
                  onChange(moment(date).format('YYYY-MM-DD'));
                  setEndDate(date);
                }}
                onCancel={() => {
                  setOpenEndDate(false);
                }}
              />
            </>
          )}
          name="end_time"
        />
        {errors.end_time && (
          <Text style={styles.textError}>This is required.</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>Parent Job</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Not Available" value="not" />
              {boardData.map((item: any) => (
                <Picker.Item label={item.title} value={item.id_job} />
              ))}
            </Picker>
          )}
          name="parent"
        />
      </View>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Modify
      </Button>
    </ScrollView>
  );
};

export default EditKanbanForm;

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
