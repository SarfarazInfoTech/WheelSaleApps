import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import {Button, FAB, RadioButton} from 'react-native-paper';
import {ShownMyVehical} from '../services/UrlApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VehiclesDetails = ({navigation, route}) => {
  const [dealerId, setDealerId] = useState('');
  const [Price, setPrice] = useState('');
  const [Condition, setCondition] = useState('');
  const [checked, setChecked] = useState();

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
    soldVehicle,
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

  const UpdatePrice = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sellingPrice: Price,
      }),
    };

    fetch(
      `http://wheelsale.in:80/wheelsale-app-ws/sub-categories/${subCategoryId}/price`,
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

  const UpdateCondition = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        vehicleCondition: checked,
      }),
    };

    fetch(
      `http://wheelsale.in:80/wheelsale-app-ws/sub-categories/${subCategoryId}/condition`,
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        alert(json.message);
        console.log(json);
        setCondition('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SoldVehical = () => {
    fetch(
      `http://wheelsale.in:80/wheelsale-app-ws/sub-categories/${subCategoryId}/sold`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          sellingPrice: 9999,
        }),
      },
    )
      .then(res => res.json())
      .then(json => {
        console.log(json.message);
        alert(json.message);
        navigation.navigate('Sold Vehicle');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const DeleteVehical = () => {
    fetch(
      `http://wheelsale.in:80/wheelsale-app-ws/sub-categories/${subCategoryId}/delete`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          sellingPrice: 9999,
        }),
      },
    )
      .then(res => res.json())
      .then(json => {
        console.log(json.message);
        alert(json.message);
        navigation.navigate('My Vehicle');
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  });

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
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
            <Text
              style={{
                fontSize: 14,
                textTransform: 'capitalize',
                color: 'gray',
              }}>
              {color} Color & {vehicleCondition} Condition
            </Text>

            <View style={styles.flex}>
              <Text
                style={{
                  color: 'darkblue',
                  fontSize: 16,
                  alignSelf: 'flex-end',
                }}>
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
          {subCategoryId ? (
            <>
              <View style={{margin: 10}}>
                {sellingPrice === sellingPrice ? (
                  <View style={{alignItems: 'stretch'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: 'black',
                          marginRight: 10,
                          alignSelf: 'center',
                        }}>
                        Selling Price
                      </Text>
                      {Price.length != 0 ? (
                        <TextInput
                          value={sellingPrice}
                          placeholder="Price"
                          keyboardType="decimal-pad"
                          onChangeText={Price => setPrice(Price)}
                          style={{
                            fontSize: 16,
                            borderColor: 'lightgray',
                            borderWidth: 1,
                            borderRadius: 5,
                            // paddingHorizontal: 15,
                            padding: 0,
                            width: '40%',
                            textAlign: 'center',
                            color: 'gray',
                          }}
                          placeholderTextColor="gray"
                        />
                      ) : (
                        <Text
                          style={{
                            fontSize: 16,
                            borderColor: 'lightgray',
                            // borderWidth: 1,
                            borderRadius: 5,
                            // paddingHorizontal: 15,
                            padding: 6,
                            width: '40%',
                            alignSelf: 'flex-end',
                            textAlign: 'right',
                            color: 'gray',
                          }}>
                          {sellingPrice}
                        </Text>
                      )}

                      {Price <= 0 ? (
                        <Button onPress={() => setPrice('Update')}>
                          <FontAwesome
                            name="pencil"
                            size={18}
                            color="#3d3d72"
                          />
                        </Button>
                      ) : null}
                      {Price.length >= 1 ? (
                        <Button onPress={() => UpdatePrice()}>UPDATE</Button>
                      ) : null}
                    </View>
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

              <View style={{margin: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      marginRight: 10,
                      alignSelf: 'center',
                    }}>
                    Vehicle Condition
                  </Text>

                  {Condition ? (
                    <>
                      <View style={styles.radioBtn}>
                        <RadioButton
                          value="POOR"
                          status={checked === 'POOR' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('POOR')}
                          color="red"
                        />
                        <Text style={[styles.btnTxt, {color: 'red'}]}>
                          Poor{' '}
                        </Text>
                      </View>
                      <View style={styles.radioBtn}>
                        <RadioButton
                          value="AVERAGE"
                          status={
                            checked === 'AVERAGE' ? 'checked' : 'unchecked'
                          }
                          onPress={() => setChecked('AVERAGE')}
                          color="blue"
                        />
                        <Text style={[styles.btnTxt, {color: 'blue'}]}>
                          Average{' '}
                        </Text>
                      </View>
                      <View style={styles.radioBtn}>
                        <RadioButton
                          value="GOOD"
                          status={checked === 'GOOD' ? 'checked' : 'unchecked'}
                          onPress={() => setChecked('GOOD')}
                          color="green"
                        />
                        <Text style={[styles.btnTxt, {color: 'green'}]}>
                          Good
                        </Text>
                      </View>
                    </>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        borderColor: 'lightgray',
                        // borderWidth: 1,
                        borderRadius: 5,
                        // paddingHorizontal: 15,
                        padding: 6,
                        width: '30%',
                        alignSelf: 'flex-end',
                        textAlign: 'right',
                        color: 'gray',
                      }}>
                      {vehicleCondition}
                    </Text>
                  )}
                  {Condition <= 0 ? (
                    <Button onPress={() => setCondition('Update')}>
                      <FontAwesome name="pencil" size={18} color="#3d3d72" />
                    </Button>
                  ) : null}
                  {Condition.length >= 1 ? (
                    <Button onPress={() => UpdateCondition()}>UPDATE</Button>
                  ) : null}
                </View>
              </View>
            </>
          ) : null}
        </View>
      </ScrollView>
      {subCategoryId ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: 0,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#f84848',
              width: '50%',
              paddingVertical: 10,
            }}
            onPress={() =>
              Alert.alert(
                'Are you sure ',
                'You want to delete this vehicle ?',
                [
                  {
                    text: 'No',
                    onPress: () => console.log('No Pressed'),
                    style: 'No',
                  },
                  {
                    text: 'Delete',
                    onPress: () => DeleteVehical(),
                  },
                ],
              )
            }>
            <Text
              style={{
                fontSize: 20,
                width: '100%',
                textAlign: 'center',
                color: 'white',
              }}>
              DELETE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#366666',
              width: '50%',
              paddingVertical: 10,
            }}
            onPress={() =>
              Alert.alert('', 'Confirm you sold this vehicle ?', [
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'No',
                },
                {
                  text: 'YES',
                  onPress: () => SoldVehical(),
                },
              ])
            }>
            <Text
              style={{
                fontSize: 20,
                width: '100%',
                textAlign: 'center',
                color: 'white',
              }}>
              SOLD
            </Text>
          </TouchableOpacity>
        </View>
      ) : soldVehicle === 'Sold' ? null : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            position: 'absolute',
            bottom: 0,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#009193',
              width: '50%',
              paddingVertical: 10,
            }}
            onPress={() => alert('Wait')}>
            <Text
              style={{
                fontSize: 20,
                width: '100%',
                textAlign: 'center',
                color: 'white',
              }}>
              MESSAGE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#3d3d72',
              width: '50%',
              paddingVertical: 10,
            }}
            onPress={() => alert('Wait')}>
            <Text
              style={{
                fontSize: 20,
                width: '100%',
                textAlign: 'center',
                color: 'white',
              }}>
              CALL
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
    padding: 5,
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
  radioBtn: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    alignSelf: 'center',
    color: 'black',
  },
});
export default VehiclesDetails;
