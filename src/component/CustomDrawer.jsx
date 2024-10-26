/* eslint-disable react/no-unstable-nested-components */
import {Alert, Button, Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import TabComponent from './TabComponent';
import {useDispatch} from 'react-redux';
import {logout} from '../store/reducer/slice';
import {useNavigation} from '@react-navigation/native';

function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="fill Form"
        component={TabComponent}
        options={{headerTitle: ''}}
      />
    </Drawer.Navigator>
  );
}
function CustomDrawer(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <DrawerItem
        label="Logout"
        onPress={() =>
          Alert.alert('do you want to Logout', 'please conform', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {
                dispatch(logout());
                alert('logout successfully');
                navigation.replace('login');
              },
            },
          ])
        }
      />
    </DrawerContentScrollView>
  );
}

export default MyDrawer;

const styles = StyleSheet.create({});
