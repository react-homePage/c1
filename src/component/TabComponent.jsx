/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/self-closing-comp */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../screen/HomePage';
import DisplayUser from '../screen/DisplayUser';
import LocationScreen from '../screen/LocationScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
const TabComponent = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="fillForm"
        component={HomePage}
        options={{
          tabBarLabelStyle: {
            fontSize: 14,
          },
          headerShown: false,
          tabBarIcon: (color, size) => (
            <Ionicons name="calendar-outline" size={28} color="black" />
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="maps"
        component={LocationScreen}
        options={{
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: () => (
            <Ionicons name="navigate-circle-outline" size={28} color="black" />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="displayuser"
        component={DisplayUser}
        options={{
          headerShown: true,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: () => (
            <Ionicons name="person-circle-outline" size={28} color="black" />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabComponent;

const styles = StyleSheet.create({});
