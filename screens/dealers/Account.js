import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
  // const [value, setvalue] = useState('');
  const [Data, setData] = useState([]);

  const getData = async () => {
    try {
      await AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setData(user);
          // console.log(user);
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
    <>
      {Data.length != 0 ? (
        <View
          style={{
            // flex: 1,
            backgroundColor: 'white',
            marginHorizontal: 10,
            // borderColor: 'lightgray',
            // borderWidth: 1
          }}>
          <View
            style={{
              backgroundColor: '#f7f7f7',
              flexDirection: 'row',
              paddingVertical: 10,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 5,
            }}>
            <Text style={styles.txtline}>Name : </Text>
            <Text style={styles.txtvalue}>{Data[0].fullName}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#f7f7f7',
              flexDirection: 'row',
              paddingVertical: 10,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 5,
              width: '100%',
            }}>
            <Text style={styles.txtline}>Email : </Text>
            <Text style={styles.txtvalue}>{Data[0].email}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#f7f7f7',
              flexDirection: 'row',
              paddingVertical: 10,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 5,
              width: '100%',
            }}>
            <Text style={styles.txtline}>Mobile : </Text>
            <Text style={styles.txtvalue}>{Data[0].phone}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#f7f7f7',
              flexDirection: 'row',
              paddingVertical: 10,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 5,
              width: '100%',
            }}>
            <Text style={styles.txtline}>Shop Name : </Text>
            <Text style={styles.txtvalue}>{Data[0].shopName}</Text>
          </View>
          <View
            style={{
              backgroundColor: '#f7f7f7',
              flexDirection: 'row',
              paddingVertical: 10,
              borderBottomColor: 'lightgray',
              borderBottomWidth: 5,
              width: '100%',
            }}>
            <Text style={styles.txtline}>Shop Address : </Text>
            <Text style={styles.txtvalue}>{Data[0].shopAddress}</Text>
          </View>
          <View>
            {/* <TextInput
          value={value}
          onPressIn={() => alert('In')}
          onPressOut={() => alert('Out')}
          onTextInput={value => setvalue(value)}
        /> */}
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  txtline: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    // marginRight: 5,
    width: '23%',
  },
  txtvalue: {
    fontSize: 17,
    color: 'black',
    width: '75%',
    // backgroundColor: 'blue'
  },
});
export default Account;
