import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, {useEffect, useState} from 'react';
import {Button, FAB, RadioButton} from 'react-native-paper';
import {ShownMyVehical} from '../services/UrlApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showDefault,
  showNone,
} from '../components/FlashMessage';

const VehiclesDetails = ({navigation, route}) => {
  const {height, width} = Dimensions.get('window');
  const [dealerId, setDealerId] = useState('');
  const [Price, setPrice] = useState('');
  const [Condition, setCondition] = useState('');
  const [checked, setChecked] = useState();
  const {selectedIndex, setSelectedIndex} = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [aadharNumber, setAadharNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [soldPrice, setSoldPrice] = useState('');
  const [sales, setSales] = useState({});

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
    salesVehicle,
    vehicleDealer,
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
        saleDetails: {
          dealerId: dealerId,
        },
        sellingPrice: Price,
      }),
    };

    fetch(
      `http://wheelsale.in/wheelsale-app-ws/sub-categories/${subCategoryId}/price`,
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        showSuccess(json.message);
        console.log(json);
        setPrice('');
        navigation.navigate('My Vehicle');
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
        saleDetails: {
          dealerId: dealerId,
        },
        sellingPrice: 9999,
        vehicleCondition: checked,
      }),
    };

    fetch(
      `http://wheelsale.in/wheelsale-app-ws/sub-categories/${subCategoryId}/condition`,
      requestOptions,
    )
      .then(response => response.json())
      .then(json => {
        showSuccess(json.message);
        console.log(json);
        setCondition('');
        navigation.navigate('My Vehicle');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SoldVehical = () => {
    if (name && email && phone && aadharNumber && soldPrice) {
      fetch(
        `http://wheelsale.in/wheelsale-app-ws/sub-categories/${subCategoryId}/sold`,
        {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            buyer: {
              name: name,
              email: email,
              phone: phone,
              aadharNumber: aadharNumber,
              password: password,
            },
            saleDetails: {
              dealerId: dealerId,
              soldPrice: soldPrice,
            },
            sellingPrice: 9999,
          }),
        },
      )
        .then(res => res.json())
        .then(json => {
          showSuccess(json.message);
          // Alert.alert('', json.message);
          navigation.navigate('Sold Vehicle');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Alert.alert('', 'All feilds requried !');
    }
  };

  const DeleteVehical = () => {
    fetch(
      `http://wheelsale.in/wheelsale-app-ws/sub-categories/${subCategoryId}/delete`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          saleDetails: {
            dealerId: dealerId,
          },
          sellingPrice: 99999,
        }),
      },
    )
      .then(res => res.json())
      .then(json => {
        console.log(json);
        showSuccess(json.message);
        navigation.navigate('My Vehicle');
        // navigation.navigate('Dashboard ');
        // navigation.goBack()
      })
      .catch(err => {
        console.log(err);
      });
  };

  const SaleUser = () => {
    fetch(`http://wheelsale.in/wheelsale-app-ws/sales/${salesVehicle}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        setSales(json.user);
        setSoldPrice(json.sale.soldPrice);
        // console.log(json);
        // alert(json.message);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log(subCategoryId);
    getData();
    SaleUser();
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.imageBox}>
            <View style={styles.image}>
              <FlatList
                horizontal
                data={images}
                renderItem={({item, index}) => {
                  // console.log('item', item.image);
                  return (
                    <View key={index} style={{width: width}}>
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        style={styles.image}
                      />
                      <Image
                          source={{
                            uri: 'http://wheelsale.in/app/icon/wheelsale_logo.png',
                          }}
                          style={styles.iconLogo}
                        />

                    </View>
                  );
                }}
              />
              <View
                style={{
                  width: width,
                  height: 30,
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {images.map((item, index) => {
                  // console.log(index);
                  return (
                    <View
                      key={index}
                      style={{
                        backgroundColor:
                          selectedIndex === index ? 'black' : 'white',
                        height: 10,
                        width: 10,
                        margin: 5,
                        borderRadius: 100,
                      }}></View>
                  );
                })}
              </View>
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
                  color: '#00b8dc',
                  fontSize: 16,
                  alignSelf: 'flex-end',
                  fontWeight: '500',
                }}>
                Vehicle Number
              </Text>

              <View style={styles.vehNo}>
                <Text
                  style={{
                    color: 'white',
                    textTransform: 'uppercase',
                    paddingLeft: 3,
                    fontWeight: '500',
                  }}>
                  {vehicleNumber
                    .match(/.{1,2}/g)
                    .join(' ')
                    .replace(/.(?=.{2,2}$)/g, '')}
                </Text>
              </View>
            </View>

            <View style={styles.flex}>
              <Text style={styles.price}>Price</Text>
              <Text style={styles.price}>
                <FontAwesome name="rupee" size={18} color="#3d3d72" />{' '}
                {sellingPrice
                  ? sellingPrice
                  : !sellingPrice
                  ? soldPrice
                  : sellingPrice}
                /-
              </Text>
            </View>
          </View>

          {/* User Dealer Details With Logic */}
          {!subCategoryId ? (
            soldVehicle === 'Sold' ? null : (
              <View
                style={{
                  flex: 1,
                  margin: 5,
                  paddingBottom: 50,
                  borderBottomColor: '#f7f7f7',
                  borderBottomWidth: 12,
                }}>
                <View
                  style={{
                    padding: 5,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    borderColor: '#00b8dc',
                    borderWidth: 1,
                  }}>
                  <View>
                    <Text
                      style={{
                        color: '#00b8dc',
                        fontSize: 17,
                        borderBottomColor: '#00b8dc',
                        borderBottomWidth: 1,
                        alignSelf: 'flex-start',
                        marginBottom: 6,
                        paddingBottom: 3,
                      }}>
                      Dealer Details
                    </Text>
                  </View>
                  {/* <Text> id : {vehicleDealer.dealerId}</Text> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 5,
                      alignItems: 'center',
                    }}>
                    <FontAwesome name="user" size={17} color="#3d3d72" />
                    <Text
                      style={{
                        color: '#3d3d72',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      {' '}
                      Name :{' '}
                    </Text>
                    <Text style={{color: 'black', fontSize: 14}}>
                      {vehicleDealer.fullName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 5,
                      alignItems: 'center',
                    }}>
                    <FontAwesome
                      name="phone-square"
                      size={15}
                      color="#3d3d72"
                    />
                    <Text
                      style={{
                        color: '#3d3d72',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      {' '}
                      Mobile :{' '}
                    </Text>
                    <Text style={{color: 'black', fontSize: 14}}>
                      {vehicleDealer.phone}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 5,
                      alignItems: 'center',
                    }}>
                    <FontAwesome
                      name="envelope-square"
                      size={16}
                      color="#3d3d72"
                    />
                    <Text
                      style={{
                        color: '#3d3d72',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      {' '}
                      Email :{' '}
                    </Text>
                    <Text style={{color: 'black', fontSize: 14}}>
                      {vehicleDealer.email}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 5,
                      alignItems: 'center',
                    }}>
                    <FontAwesome name="map" size={14} color="#3d3d72" />
                    <Text
                      style={{
                        color: '#3d3d72',
                        fontSize: 14,
                        fontWeight: '500',
                      }}>
                      {' '}
                      Shopname :{' '}
                    </Text>
                    <Text style={{color: 'black', fontSize: 14}}>
                      {vehicleDealer.shopName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 5,
                      alignItems: 'center',
                      width: '65%',
                    }}>
                    <FontAwesome
                      name="map-marker"
                      style={{alignSelf: 'baseline'}}
                      size={19}
                      color="#3d3d72"
                    />
                    <Text
                      style={{
                        color: '#3d3d72',
                        fontSize: 14,
                        fontWeight: '500',
                        alignSelf: 'baseline',
                      }}>
                      {' '}
                      Address :{' '}
                    </Text>
                    <Text style={{color: 'black', fontSize: 14}}>
                      {vehicleDealer.shopAddress}
                    </Text>
                  </View>
                </View>
              </View>
            )
          ) : null}

          {subCategoryId ? (
            <>
              <View
                style={{
                  padding: 10,
                  borderBottomColor: '#f7f7f7',
                  borderBottomWidth: 12,
                }}>
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

              <View
                style={{
                  padding: 10,
                  borderBottomColor: '#f7f7f7',
                  borderBottomWidth: 12,
                }}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={{margin: 15}}
            onPress={() => setModalVisible(!modalVisible)}>
            <FontAwesome
              name="times"
              size={20}
              color="white"
              style={styles.textStyle}
            />
          </Pressable>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Buyer's Details</Text>
            <Text style={styles.lable}>Name</Text>
            <TextInput
              value={name}
              placeholder="Name"
              onChangeText={value => setName(value)}
              style={styles.textInput}
              maxLength={40}
              placeholderTextColor="gray"
            />
            <Text style={styles.lable}>Email</Text>
            <TextInput
              value={email}
              placeholder="Email Address"
              onChangeText={value => setEmail(value)}
              style={styles.textInput}
              maxLength={30}
              placeholderTextColor="gray"
            />
            <Text style={styles.lable}>Phone</Text>
            <TextInput
              value={phone}
              placeholder="Phone Number"
              onChangeText={value => setPhone(value)}
              style={styles.textInput}
              maxLength={10}
              keyboardType="decimal-pad"
              placeholderTextColor="gray"
            />
            <Text style={styles.lable}>Aadhaar</Text>
            <TextInput
              value={aadharNumber}
              placeholder="Aadhaar Number"
              onChangeText={value => setAadharNumber(value)}
              style={styles.textInput}
              maxLength={12}
              keyboardType="decimal-pad"
              placeholderTextColor="gray"
            />
            <Text style={styles.lable}>Sold Price</Text>
            <TextInput
              value={soldPrice}
              placeholder="Sold Price"
              onChangeText={value => setSoldPrice(value)}
              style={styles.textInput}
              maxLength={6}
              keyboardType="decimal-pad"
              placeholderTextColor="gray"
            />
            <Button
              onPress={() => SoldVehical()}
              style={{marginTop: 30, borderColor: 'gray', borderWidth: 1}}>
              Submit Customer Details
            </Button>
          </View>
        </View>
      </Modal>
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
                fontWeight: '500',
              }}>
              <FontAwesome name="trash-o" size={25} color="white" /> {'  '}
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
                  onPress: () => setModalVisible(true),
                },
              ])
            }>
            <Text
              style={{
                fontSize: 20,
                width: '100%',
                textAlign: 'center',
                color: 'white',
                fontWeight: '500',
              }}>
              <FontAwesome name="paper-plane" size={22} color="white" /> {'  '}
              SOLD
            </Text>
          </TouchableOpacity>
        </View>
      ) : soldVehicle === 'Sold' ? (
        <>
          <View
            style={{backgroundColor: 'white', padding: 5, paddingBottom: 10}}>
            <View
              style={{
                padding: 5,
                borderRadius: 10,
                backgroundColor: 'white',
                borderColor: '#3d3d72',
                borderWidth: 1,
              }}>
              <View>
                <Text
                  style={{
                    color: '#3d3d72',
                    fontSize: 17,
                    borderBottomColor: '#3d3d72',
                    borderBottomWidth: 1,
                    alignSelf: 'flex-start',
                    marginBottom: 6,
                    paddingBottom: 3,
                  }}>
                  Customer Details
                </Text>
              </View>
              {/* <Text> Sales id : {sales.userId} </Text> */}
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  alignItems: 'center',
                }}>
                <FontAwesome name="user" size={17} color="#3d3d72" />
                <Text
                  style={{color: '#3d3d72', fontSize: 14, fontWeight: '500'}}>
                  {' '}
                  Name :{' '}
                </Text>
                <Text style={{color: 'black', fontSize: 14}}>{sales.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  alignItems: 'center',
                }}>
                <FontAwesome name="envelope-square" size={16} color="#3d3d72" />
                <Text
                  style={{color: '#3d3d72', fontSize: 14, fontWeight: '500'}}>
                  {' '}
                  Email :{' '}
                </Text>
                <Text style={{color: 'black', fontSize: 14}}>
                  {sales.email}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  alignItems: 'center',
                }}>
                <FontAwesome name="phone-square" size={15} color="#3d3d72" />
                <Text
                  style={{color: '#3d3d72', fontSize: 14, fontWeight: '500'}}>
                  {' '}
                  Mobile :{' '}
                </Text>
                <Text style={{color: 'black', fontSize: 14}}>
                  {sales.phone}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  alignItems: 'center',
                }}>
                <FontAwesome name="id-card" size={14} color="#3d3d72" />
                <Text
                  style={{color: '#3d3d72', fontSize: 14, fontWeight: '500'}}>
                  {' '}
                  Aadhaar :{' '}
                </Text>
                <Text style={{color: 'black', fontSize: 14}}>
                  {sales.aadharNumber
                    ? sales.aadharNumber.match(/.{1,4}/g).join(' ')
                    : ''}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  alignItems: 'center',
                }}>
                <FontAwesome name="clock-o" size={14} color="#3d3d72" />
                <Text
                  style={{color: '#3d3d72', fontSize: 14, fontWeight: '500'}}>
                  {' '}
                  Purchase :{' '}
                </Text>
                <Text style={{color: 'black', fontSize: 14}}>
                  Date -{' '}
                  {sales.createdAt
                    ? sales.createdAt
                        .replace(/-/g, '/')
                        .split('T')
                        .join(', Time - ')
                        .split('.000+00:00')
                        .join(' ')
                    : ''}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#3d3d72',
              width: '100%',
              paddingVertical: 10,
            }}
            onPress={() =>
              Linking.canOpenURL(`tel:+91${sales.phone}`).then(supported => {
                if (!supported) {
                  return Linking.openURL(`tel:+91${sales.phone}`);
                } else {
                  console.log('Not Working');
                }
              })
            }>
            <Text
              style={{
                fontSize: 20,
                width: '100%',
                textAlign: 'center',
                color: 'white',
                alignSelf: 'center',
                fontWeight: '500',
              }}>
              {'  '}CALL
              {'  '}
              <FontAwesome
                style={{padding: 50}}
                name="phone-square"
                size={25}
                color="white"
              />
              {'  '}
              {sales.phone}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              position: 'absolute',
              bottom: 0,
            }}>
            {/* <TouchableOpacity
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
          </TouchableOpacity> */}
            <TouchableOpacity
              style={{
                backgroundColor: '#3d3d72',
                width: '100%',
                paddingVertical: 10,
              }}
              onPress={() =>
                Linking.canOpenURL(`tel:+91${vehicleDealer.phone}`).then(
                  supported => {
                    if (!supported) {
                      return Linking.openURL(`tel:+91${vehicleDealer.phone}`);
                    } else {
                      console.log('Not Working');
                    }
                  },
                )
              }>
              <Text
                style={{
                  fontSize: 20,
                  width: '100%',
                  textAlign: 'center',
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '500',
                }}>
                {'  '}CALL
                {'  '}
                <FontAwesome
                  style={{padding: 50}}
                  name="phone-square"
                  size={25}
                  color="white"
                />
                {'  '}
                {vehicleDealer.phone}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  flex: {flexDirection: 'row', justifyContent: 'space-between'},
  image: {
    width: '100%',
    height: 260,
    backgroundColor: 'black',
    resizeMode: 'contain',
  },
  iconLogo: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 5,
    right: 5,
  },
  hedBox: {
    padding: 5,
    borderBottomColor: '#f7f7f7',
    borderBottomWidth: 12,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  title: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 5,
    textTransform: 'uppercase',
  },
  vehNo: {
    backgroundColor: '#00b8dc',
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
  lable: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  textInput: {
    borderColor: 'darkgray',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingLeft: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00b8dc',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    textAlign: 'right',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    color: '#00b8dc',
    fontWeight: '500',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
});

export default VehiclesDetails;
