import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {Card} from 'react-native-paper';

function LoadingIndicatorView() {
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator color="#00b8dc" size="large" />
    </View>
  );
}

const About = () => {
  return (
    <>
      <WebView
        originWhitelist={['*']}
        source={{uri: 'http://wheelsale.in/app/aboutus.html'}}
        renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
      />
    </>
  );
};

export default About;
