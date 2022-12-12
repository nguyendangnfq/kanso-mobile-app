import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  FAB,
  MD3Colors,
  Modal,
  Portal,
  ProgressBar,
  Provider,
  Snackbar,
  Switch,
} from 'react-native-paper';
import {
  AddDetailTaskForm,
  DetailTaskCard,
  EditDetailTaskForm,
} from '../../components';
import {
  changeCompletedDetailTaskAsync,
  createDetailTask,
  deleteDetailTask,
  editDetailTask,
  fetchDetailTask,
  setIsCompleted,
  setProgress,
} from '../../store/detailTask/detailTaskSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkCompleted } from '../../store/task/taskSlice';

type DetailTaskProps = {
  route: any;
};

const DetailTask = (props: DetailTaskProps) => {
  const { route } = props;
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [editData, setEditData] = useState({});
  const [idEdit, setIdEdit] = useState('');
  const [idDelete, setIdDelete] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectedDetailTask, setSelectedDetailTask] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDetailTask({ taskOwner: data?.id }));
  }, []);

  useEffect(() => {
    if (detailTask) {
      const initialSelected = detailTask
        .filter((item: any) => item.is_complete)
        .map((item: any) => item.id);
      setSelectedDetailTask(initialSelected);
      console.log(initialSelected);
    }
  }, [detailTask]);

  const detailTask = useAppSelector(
    state => state.detailTask.infoAllDetailTask,
  );
  const info = useAppSelector(state => state.detailTask.infoTask);
  const role = useAppSelector(state => state.project.role);
  const token = useAppSelector(state => state.login.token);
  const vice_token = useAppSelector(state => state.register.token);

  const data = route.params.task;
  const idBoard = route.params.idBoard;
  const kanbanData = route.params.kanbanData;
  const idDetailTask = data.id;
  const idProject = kanbanData.idProject;

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 10 };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showEditModal = (value: any) => {
    setEditVisible(true);
    const newData = detailTask.find((item: any) => item.id === value);
    setEditData(newData);
    setIdEdit(value);
  };

  const hideEditModal = () => setEditVisible(false);

  const end_time = moment(data?.end_time).format('MMMM DD');

  const onDismissSnackBar = () => setSnackVisible(false);

  const onToggleSnackBar = (value: any) => {
    setSnackVisible(!snackVisible);
    setIdDelete(value);
  };

  const handleSelected = (value: never) => {
    let newVal: any = [];
    if (!selectedDetailTask.includes(value)) {
      newVal = [...selectedDetailTask, value];
    } else {
      newVal = selectedDetailTask.filter(item => item !== value);
    }
    setSelectedDetailTask(newVal);
    console.log(newVal);

    dispatch(setProgress(parseInt(newVal.length * 100) / detailTask.length));
    dispatch(
      changeCompletedDetailTaskAsync({
        idDetailTask: newVal,
        idTask: data?.id,
        completed_by: token || vice_token,
        progress: parseInt((newVal.length * 100) / detailTask.length),
      }),
    );
  };

  const handleCheckCompleted = (value: any) => {
    setIsSwitchOn(!isSwitchOn);

    dispatch(setIsCompleted(value));
    dispatch(
      checkCompleted({ is_complete: value, idTask: idDetailTask, idBoard }),
    );
  };

  const handleCreateNewDetailTask = (value: any) => {
    const createValue = {
      idTask: data?.id,
      idProjectOwner: idProject,
      title: value.name,
      taskOwner: data?.id,
      assignOn: moment().format('YYYY-MM-DD'),
      isCompleted: false,
    };
    dispatch(createDetailTask(createValue));
    setVisible(false);
  };

  const handleEditDetailTask = (value: any) => {
    const editedValue = {
      ...value,
      idDetailTask: idEdit,
      idTask: data?.id,
    };
    setEditVisible(false);
    dispatch(editDetailTask(editedValue));
  };

  const handleDeleteDetailTask = (value: any) => {
    const deltetedValue = {
      idDetailTask: value,
      idTask: data?.id,
    };
    dispatch(deleteDetailTask(deltetedValue));
    setSnackVisible(false);
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          dismissable={true}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <AddDetailTaskForm onSubmit={handleCreateNewDetailTask} />
        </Modal>
        <Modal
          visible={editVisible}
          dismissable={true}
          onDismiss={hideEditModal}
          contentContainerStyle={containerStyle}
        >
          <EditDetailTaskForm
            editData={editData}
            onSubmit={handleEditDetailTask}
          />
        </Modal>
      </Portal>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleWrapper}>
            <View style={styles.titleView}>
              <Text style={[styles.text, styles.titleText]}>{info?.title}</Text>
              {info?.progress === 100 &&
                (role === 'Project Manager' || role === 'Leader') && [
                  <View>
                    <Text>Complete</Text>
                    <Switch
                      value={isSwitchOn}
                      onValueChange={handleCheckCompleted}
                    />
                  </View>,
                ]}
            </View>
            <Text
              style={[styles.text, styles.dateText]}
            >{`Deadlines - ${end_time}`}</Text>
          </View>
          <View style={styles.progressWrapper}>
            <Text style={styles.progressText}>Progress</Text>
            <Text style={styles.progressText}>{`${info?.progress}%`}</Text>
          </View>
          <ProgressBar
            progress={selectedDetailTask.length && info?.progress / 100}
            color={MD3Colors.error50}
            style={styles.progressBar}
          />
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          {detailTask.map((item: any) => (
            <DetailTaskCard
              item={item}
              handleSelected={handleSelected}
              checked={item.is_complete}
              setChecked={setChecked}
              showEditModal={showEditModal}
              onToggleSnackBar={onToggleSnackBar}
            />
          ))}
        </ScrollView>
        <FAB
          icon={require('../../assets/plus.png')}
          style={styles.fab}
          onPress={showModal}
        />
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Sure',
          onPress: () => {
            handleDeleteDetailTask(idDelete);
          },
        }}
      >
        Are you sure to delete this board ?
      </Snackbar>
    </Provider>
  );
};

export default DetailTask;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    color: 'black',
  },
  header: {
    marginBottom: 30,
  },
  titleWrapper: {
    marginBottom: 15,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  progressWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
  },
  progressBar: {
    borderRadius: 8,
    height: 6,
  },
  content: {
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
