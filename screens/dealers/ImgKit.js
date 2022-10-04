import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
// import {ImagePicker} from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
const options = {
  title: 'my pic app',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};
export default class ImgKit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileName: null,

      //   pic: null,
    };
  }
  myfun = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = response.assets.map(({uri}) => uri);
        let name = response.assets.map(({fileName}) => fileName);
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.assets.map(({uri}) => uri) };
        console.log('pick', source + ' ' + name);

        this.setState({
          file: source,
          fileName: name,

          //   pic: response.data,
        });
      }
    });
  };
  uploadPic = () => {
    // alert('ddf');
    RNFetchBlob.fetch(
      'POST',
      'https://upload.imagekit.io/api/v1/files/upload',
      {
        Authorization:
          'Basic cHJpdmF0ZV9IamgyYU9Cbkxub0pZT05iVVFyRzNQaFdkeWc9Og==',
        'Content-Type': 'multipart/form-data',
        'access-control-allow-origin': '*',
        Accept: 'application/json',
      },
      [
        // element with property `filename` will be transformed into `file` in form data
        // {name: 'image', filename: 'avatar.png', data: this.state.file},
        {
          name: 'avatar-foo',
          filename: 'avatar-foo.png',
          data: JSON.stringify({
            file: this.state.file,
            fileName: this.state.fileName,
            useUniqueFileName: false,
          }),
        },
      ],
    ).then(resp => {
      alert(resp.data);
      console.log(resp.data);
      //   alert('your image uploaded successfully');
      //   this.setState({file: null});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>

        <Image
          source={{uri: this.state.file}}
          style={{width: '100%', height: 300, margin: 10}}
        />

        <TouchableOpacity
          style={{backgroundColor: 'green', margin: 10, padding: 10}}
          onPress={this.myfun}>
          <Text style={{color: '#fff'}}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.uploadPic}>
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
