import {View, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('Drawers');
        } else {
          navigation.navigate('Login');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            // alignSelf: 'center',
            // marginTop: 30,
            backgroundColor: '#00b8dc'
          }}>
          <ActivityIndicator
            size="large"
            color="white"
            visible={loading}
            textContent={'Loading...'}
            textStyle={{}}
          />
        </View>
      ) : (
        null
      )}
    </>
  );
};

export default SplashScreen;
