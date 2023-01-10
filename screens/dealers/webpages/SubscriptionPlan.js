import {View, ActivityIndicator} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

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
        source={{uri: 'http://wheelsale.in/en/#pricing'}}
        renderLoading={LoadingIndicatorView}
        startInLoadingState={true}
      />
    </View>
  );
};

export default SubscriptionPlan;
