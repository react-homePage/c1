import {Button, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {addUsers} from '../store/reducer/slice';

const schema = yup.object().shape({
  name: yup.string().required('name is required').trim(),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must contain at least 8 characters'),
});

const RegisterScreen = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const dispatch = useDispatch();

  const onPressSend = formData => {
    console.log('user data', formData);
    dispatch(addUsers(formData));
    navigation.navigate('login', {formData});
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
        Registeration
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
        already a member!!SignIn😎
      </Text>
      <View style={{width: 80, alignSelf: 'center', marginTop: 5}}>
        <Button title="SignIn" onPress={() => navigation.navigate('login')} />
      </View>
    </View>
  );
};

export default RegisterScreen;

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
