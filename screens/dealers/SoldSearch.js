import {SearchBar} from 'react-native-elements';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {DefImg} from '../data/data.json';
import {SoldMyVehical} from '../services/UrlApi.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const SoldSearch = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [dealerId, setDealerId] = useState('');
  const [search, setSearch] = useState('');
  const [FilterData, setFilterData] = useState([]);
  const [MasterData, setMasterData] = useState([]);

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

  const ItemView = ({item}) => {
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
          <View style={styles.container}>
            <TouchableOpacity
              key={item.subCategoryId}
              onPress={() => {
                navigation.navigate('Vehicles Details', {
                  // subCategoryId: item.subCategoryId,
                  soldVehicle: 'Sold',
                  salesVehicle: item.subCategoryId,
                  categoryName: item.categoryName,
                  subCategoryName: item.subCategoryName,
                  company: item.company,
                  modelYear: item.modelYear,
                  color: item.color,
                  vehicleCondition: item.vehicleCondition,
                  vehicleNumber: item.vehicleNumber,
                  // sellingPrice: item.sellingPrice,
                  images: item.images[0].image === null ? DefImg : item.images,
                  // : item.images[0].image,
                });
              }}>
              <View style={styles.cardItem}>
                <View style={styles.card}>
                  <Image
                    source={{
                      uri:
                        item.images[0].image === null
                          ? DefImg
                          : item.images[0].image,
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
                      {item.company} {item.categoryName} - {item.modelYear} (
                      {item.subCategoryName})
                    </Text>
                    <Text style={styles.vehPrice}>
                      {/* <FontAwesome name="rupee" size={16} color="#3d3d72" /> */}
                      {''}{' '}
                      {item.vehicleNumber
                        .match(/.{1,2}/g)
                        .join(' ')
                        .replace(/.(?=.{2,2}$)/g, '')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const searchFilter = text => {
    if (text) {
      const newData = MasterData.filter(item => {
        // const company = item.company ? item.company : ''.toUpperCase();
        // const categoryName = item.categoryName ? item.categoryName.toUpperCase() : ''.toUpperCase();
        // const subCategoryName = item.subCategoryName ? item.subCategoryName.toUpperCase() : ''.toUpperCase();
        // const modelYear = item.modelYear ? item.modelYear : ''.toUpperCase();
        const vehicleNumber = item.vehicleNumber
          ? item.vehicleNumber
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return (
          // company.indexOf(textData) > -1 ||
          // categoryName.indexOf(textData) > -1 ||
          // subCategoryName.indexOf(textData) > -1 ||
          // modelYear.indexOf(textData) > -1 ||
          vehicleNumber.indexOf(textData) > -1
        );
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(MasterData);
      setSearch(text);
    }
  };

  const fetchPosts = async () => {
    if (dealerId) {
      const apiURL = `${SoldMyVehical}` + dealerId;
      // console.log(apiURL);
      await fetch(apiURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          // console.log(responseJson.subCategories);
          setFilterData(responseJson.subCategories);
          setMasterData(responseJson.subCategories);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getData();
    fetchPosts();
    setLoading(false);
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
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{backgroundColor: '#00b8dc'}}>
            <SearchBar
              inputContainerStyle={{backgroundColor: '#fff'}}
              placeholder="Enter vehicle no..."
              placeholderTextColor="gray"
              searchIcon={{size: 24, color: 'black'}}
              clearIcon={{color: 'gray'}}
              style={{color: 'black'}}
              containerStyle={{
                backgroundColor: 'green',
                justifyContent: 'center',
                padding: 0,
                margin: 15,
                height: 40,
              }}
              value={search}
              onChangeText={text => searchFilter(text)}
              onClear={setSearch}
              onPressIn={fetchPosts}
            />
          </View>

          <View style={{paddingBottom: 65, backgroundColor: 'white'}}>
            {/* {search ? <Text>No results found for '{search}'</Text> : null} */}
            {search ? (
              <FlatList
                data={FilterData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                // onEndReached={handleLoadMore}
                onEndReachedThreshold={0}
                // ListFooterComponent={renderFooter}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  margin: 5,
                }}
                numColumns={2}
              />
            ) : (
              <View
                style={{
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    alignSelf: 'center',
                    marginTop: 20,
                    color: 'black',
                  }}>
                  A Delars can find vehical by using Sold Search.
                </Text>
              </View>
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
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
    width: 25,
    height: 25,
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

export default SoldSearch;
