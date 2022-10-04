import React, {useEffect, useState} from 'react';
import {View, Image, Button, Platform, PermissionsAndroid} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {encode} from 'base-64';
import DocumentPicker from 'react-native-document-picker';
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'

const SERVER_URL = 'https://upload.imagekit.io';

const ImageUpload = () => {
  const [photo, setPhoto] = useState();
  const [Dou, setDou] = useState();
  const [CameraPhoto, setCameraPhoto] = useState();

  const createFormData = (
    photo,
    body = {},
  ) => {
    const data = new FormData();
    // console.log('zzzzzzzz', photo);
    data.append('photo', {
      file: photo.assets[0].uri,
      fileName: photo.assets[0].fileName,
      fileType: photo.assets[0].type,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  const doc = async () => {
    const responce = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
      copyTo: 'cachesDirectory',
    });

    setDou(responce);
    console.log(responce)
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true, mediaType: 'photo', includeBase64: true}, (response) => {
      // console.log('Handle Image ', response.assets);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = async () => {
    await fetch(`https://upload.imagekit.io/api/v1/files/upload`, {
      method: 'POST',
      
      body: createFormData(photo, {
        file: photo.assets[0].uri,
        fileName: photo.assets[0].fileName,
        fileType: photo.assets[0].type,
        useUniqueFileName: false,
      }),
      headers: {
        Authorization:
          'Basic cHJpdmF0ZV9IamgyYU9Cbkxub0pZT05iVVFyRzNQaFdkeWc9Og==',
        'Content-Type': 'multipart/form-data',
        'access-control-allow-origin': '*',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
      console.log('result hai', result);
      console.log(' result uri hai', result.assets[0].uri);
    }
  };

  const uploadImageOnServer = async imageData => {
    try {
      let response = await fetch(
        'https://upload.imagekit.io/api/v1/files/upload',
        {
          method: 'POST',
          body: imageData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization:
              'Basic ' +
              encode(
                'cHJpdmF0ZV9IamgyYU9Cbkxub0pZT05iVVFyRzNQaFdkeWc9Og==' +
                  ':' +
                  '',
              ),
          },
        },
      );
      response = response.json();
      return response;
    } catch (error) {
      console.log('err', error);
    }
  };

  const onSaveImage = async () => {
    const formData = new FormData();
    formData.append('image', {
      file: CameraPhoto,
      fileName: 'image.jpg',
      type: 'image/jpeg',
    });
    const res = await uploadImageOnServer(formData);
    console.log('res hai', res);
  };

  useEffect(() => {
    // onSaveImage();
  }, []);


 const OnError = () => {
   
 }

 const OnSuccess = () => {

 }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

<IKContext publicKey="public_+Oqkm59GrogcAEECOWsGR6od3yc=" authenticationEndpoint="http://localhost:8080/auth">
  {/* // Simple file upload and response handling */}
  {/* <IKUpload
    onError={onError}
    onSuccess={onSuccess}
  /> */}

  {/* // Passing different upload API options */}
  <IKUpload
    fileName="file-name.jpg"
    tags={["sample-tag1", "sample-tag2"]}
    customCoordinates={"10,10,10,10"}
    isPrivateFile={false}
    useUniqueFileName={true}
    responseFields={["tags"]}
    folder={"/sample-folder"}
    OnError={OnError} 
    OnSuccess={OnSuccess}
  />
</IKContext>
      {photo ? (
        <>
          <Image source={{uri: photo.assets[0].uri}} style={{width: 300, height: 300}} />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      ) : null}
      <Image source={{uri: CameraPhoto}} style={{width: 100, height: 100}} />
      {/* <Button title="Choose Camera" color={'gray'} onPress={openCamera} /> */}
      <Button title="doc" color={'gray'} onPress={doc} />
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      {/* <Button title="Save" color={'black'} onPress={onSaveImage} /> */}
    </View>
  );
};

export default ImageUpload;
