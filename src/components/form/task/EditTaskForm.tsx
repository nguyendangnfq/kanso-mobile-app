import moment from 'moment';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, ScrollView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import MultiSelect from 'react-native-multiple-select';
import { Text, SegmentedButtons } from 'react-native-paper';
import Button from '../../Button';

type EditTaskFormProps = {
  startDate: string;
  endDate: string;
  task: any;
  onSubmit: (value: any) => void;
};

const EditTaskForm = (props: EditTaskFormProps) => {
  const { startDate, endDate, task, onSubmit } = props;

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [startTime, setStartTime] = useState(new Date(startDate));
  const [endTime, setEndTime] = useState(new Date(endDate));

  const taskers = task?.taskers?.map((item: any) => item);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taskId: task?.id,
      title: task?.title,
      description: task?.description,
      priority: task?.priority,
      start_time: task?.start_time,
      end_time: task?.end_time,
      taskers: task?.taskers,
      totalConversation: task?.totalConversation,
      totalDetilTask: task?.totalDetilTask,
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

      <Text style={styles.label}>Description</Text>
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
        name="description"
      />
      {errors.description && (
        <Text style={styles.textError}>This is required.</Text>
      )}

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
                {value
                  ? moment(value).format('YYYY-MM-DD')
                  : moment(startTime).format('YYYY-MM-DD')}
              </Text>
              <DatePicker
                modal
                mode="date"
                open={openStartDate}
                maximumDate={endTime}
                minimumDate={new Date()}
                date={new Date()}
                onConfirm={date => {
                  setOpenStartDate(false);
                  onChange(moment(date).format('YYYY-MM-DD'));
                  setStartTime(date);
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
                {value
                  ? moment(value).format('YYYY-MM-DD')
                  : moment(endTime).format('YYYY-MM-DD')}
              </Text>
              <DatePicker
                modal
                mode="date"
                open={openEndDate}
                maximumDate={endTime}
                minimumDate={new Date()}
                date={new Date()}
                onConfirm={date => {
                  setOpenEndDate(false);
                  onChange(moment(date).format('YYYY-MM-DD'));
                  setEndTime(date);
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
        <Text style={styles.label}>Members</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              hideTags
              items={taskers}
              uniqueKey="user_name"
              onSelectedItemsChange={onChange}
              selectedItems={value}
              selectText="Pick Members"
              searchInputPlaceholderText="Search Members..."
              onChangeInput={text => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="display_name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
          )}
          name="taskers"
        />
        {errors.taskers && (
          <Text style={styles.textError}>This is required.</Text>
        )}
      </View>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Modify
      </Button>
    </ScrollView>
  );
};

export default EditTaskForm;

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
