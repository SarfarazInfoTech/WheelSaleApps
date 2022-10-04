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
          <View style={{padding: 10, flex: 1}}>
            {Object.keys(Data).map(keys => {
              return (
                <View style={{marginVertical: 10}} key={Data[keys].subCategoryId}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderWidth: 1,
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
                            <Text style={{fontSize: 13, fontWeight: '500'}}>
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
                              MH 31 BE 8599
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
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text style={{fontSize: 11, fontWeight: '500'}}>
                                13-09-2022,{' '}
                                {/* {Data[keys].modifiedAt} */}
                              </Text>
                              <Text style={{fontSize: 11, fontWeight: '500'}}>
                                {' '}
                                12:04 PM
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
                      <Text style={{fontSize: 13, fontWeight: '500'}}>
                        Company :{' '}
                      </Text>
                      <Text style={{textTransform: 'uppercase'}}>
                        {Data[keys].company}
                      </Text>
                    </View>
                    <View
                      style={{
                        // marginVertical: 5,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                      }}>
                      <Text style={{fontSize: 13, fontWeight: '500'}}>
                        Vehicle :{' '}
                      </Text>
                      <Text style={{textTransform: 'uppercase'}}>
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
                      <Text style={{fontSize: 13, fontWeight: '500'}}>
                        Year :{' '}
                      </Text>
                      <Text style={{textTransform: 'uppercase'}}>
                        {Data[keys].modelYear}
                      </Text>
                    </View>

                    {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 15,
                            paddingRight: 3,
                            fontWeight: 'bold',
                          }}>
                          Pending
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{fontSize: 15, color: '#000', fontWeight: ''}}>
                          Qty: 4
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#3d3d72',
                            fontWeight: '500',
                            fontSize: 15,
                            alignSelf: 'center',
                          }}>
                          <FontAwesome name="rupee" size={16} color="#3d3d72" />
                          {''} {Data[keys].sellingPrice}/-
                        </Text>
                      </View>
                    </View> */}
                    <View style={{paddingTop: 6}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            color: '#fff',
                            backgroundColor: 'green',
                            fontWeight: 'bold',
                            paddingHorizontal: 10,
                            paddingVertical: 3,
                            borderRadius: 20,
                          }}>
                          Sold{' '}
                          <Icon
                            name="checkmark-circle"
                            size={15}
                            color="white"
                          />
                        </Text>
                        <View>
                        <Text
                          style={{
                            color: '#3d3d72',
                            fontWeight: '500',
                            fontSize: 15,
                            alignSelf: 'center',
                          }}>
                          <FontAwesome name="rupee" size={16} color="#3d3d72" />
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
                            alert("please wait")
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
