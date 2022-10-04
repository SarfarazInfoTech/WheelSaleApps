import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import Dashboard from '../dealers/Dashboard';
import Notifications from '../dealers/Notifications';
import Profile from '../dealers/Profile';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({route, tabBarOptions}) => ({
          tabBarActiveTintColor: '#00b8dc',
          tabBarInactiveTintColor: '#898989',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],

          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name == 'Dashboard') {
              iconName = 'ios-speedometer';
            } else if (route.name == 'Notification') {
              iconName = 'notifications';
            } else if (route.name == 'Profile') {
              iconName = 'ios-person-circle';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Notification"
          component={Notifications}
          options={{headerShown: true, tabBarBadge: 3, headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
          headerStyle: {
            backgroundColor: '#00b8dc',
          },}}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
  );
};

export default Tabs;
