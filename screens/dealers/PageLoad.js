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

const PageLoad = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [Page, setPage] = useState(1);

  const handleLoadMore = () => {
    setLoading(true);
    setPage(Page + 1);
  };

  const renderFooter = () => {
    return loading ? (
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text style={{color: 'darkgray'}}>Loading... </Text>
        <ActivityIndicator color="darkgray" size={'small'} />
      </View>
    ) : null;
  };

  const fetchPosts = async () => {
    const apiURL =
      'https://jsonplaceholder.typicode.com/photos?_limit=10&_page=' + Page;
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
          setData(responseJson);
          // console.log(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    console.log('Current Page : ', Page);
    fetchPosts();
    // setLoading(false);
    return () => {};
  }, [Page]);

  const ItemView = ({item}) => {
    return (
      <View>
        <Text>{item.id}. {item.title}</Text>
        <Image source={{uri: item.url}} style={{height: 100, width: '100%'}} />
        <Text>Album {item.albumId}</Text>
        <Image
          source={{uri: item.thumbnailUrl}}
          style={{height: 100, width: '100%'}}
        />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={Data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default PageLoad;
