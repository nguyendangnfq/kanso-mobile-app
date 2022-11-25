import { Avatar } from 'native-base';
import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import * as Progress from 'react-native-progress';

type KanbanCardProps = {
  item: any;
  key: any;
};

const KanbanCard = (props: KanbanCardProps) => {
  const { item } = props;

  return (
    <View style={[styles[item.priority], styles.container]}>
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
        <Pressable style={{ marginBottom: 30 }}>
          <Image
            source={require('../assets/icons8-menu-vertical-50.png')}
            tintColor="white"
            style={{ width: 25, height: 25 }}
          />
        </Pressable>

        <Avatar.Group
          _avatar={{
            size: 'sm',
          }}
          max={3}
        >
          {item.members.map((val: any) => (
            <Avatar bg="cyan.500" source={{ uri: val.avatar }} />
          ))}
        </Avatar.Group>
      </View>
    </View>
  );
};

export default KanbanCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: '#fff',
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
