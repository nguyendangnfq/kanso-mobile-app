import React from 'react';
import { StyleSheet, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Button, Card } from 'react-native-paper';

type DetailCardProps = {
  item: any;
  handleSelected: (value: never) => void;
  checked: boolean;
  setChecked: (val: any) => void;
  showEditModal: (value: any) => void;
  onToggleSnackBar: (value: any) => void;
};

const DetailTaskCard = (props: DetailCardProps) => {
  const {
    item,
    handleSelected,
    checked,
    setChecked,
    showEditModal,
    onToggleSnackBar,
  } = props;

  // console.log(item);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={item?.name}
          subtitle={`Assign On: ${item?.assignOn}`}
          right={() => (
            <View style={styles.optionView}>
              <BouncyCheckbox
                isChecked={checked}
                fillColor="#34eb83"
                unfillColor="#FFFFFF"
                onPress={() => {
                  handleSelected(item.id);
                  setChecked(!checked);
                }}
              />
            </View>
          )}
        />
        <Card.Actions>
          <Button onPress={() => showEditModal(item.id)}>Edit</Button>
          <Button onPress={() => onToggleSnackBar(item.id)}>Delete</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default DetailTaskCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEdit: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
