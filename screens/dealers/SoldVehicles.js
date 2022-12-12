// import Icon from 'react-native-vector-icons/Ionicons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {SoldMyVehical} from '../services/UrlApi.js';
import {DefImg} from '../data/data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showDefault,
  showNone,
} from '../components/FlashMessage';

const SoldVehicles = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [Error, setError] = useState('');
  const [dealerId, setDealerId] = useState('');

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

  const myVehical = async () => {
    try {
      if (dealerId) {
        await fetch(SoldMyVehical + dealerId, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          // body: JSON.stringify({
          //   page: '1',
          //   limit: '10',
          // }),
        })
          .then(res => res.json())
          .then(resData => {
            if (resData.status === 'S') {
              setError(resData.status);
              setData(resData.subCategories);
            } else if (resData.status === 'F') {
              setError(resData.status);
              setMessage(resData.message);
              navigation.navigate('Dashboard ');
            }
          });
      }
    } catch (err) {
      alert(err);
      console.log(err);
      navigation.navigate('Dashboard ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    myVehical();
  });

  useFocusEffect(
    useCallback(() => {
      myVehical();

      return () => {
        setData('');
        Error === 'F'
          ? showWarning(`${message}`)
          : null;
      };
    }, []),
  );

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <ActivityIndicator
            size="large"
            color="#00b8dc"
            visible={loading}
            textContent={'Loading...'}
            // textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor: '#00b8dc'}}>
          {Error === 'S' ? (
            <View style={{paddingHorizontal: 5, flex: 1}}>
              {Object.keys(Data).map(keys => {
                return (
                  <View
                    style={{marginVertical: 3}}
                    key={Data[keys].subCategoryId}>
                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        // borderWidth: 1,
                        // borderColor: 'lightgray',
                        borderRadius: 5,
                        backgroundColor: 'white',
                      }}>
                      <View style={{}}>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <View
                            style={{
                              flex: 6,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontWeight: '500',
                                  color: 'black',
                                }}>
                                Vehicle No :
                              </Text>
                              <Text
                                style={{
                                  backgroundColor: '#00b8dc',
                                  fontWeight: '500',
                                  color: '#ffffff',
                                  marginLeft: 4,
                                  paddingTop: 1,
                                  paddingBottom: 2,
                                  paddingLeft: 6,
                                  paddingRight: 6,
                                  borderRadius: 2,
                                  fontSize: 12,
                                  textTransform: 'uppercase',
                                }}>
                                {Data[keys].vehicleNumber
                                  .match(/.{1,2}/g)
                                  .join(' ')
                                  .replace(/.(?=.{2,2}$)/g, '')}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flex: 6,
                            }}>
                            <View
                              style={{
                                alignSelf: 'flex-end',
                              }}>
                              <View>
                                <Text style={{fontSize: 11, fontWeight: '500'}}>
                                  Date :{' '}
                                  {Data[keys].modifiedAt
                                    .split(' ')
                                    .join('\n Time : ')}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: 'black',
                          }}>
                          Company :{' '}
                        </Text>
                        <Text
                          style={{textTransform: 'uppercase', color: 'black'}}>
                          {Data[keys].company}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginVertical: 5,
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            color: 'black',
                          }}>
                          Vehicle :{' '}
                        </Text>
                        <Text
                          style={{textTransform: 'uppercase', color: 'black'}}>
                          {Data[keys].categoryName} - (
                          {Data[keys].subCategoryName})
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              color: 'black',
                            }}>
                            Year :{' '}
                          </Text>
                          <Text
                            style={{
                              textTransform: 'uppercase',
                              color: 'black',
                            }}>
                            {Data[keys].modelYear}
                          </Text>
                        </View>

                        <TouchableOpacity
                          style={{
                            borderColor: 'darkgreen',
                            borderRadius: 5,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            navigation.navigate('Vehicles Details', {
                              // subCategoryId: Data[keys].subCategoryId,
                              soldVehicle: 'Sold',
                              salesVehicle: Data[keys].subCategoryId,
                              categoryName: Data[keys].categoryName,
                              subCategoryName: Data[keys].subCategoryName,
                              company: Data[keys].company,
                              modelYear: Data[keys].modelYear,
                              color: Data[keys].color,
                              vehicleCondition: Data[keys].vehicleCondition,
                              vehicleNumber: Data[keys].vehicleNumber,
                              // sellingPrice: Data[keys].sellingPrice,
                              images:
                                Data[keys].images[0].image === null
                                  ? DefImg
                                  : Data[keys].images,
                              // : Data[keys].images[0].image,
                            });
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 4,
                              color: 'darkgreen',
                              fontWeight: '500',
                            }}>
                            View Detail
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: '#3d3d72',
                            fontWeight: '500',
                            fontSize: 16,
                          }}>
                          Sold Price :
                        </Text>
                        <View>
                          <Text
                            style={{
                              color: '#3d3d72',
                              fontWeight: '500',
                              fontSize: 16,
                              alignSelf: 'center',
                            }}>
                            <FontAwesome
                              name="rupee"
                              size={15}
                              color="#3d3d72"
                            />
                            {''} {Data[keys].sellingPrice}/-
                          </Text>
                        </View>
                      </View> */}
                    </View>
                  </View>
                );
              })}
            </View>
          ) : Error === 'F' ? (
            <Text
              style={{
                color: 'black',
                fontWeight: '500',
                fontSize: 18,
                alignSelf: 'center',
                marginTop: 30,
              }}>
              -- {message} --
            </Text>
          ) : null}
        </ScrollView>
      )}
    </>
  );
};

export default SoldVehicles;
