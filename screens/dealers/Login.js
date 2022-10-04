import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Api from '../Api/Api';
import { showError, showSuccess } from '../components/FlashMessage';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [Error, setError] = useState('');

  const handleLogin = async () => {
    if (!phone && !password) {
      // console.log(`${Api.api}login`);
      showError('Username & Password are requred!')
    } else {
      await fetch(`${Api.api}login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: phone,
          password: password,
        }),
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.status === 'S') {
            showSuccess(resData.message)
            navigation.navigate(
              'Drawers',
              // {dealers: resData.dealers},
            );
            console.log(resData.dealers);
            // alert(resData.dealers);
            // setMessage(resData.dealers)
          } else {
            showError(resData.message);
            setMessage(resData.message);
            setError(resData.status);
            setPhone('');
            setPassword('');
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Dealer Login</Text>
        <View style={{marginVertical: 15}}>
          <Text style={styles.lable}>Phone Number</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Phone Number"
            value={phone}
            onChangeText={value => setPhone(value)}
            maxLength={10}
            keyboardType="numeric"
          />
        </View>
        <View style={{marginVertical: 15}}>
          <Text style={styles.lable}>Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
            maxLength={8}
          />
        </View>
        <View style={{marginHorizontal: 30, marginTop: 20}}>
          <Button
            style={styles.addButton}
            color="#00b8dc"
            onPress={() => handleLogin()}
            title="Login"
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'gray',
                fontSize: 13,
                fontWeight: '500',
                margin: 5,
              }}>
              New User ?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 14,
                  fontWeight: '500',
                  margin: 5,
                }}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    borderRadius: 15,
    borderColor: '#00b8dc',
    borderWidth: 2,
    paddingBottom: 40,
    backgroundColor: 'white',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'AbrilFatface-Regular',
    marginBottom: 50,
    color: '#00b8dc',
    fontWeight: '500',
    borderBottomColor: '#00b8dc',
    borderBottomWidth: 4,
    paddingVertical: 20,
  },
  lable: {fontSize: 15, marginHorizontal: 25, marginBottom: 10},
  inputBox: {
    marginHorizontal: 25,
    backgroundColor: 'lightgray',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addButton: {
    marginHorizontal: 25,
    marginTop: 30,
    backgroundColor: 'skyblue',
  },
});

export default Login;
