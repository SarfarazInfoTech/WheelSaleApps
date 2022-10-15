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

const SubscriptionPlan = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{uri: 'http://wheelsale.in/app/plan.html'}}
        renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
      />
    </View>
  );
};

export default SubscriptionPlan;
