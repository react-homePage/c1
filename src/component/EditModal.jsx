import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomePage from '../screen/HomePage';
import EditUserForm from './EditUserForm';

const EditModal = ({showEditModal, setShowEditModal, editItem}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEditModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowEditModal(!showEditModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <EditUserForm editItem={editItem} />
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                {marginTop: 30, backgroundColor: 'red'},
              ]}
              onPress={() => setShowEditModal(!showEditModal)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  modalView: {
    width: 380,
    height: 800,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default EditModal;
