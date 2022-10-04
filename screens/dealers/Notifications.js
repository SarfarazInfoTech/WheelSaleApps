import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Notifications = () => {
  return (
    <View>
      {/* <View style={{padding: 10, backgroundColor: '#00b8dc'}}>
        <Text style={{color: 'white', fontWeight: '500', fontSize: 17}}>
          Notifications
        </Text>
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
            <Text style={styles.heading}>Account approved</Text>

            <Text style={styles.date}>26-11-2021 | 12:00</Text>
          </View>

          <Text style={{color: 'black', fontSize: 13}}>
            The order has been dispatched.The delevery guy is on his way to
            dispatch the product. We intend to delever the best product,
            Thankyou for ordering. Happy Shipping!!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {fontSize: 17, fontWeight: 'bold', color: '#3d3d72'},
  date: {textAlign: 'right', fontWeight: '500', color: 'gray', fontSize: 12},
  notificationContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 5,
  },
});

export default Notifications;
