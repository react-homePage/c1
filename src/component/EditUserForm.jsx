/* eslint-disable react-native/no-inline-styles */
import {Button, Image, StyleSheet, Text, View} from 'react-native';

import React, {useEffect, useState} from 'react';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addDisplayUsers,
  addUsers,
  editDisplayUser,
} from '../store/reducer/slice';
import ProfileImagePicker from '../component/ProfileImagePicker';

const schema = yup.object().shape({
  name: yup.string().required('name is required').trim(),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
});

const EditUserForm = ({editItem}) => {
  const displayUserArray = useSelector(state => state.userData.displayUser);
  console.log('display Array', displayUserArray);
  console.log('edit user details', editItem);
  const indexValue = displayUserArray.findIndex(
    item => item.email === editItem.email,
  );

  console.log('indexValue', indexValue);
  const {
    control,
    setValue,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: editItem.email,
      password: editItem.password,
      name: editItem.name,
      image: editItem.image,
    },
  });

  const dispatch = useDispatch();

  const onPressSend = formData => {
    console.log('formData', formData);
    const editArray = [...displayUserArray];
    const newObject = {
      ...editItem,
      ...formData,
    };
    editArray[indexValue] = newObject;
    dispatch(editDisplayUser(editArray));

    alert('your details have been submitted');
  };

  const handleImageUpdate = val => {
    setValue('image', val);
  };

  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        Edit User Details
      </Text>
      <View style={{margin: 'auto'}}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          Name
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.textBox}
              value={value}
              onChangeText={onChange}
              placeholder="name"
            />
          )}
          name="name"
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          Email
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.textBox}
              value={value}
              onChangeText={onChange}
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          Password
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.textBox}
              value={value}
              onChangeText={onChange}
              placeholder="Password"
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        <View style={{flexDirection: 'row', columnGap: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
            }}>
            pick profile
          </Text>
          <View style={{width: 80, alignSelf: 'center', marginTop: 20}}>
            <ProfileImagePicker
              setSelectedImage={val => handleImageUpdate(val)}
            />
          </View>
        </View>
        {errors.image && (
          <Text style={styles.error}>{errors.image.message}</Text>
        )}
      </View>

      <View style={{width: 80, alignSelf: 'center', marginTop: 20}}>
        <Button title="Submit" onPress={handleSubmit(onPressSend)} />
      </View>
    </View>
  );
};

export default EditUserForm;

const styles = StyleSheet.create({
  textBox: {
    height: 40,
    width: 300,
    borderWidth: 2,
    borderColor: 'black',
    color: 'black',
    padding: 5,
  },
  error: {
    color: 'red',
  },
});
