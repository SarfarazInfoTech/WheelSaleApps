import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

const MainScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text
          style={{
            marginVertical: 15,
            color: 'black',
            fontSize: 30,
            alignSelf: 'center',
            fontWeight: '500',
          }}>
          WHEELSALE
        </Text>
        <Image
          source={{uri: 'http://wheelsale.in/app/icon/wheelsale_logo.png'}}
          style={{
            height: 112,
            width: 110,
            borderRadius: 100,
            backgroundColor: '#00b8dc',
            alignSelf: 'center',
            borderWidth: 5,
            borderColor: '#00b8dc',
            // bottom: 50,
          }}
        />
        <Text
          style={{
            paddingBottom: 5,
            color: '#3d3d72',
            fontSize: 16,
            marginLeft: 20,
            fontWeight: '500'
          }}>
          Existing User
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View
            style={{
              backgroundColor: '#00b8dc', // 00b8dc
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
                margin: 10,
                fontWeight: '500',
                textTransform: 'uppercase',
              }}>
              Login
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            paddingBottom: 5,
            color: '#3d3d72',
            fontSize: 16,
            marginTop: 20,
            marginLeft: 20,
            fontWeight: '500'
          }}>
          New Dealer
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <View
            style={{
              backgroundColor: '#00b8dc', // 00b8dc  3d3d72
              borderRadius: 5,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textTransform: 'uppercase',
                fontWeight: '500',
                textAlign: 'center',
                margin: 10,
              }}>
              Create Account
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00b8dc',
    paddingHorizontal: 5,
  },
  card: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    // paddingBottom: 40,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: 400,
  },
});

export default MainScreen;
