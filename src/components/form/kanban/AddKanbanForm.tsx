import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import Button from '../../Button';
import moment from 'moment';
import MultiSelect from 'react-native-multiple-select';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-date-picker';

type AddKanbanFormProps = {
  onSubmit: (value: any) => void;
  member: Array<string>;
  boardData: any;
};

const AddKanbanForm = (props: AddKanbanFormProps) => {
  const { onSubmit, member, boardData } = props;

  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const memberList = member.map(item => {
    return item;
  });

  const data = boardData.map((item: any) => {
    return {
      label: item.title,
      value: item.id_job,
    };
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      priority: '',
      start_time: '',
      end_time: '',
      members: [],
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
                {value === ''
                  ? 'Pick a date'
                  : moment(startDate).format('YYYY-MM-DD')}
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
                {value === ''
                  ? 'Pick a date'
                  : moment(endDate).format('YYYY-MM-DD')}
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
        <Text style={styles.label}>Members</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              hideTags
              items={memberList}
              uniqueKey="name"
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
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
          )}
          name="members"
        />
        {errors.members && (
          <Text style={styles.textError}>This is required.</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>Parent Job</Text>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              placeholder={{
                label: 'Not Available',
                value: 'not',
                color: '#9EA0A4',
              }}
              items={data}
              onValueChange={onChange}
              value={value}
              style={pickerSelectStyles}
            />
          )}
          name="parent"
        />
      </View>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Create
      </Button>
    </ScrollView>
  );
};

export default AddKanbanForm;

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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
