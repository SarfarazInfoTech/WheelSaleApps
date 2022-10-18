import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ShownMyVehical} from '../services/UrlApi.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DefImg} from '../data/data.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowVehicles = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [Error, setError] = useState('');
  const [dealerId, setDealerId] = useState('');

  const myVehical = async () => {
    try {
      // console.log(ShownMyVehical + dealerId);
      await fetch(ShownMyVehical + dealerId, {
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
          } else if (resData.status === 'F') {
            // alert(resData.message);
            // navigation.navigate('Dashboard ');
            setMessage(resData.message);
            setError(resData.status);
            // console.log(resData.status);
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

  const getData = async () => {
    try {
      await AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setDealerId(user[0].dealerId);
        } else if (value === '') {
          navigation.navigate('Dashboard ');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    myVehical();
  });

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
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          {Error === '' ? (
            <View style={styles.container}>
              {Object.keys(Data).map(keys => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Vehicles Details', {
                        subCategoryId: Data[keys].subCategoryId,
                        categoryName: Data[keys].categoryName,
                        subCategoryName: Data[keys].subCategoryName,
                        company: Data[keys].company,
                        modelYear: Data[keys].modelYear,
                        color: Data[keys].color,
                        vehicleCondition: Data[keys].vehicleCondition,
                        vehicleNumber: Data[keys].vehicleNumber,
                        sellingPrice: Data[keys].sellingPrice,
                        images:
                          Data[keys].images[0].image === null
                            ? DefImg
                            : Data[keys].images[0].image,
                      });
                    }}
                    key={Data[keys].subCategoryId}>
                    <View style={styles.cardItem}>
                      <View style={styles.card}>
                        <Image
                          source={{
                            uri:
                              Data[keys].images[0].image === null
                                ? DefImg
                                : Data[keys].images[0].image,
                          }}
                          style={styles.cardImg}
                        />
                        {/* {Data[keys].images.map((image, imageId) => {
                        // console.log(image.image);
                        //  console.log(Object.keys(Data[keys].images[0].image));
                        //  console.log(Data[keys].images[0].image);
                        return (
                          <Image
                            key={imageId}
                            source={{
                              uri: Data[keys].images[0].image === null ? DefImg : Data[keys].images[0].image,
                            }}
                            style={styles.cardImg}
                          />
                        );
                      })} */}

                        <Image
                          source={{
                            uri: 'http://wheelsale.in/wheel/Asset1/images/favicon.png',
                          }}
                          style={styles.iconLogo}
                        />
                        <View style={{margin: 5}}>
                          <Text style={styles.vehName} numberOfLines={2}>
                            {Data[keys].company} {Data[keys].categoryName} -{' '}
                            {Data[keys].modelYear} ({Data[keys].subCategoryName}
                            )
                          </Text>
                          <Text style={styles.vehPrice}>
                            <FontAwesome
                              name="rupee"
                              size={16}
                              color="#3d3d72"
                            />
                            {''} {Data[keys].sellingPrice}/-
                          </Text>

                          {/* <Text style={styles.shopName} numberOfLines={1}>
                        <FontAwesome
                          name="map-marker"
                          size={16}
                          color="black"
                        />{' '}
                        Taj Auto Delars Sadar
                      </Text> */}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // margin: 10,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'lightgray',
    borderWidth: 0.3,
    backgroundColor: 'white',
    elevation: 5,
  },
  cardItem: {
    shadowColor: 'lightgray',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 165,
    marginVertical: 5,
  },
  cardImg: {
    width: '100%',
    height: 150,
  },
  iconLogo: {
    width: 25,
    height: 25,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 120,
    right: 5,
  },
  shopName: {},
  vehName: {
    textTransform: 'uppercase',
    color: 'black',
    fontSize: 12,
  },
  vehPrice: {
    color: '#3d3d72',
    fontWeight: '500',
    fontSize: 15,
    alignSelf: 'center',
  },
  shopName: {
    // fontStyle: 'italic',
    fontSize: 13,
  },
});

export default ShowVehicles;
