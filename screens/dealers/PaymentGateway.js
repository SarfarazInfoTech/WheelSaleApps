import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import RazorpayCheckout from 'react-native-razorpay';
import {RadioButton} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentGateway = () => {
  const [Subscription, setSubscription] = useState(null);
  const [User, setUser] = useState([]);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setUser(user);
          console.log(user);
          // console.log(user[0].dealerId);
          // console.log(user[0].shopName);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#00b8dc'}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            marginVertical: 15,
            color: 'white',
            fontSize: 20,
            alignSelf: 'center',
            fontWeight: '500',
            letterSpacing: 3,
          }}>
          WHEELSALE
        </Text>
        <Image
          source={{uri: 'http://wheelsale.in/app/icon/wheelsale_logo.png'}}
          style={{
            height: 155,
            width: 150,
            borderRadius: 100,
            alignSelf: 'center',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          marginHorizontal: 1,
        }}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: Subscription ? 'green' : 'white',
            borderColor: Subscription ? 'green' : 'skyblue',
            borderRadius: 10,
            borderWidth: 1,
            width: '50%',
            padding: 10,
            margin: 10,
            bottom: 100,
          }}
          disabled={Subscription ? false : true}
          onPress={() => {
            var options = {
              description: 'Credits towards consultation',
              // image: 'https://i.imgur.com/3g7nmJC.png',
              // image: require('../assets/images/wheelsale_logo.png'),
              currency: 'INR',
              key: 'rzp_test_HkcGVbU4fvdsXe',
              amount: `${Subscription ? Subscription.plans : null}` * 100,
              name: 'WheelSale',
              prefill: {
                email: User[0].email,
                contact: User[0].phone,
                name: User[0].fullName,
              },
              theme: {color: '#00b8dc'},
            };
            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                console.log('success -> ', data);
                alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                console.log('failure -> ', error);
                alert(`Error: ${error.code} | ${error.description}`);
              });
          }}>
          <Text
            style={{
              color: Subscription ? 'white' : '#00b8dc',
              fontWeight: '500',
              fontSize: 18,
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
            Pay Now
            {Subscription ? ` ${Subscription.plans} ` : null}
            {Subscription ? <FontAwesome name="rupee" size={18} /> : null}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            marginHorizontal: 20,
            color: 'black',
            fontSize: 18,
            fontWeight: '500',
          }}>
          Subscription Plans
        </Text>
        <RadioButton.Group
          onValueChange={value =>
            setSubscription({...Subscription, plans: value})
          }
          value={Subscription ? Subscription.plans : ''}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'skyblue',
              // height: 80,
              margin: 20,
              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton value="500" color="#00b8dc" />
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  width: '90%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'right',
                    color: 'darkgreen',
                  }}>
                  500 <FontAwesome name="rupee" size={18} />{' '}
                </Text>
                We've prepared pricing plans for all budgets so you can get
                started right away.
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'skyblue',
              // height: 80,
              margin: 20,
              paddingVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton value="100" color="#00b8dc" />
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  width: '90%',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'right',
                    color: 'darkgreen',
                  }}>
                  100 <FontAwesome name="rupee" size={18} />{' '}
                </Text>
                We've prepared pricing plans for all budgets so you can get
                started right away.
              </Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

export default PaymentGateway;
