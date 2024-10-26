/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
  Button,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';

const LocationScreen = () => {
  // <meta-data
  // android:name="com.google.android.geo.API_KEY"
  // android:value="AIzaSyAN4ZLvrq1_W-VVQs84P74VPEZ9IkPDvfI"/>
  const [mLat, setMLat] = useState(0);
  const [mLong, setMLong] = useState(0);
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permission granted to use location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('location', position);
        setMLat(position.coords.latitude);
        setMLong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleMarkerDragEnd = event => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    console.log('New Coordinates:', latitude, longitude);
    setMLat(latitude);
    setMLong(longitude);
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{width: '80%', height: '70%', marginHorizontal: 'auto'}}
        initialRegion={{
          latitude: 28.693602091083623,
          longitude: 77.21464383448563,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChange={x => {}}>
        <Marker
          onPress={() =>
            this.setState({visible: true}) +
            setTimeout(() => alert(this.state.visible), 200)
          }
          coordinate={{latitude: mLat, longitude: mLong}}
          pinColor="red"
          onDragEnd={handleMarkerDragEnd}
          draggable={true}></Marker>
      </MapView>
      <View style={{width: 100, alignSelf: 'center'}}>
        <Text style={{color: 'black'}}>Latitude : {mLat}</Text>
        <Text style={{color: 'black'}}>Longitude : {mLong}</Text>
      </View>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          alignSelf: 'center',
          position: 'absolute',
          backgroundColor: 'green',
          bottom: 20,
          justifyContent: 'center',
        }}
        onPress={getLocation}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Get Current Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationScreen;
