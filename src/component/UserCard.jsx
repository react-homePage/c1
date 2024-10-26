/* eslint-disable react-native/no-inline-styles */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

const UserCard = ({
  item,
  handleEdit,
  handleDelete,
  showCheckbox,
  checked = false,
  handleCheckClick,
}) => {
  console.log(item);
  return (
    <View
      style={{
        backgroundColor: '#2F3C7E',
        flex: 1,
        padding: 10,
        borderRadius: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 20}}>
        <Image
          source={{uri: item?.image}}
          style={{height: 50, width: 50, borderRadius: 50}}
        />
        <Text style={styles.text1}>Name: {item?.name}</Text>
        <View style={{alignSelf: 'center', left: 90, bottom: 10}}>
          {showCheckbox && (
            <TouchableOpacity>
              <CheckBox
                value={checked}
                onValueChange={() => handleCheckClick(item.email)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.text1}>Email: {item?.email}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 20,
        }}>
        <TouchableOpacity onPress={() => handleDelete(item)}>
          <Ionicons name="trash-outline" color="red" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" color="red" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  text1: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 30,
    color: 'white',
  },
});
