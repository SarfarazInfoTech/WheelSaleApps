import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Search from '../dealers/Search';
import SplashScreen from '../dealers/SplashScreen';
import MainScreen from '../dealers/MainScreen';
import Login from '../dealers/Login';
import Signup from '../dealers/Signup';
import Account from '../dealers/Account';
import Drawers from './Drawers';
import VehiclesDetails from '../dealers/VehiclesDetails';
import About from '../dealers/webpages/About';
import Terms from '../dealers/webpages/Terms';
import Privacy from '../dealers/webpages/Privacy';
import SubscriptionPlan from '../dealers/webpages/SubscriptionPlan';
import Dashboard from '../dealers/Dashboard';
import ImageUpload from '../dealers/ImageUploadFirebase';
import ImageUp from '../dealers/Image';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Login"
      >
        <Stack.Screen
          name="Drawers"
          component={Drawers}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Vehicles Details"
          component={VehiclesDetails}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#833471',
            },
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: true,
            // headerRight: () => (
            //   <TouchableOpacity onPress={() => console.log("first")}>
            //     <Image
            //       style={{backgroundColor: 'white', height: 35, width: 35}}
            //       source={{
            //         uri: "http://wheelsale.in/wheel/Asset1/images/favicon.png",
            //       }}
            //     />
            //   </TouchableOpacity>
            // ),
          }}
        />

        <Stack.Screen
          name="Subscription plans"
          component={SubscriptionPlan}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Privacy policy"
          component={Privacy}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="About us"
          component={About}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Terms and conditions"
          component={Terms}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
