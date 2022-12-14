import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import Routes from './screens/navigation/Routes.js';
import Connection from './screens/netInfo/Connection.js';
import FlashMessage from 'react-native-flash-message';
import InAppUpdate from './InAppUpdate.js';

const App = () => {
  return (
    <>
      <StatusBar style="auto" backgroundColor={'#00b8dc'} />
      <Routes />
      <Connection />
      <InAppUpdate />
      <FlashMessage position="top" />
    </>
  );
};

export default App;
