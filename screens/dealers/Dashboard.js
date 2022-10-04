import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Dashboard = ({navigation, route}) => {
  // const dealers = route.params.dealers;

  const [Data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(async () => {
    await setLoading(true);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    wait(2000).then(() => setLoading(false));
    // await navigation.navigate('Home');
  }, []);

  return (
    <>
      <SafeAreaView style={{backgroundColor: '#f7f7f7', flex: 1}}>
        {Data.status ? (
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              zIndex: 5,
            }}>
            <View
              style={{
                borderRadius: 5,
                elevation: 5,
                height: 40,
                width: '100%',
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor:
                  Data.status === 'approved'
                    ? 'green'
                    : Data.status === 'rejected'
                    ? 'gray'
                    : 'orange',
              }}>
              <Text
                style={{
                  paddingRight: 20,
                  fontWeight: '500',
                  color: 'white',
                  fontSize: 17,
                }}>
                Profile status {Data.status}...
              </Text>
              <Image
                style={{width: 35, height: 35}}
                source={{
                  uri:
                    Data.status === 'approved'
                      ? approvedIcon
                      : Data.status === 'rejected'
                      ? rejectedIcon
                      : pendingIcon,
                }}
              />
            </View>
          </View>
        ) : null}
        <View style={{}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              backgroundColor: '#00b8dc',
            }}>
            <View
              style={{
                shadowColor: 'gray',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 2,
                width: '80%',
              }}>
              <View
                style={{
                  borderRadius: 10,
                  overflow: 'hidden',
                  borderColor: 'white',
                  borderWidth: 0.3,
                  backgroundColor: 'white',
                  elevation: 5,
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#00b8dc',
                    fontWeight: '500',
                    paddingVertical: 5,
                  }}>
                  Welcome Sarfaraz
                  {/* {Object.keys(dealers).map(keys => {
                    return <Text>{dealers[keys].shopName}</Text>;
                  })} */}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={{alignSelf: 'center'}}>
              <Ionicons
                // name="ellipsis-vertical"
                name="search"
                size={20}
                color="white"
                style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {/* <View style={{width: '100%', height: 150}}>
              <Image
                source={{
                  uri: teacherImage,
                }}
                style={{
                  width: '100%',
                  height: 215,
                  backgroundColor: 'white',
                }}
              />
              </View>
              <View
              style={{
                borderColor: 'gray',
                backgroundColor: 'white',
                borderRadius: 5,
                margin: 15,
                alignSelf: 'flex-end',
                paddingHorizontal: 10,
                width: '70%',
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.8,
                shadowRadius: 2,
              }}>
              <Text style={{fontSize: 18, color: 'darkgreen'}}>
                {Data ? `Hey, ${Data.name} your Age is ${Data.age}` : 'Loading...'}
                {Data ? Data.subject.map(list => ` ${list} `) : ""}
              </Text>
            </View> */}

            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons
                style={{
                  margin: 10,
                }}
                name="dashboard"
                size={25}
                color="black"
              />
              <Text style={{fontSize: 16, color: 'black', fontWeight: '500'}}>
                Dashboard
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Add Vehicle')}
                style={styles.shadowCard}>
                <View style={styles.card}>
                  <View
                    style={{
                      width: 140,
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: '#00b8dc',
                    }}>
                    <MaterialIcons
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                      name="addchart"
                      size={70}
                      color="white"
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#3d3d72',
                      fontSize: 16,
                      marginVertical: 5,
                    }}>
                    Add Vehicle
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('My Vehicle')}
                style={styles.shadowCard}>
                <View style={styles.card}>
                  <View
                    style={{
                      width: 140,
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: '#00b8dc',
                    }}>
                    <MaterialIcons
                      style={{
                        alignSelf: 'center',
                      }}
                      name="two-wheeler"
                      size={100}
                      color="white"
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#3d3d72',
                      fontSize: 16,
                      marginVertical: 5,
                    }}>
                    My Vehicle
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Market Vehicle')}
                style={styles.shadowCard}>
                <View style={styles.card}>
                  <View
                    style={{
                      width: 140,
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: '#00b8dc',
                    }}>
                    <FontAwesome
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                      name="motorcycle"
                      size={70}
                      color="white"
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#3d3d72',
                      fontSize: 16,
                      marginVertical: 5,
                    }}>
                    Market Vehicle
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Sold Vehicle')}
                style={styles.shadowCard}>
                <View style={styles.card}>
                  <View
                    style={{
                      width: 140,
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: '#00b8dc',
                    }}>
                    <MaterialIcons
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                      name="monetization-on"
                      size={70}
                      color="white"
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#3d3d72',
                      fontSize: 16,
                      marginVertical: 5,
                    }}>
                    Sold Vehicle
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Subscription')}
                style={styles.shadowCard}>
                <View style={styles.card}>
                  <View
                    style={{
                      width: 140,
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: '#00b8dc',
                    }}>
                    <MaterialIcons
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                      name="subscriptions"
                      size={70}
                      color="white"
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#3d3d72',
                      fontSize: 16,
                      marginVertical: 5,
                    }}>
                    Subscription
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Support')}
                style={styles.shadowCard}>
                <View style={styles.card}>
                  <View
                    style={{
                      width: 140,
                      height: 100,
                      borderRadius: 10,
                      backgroundColor: '#00b8dc',
                    }}>
                    <MaterialIcons
                      style={{
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                      name="support-agent"
                      size={70}
                      color="white"
                    />
                  </View>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#3d3d72',
                      fontSize: 16,
                      marginVertical: 5,
                    }}>
                    Support
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* <Image
              style={{
                height: 60,
                width: '50%',
                alignSelf: 'center',
                borderRadius: 100,
              }}
              source={{
                uri: 'https://th.bing.com/th/id/R.884a03cea2c946aab45fa7c32def656d?rik=BNTt3YG%2bqqYNkg&riu=http%3a%2f%2ffreevector.co%2fwp-content%2fuploads%2f2009%2f10%2fpowered-by-ethanol.png&ehk=sOVrfSTxn0alLyQSncKVrrMVpLxNjE5pjl5MNuqnWVw%3d&risl=&pid=ImgRaw&r=0',
              }}
            /> */}
          </ScrollView>
          <Text
            style={{
              color: 'blue',
              textAlign: 'center',
              top: 90,
              position: 'relative',
            }}>
            WheelSale - by Qaswa Technologies
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 0.3,
    backgroundColor: 'white',
    elevation: 5,
  },
  shadowCard: {
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 140,
    marginVertical: 10,
  },

  shadow: {},
});

export default Dashboard;
