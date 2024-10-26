import {Button, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const ProfileImagePicker = ({setSelectedImage}) => {
  // const [image, setImage] = useState();
  const handlePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log('url', imageUri);
        const stringData = imageUri.toString();
        setSelectedImage(stringData);
        // setImage(stringData);
      }
    });
  };

  return (
    <>
      <Button title="pick" onPress={() => handlePicker()} />
      {/* {image && (
        <Image source={{uri: image}} style={{height: 100, width: 100}} />
      )} */}
    </>
  );
};

export default ProfileImagePicker;

const styles = StyleSheet.create({});
