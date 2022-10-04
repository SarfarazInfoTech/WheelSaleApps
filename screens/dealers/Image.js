import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

const ImageUp = () => {
  const [file, setfile] = useState();
  const [Data, setData] = useState([]);
  const [fileName, setfileName] = useState();

  const options = {
    title: 'Image Picker',
    mediaType: 'image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const choosePic = async () => {
    launchImageLibrary(options, response => {
      // Use launchImageLibrary to open image gallery
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('YE VALUE KI IMAGE BHEJO =' + response);
        setData(response.assets[0]);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };
  const uploadPic = async () => {
    try {
      const response = await fetch(
        'https://upload.imagekit.io/api/v1/files/upload',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Basic cHJpdmF0ZV9IamgyYU9Cbkxub0pZT05iVVFyRzNQaFdkeWc9Og==',
            'Content-Type': 'multipart/form-data',
            'access-control-allow-origin': '*',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            fileName: Data.fileName,
            file: Data.uri,
            type: Data.type,
          }),
        },
      );

      const json = await response.json();

      alert(json);
      console.log(json);
    } catch (error) {
      console.error(error, 'erorr');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>

      {Data ? (
        <Image
          source={{uri: Data.uri}}
          style={{width: '100%', height: 300, margin: 10}}
        />
      ) : null}
      <TouchableOpacity
        style={{backgroundColor: 'green', margin: 10, padding: 10}}
        onPress={() => choosePic()}>
        <Text style={{color: '#fff'}}>Select Image</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => uploadPic()}>
        <Text>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default ImageUp;
