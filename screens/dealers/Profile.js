import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {
  documentIcon,
  uploadIcon,
  academicIcon,
  careerIcon,
  logOutIcon,
  profileIcon,
  profilePic,
  logout,
} from '../data/data.json';
// import firestore from '@react-native-firebase/firestore';
// import Auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    {
      id: '6',
      icon: 'power-outline',
      name: 'Logout',
      routes: 'Logout',
      size: 35,
    },
  ];

  const [loading, setLoading] = useState(false);
  // const [Data, setData] = useState('');
  // useEffect(() => {
  //   const getDatabase = async () => {
  //     try {
  //       const user = await Auth().currentUser.email;
  //       const data = await firestore().collection('users').doc(`${user}`).get();
  //       setData(data._data);
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getDatabase();
  // }, []);

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
                {/* {Data.name} */}
                Sarfaraz Khan
              </Text>

              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  color: 'black',
                }}>
                Auto Deal wala
              </Text>

              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  color: 'gray',
                  paddingVertical: 5,
                }}>
                userDealwala@1234
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
