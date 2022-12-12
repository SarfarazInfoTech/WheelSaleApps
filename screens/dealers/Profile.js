import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  BackHandler 
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {profilePic} from '../data/data.json';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const accountdetails = [
    {
      id: '1',
      icon: 'person-outline',
      name: 'Profile',
      routes: 'Account',
      size: 35,
    },
    {
      id: '2',
      icon: 'pricetags-outline',
      name: 'Subscription plans',
      routes: 'Subscription plans',
      size: 35,
    },
    {
      id: '3',
      icon: 'md-shield-checkmark-outline',
      name: 'Terms & conditions',
      routes: 'Terms and conditions',
      size: 35,
    },
    {
      id: '4',
      icon: 'lock-closed-outline',
      name: 'Privacy policy',
      routes: 'Privacy policy',
      size: 35,
    },
    {
      id: '5',
      icon: 'md-information-circle-outline',
      name: 'About us',
      routes: 'About us',
      size: 35,
    },
    // {
    //   id: '6',
    //   icon: 'power-outline',
    //   name: 'Logout',
    //   routes: 'Logout',
    //   size: 35,
    // },
  ];

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          // console.log(user[0].dealerId);
          setShopName(user[0].shopName);
          setFullName(user[0].fullName);
          setPhone(user[0].phone);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async () => {
    try {
      await Alert.alert('Logout?', 'Are you sure you want to Logout?', [
        {
          text: 'NO',
          onPress: () => console.log('Logout No'),
          style: 'NO',
        },
        {
          text: 'YES',
          onPress: () => {
           AsyncStorage.clear(), navigation.navigate('Login'), console.log('Logout'),
           BackHandler.exitApp();
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <ActivityIndicator
            size="large"
            color="#00b8dc"
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <View style={{backgroundColor: 'white', flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: 'white',
                paddingBottom: 25,
                marginBottom: 2,
                borderBottomColor: '#f7f7f7',
                borderBottomWidth: 12,
              }}>
              <Avatar.Image
                style={{
                  alignSelf: 'center',
                  margin: 10,
                  backgroundColor: 'white',
                }}
                source={{
                  // uri: Data.image ? Data.image : profilePic,
                  uri: profilePic,
                }}
                size={130}
              />
              <Text
                style={{
                  fontWeight: '700',
                  alignSelf: 'center',
                  fontSize: 18,
                  color: '#3d3d72',
                }}>
                {fullName}
              </Text>

              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  color: 'black',
                }}>
                {shopName}
              </Text>

              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  color: 'gray',
                  paddingVertical: 5,
                }}>
                {phone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                backgroundColor: 'white',
                marginTop: 5,
              }}>
              <Text style={{color: 'darkgray', alignSelf: 'center'}}>
                This is a business account.
              </Text>
              <Ionicons
                name="alert-circle-outline"
                size={25}
                color="darkgray"
                style={{alignSelf: 'flex-end'}}
              />
            </View>
            {accountdetails.map(({id, icon, name, routes, size}) => (
              <TouchableOpacity
                key={id}
                onPress={() => navigation.navigate(routes)}
                style={{borderBottomColor: 'white', borderBottomWidth: 2}}>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    marginBottom: 2,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: 'white',
                  }}>
                  <Ionicons
                    name={icon}
                    size={30}
                    color="#3d3d72"
                    style={{alignSelf: 'center'}}
                  />
                  <Text
                    style={{
                      fontSize: 17,
                      marginHorizontal: 15,
                      alignSelf: 'center',
                      color: '#3d3d72',
                    }}>
                    {name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => removeData()}
              style={{borderBottomColor: 'white', borderBottomWidth: 2}}>
              <View
                style={{
                  flexDirection: 'row',
                  display: 'flex',
                  marginBottom: 2,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: 'white',
                }}>
                <Ionicons
                  name="power-outline"
                  size={30}
                  color="#3d3d72"
                  style={{alignSelf: 'center'}}
                />
                <Text
                  style={{
                    fontSize: 17,
                    marginHorizontal: 15,
                    alignSelf: 'center',
                    color: '#3d3d72',
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    flex: 1,
  },
});
export default Profile;
