import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Api from '../Api/Api';
import { showError, showSuccess } from '../components/FlashMessage';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopName, setShopName] = useState('');
  const [message, setMessage] = useState('');
  const [Error, setError] = useState('');

  const handleSignup = async () => {
    // console.log(`${Api.api}register`);
    if (
      !email &&
      !fullName &&
      !password &&
      !phone &&
      !repeatPassword &&
      !shopAddress &&
      !shopName
    ) {
      showError('All fields are requred!');
    } else if (!email) {
      showError('Email address requred!');
    } else if (!fullName) {
      showError('Full Name requred!');
    } else if (!password) {
      showError('Password requred!');
    } else if (!phone) {
      showError('Phone number requred!');
    } else if (!repeatPassword) {
      showError('Password requred!');
    } else if (!shopAddress) {
      showError('Shop Address requred!');
    } else if (!shopName) {
      showError('Shop Name requred!');
    } else {
      await fetch(`${Api.api}register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          fullName: fullName,
          password: password,
          phone: phone,
          repeatPassword: repeatPassword,
          shopAddress: shopAddress,
          shopName: shopName,
        }),
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.status === 'S') {
            showSuccess(resData.message);
            navigation.navigate('Login');
            console.log(resData);
          } else if (resData.status === 'F') {
            showError(resData.message);
            setMessage(resData.message);
            setError(resData.status);
          } else {
            setMessage(resData.message);
            setError(resData.status);
          }
        });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={[styles.card, {marginVertical: 20}]}>
          <Text style={styles.heading}>Create Account</Text>
          <View style={{marginBottom: 10}}>
            <Text style={styles.lable}>Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Your Name"
              value={fullName}
              onChangeText={value => setFullName(value)}
              maxLength={25}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.lable}>Email</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Your Email"
              value={email}
              onChangeText={value => setEmail(value)}
              maxLength={40}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.lable}>Mobile</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Your Mobile"
              value={phone}
              onChangeText={value => setPhone(value)}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View style={{marginBottom: 10}}>
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
          <View style={{marginBottom: 10}}>
            <Text style={styles.lable}>Re-Password</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Re-Enter Your Password"
              value={repeatPassword}
              onChangeText={value => setRepeatPassword(value)}
              secureTextEntry={true}
              maxLength={8}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.lable}>Shop Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Your Shop Name"
              value={shopName}
              onChangeText={value => setShopName(value)}
              maxLength={30}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.lable}>Shop Address</Text>
            <TextInput
              style={[styles.inputBox, {height: 70}]}
              multiline={true}
              placeholder="Enter Your Shop Address"
              value={shopAddress}
              onChangeText={value => setShopAddress(value)}
              secureTextEntry={true}
              maxLength={80}
            />
          </View>
          <View style={{marginHorizontal: 30, marginTop: 20}}>
            <Button
              style={styles.addButton}
              color="#00b8dc"
              onPress={() => handleSignup()}
              title="Sign Up"
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
                If you already have an account ?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    color: 'orange',
                    fontSize: 14,
                    fontWeight: '500',
                    margin: 5,
                  }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
    marginBottom: 50,
    fontFamily: 'AbrilFatface-Regular',
    color: '#00b8dc',
    fontWeight: '500',
    borderBottomColor: '#00b8dc',
    borderBottomWidth: 4,
    paddingVertical: 20,
  },
  lable: {
    fontSize: 15,
    marginHorizontal: 25,
    marginBottom: 10,
    fontWeight: '500',
  },
  inputBox: {
    marginHorizontal: 25,
    backgroundColor: 'white',
    borderColor: 'darkgray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    marginHorizontal: 25,
    marginTop: 30,
    backgroundColor: 'skyblue',
  },
});

export default Signup;
