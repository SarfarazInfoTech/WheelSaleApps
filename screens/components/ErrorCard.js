import {View, Text, Button} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';

const ErrorCard = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../assets/images/error.png')}
        style={{width: 100, height: 100}}
      />
      <Text style={{fontSize: 18, color: 'black'}}>No connection</Text>
      <Text
        style={{
          fontSize: 14,
          marginHorizontal: 40,
          marginBottom: 30,
          textAlign: 'center',
          color: 'grey',
        }}>
        Please check your internet connectivity and try again.
      </Text>
      <Button color="skyblue" title="Retry" onPress={() => navigation.navigate('Dashboard ')} />
    </View>
  );
};

export default ErrorCard;
