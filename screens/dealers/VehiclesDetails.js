import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import {Button, FAB} from 'react-native-paper';
import {ShownMyVehical} from '../services/UrlApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VehiclesDetails = ({navigation, route}) => {
  const [dealerId, setDealerId] = useState('');
  const [Price, setPrice] = useState('');
  const [Condition, setCondition] = useState('');
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

  const getData = async () => {
    try {
      await AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setDealerId(user[0].dealerId);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateVehical = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sellingPrice: Price,
        vehicleCondition: Condition,
      }),
    };

    fetch(
      `http://wheelsale.in:80/wheelsale-app-ws/sub-categories/${subCategoryId}/update`,
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        alert(json.message);
        console.log(json);
        setPrice('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SoldVehical = () => {
    fetch(`http://wheelsale.in:80/wheelsale-app-ws/sub-categories/${subCategoryId}/sold`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sellingPrice: 9999,
        // vehicleCondition: Condition,
      }),
    }).then(res => res.json()).then(json => {
      console.log(json.message)
      // alert("Your Vehical is Sold.")
      alert(json.message)
    }).catch( err => {
      console.log(err)
    }
    )
  }

  useEffect(() => {
    getData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <View style={styles.image}>
          <Image
            source={{
              uri: images,
            }}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.hedBox}>
        <Text style={styles.title}>
          {company} {categoryName} {subCategoryName} ({modelYear})
        </Text>
        <Text style={{fontSize: 14, textTransform: 'capitalize'}}>
          {color} Color & {vehicleCondition} Condition
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

      <View style={{}}>
        {sellingPrice === sellingPrice ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 18,
              }}>
              Selling Price :
            </Text>
            {Price.length != 0 ? (
              <TextInput
                value={sellingPrice}
                placeholder="Selling Price"
                onChangeText={Price => setPrice(Price)}
                style={{
                  fontSize: 18,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  marginBottom: 0,
                  paddingBottom: 0,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
                placeholderTextColor="gray"
              />
            ) : (
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 18,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                }}>
                {sellingPrice}
              </Text>
            )}

            {Price <= 0 ? (
              <Button onPress={() => setPrice('Update')}>
                <FontAwesome name="pencil" size={18} color="#3d3d72" />
              </Button>
            ) : null}
            {Price.length >= 1 ? (
              <Button onPress={() => UpdateVehical()}>SAVE</Button>
            ) : null}
          </View>
        ) : Price === 'Update' ? (
          <TextInput
            value={sellingPrice}
            placeholder="Selling Price"
            onChangeText={Price => setPrice(Price)}
            style={styles.textInput}
            placeholderTextColor="gray"
          />
        ) : null}
      </View>
      <Text>Vehicle Condition</Text>

      <Button style={styles.fab} onPress={() => SoldVehical()}>
        {/* <FontAwesome name="edit" size={18} color="#3d3d72" /> */}
        <Text style={{color: '#3d3d72'}}>Sold</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  flex: {flexDirection: 'row', justifyContent: 'space-between'},
  box: {},
  image: {
    width: '100%',
    height: 260,
    backgroundColor: 'black',
    resizeMode: 'contain',
  },
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
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 80,
    zIndex: 5,
    borderColor: '#3d3d72',
    borderWidth: 1,
    borderRadius: 5,
  },
});
export default VehiclesDetails;
