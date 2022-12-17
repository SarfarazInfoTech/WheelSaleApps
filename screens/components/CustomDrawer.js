import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Share,
  Alert,
  BackHandler 
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CustomDrawer = props => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          '*Find any Two Wheeler in second hand dealing market, according to your customers requirement search, year of model and price or a particular vehicle. You can see contact details of Dealers like contact no, shopname, address & you can contact any dealer who is registered with WheelSale App. In case you never register to check the plans and kindly register with WheelSale App -*  http://wheelsale.in/en/download.html',
        url: 'http://wheelsale.in/en/download.html',
        title: 'WheelSale Dealer App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          console.log('shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error) {
      alert(error.message);
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
           AsyncStorage.clear(), console.log('Logout'),
           BackHandler.exitApp();
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#00b8dc'}}>
        <ImageBackground source={{}} style={{padding: 20}}>
          <Image
            source={require('../assets/images/user-profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontFamily: 'Roboto-Medium',
              marginBottom: 5,
            }}>
            WheelSale
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: '#3d3d72',
                fontWeight: '500',
                // fontFamily: 'Roboto-Regular',
                marginRight: 5,
              }}>
              Dealer's App
            </Text>
            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={onShare} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Share
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeData()} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
