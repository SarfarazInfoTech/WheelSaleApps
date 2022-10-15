import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SoldMyVehical} from '../services/UrlApi.js';
import {DefImg} from '../data/data.json';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

const SoldVehicles = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [Error, setError] = useState('');

  const myVehical = async () => {
    try {
      await fetch(`${SoldMyVehical}`, {
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
            // alert(resData.message);
            setMessage(resData.message);
            setData(resData.subCategories);
          } else {
            alert(resData.message);
            setMessage(resData.message);
            setError(resData.status);
          }
        });
    } catch (err) {
      alert(err);
      console.log(err);
      navigation.navigate('Dashboard ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    myVehical();
  }, []);

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
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {/* <Text>{message}</Text> */}
          {/* <Text>{Error}</Text> */}
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
                      borderColor: '#aaa',
                      borderRadius: 10,
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
                                backgroundColor: '#ff9800',
                                color: '#ffffff',
                                marginLeft: 4,
                                paddingTop: 1,
                                paddingBottom: 2,
                                paddingLeft: 6,
                                paddingRight: 6,
                                borderRadius: 4,
                                fontSize: 12,
                                textTransform: 'uppercase',
                              }}>
                              {Data[keys].vehicleNumber}
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
                        // marginVertical: 5,
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
                        // marginVertical: 5,
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
                        // marginVertical: 5,
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
                        style={{textTransform: 'uppercase', color: 'black'}}>
                        {Data[keys].modelYear}
                      </Text>
                    </View>

                    <View style={{paddingTop: 0}}>
                      <View
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
                          {/* <Icon
                            name="checkmark-circle"
                            size={15}
                            color="white"
                          /> */}
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
                        <TouchableOpacity
                          style={{
                            // paddingHorizontal: 4,
                            borderColor: '#00b8dc',
                            borderRadius: 5,
                            borderWidth: 1,
                          }}
                          onPress={() => {
                            // navigation.navigate('View Detail');
                            alert('please wait');
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              padding: 4,
                              color: '#00b8dc',
                              fontWeight: '500',
                            }}>
                            View Detail
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default SoldVehicles;
