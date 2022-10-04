import {encode} from 'base-64';
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
  const [Data, setData] = useState();
  const [fileName, setfileName] = useState();

  const options = {
    title: 'Image Picker',
    // includeBase64: true,
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
        // console.log('YE VALUE KI IMAGE BHEJO =' + response.assets[0].uri);
        setData(response.assets[0].uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };

  const uploadPic = async () => {
    // let formData = new FormData();
    // formData.append('photo', { file: Data });

    const newImageUri = 'file:' + Data.split('file:/').join('');
    const formData = new FormData();
    formData.append('image', {
      file: newImageUri,
    });
    try {
      console.log('Data', newImageUri);
      const response = await fetch(
        'http://103.159.239.52:80/wheelsale-app-ws/images/',
        {
          method: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
         },
          
          body: formData,

        },
      )
        .then(response => response.text())
        .then(responseData => {
          console.log(responseData.message);
          alert(responseData.message);

          console.log('file',formData)
        });
      // const json = await response.json();
      // console.log(json);
    } catch (error) {
      console.error(error, 'erorr');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>

      {Data ? (
        <Image
          source={{uri: Data ? Data : ''}}
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
