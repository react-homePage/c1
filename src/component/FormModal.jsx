import {Alert, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomePage from '../screen/HomePage';

const FormModal = ({showFormModal, setShowFormModal}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFormModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShowFormModal(!showFormModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <HomePage />
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                {marginTop: 30, backgroundColor: 'red'},
              ]}
              onPress={() => setShowFormModal(!showFormModal)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setShowFormModal(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
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
export default FormModal;
