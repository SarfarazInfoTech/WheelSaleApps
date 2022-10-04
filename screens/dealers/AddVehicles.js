import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AddMyVehical, VehiclesList} from '../services/UrlApi.js';
import SelectList from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {RadioButton} from 'react-native-paper';

const AddVehicles = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState();
  const [Specification, setSpecification] = useState();
  const [vehicleNumber, setVehicleNumber] = useState();
  const [modelYear, setModelYear] = useState();
  const [Color, setColor] = useState();
  const [Price, setPrice] = useState();
  const [checked, setChecked] = useState();
  const [selected, setSelected] = useState('');
  const [Data, setData] = useState([]);
  const [VehiInfo, setVehiInfo] = useState([]);
  const Years = [
    {value: '2022'},
    {value: '2021'},
    {value: '2020'},
    {value: '2019'},
    {value: '2018'},
    {value: '2017'},
    {value: '2016'},
    {value: '2015'},
    {value: '2014'},
    {value: '2013'},
    {value: '2012'},
    {value: '2011'},
    {value: '2010'},
    {value: '2009'},
    {value: '2008'},
    {value: '2007'},
    {value: '2006'},
    {value: '2005'},
    {value: '2004'},
    {value: '2003'},
  ];

  useEffect(() => {
    // const getDatabase = async () => {
    //   await axios
    //   .get('https://jsonplaceholder.typicode.com/users')
    //     .then(response => {
    //       let newArray = response.data.map(item => {
    //         return {key: item.id, value: item.name};
    //       });
    //       setData(newArray);
    //     })
    //     .catch(e => {
    //       console.log("Error hai", e);
    //     }),
    //     [];
    // };
    // getDatabase();
    Vehicles();
  }, []);

  const AddVehicle = async () => {
    // console.log(AddMyVehical);
    await fetch(AddMyVehical, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        categoryId: categoryId,
        color: Color,
        images: [
          {
            image: null,
          },
        ],
        modelYear: modelYear,
        sellingPrice: Price,
        subCategoryName: Specification,
        vehicleCondition: checked,
        vehicleNumber: vehicleNumber,
        wheels: 2,
      }),
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.status === 'S') {
          Alert.alert('WheelSale', resData.message, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Show', onPress: () => navigation.navigate('Show Vehicle')},
          ]);
          console.log(resData);
          setVehicleNumber('');
          setSpecification('');
          setColor('');
          setPrice('');
          setChecked('');
        } else if (resData.status === 'F') {
          alert(resData.message);
          // setMessage(resData.message);
          // setError(resData.status);
        } else {
          // setMessage(resData.message);
          // setError(resData.status);
        }
      });
  };

  const Vehicles = async () => {
    try {
      await fetch(`${VehiclesList}`, {
        method: 'GET',
      })
        .then(res => res.json())
        .then(resData => {
          if (resData.status === 'S') {
            // alert(resData.message);
            let newArray = resData.categories.map(item => {
              return {
                key: item.categoryId,
                value: item.company + ' ' + item.categoryName,
              };
            });
            setVehiInfo(newArray);
            // console.log(newArray)
            setLoading(false);
          } else {
            alert(resData.message);
            setMessage(resData.message);
            setError(resData.status);
          }
        });
    } catch (error) {
      console.log(error);
      alert(error);
      navigation.navigate('Dashboard ');
    }
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
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                borderColor: 'lightgray',
                borderWidth: 1,
                borderRadius: 5,
                margin: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#3d3d72',
                  fontSize: 18,
                  fontWeight: '500',
                  marginTop: 15,
                }}>
                Vehicle Information
              </Text>
              <Text style={styles.lable}>Vehicle No.</Text>
              <TextInput
                value={vehicleNumber}
                placeholder="Vehicle Number"
                onChangeText={value => setVehicleNumber(value)}
                style={styles.textInput}
                maxLength={10}
                autoCapitalize={'characters'}
                placeholderTextColor="gray"
              />
              {/* <Text style={styles.lable}>Company</Text>
          <SelectList
            data={VehiInfo.map(({company, categoryName, categoryId}) => company + " " + categoryName)}
            maxHeight={400}
            inputStyles={{}}
            setSelected={setSelected}
            onSelect={() => alert(selected)}
            placeholder="Select Company"
            dropdownStyles={{margin: 10, backgroundColor: '#f7f7f7'}}
            boxStyles={styles.selectInput}
            arrowicon={
              <FontAwesome
                name="chevron-down"
                size={12}
                color={'gray'}
                style={{alignSelf: 'center'}}
              />
            }
            searchicon={
              <FontAwesome
                name="search"
                size={18}
                color={'gray'}
                style={{paddingRight: 10}}
              />
            }
          /> */}
              <Text style={styles.lable}>Vehicle Name</Text>
              <SelectList
                data={VehiInfo}
                maxHeight={400}
                inputStyles={{color: 'black'}}
                setSelected={setSelected}
                onSelect={() => setCategoryId(selected)}
                placeholder="Select Vehicle"
                dropdownStyles={{margin: 10, backgroundColor: '#f7f7f7'}}
                boxStyles={styles.selectInput}
                arrowicon={
                  <FontAwesome
                    name="chevron-down"
                    size={12}
                    color={'gray'}
                    style={{alignSelf: 'center'}}
                  />
                }
                searchicon={
                  <FontAwesome
                    name="search"
                    size={18}
                    color={'gray'}
                    style={{paddingRight: 10}}
                  />
                }
              />
              <Text style={styles.lable}>Specification</Text>
              <TextInput
                value={Specification}
                placeholder="Specification"
                onChangeText={value => setSpecification(value)}
                style={styles.textInput}
                maxLength={15}
                placeholderTextColor="gray"
              />
              <Text style={styles.lable}>Year of Model</Text>
              <SelectList
                data={Years}
                maxHeight={400}
                inputStyles={{color: 'black'}}
                setSelected={setSelected}
                onSelect={() => setModelYear(selected)}
                placeholder="Year of Model"
                dropdownStyles={{margin: 10, backgroundColor: '#f7f7f7'}}
                boxStyles={styles.selectInput}
                arrowicon={
                  <FontAwesome
                    name="chevron-down"
                    size={12}
                    color={'gray'}
                    style={{alignSelf: 'center'}}
                  />
                }
                searchicon={
                  <FontAwesome
                    name="search"
                    size={18}
                    color={'gray'}
                    style={{paddingRight: 10}}
                  />
                }
              />
              <Text style={styles.lable}>Color</Text>
              <TextInput
                value={Color}
                placeholder="Color"
                onChangeText={value => setColor(value)}
                style={styles.textInput}
                maxLength={12}
                placeholderTextColor="gray"
              />
              <Text style={styles.lable}>Selling Price</Text>
              <TextInput
                value={Price}
                placeholder="Selling Price"
                onChangeText={value => setPrice(value)}
                style={styles.textInput}
                placeholderTextColor="gray"
                maxLength={6}
                keyboardType="decimal-pad"
              />
              <Text style={styles.lable}>Condition</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={styles.radioBtn}>
                  <RadioButton
                    value="POOR"
                    status={checked === 'POOR' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('POOR')}
                  />
                  <Text style={styles.btnTxt}>POOR</Text>
                </View>
                <View style={styles.radioBtn}>
                  <RadioButton
                    value="AVERAGE"
                    status={checked === 'AVERAGE' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('AVERAGE')}
                  />
                  <Text style={styles.btnTxt}>AVERAGE</Text>
                </View>
                <View style={styles.radioBtn}>
                  <RadioButton
                    value="GOOD"
                    status={checked === 'GOOD' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('GOOD')}
                  />
                  <Text style={styles.btnTxt}>GOOD</Text>
                </View>
              </View>
              <Text style={styles.lable}> Image</Text>
              <View
                style={{justifyContent: 'space-around', flexDirection: 'row'}}>
                <View style={styles.imageBox}></View>
                <View style={styles.imageBox}></View>
              </View>
              <View style={{margin: 15}}>
                <Button
                  title="Add Vehicle"
                  color={'#3d3d72'}
                  onPress={() => {
                    AddVehicle();
                  }}
                  // onPress={
                  // () => Vehicles()
                  // Alert.alert(
                  //   'WheelSale',
                  //   'To use this feature please buy Our subscription & Contact us.',
                  //   [
                  //     {
                  //       text: 'Cancel',
                  //       onPress: () => console.log('Cancel Pressed'),
                  //       style: 'cancel',
                  //     },
                  //     {text: 'OK', onPress: () => console.log('OK Pressed')},
                  //   ],
                  // )
                  // }
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  lable: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  textInput: {
    borderColor: 'darkgray',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    paddingVertical: 8,
    paddingLeft: 20,
    // fontWeight: '500',
  },
  selectInput: {
    backgroundColor: 'white',
    borderColor: 'darkgray',
    borderRadius: 10,
    marginHorizontal: 10,
    textTransform: 'uppercase',
  },
  radioBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnTxt: {
    alignSelf: 'center',
    color: 'black',
    // fontWeight: '500',
  },
  imageBox: {
    backgroundColor: 'lightgray',
    height: 100,
    width: '40%',
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
  },
});

export default AddVehicles;
