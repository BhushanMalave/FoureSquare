import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Platform,
  TextInput,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
  PermissionsAndroid,
  FlatList,
  Animated,
  scrollX,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SearchViewComponent} from '../components/SearchViewComponent';
import Maps from '../components/Maps';
import Geolocation from '@react-native-community/geolocation';
import {useRef} from 'react';
export const Search = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [text, setText] = useState('');
  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);
  const [iconState, setIconState] = useState(true);
  const [onFocus, setOnFocus] = useState(0);
  const [buttonView, setButtonView] = useState(0);
  const [price, setPrice] = useState({
    one: false,
    tens: false,
    hundreds: false,
    thousands: false,
  });

  const [sortBy, setSortBy] = useState({
    popular: false,
    distance: false,
    rating: false,
  });
  const [features, setFeatures] = useState({
    acceptCC: false,
    deliver: false,
    dogFriendly: false,
    familyFriendly: false,
    walkingDistance: false,
    outDoorSeating: false,
    parking: false,
    wifi: false,
  });
  const handleText = string => {
    setText(string);
  };
  const handleText1 = string => {
    setText1(string);
  };
  const handleText2 = string => {
    setText2(string);
  };
  const setOnFocus1 = () => {
    setOnFocus(1);
    setIconState(true);
  };

  const setOnFocus2 = () => {
    setOnFocus(2);
    setIconState(true);
  };
  const handleMapView = () => {
    setButtonView(2);
    setOnFocus(0);
  };
  const handleListView = () => {
    setButtonView(1);
    setOnFocus(0);
  };

  const handleSearch = () => {
    setButtonView(1);
    setOnFocus(0);
  };

  const [data, setData] = useState(null);

  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');

  const mapRef = useRef(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
          } else {
            Toast.show('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    Toast.show('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setTimeout(() => {
          try {
            mapRef.current.animateToRegion(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.2,
              },
              3 * 1000,
            );
          } catch (error) {
            Toast.show('Failed to animate direction');
          }
        }, 500);
        Toast.show('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude = position.coords.latitude;

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        Toast.show(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.topbar}>
          <SafeAreaView >
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 20 : 30,
                flexDirection: 'row',
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  style={styles.menu}
                  source={require('../assets/images/back_icon.png')}
                />
              </TouchableOpacity>
              <View
                style={{
                  height: 40,
                  width:
                    width > height
                      ? Platform.OS === 'ios'
                        ? '85%'
                        : '85%'
                      : '75%',
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  marginTop: -10,
                  borderRadius: 5,
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/images/search_icon.png')}
                  style={{tintColor: '#cccccc', marginTop: 12, marginLeft: 20}}
                />
                <TextInput
                  name="search"
                  placeholder="Search"
                  placeholderTextColor={'#ccc'}
                  style={styles.textInput}
                  onChangeText={handleText}
                  onFocus={setOnFocus1}
                  onChange={handleSearch}
                />
              </View>
              {iconState ? (
                <TouchableOpacity
                  onPress={() => {
                    setIconState(false);
                    setOnFocus(0);
                  }}>
                  <Image
                    style={styles.filter}
                    source={require('../assets/images/filter_icon.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setIconState(true);
                    setOnFocus(0);
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      marginLeft: Platform.OS === 'ios' ? -15 : -14,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    Done
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                height: 40,
                width:
                  width > height
                    ? Platform.OS === 'ios'
                      ? '80%'
                      : '82%'
                    : '68%',
                backgroundColor: 'white',
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <Image
                source={require('../assets/images/near_me_mdpi.png')}
                style={{marginTop: 12, marginLeft: 20, height: 18, width: 18}}
              />
              <TextInput
                name="nearMe"
                placeholder="Near Me"
                placeholderTextColor={'#ccc'}
                style={styles.textInput}
                onChangeText={handleText1}
                onFocus={setOnFocus2}
              />
            </View>
          </SafeAreaView>
        </View>

        <View style={{flex: 1, marginBottom: 40,borderWidth:1,height:700}}>
          {onFocus === 1 && (
            <>
              <View style={{flex: 1}}>
                <View style={{height: 60}}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Medium',
                      fontSize: 22,
                      color: '#7A7A7A',
                      marginTop: 15,
                      marginLeft: 20,
                    }}>
                    Near by places
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#ccc',
                    marginTop: 0,
                    backgroundColor: '#fff',
                    height: 90,
                  }}>
                  <Image
                    source={require('../assets/images/images.jpeg')}
                    style={{
                      height: 60,
                      width: 60,
                      marginLeft: 20,
                      marginTop: 15,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Avenir Book',
                      fontSize: 22,
                      marginTop: 25,
                      color: 'black',
                      marginLeft: 20,
                    }}>
                    Santhekatte
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#ccc',
                    marginTop: 0,
                    backgroundColor: '#fff',
                    height: 90,
                  }}>
                  <Image
                    source={require('../assets/images/images.jpeg')}
                    style={{
                      height: 60,
                      width: 60,
                      marginLeft: 20,
                      marginTop: 15,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'Avenir Book',
                      fontSize: 22,
                      marginTop: 25,
                      color: 'black',
                      marginLeft: 20,
                    }}>
                    Santhekatte
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <View style={{height: 60}}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Medium',
                      fontSize: 22,
                      color: '#7A7A7A',
                      marginTop: 15,
                      marginLeft: 20,
                    }}>
                    Suggesstions
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#ccc',
                    marginTop: 0,
                    height: 60,
                    backgroundColor: '#fff',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Book',
                      fontSize: 22,
                      marginTop: 10,
                      color: 'black',
                      marginLeft: 20,
                    }}>
                    Top Picks
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#ccc',
                    marginTop: 0,
                    height: 70,
                    backgroundColor: '#fff',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Book',
                      fontSize: 22,
                      marginTop: 20,
                      color: 'black',
                      marginLeft: 20,
                    }}>
                    Popular
                  </Text>
                </View>
              </View>
            </>
          )}

          {onFocus === 2 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0.7,
                  borderBottomColor: '#ccc',
                  marginTop: 10,
                  height: 80,
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/images/location_icon.png')}
                  style={{height: 30, width: 30, marginTop: 15, marginLeft: 30}}
                />

                <Text
                  style={{
                    fontFamily: 'Avenir Book',
                    fontSize: 22,
                    marginTop: 15,
                    color: 'black',
                    marginLeft: 30,
                  }}>
                  Use my current location
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 0.7,
                  borderBottomColor: '#ccc',
                  marginTop: 10,
                  height: 80,
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/images/map_icon.png')}
                  style={{height: 30, width: 30, marginTop: 15, marginLeft: 30}}
                />

                <Text
                  style={{
                    fontFamily: 'Avenir Book',
                    fontSize: 22,
                    marginTop: 15,
                    color: 'black',
                    marginLeft: 30,
                  }}>
                  Select Search area on map
                </Text>
              </View>
            </>
          )}

          {iconState === false && (
            <>
              <View>
                <View style={{height: 60}}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Medium',
                      fontSize: 18,
                      color: '#7A7A7A',
                      marginTop: 15,
                      marginLeft: 20,
                    }}>
                    Sort by
                  </Text>
                </View>

                <View
                  style={{
                    borderTopColor: '#351347',
                    borderTopWidth: 1,
                    borderBottomColor: '#351347',
                    borderBottomWidth: 1,
                    height: 60,
                    flexDirection: 'row',
                  }}>
                  {!sortBy.popular ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        width: '33.333%',
                        borderRightWidth: 1,
                        borderRightColor: '#351347',
                      }}
                      onPress={() => {
                        setSortBy({
                          popular: true,

                          distance: false,
                          rating: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: '#351347',
                        }}>
                        Popular
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{backgroundColor: '#351347', width: '33.333%'}}
                      onPress={() => {
                        setSortBy({
                          popular: false,
                          distance: false,
                          rating: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: 'white',
                        }}>
                        Popular
                      </Text>
                    </TouchableOpacity>
                  )}

                  {!sortBy.distance ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        width: '33.333%',
                        borderRightWidth: 1,
                        borderRightColor: '#351347',
                      }}
                      onPress={() => {
                        setSortBy({
                          popular: false,
                          distance: true,
                          rating: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: '#351347',
                        }}>
                        Distance
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{backgroundColor: '#351347', width: '33.333%'}}
                      onPress={() => {
                        setSortBy({
                          popular: false,
                          distance: false,
                          rating: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: 'white',
                        }}>
                        Distance
                      </Text>
                    </TouchableOpacity>
                  )}

                  {!sortBy.rating ? (
                    <TouchableOpacity
                      style={{backgroundColor: 'white', width: '33.333%'}}
                      onPress={() => {
                        setSortBy({
                          popular: false,
                          distance: false,
                          rating: true,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: '#351347',
                        }}>
                        Rating
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{backgroundColor: '#351347', width: '33.333%'}}
                      onPress={() => {
                        setSortBy({
                          popular: false,
                          distance: false,
                          rating: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: 'white',
                        }}>
                        Rating
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{height: 60}}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Medium',
                      fontSize: 18,
                      color: '#7A7A7A',
                      marginTop: 15,
                      marginLeft: 20,
                    }}>
                    Fliter by
                  </Text>
                </View>
                <View
                  style={{
                    height: Platform.OS === 'ios' ? 100 : 120,
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Medium',
                      fontSize: 14,
                      color: '#7A7A7A',
                      marginTop: 20,
                      marginLeft: 20,
                    }}>
                    Set Radius
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: 20,
                      borderBottomWidth: 1,
                      borderBottomColor: '#ccc',
                      marginRight: 20,
                      marginTop: -10,
                    }}>
                    <TextInput
                      name="radius"
                      style={{
                        fontFamily: 'Avenir Book',
                        width: 30,
                        marginBottom: Platform.OS === 'ios' ? 10 : 0,
                        marginTop: Platform.OS === 'ios' ? 15 : 3,
                        color: 'black',
                      }}
                      onChangeText={handleText2}
                    />
                    <Text
                      style={{
                        fontFamily: 'Avenir Book',
                        width: 30,
                        marginBottom: 10,
                        marginTop: 15,
                        color: 'black',
                      }}>
                      km
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderTopColor: '#351347',
                    borderTopWidth: 1,
                    borderBottomColor: '#351347',
                    borderBottomWidth: 1,
                    height: 60,
                    flexDirection: 'row',
                  }}>
                  {!price.one ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        width: '25%',
                        borderRightWidth: 1,
                        borderRightColor: '#351347',
                      }}
                      onPress={() => {
                        setPrice({
                          one: true,
                          tens: false,
                          hundreds: false,
                          thousands: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: '#351347',
                        }}>
                        ₹
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{backgroundColor: '#351347', width: '25%'}}
                      onPress={() => {
                        setPrice({
                          one: false,
                          tens: false,
                          hundreds: false,
                          thousands: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: 'white',
                        }}>
                        ₹
                      </Text>
                    </TouchableOpacity>
                  )}

                  {!price.tens ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        width: '25%',
                        borderRightWidth: 1,
                        borderRightColor: '#351347',
                      }}
                      onPress={() => {
                        setPrice({
                          one: false,
                          tens: true,
                          hundreds: false,
                          thousands: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: '#351347',
                        }}>
                        ₹₹
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{backgroundColor: '#351347', width: '25%'}}
                      onPress={() => {
                        setPrice({
                          one: false,
                          tens: false,
                          hundreds: false,
                          thousands: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: 'white',
                        }}>
                        ₹₹
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!price.hundreds ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        width: '25%',
                        borderRightWidth: 1,
                        borderRightColor: '#351347',
                      }}
                      onPress={() => {
                        setPrice({
                          one: false,
                          tens: false,
                          hundreds: true,
                          thousands: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: '#351347',
                        }}>
                        ₹₹₹
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{backgroundColor: '#351347', width: '25%'}}
                      onPress={() => {
                        setPrice({
                          one: false,
                          tens: false,
                          hundreds: false,
                          thousands: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: 'white',
                        }}>
                        ₹₹₹
                      </Text>
                    </TouchableOpacity>
                  )}

                  {!price.thousands ? (
                    <TouchableOpacity
                      style={{backgroundColor: 'white', width: '25%'}}
                      onPress={() => {
                        setPrice({
                          one: false,
                          tens: false,
                          hundreds: false,
                          thousands: true,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: '#351347',
                        }}>
                        ₹₹₹₹
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{backgroundColor: '#351347', width: '25%'}}
                      onPress={() => {
                        setPrice({
                          one: false,
                          tens: false,
                          hundreds: false,
                          thousands: false,
                        });
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          marginTop: 20,
                          fontFamily: 'Avenir Medium',
                          fontSize: 16,
                          color: 'white',
                        }}>
                        ₹₹₹₹
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View
                  style={{
                    height: 60,
                    marginTop: Platform.OS === 'ios' ? 0 : 0,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Avenir Medium',
                      fontSize: 18,
                      color: '#7A7A7A',
                      marginTop: 19,
                      marginLeft: 20,
                    }}>
                    Features
                  </Text>
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.acceptCC ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        Accepts credits cards
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            acceptCC: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        Accepts credits cards
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            acceptCC: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.deliver ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        Delivery
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            deliver: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        Delivery
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            deliver: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.dogFriendly ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        Dog Friendly
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            dogFriendly: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        Dog Friendly
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            dogFriendly: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.familyFriendly ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        Family-Friendly places
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            familyFriendly: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        Family-Friendly places
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            familyFriendly: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.walkingDistance ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        In walking distance
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            walkingDistance: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        In walking distance
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            walkingDistance: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.outDoorSeating ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        Outdoor seating
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            outDoorSeating: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        Outdoor seating
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            outDoorSeating: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.parking ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        Parking
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            parking: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        Parking
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            parking: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
                <View
                  style={{
                    height: 60,
                    backgroundColor: 'white',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {!features.wifi ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                          color: '#ccc',
                        }}>
                        Wifi
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            wifi: true,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_unselected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 25,
                          marginTop: 20,
                        }}>
                        Wifi
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            wifi: false,
                          });
                        }}>
                        <Image
                          style={{fontSize: 16, marginRight: 25, marginTop: 20}}
                          source={require('../assets/images/filter_selected.png')}
                        />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </>
          )}
          {buttonView === 2 && (
              <View style={{flex:1,borderWidth:1}}>
              {currentLatitude && currentLongitude !== '' ? (
              
                  <Maps
                    latitude={currentLatitude}
                    longitude={currentLongitude}
                    mapRef={mapRef}
                    viewStyle={{flex:1}}
                  />
               
              ) : null}
              <SearchViewComponent/>
           </View>
          )}
          {buttonView === 1 && (
            <View>
              <SearchViewComponent />
              <SearchViewComponent />
              <SearchViewComponent />
              <SearchViewComponent />
              <SearchViewComponent />
              <SearchViewComponent />
            </View>
          )}
        </View>
      </ScrollView>
      {buttonView === 1 && (
        <View style={styles.buttonbody}>
          <TouchableOpacity onPress={handleMapView} style={styles.button}>
            <Text style={styles.buttontext}>Map View</Text>
          </TouchableOpacity>
        </View>
      )}
      {buttonView === 2 && (
        <View style={styles.buttonbody}>
          <TouchableOpacity onPress={handleListView} style={styles.button}>
            <Text style={styles.buttontext}>List View</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: Platform.OS === 'ios' ? 160 : 140,
    backgroundColor: '#370F24',
  },
  menu: {
    height: 22,
    width: 22,
  },
  textInput: {
    height: 40,
    width: '75%',
    marginLeft: 10,
    marginTop: 2,
    color: '#2B2B2B',
  },
  button: {
    height: 60,
    backgroundColor: '#301934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbody: {
    width: '100%',
    flex: 1,
    // justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  buttontext: {
    height: 28,
    width: 100,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 20,
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];
