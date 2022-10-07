import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../dealers/Search';
import SplashScreen from '../dealers/SplashScreen';
import MainScreen from '../dealers/MainScreen';
import Login from '../dealers/Login';
import Signup from '../dealers/Signup';
import Subscription from '../dealers/Subscription';
import Account from '../dealers/Account';
import Tabs from './Tabs';
import AddVehicles from '../dealers/AddVehicles';
import ShowVehicles from '../dealers/ShowVehicles';
import MarketVehicles from '../dealers/MarketVehicles';
import Support from '../dealers/Support';
import Dashboard from '../dealers/Dashboard';
import SoldVehicles from '../dealers/SoldVehicles';
import ImageUpload from '../dealers/ImageUpload';
import ImgKit from '../dealers/ImgKit';
import ImageUp from '../dealers/Image';
import PageLoad from '../dealers/PageLoad';
import Drawers from './Drawers';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import VehiclesDetails from '../dealers/VehiclesDetails';
import About from '../dealers/webpages/About';
import Terms from '../dealers/webpages/Terms';
import Supportus from '../dealers/webpages/Support';
import Privacy from '../dealers/webpages/Privacy';
import SubscriptionPlan from '../dealers/webpages/SubscriptionPlan';
// import ImageUploadFirebase from '../dealers/ImageUploadFirebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      // initialRouteName="Home"
      >
        <Stack.Screen
          name="ImageUpload"
          component={ImageUp}
          options={{headerShown: true}}
        />

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

        {/* <Stack.Screen
          name="Notification"
          component={Notifications}
          options={{headerShown: false}}
        /> */}

        {/* <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity onPress={() => alert('Please click EDIT PROFILE button.')}>
                <Image style={{backgroundColor: 'white',height: 40,width: 40,left: 10,}} source={{uri: profileEditIcon,}} />
              </TouchableOpacity>
            ),
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
