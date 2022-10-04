import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Subscription = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{}}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FontAwesome
          style={{
            margin: 10,
          }}
          name="tags"
          size={20}
          color="black"
        />
        <Text style={{fontSize: 16, color: 'black'}}>Subscription plan</Text>
      </View>
      <View
        style={[
          styles.card,
          {margin: 10, padding: 10, paddingBottom: 0, paddingTop: 0},
        ]}>
        <View style={[styles.shadowCard, {width: '100%'}]}>
          <View style={{margin: 10}}>
            <View
              style={{
                borderBottomColor: 'lightgray',
                borderBottomWidth: 2,
                marginVertical: 10,
                paddingBottom: 25,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // marginBottom: 5,
                }}>
                <Text style={{fontWeight: '500', color: 'black'}}>
                  Current Package
                </Text>
                <Text
                  style={{
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: 'darkorange',
                    paddingHorizontal: 10,
                    borderRadius: 15,
                  }}>
                  Gold
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <Text style={{fontWeight: '500', color: 'black'}}>Status </Text>
                <Text
                  style={{
                    backgroundColor: 'skyblue',
                    color: 'blue',
                    paddingHorizontal: 15,
                    paddingVertical: 3,
                    borderRadius: 5,
                  }}>
                  Active
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}>
                <Text style={{fontWeight: '500', color: 'black'}}>
                  Purchase Date
                </Text>
                <Text style={{fontSize: 13}}>21-07-2022</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}>
                <Text style={{fontWeight: '500', color: 'black'}}>
                  Expire date
                </Text>
                <Text style={{fontSize: 12.3}}>20-08-2022</Text>
              </View>
            </View>

            <View style={{paddingVertical: 30}}>
              <View
                style={{
                  borderRadius: 5,
                  borderColor: 'orange',
                  borderWidth: 2,
                  margin: 5,
                }}>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: '#fff2b3',
                    padding: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: '500',
                      textAlign: 'center',
                      // color: '#0cc2aa',
                      color: 'darkorange',
                      marginVertical: 15,
                      // borderColor: "#0cc2aa",
                      borderColor: 'darkorange',
                      borderRadius: 100,
                      borderWidth: 2,
                      width: '29%',
                      alignSelf: 'center',
                      backgroundColor: 'white',
                    }}>
                    GOLD
                  </Text>

                  <Text
                    style={{
                      backgroundColor: '#0cc2aa',
                      color: 'white',
                      margin: 10,
                      padding: 15,
                      textAlign: 'center',
                      fontSize: 27,
                      shadowColor: 'black',
                    }}>
                    $ 100 / 60 Days
                  </Text>

                  <View style={{margin: 10, marginVertical: 30}}>
                    <View
                      style={{
                        borderTopColor: '#0cc2aa',
                        borderTopWidth: 1,
                        padding: 20,
                      }}>
                      <Text style={{fontWeight: '500', margin: 5}}>
                        Up to 5 active users
                      </Text>
                      <Text style={{fontWeight: '500', margin: 5}}>
                        Commercial license
                      </Text>
                      <Text style={{fontWeight: '500', margin: 5}}>
                        Up to 2 developers
                      </Text>
                      <Text style={{fontWeight: '500', margin: 5}}>
                        Commercial
                      </Text>
                    </View>

                    <Button
                      onPress={console.log('Hello Button ')}
                      color={'white'}
                      style={{backgroundColor: 'green', color: 'white'}}>
                      Subscribe
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity
              // onPress={() => gotoUpgradePlan(subscription.store_plans)}
              style={{
                backgroundColor: '#febe05',
                width: '100%',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  paddingVertical: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Upgrade Plan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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

export default Subscription;
