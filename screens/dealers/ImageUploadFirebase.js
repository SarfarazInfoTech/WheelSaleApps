import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

const ImageUploadFirebase = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [ImageData, setImageData] = useState(null);
  const [fullImagePath, setfullImagePath] = useState('');
  const [imgDownloadUrl, setimgDownloadUrl] = useState('');

  const picImage = async () => {
    try {
      const responce = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      console.log('PicImage', responce);
      setImageData(responce);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    setLoading(true);
    try {
      const responce = storage().ref(`/Wheelsale/Images/${ImageData.name}`);
      const put = await responce.putFile(ImageData.fileCopyUri);
      setfullImagePath(put.metadata.fullPath);
      const url = await responce.getDownloadURL();
      setimgDownloadUrl(url);
      console.log("Image Uploded : url - ", url )
    } catch (err) {
      console.log('upload', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.lable}> Image</Text>
              <View style={{marginHorizontal: 20}}>
                {!ImageData ? 
                <Button title="Add Photo" onPress={() => picImage()} /> : 
                <Button title="Upload Photo" color={'green'} onPress={() => uploadImage()} />
                }
              </View>
              <View
                style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                <View style={styles.imageBox}>
                  <TouchableOpacity onPress={() => picImage()}>
                    {ImageData ? (
                      <Image
                        source={{uri: ImageData.uri}}
                        style={{width: '100%', height: '100%'}}
                      />
                    ) : null}
                  </TouchableOpacity>
                </View>
                <View style={styles.imageBox}></View>
              </View>
    </View>
  )
}

export default ImageUploadFirebase