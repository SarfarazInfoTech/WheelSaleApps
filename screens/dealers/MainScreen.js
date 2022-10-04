import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
      

    <Image source={{uri:"https://lh4.googleusercontent.com/-PIjFRdZgz6A/AAAAAAAAAAI/AAAAAAAAAAA/ZvfRO5L6-cQ/s55-p-k-no-ns-nd/photo.jpg"}} contextC style={{height: 100, width: 100, borderRadius: 100, bottom : 40, backgroundColor: 'white', alignSelf : 'center', borderWidth:5, borderColor:"white"}} />
    <Text  style={{paddingBottom: 20, color: "#3d3d72", fontSize: 30, alignSelf:"center", fontWeight:"800"}}>
      WHEELSALE
    </Text>
        <Text style={{paddingBottom: 5, color: "#3d3d72", fontSize: 16, marginLeft:20}}>
          Existing User
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View style={{
            backgroundColor: '#00b8dc', // 00b8dc
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 5
          }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                textAlign: 'center',
                margin: 10,
                fontWeight: '500',
                textTransform: 'uppercase'
              }}>
              Login
            </Text>
          </View>

        </TouchableOpacity>

        <Text  style={{paddingBottom: 5, color: "#3d3d72", fontSize: 16, marginTop:20,  marginLeft:20}}>
        New User Create Accout
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <View style={{
            backgroundColor: '#00b8dc', // 00b8dc  3d3d72
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 5
          }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                textTransform: 'uppercase',
                fontWeight: '500',
                textAlign: 'center',
                margin: 10,
              }}>
              Create  Account
            </Text>
          </View>

        </TouchableOpacity>


      </View>
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00b8dc',
    paddingHorizontal: 5,
  },
  card: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 2,
    paddingBottom: 40,
    backgroundColor: 'white',
     paddingHorizontal:10,
     height : 400
  },
});


export default MainScreen