import {View, Text, Image, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('Drawers');
          console.log('Login');
          // setLoading(false);
        } else {
          console.log('Not Login');
          navigation.navigate('Login');
          // navigation.navigate('MainScreen');
          // setLoading(false)
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(function () {
      getData();
    }, 6000);
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#00b8dc',
          }}>
          <Image
            source={{uri: 'http://wheelsale.in/app/icon/wheelsale_logo.png'}}
            style={{
              height: 215,
              width: 210,
              borderRadius: 100,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              marginVertical: 15,
              color: 'white',
              fontSize: 30,
              alignSelf: 'center',
              fontWeight: '500',
            }}>
            WHEELSALE
          </Text>
        </View>
      ) : null}
    </>
  );
};

export default SplashScreen;
