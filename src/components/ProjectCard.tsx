import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

type ProjectCardProps = {
  item: any;
};

const ProjectCard = (props: ProjectCardProps) => {
  const { item } = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.titleText, styles.text]}>{item?.title}</Text>
        {item.progress ? (
          <Progress.Bar
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
            unfilledColor={'#ccc'}
          />
        )}
      </View>
      <View style={styles.progress}>
        <Text style={[styles.progressText, styles.text]}>
          {`${item?.completedTask} / ${item?.totalTask}`}
        </Text>
        <Text style={styles.progressStatus}>Task Completed</Text>
      </View>
    </View>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  text: {
    color: '#000',
  },
  titleText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progress: {
    alignItems: 'flex-end',
  },
  progressText: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressStatus: {
    fontSize: 13,
    color: 'lightgray',
  },
  red: {
    color: 'red',
  },
  orange: {
    color: 'orange',
  },
  lawngreen: {
    color: 'lawngreen',
  },
});
