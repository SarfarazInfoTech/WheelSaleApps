import {View, Text, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import React from 'react';

const VehiclesDetails = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.imageBox}>
        <View style={styles.image}>
          <Image
            source={{uri: 'https://1.bp.blogspot.com/-FIyT6dA3dTM/Vc987cJK9NI/AAAAAAAAJ3I/t9apIkRJqUI/s1600/nice-bike-image.jpg'}}
            style={{width: '100%', height: 260, backgroundColor: 'black'}}
          />
        </View>
      </View>
      <View style={{padding: 10, borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
        <View style={{backgroundColor: 'gray', borderRadius: 5, alignSelf: 'flex-start', flexDirection: 'row', paddingHorizontal: 5,}}>
          <Ionicons name='shield-checkmark-outline' size={17} color='lightgray' />
        <Text style={{color: 'lightgray',  textTransform: 'uppercase', paddingLeft: 3}}>Verified</Text>

        </View>
        <Text style={{color: 'black', fontWeight: '500', fontSize: 16, marginVertical: 5}}>TVS Jupiter ZX (2001)</Text>
        <Text style={{fontSize: 12}}>2.0 Petrol Vali</Text>
        <Text style={{color: 'black', fontWeight: '500', fontSize: 20, paddingVertical: 10}}>
        <FontAwesome name='rupee' size={22} color='black' /> 20,000/-</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  box: {},
  image: {},
  imageBox: {},
  card: {},
});
export default VehiclesDetails;
