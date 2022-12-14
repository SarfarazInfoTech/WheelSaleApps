import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {MarketVehical} from '../services/UrlApi.js';
import {DefImg} from '../data/data.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MarketVehicles = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [Error, setError] = useState('');

  const myVehical = async () => {
    try {
      await fetch(`${MarketVehical}`, {
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
            // console.log(resData.subCategories[0].vehicleDealer)
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
      if (err.message === 'Network request failed') {
        navigation.navigate('ErrorCard');
      } else if (err) {
        navigation.navigate('Dashboard ');
        console.log(err);
        alert('', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    myVehical();
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(async () => {
    await setLoading(true);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    wait(2000).then(() => setLoading(false));
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
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {/* <Text>{message}</Text> */}
          {/* <Text>{Error}</Text> */}
          <View style={{padding: 10, backgroundColor: 'white'}}>
            <Text style={{color: 'black', fontWeight: '500'}}>
              Fresh recommendations
            </Text>
          </View>
          <View style={styles.container}>
            {Object.keys(Data).map(keys => {
              return (
                <TouchableOpacity
                  key={Data[keys].subCategoryId}
                  onPress={() => {
                    navigation.navigate('Vehicles Details', {
                      // subCategoryId: Data[keys].subCategoryId,
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
                          : Data[keys].images,
                      // : Data[keys].images[0].image,
                      vehicleDealer: Data[keys].vehicleDealer,
                    });
                  }}>
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
                      <Image
                        source={{
                          uri: 'http://wheelsale.in/app/icon/wheelsale_logo.png',
                        }}
                        style={styles.iconLogo}
                      />
                      <View style={{margin: 5}}>
                        <Text style={styles.vehName} numberOfLines={1}>
                          {Data[keys].company} {Data[keys].categoryName} -{' '}
                          {Data[keys].modelYear} ({Data[keys].subCategoryName})
                        </Text>
                        <Text style={styles.vehPrice}>
                          <FontAwesome name="rupee" size={16} color="#3d3d72" />
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
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10,
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
    marginVertical: 10,
  },
  cardImg: {
    width: '100%',
    height: 150,
  },
  iconLogo: {
    width: 30,
    height: 30,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 120,
    right: 5,
  },
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
    fontSize: 13,
  },
});
export default MarketVehicles;
