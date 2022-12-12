import {SearchBar} from 'react-native-elements';
import React, {useState, useEffect} from 'react';
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
import {SearchVehical} from '../services/UrlApi.js';

const Searching = ({navigation}) => {
  const [FilterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [Page, setPage] = useState(1);

  const handleLoadMore = () => {
    setPage(Page + 1);
    // fetchPosts();
    // setLoading(true);
  };

  const renderFooter = () => {
    return loading ? (
      <View style={{margin: 10, alignItems: 'center'}}>
        <Text>Loading...</Text>
        <ActivityIndicator size={'small'} />
      </View>
    ) : null;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const apiURL = `${SearchVehical}` + search;
    //   console.log(apiURL);
      await fetch(apiURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
        //   console.log(responseJson);
          setFilterData(responseJson.subCategories);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    };
    // console.log('Current Page : ', Page);
    fetchPosts();
    // handleLoadMore()
    setLoading(false);
  }, [search]);

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
            <TouchableOpacity key={item.subCategoryId} 
            onPress={() => {
              navigation.navigate('Vehicles Details', {
                // subCategoryId: item.subCategoryId,
                categoryName: item.categoryName,
                subCategoryName: item.subCategoryName,
                company: item.company,
                modelYear: item.modelYear,
                color: item.color,
                vehicleCondition: item.vehicleCondition,
                vehicleNumber: item.vehicleNumber,
                sellingPrice: item.sellingPrice,
                images:
                  item.images[0].image === null
                    ? DefImg
                    : item.images,
                // : item.images[0].image,
                vehicleDealer: item.vehicleDealer,
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
                    <Text style={styles.vehName} numberOfLines={2}>
                      {item.company} {item.categoryName} - {item.modelYear} (
                      {item.subCategoryName})
                    </Text>
                    <Text style={styles.vehPrice}>
                      <FontAwesome name="rupee" size={16} color="#3d3d72" />
                      {''} {item.sellingPrice}/-
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
              placeholder="Searching..."
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
              onChangeText={text => setSearch(text)}
              onClear={setSearch}
            />
          </View>

          <View style={{paddingBottom: 65, backgroundColor: 'white'}}>
            {/* {search ? <Text>No results found for '{search}'</Text> : null} */}
            {search ? (
              <FlatList
                data={FilterData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0}
                ListFooterComponent={renderFooter}
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
                  A Delars can find any vehical by using search with Vehical
                  type, Vehical name, Model year.
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

export default Searching;
