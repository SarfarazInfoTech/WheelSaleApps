import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AddMyVehical, VehiclesList} from '../services/UrlApi.js';
import SelectList from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RadioButton, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
  const [dealerId, setDealerId] = useState();
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
    getData();
    Vehicles();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setDealerId(user[0].dealerId);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const AddVehicle = async () => {
    if (
      !Specification ||
      !vehicleNumber ||
      !modelYear ||
      !Color ||
      !Price ||
      !checked ||
      !selected ||
      !VehiInfo ||
      !imgDownloadUrl1 ||
      !imgDownloadUrl2
    ) {
      alert('All value must be required !');
    } else {
      await fetch(AddMyVehical + dealerId, {
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
              image: imgDownloadUrl1,
            },
            {
              image: imgDownloadUrl2,
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
              {
                text: 'Show',
                onPress: () => navigation.navigate('My Vehicle'),
              },
            ]);
            console.log(resData);
            // setSelected('');
            setVehicleNumber('');
            // setCategoryId('');
            setSpecification('');
            // setModelYear('');
            setColor('');
            setPrice('');
            setChecked('');
            setData1('');
            setData2('');
            setImageData1('');
            setImageData2('');
            setimgDownloadUrl1('');
            setimgDownloadUrl2('');
          } else if (resData.status === 'F') {
            alert(resData.message);
            console.log('Error', resData.message);
          } else {
            console.log('Error');
          }
        });
    }
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

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [Data1, setData1] = useState([]);
  const [Data2, setData2] = useState([]);
  const [ImageData1, setImageData1] = useState(null);
  const [ImageData2, setImageData2] = useState(null);
  const [imgDownloadUrl1, setimgDownloadUrl1] = useState(null);
  const [imgDownloadUrl2, setimgDownloadUrl2] = useState(null);

  const options = {
    title: 'Image Picker',
    includeBase64: true,
    mediaType: 'image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const choosePic1 = () => {
    try {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setData1(response.assets[0].base64);
          setImageData1(response.assets[0].uri);
          // console.log('Response = ', response.assets[0].uri);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const choosePic2 = () => {
    try {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setData2(response.assets[0].base64);
          setImageData2(response.assets[0].uri);
          // console.log('Response = ', response.assets[0].uri);
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  const Base641 = async () => {
    setLoading1(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({
          image: Data1,
        }),
      };

      await fetch(
        `http://wheelsale.in:80/wheelsale-app-ws/images/upload`,
        requestOptions,
      )
        .then(response => response.text())
        .then(json => {
          setimgDownloadUrl1(json);
          console.log(json);
          alert('Image Upload 1');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading1(false);
    }
  };

  const Base642 = async () => {
    setLoading2(true);
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          accept: '*/*',
        },
        body: JSON.stringify({
          image: Data2,
        }),
      };

      await fetch(
        `http://wheelsale.in:80/wheelsale-app-ws/images/upload`,
        requestOptions,
      )
        .then(response => response.text())
        .then(json => {
          setimgDownloadUrl2(json);
          console.log(json);
          alert('Image Upload 2');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
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
              <View>
                <Text style={styles.lable}> Image</Text>
                <View
                  style={{
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={styles.imageBox}
                    onPressIn={() => choosePic1()}>
                    {ImageData1 ? (
                      <>
                        {loading1 ? (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}>
                            <ActivityIndicator
                              size="small"
                              color="#3d3d72"
                              visible={loading1}
                              textContent={'Loading...'}
                              textStyle={styles.spinnerTextStyle}
                            />
                          </View>
                        ) : (
                          <Image
                            source={{uri: ImageData1}}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: 4,
                            }}
                          />
                        )}
                        {!imgDownloadUrl1 ? (
                          loading1 ? (
                            <Text
                              style={{textAlign: 'center', marginBottom: 5}}>
                              Uploading
                            </Text>
                          ) : (
                            <Button onPress={() => Base641()}>Upload</Button>
                          )
                        ) : null}
                      </>
                    ) : (
                      <View
                        style={{
                          alignSelf: 'center',
                          top: 30,
                          position: 'absolute',
                        }}>
                        <Ionicons
                          name="ios-add-outline"
                          size={38}
                          color={'gray'}
                          style={{alignSelf: 'center'}}
                        />
                        <Text style={{alignSelf: 'center'}}>Add Image 1</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.imageBox}
                    onPressIn={() => choosePic2()}>
                    {ImageData2 ? (
                      <>
                        {loading2 ? (
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}>
                            <ActivityIndicator
                              size="small"
                              color="#3d3d72"
                              visible={loading2}
                              textContent={'Loading...'}
                              textStyle={styles.spinnerTextStyle}
                            />
                          </View>
                        ) : (
                          <Image
                            source={{uri: ImageData2}}
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: 4,
                            }}
                          />
                        )}
                        {!imgDownloadUrl2 ? (
                          loading2 ? (
                            <Text
                              style={{textAlign: 'center', marginBottom: 5}}>
                              Uploading
                            </Text>
                          ) : (
                            <Button onPress={() => Base642()}>Upload</Button>
                          )
                        ) : null}
                      </>
                    ) : (
                      <>
                        <View
                          style={{
                            alignSelf: 'center',
                            top: 30,
                            position: 'absolute',
                          }}>
                          <Ionicons
                            name="ios-add-outline"
                            size={38}
                            color={'gray'}
                            style={{alignSelf: 'center'}}
                          />
                          <Text style={{alignSelf: 'center'}}>Add Image 2</Text>
                        </View>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{margin: 15}}>
                  {imgDownloadUrl1 && imgDownloadUrl2 ? (
                    <Button
                      onPress={() => AddVehicle()}
                      textColor="white"
                      buttonColor="#3d3d72"
                      style={{margin: 5, borderRadius: 6}}>
                      Add Vehicle
                    </Button>
                  ) : null}
                </View>
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
