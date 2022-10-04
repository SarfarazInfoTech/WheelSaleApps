import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddVehicles from '../dealers/AddVehicles';
import ShowVehicles from '../dealers/ShowVehicles';
import MarketVehicles from '../dealers/MarketVehicles';
import SoldVehicles from '../dealers/SoldVehicles';
import Subscription from '../dealers/Subscription';
import Support from '../dealers/Support';
import Notifications from '../dealers/Notifications';
import Profile from '../dealers/Profile';
import Tabs from './Tabs.js';
import {TouchableOpacity} from 'react-native';

const Drawer = createDrawerNavigator();

const Drawers = ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#00b8dc',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Dashboard "
        component={Tabs}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Ionicons name="speedometer-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Add Vehicle"
        component={AddVehicles}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="ios-duplicate-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Vehicle"
        component={ShowVehicles}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="bicycle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Market Vehicle"
        component={MarketVehicles}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 12}}
              onPress={() => navigation.navigate('Search')}>
              <Ionicons name="search" color="white" size={22} />
            </TouchableOpacity>
          ),
          drawerIcon: ({color}) => (
            <Ionicons name="bicycle-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sold Vehicle"
        component={SoldVehicles}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="ios-checkmark-done" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="ios-pricetags-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="md-headset-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: true,
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="notifications-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Drawers;
