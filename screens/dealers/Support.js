import {View, Text, Image} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const Support = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Image
            source={{
              uri: 'http://wheelsale.in/wheel/Asset1/images/favicon.png',
            }}
            style={{width: 90, height: 90, borderRadius: 100}}
          />
          <Text
            style={{
              fontSize: 30,
              fontWeight: '500',
              alignSelf: 'center',
              color: '#00b8dc',
              marginHorizontal: 20,
            }}>
            WHEEL SALE
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{margin: 20}}>
            <View style={{flexDirection: 'row'}}>
              <EvilIcons
                name="clock"
                size={35}
                color="#3d3d72"
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  color: '#3d3d72',
                  fontSize: 20,
                  alignSelf: 'center',
                }}>
                {' '}10:00 - 08:00
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <MaterialIcons
                name="phone-in-talk"
                size={30}
                color="#00b8dc"
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  color: '#3d3d72',
                  fontSize: 20,
                  alignSelf: 'center',
                }}>
                {'  '}9673889845
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons
                name="phone-in-talk"
                size={30}
                color="#00b8dc"
                style={{alignSelf: 'center'}}
              />
              <Text
                style={{
                  color: '#3d3d72',
                  fontSize: 20,
                  alignSelf: 'center',
                }}>
                {'  '}8554843519
              </Text>
            </View>

            <Text
              style={{
                alignSelf: 'center',
                fontSize: 17,
                fontWeight: '500',
                marginTop: 25,
                color: '#00b8dc',
              }}>
              CUSTOMER SERVICES
            </Text>
          </View>
          <View>
            <MaterialIcons
              style={{}}
              name="support-agent"
              size={150}
              color="#3d3d72"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Support;
