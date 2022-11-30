import { Avatar } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import * as Progress from 'react-native-progress';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Portal, Provider, Modal } from 'react-native-paper';
import EditKanbanForm from './form/EditKanbanForm';

type KanbanCardProps = {
  item: any;
  key: any;
  onToggleSnackBar: (value: any) => void;
  onToggleEditModal: (value: any) => void;
};

const KanbanCard = (props: KanbanCardProps) => {
  const { item, onToggleSnackBar, onToggleEditModal } = props;
  const [checked, setChecked] = useState(false);

  return (
    <>
      <View style={[styles[item.priority], styles.container]}>
        <View>
          <BouncyCheckbox
            isChecked={checked}
            fillColor="#34eb83"
            unfillColor="#FFFFFF"
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <View>
          <Text style={[styles.titleText, styles.text]}>{item?.title}</Text>
          {item.progress ? (
            <Progress.Bar
              style={styles.progressBar}
              progress={item?.progress / 100}
              width={200}
              color={
                item?.progress <= 30
                  ? 'red'
                  : item?.progress <= 50
                  ? 'orange'
                  : item?.progress <= 70
                  ? 'yellow'
                  : item?.progress <= 90
                  ? 'dodgerblue'
                  : 'lawngreen'
              }
              borderWidth={0}
              animated={true}
              unfilledColor={'#ccc'}
            />
          ) : (
            <Progress.Bar
              progress={0}
              width={200}
              color={'red'}
              borderWidth={0}
              animated={true}
              unfilledColor={'#fff'}
            />
          )}
          <Text
            style={[styles.progressText, styles.text]}
          >{`${item.progress} %`}</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={[styles.priorityText, styles.text]}>
              {item?.priority}
            </Text>
          </View>
        </View>

        <View style={styles.progress}>
          {!checked ? (
            <Avatar.Group
              _avatar={{
                size: 'sm',
              }}
              max={2}
            >
              {item.members.map((val: any) => (
                <Avatar
                  key={val.avatar}
                  bg="cyan.500"
                  source={{ uri: val.avatar }}
                />
              ))}
            </Avatar.Group>
          ) : (
            <>
              <Pressable onPress={() => onToggleEditModal(item.id_job)}>
                <Image
                  source={require('../assets/edit.png')}
                  tintColor="white"
                  style={styles.imageEdit}
                />
              </Pressable>
              <Pressable onPress={() => onToggleSnackBar(item.id_job)}>
                <Image
                  source={require('../assets/delete.png')}
                  tintColor="white"
                  style={styles.imageDelete}
                />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default KanbanCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: {
    color: '#fff',
  },
  titleText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    marginBottom: 5,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  progress: {
    alignItems: 'flex-end',
  },
  priorityText: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressStatus: {
    fontSize: 13,
    color: 'lightgray',
  },
  imageEdit: {
    width: 25,
    height: 25,
    marginBottom: 40,
  },
  imageDelete: {
    width: 25,
    height: 25,
  },
  High: {
    backgroundColor: '#c34048',
  },
  Medium: {
    backgroundColor: '#f8d030',
  },
  Low: {
    backgroundColor: '#78c850',
  },
});
