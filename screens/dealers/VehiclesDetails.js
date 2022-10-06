import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';

const VehiclesDetails = ({navigation, route}) => {
  const {
    subCategoryId,
    categoryName,
    subCategoryName,
    company,
    modelYear,
    color,
    vehicleCondition,
    vehicleNumber,
    sellingPrice,
    images,
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <View style={styles.image}>
          <Image
            source={{
              uri: images,
            }}
            style={{width: '100%', height: 260, backgroundColor: 'black'}}
          />
        </View>
      </View>
      <View style={styles.hedBox}>
        <Text style={styles.title}>
          {company} {categoryName} {subCategoryName} ({modelYear})
        </Text>
        <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
          {color} Color & {vehicleCondition} Condation
        </Text>

        <View style={styles.flex}>
          <Text
            style={{color: 'darkblue', fontSize: 16, alignSelf: 'flex-end'}}>
            Vehicle Number
          </Text>

          <View style={styles.vehNo}>
            <Text
              style={{
                color: 'white',
                textTransform: 'uppercase',
                paddingLeft: 3,
              }}>
              {vehicleNumber}
            </Text>
          </View>
        </View>

        <View style={styles.flex}>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.price}>
            <FontAwesome name="rupee" size={18} color="#3d3d72" />{' '}
            {sellingPrice}
            /-
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  flex: {flexDirection: 'row', justifyContent: 'space-between'},
  box: {},
  image: {},
  imageBox: {},
  card: {},
  hedBox: {
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    margin: 5,
  },
  title: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 5,
    textTransform: 'uppercase',
  },
  vehNo: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  price: {
    color: '#3d3d72',
    fontSize: 20,
    paddingVertical: 10,
    fontWeight: '500',
  },
});
export default VehiclesDetails;
