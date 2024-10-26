import {Button, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import * as yup from 'yup';
import {useForm, Controller, set} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userAuthentication} from '../store/reducer/slice';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
});
const LoginScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.userDataArray);
  console.log(userData);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onPressSend = formData => {
    console.log('user data', formData);
    const filterData = userData.filter(
      val => val.email === formData.email && val.password === formData.password,
    );
    if (filterData.length !== 0) {
      const tokenValue = Date.now();
      dispatch(userAuthentication(tokenValue));
      navigation.navigate('home');
    } else {
      alert('invalid credentials');
    }
    console.log(filterData);
    // dispatch(userAuthentication(formData));
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
        Login Screen
      </Text>
      <View style={{margin: 'auto'}}>
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
      </View>
      <View style={{width: 80, alignSelf: 'center', marginTop: 20}}>
        <Button title="Submit" onPress={handleSubmit(onPressSend)} />
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 18,

          textAlign: 'center',
          marginTop: 20,
        }}>
        Not a member!!SignUP😎
      </Text>
      <View style={{width: 80, alignSelf: 'center', marginTop: 5}}>
        <Button
          title="signUP"
          onPress={() => navigation.navigate('register')}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

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
