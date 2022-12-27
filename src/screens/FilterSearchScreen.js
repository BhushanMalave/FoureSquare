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
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {SearchViewComponent} from '../components/SearchViewComponent';
import {SearchViewComponentMap} from '../components/searchViewComponentMap';
import MapSearch from '../components/MapSearch';
import {SearchApi} from '../authorization/Auth';
import {nearYouPlaces} from '../authorization/Auth';
import {topPickPlaces} from '../authorization/Auth';
import {popularPlaces} from '../authorization/Auth';
import {placeCategoryLunch} from '../authorization/Auth';
import {placeCategoryCafe} from '../authorization/Auth';
import {getNearByCityApi} from '../authorization/Auth';
import {filterSearchApi} from '../authorization/Auth';

export const FilterSearch = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const state = useSelector(state => state.status.initialState);
  const [text, setText] = useState('');
  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);

  const [iconState, setIconState] = useState(false);
  const [onFocus, setOnFocus] = useState(0);
  const [mapSelect, setMapSelect] = useState(false);
  const [buttonView, setButtonView] = useState(0);

  const latitude = useSelector(state => state.userDetails.userlatitude);
  const longitude = useSelector(state => state.userDetails.userlongitude);
  const [id, setId] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState(longitude);
  const [currentLatitude, setCurrentLatitude] = useState(latitude);
  const [data, setData] = useState([]);
  const favData = useSelector(state => state.userDetails.userFavData);
  const [cityData, setCityData] = useState(null);

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

  const [filterData, setFilterData] = useState({
    latitude: latitude,
    longitude: longitude,
    text: '',
    radius: text2,
    priceRange: '',
    sortBy: '',
    acceptcreditCredit: false,
    delivery: false,
    dogFriendly: false,
    familyFriendlyPlace: false,
    inWalkingdistance: false,
    outdoorSeating: false,
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
    setFilterData({
      ...filterData,
      radius: text2,
    });
  };
  const setOnFocus1 = () => {
    setOnFocus(1);
    setButtonView(0);
    setIconState(true);
    setMapSelect(false);
  };

  const setOnFocus2 = () => {
    setOnFocus(2);
    setButtonView(0);
    setIconState(true);
    setMapSelect(false);
  };
  const handleMapView = () => {
    setButtonView(2);
    setOnFocus(0);
    setMapSelect(false);
  };
  const handleListView = () => {
    setButtonView(1);
    setOnFocus(0);
    setMapSelect(false);
  };

  const handleSearch = async () => {
    setButtonView(1);
    setOnFocus(0);
    setMapSelect(false);

    const body = {
      latitude: latitude,
      longitude: longitude,
      text: text,
    };

    if (text.length <= 2) {
      setOnFocus(0);
      setButtonView(0);
      setData(null);
    }
    const res = await SearchApi(body);
    setData(res.result);
    setOnFocus(0);
  };

  const [Viewable, SetViewable] = React.useState([]);
  const ref = React.useRef(null);

  const onViewRef = React.useRef(viewableItems => {
    let Check = [];
    for (var i = 0; i < viewableItems.viewableItems.length; i++) {
      Check.push(viewableItems.viewableItems[i].item);
    }
    SetViewable(Check);
  });

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 90});

  const renderItem = ({item}) => {
    setCurrentLatitude(Viewable[0]?.location?.coordinates[1]);
    setCurrentLongitude(Viewable[0]?.location?.coordinates[0]);
    setId(Viewable[0]?._id);
    return (
      <SearchViewComponentMap
        item={item}
        state={state}
        onPress={() => {
          navigation.navigate('DetailScreen', {item});
        }}
      />
    );
  };

  const useMyCurrentLocation = async () => {
    const obj = {
      latitude: latitude,
      longitude: longitude,
    };
    const data = await nearYouPlaces(obj);
    setData(data);
    setOnFocus(0);
    setButtonView(1);
    setMapSelect(false);
  };

  const topPicksCall = async () => {
    const obj = {
      latitude: latitude,
      longitude: longitude,
    };
    const data = await topPickPlaces(obj);
    setData(data);
    setOnFocus(0);
    setButtonView(1);
    setMapSelect(false);
  };

  const popularCall = async () => {
    const obj = {
      latitude: latitude,
      longitude: longitude,
    };
    const data = await popularPlaces(obj);
    setData(data);
    setOnFocus(0);
    setButtonView(1);
    setMapSelect(false);
  };

  const lunchCall = async () => {
    const obj = {
      latitude: latitude,
      longitude: longitude,
    };
    const data = await placeCategoryLunch(obj);
    setData(data);
    setOnFocus(0);
    setButtonView(1);
    setMapSelect(false);
  };

  const cafeCall = async () => {
    const obj = {
      latitude: latitude,
      longitude: longitude,
    };
    const data = await placeCategoryCafe(obj);
    setData(data);
    setOnFocus(0);
    setButtonView(1);
    setMapSelect(false);
  };

  const SuggestaionNearByPlacesCall = async () => {
    const obj = {
      latitude: latitude,
      longitude: longitude,
    };
    const data = await getNearByCityApi(obj);
    setCityData(data);
  };

  const callMapSelect = async () => {
    const obj = {
      latitude: currentLatitude,
      longitude: currentLongitude,
    };
    //  console.info(obj);
    const data = await nearYouPlaces(obj);
    // console.info(data);
    setData(data);
    setOnFocus(0);
    setButtonView(1);
    setMapSelect(false);
    setCurrentLatitude(latitude);
    setCurrentLongitude(longitude);
  };

  const nearByPlaceData = async item => {
    setButtonView(1);
    setOnFocus(0);
    const body = {
      latitude: item?.location?.coordinates[1],
      longitude: item?.location?.coordinates[0],
      text: item?.cityName,
    };
    const res = await SearchApi(body);
    console.log(res.result);
    setData(res.result);
    setOnFocus(0);
    setMapSelect(false);
  };

  const callFilterData = async () => {
    const res = await filterSearchApi(filterData);
    setData(res);
    setFilterData({
      latitude: latitude,
      longitude: longitude,
      text: '',
      radius: text2,
      priceRange: '',
      sortBy: '',
      acceptcreditCredit: false,
      delivery: false,
      dogFriendly: false,
      familyFriendlyPlace: false,
      inWalkingdistance: false,
      outdoorSeating: false,
      parking: false,
      wifi: false,
    });
    setFeatures({
      acceptCC: false,
      deliver: false,
      dogFriendly: false,
      familyFriendly: false,
      walkingDistance: false,
      outDoorSeating: false,
      parking: false,
      wifi: false,
    });

    setPrice({
      one: false,
      tens: false,
      hundreds: false,
      thousands: false,
    });

    setSortBy({
      popular: false,
      distance: false,
      rating: false,
    });

    setText2('');
    setIconState(true);
    setOnFocus(0);
    setButtonView(1);
  };

  useEffect(() => {
    SuggestaionNearByPlacesCall();
  }, [state]);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.topbar}>
          <SafeAreaView>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 20 : 30,
                flexDirection: 'row',
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setFilterData({
                    latitude: latitude,
                    longitude: longitude,
                    text: '',
                    radius: text2,
                    priceRange: '',
                    sortBy: '',
                    acceptcreditCredit: false,
                    delivery: false,
                    dogFriendly: false,
                    familyFriendlyPlace: false,
                    inWalkingdistance: false,
                    outdoorSeating: false,
                    parking: false,
                    wifi: false,
                  });
                  setFeatures({
                    acceptCC: false,
                    deliver: false,
                    dogFriendly: false,
                    familyFriendly: false,
                    walkingDistance: false,
                    outDoorSeating: false,
                    parking: false,
                    wifi: false,
                  });

                  setPrice({
                    one: false,
                    tens: false,
                    hundreds: false,
                    thousands: false,
                  });

                  setSortBy({
                    popular: false,
                    distance: false,
                    rating: false,
                  });

                  setText2('');
                  setIconState(true);
                  setOnFocus(0);
                  setButtonView(0);

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
                    setButtonView(0);
                    setMapSelect(false);
                  }}>
                  <Image
                    style={styles.filter}
                    source={require('../assets/images/filter_icon.png')}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    callFilterData();
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
                value={text}
                placeholder="Near Me"
                placeholderTextColor={'#ccc'}
                style={styles.textInput}
                onChangeText={handleText1}
                onFocus={setOnFocus2}
              />
            </View>
          </SafeAreaView>
        </View>

        <View style={{flex: 1, marginBottom: 40}}>
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
                {cityData?.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      nearByPlaceData(item);
                    }}
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 0.7,
                      borderBottomColor: '#ccc',
                      marginTop: 0,
                      backgroundColor: '#fff',
                      height: 90,
                    }}>
                    <Image
                      source={{uri: item?.placeImage}}
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
                        textTransform: 'capitalize',
                      }}>
                      {item?.cityName}
                    </Text>
                  </TouchableOpacity>
                ))}
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
                <TouchableOpacity
                  onPress={topPicksCall}
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
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={popularCall}
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
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={lunchCall}
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
                    Lunch
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cafeCall}
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
                    Cafe
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {onFocus === 2 && (
            <>
              <TouchableOpacity
                onPress={useMyCurrentLocation}
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
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMapSelect(true);
                  setOnFocus(0);
                }}
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
              </TouchableOpacity>
            </>
          )}

          {mapSelect === true && (
            <View style={{flex: 1, height: 700}}>
              {currentLatitude && currentLongitude !== '' ? (
                <MapView
                  style={styles.mapStyle}
                  initialRegion={{
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  onPress={e => {
                    setCurrentLatitude(e.nativeEvent.coordinate.latitude);
                    setCurrentLongitude(e.nativeEvent.coordinate.longitude);

                    setTimeout(() => {
                      callMapSelect();
                    }, 500);
                  }}
                  customMapStyle={mapStyle}>
                  <Marker
                    draggable
                    coordinate={{
                      latitude: currentLatitude,
                      longitude: currentLongitude,
                      latitudeDelta: 0.53,
                      longitudeDelta: 0.01,
                    }}
                    onDragEnd={e =>
                      alert(JSON.stringify(e.nativeEvent.coordinate))
                    }
                  />
                </MapView>
              ) : null}
            </View>
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
                        setFilterData({
                          ...filterData,
                          sortBy: 'viewCount',
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
                        setFilterData({
                          ...filterData,
                          sortBy: 'dist.calculated',
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
                        setFilterData({
                          ...filterData,
                          sortBy: 'totalrating',
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
                        width: 40,
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
                        setFilterData({
                          ...filterData,
                          priceRange: 1,
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
                        setFilterData({
                          ...filterData,
                          priceRange: 10,
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
                        setFilterData({
                          ...filterData,
                          priceRange: 100,
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
                        setFilterData({
                          ...filterData,
                          priceRange: 1000,
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
                          setFilterData({
                            ...filterData,
                            acceptcreditCredit: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        Accepts credits cards
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            acceptCC: false,
                          });
                          setFilterData({
                            ...filterData,
                            acceptcreditCredit: false,
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
                          setFilterData({
                            ...filterData,
                            delivery: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        Delivery
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            deliver: false,
                          });
                          setFilterData({
                            ...filterData,
                            delivery: false,
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
                          setFilterData({
                            ...filterData,
                            dogFriendly: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        Dog Friendly
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            dogFriendly: false,
                          });
                          setFilterData({
                            ...filterData,
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
                          setFilterData({
                            ...filterData,
                            familyFriendlyPlace: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        Family-Friendly places
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            familyFriendly: false,
                          });
                          setFilterData({
                            ...filterData,
                            familyFriendlyPlace: false,
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
                          setFilterData({
                            ...filterData,
                            inWalkingdistance: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        In walking distance
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            walkingDistance: false,
                          });
                          setFilterData({
                            ...filterData,
                            inWalkingdistance: false,
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
                          setFilterData({
                            ...filterData,
                            outdoorSeating: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        Outdoor seating
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            outDoorSeating: false,
                          });
                          setFilterData({
                            ...filterData,
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
                          setFilterData({
                            ...filterData,
                            parking: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        Parking
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            parking: false,
                          });
                          setFilterData({
                            ...filterData,
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
                          setFilterData({
                            ...filterData,
                            wifi: true,
                          });
                        }}>
                        <Icon
                          name="plus"
                          size={23}
                          color="rgba(53, 19, 71, 0.4)"
                          style={{marginRight: 22, marginTop: 18}}
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
                          color: '#ccc',
                        }}>
                        Wifi
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setFeatures({
                            ...features,
                            wifi: false,
                          });
                          setFilterData({
                            ...filterData,
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
            <View style={{flex: 1, height: 700}}>
              {currentLatitude && currentLongitude !== '' ? (
                <MapSearch
                  latitude={currentLatitude}
                  longitude={currentLongitude}
                  data={data}
                  _id={id}
                  viewStyle={{flex: 1}}
                />
              ) : null}

              <View style={{height: 140, width: width}}>
                <FlatList
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={item => item?._id}
                  horizontal
                  pagingEnabled
                  ref={ref}
                  onViewableItemsChanged={onViewRef.current}
                  viewabilityConfig={viewConfigRef.current}
                />
              </View>
            </View>
          )}
          {buttonView === 1 && (
            <View>
              {!data ? (
                <ActivityIndicator size="large" color="#7A7A7A" />
              ) : data?.[0] ? (
                data?.map(item => (
                  <View key={item?._id}>
                    <SearchViewComponent
                      item={item}
                      state={state}
                      onPress={() => {
                        navigation.navigate('DetailScreen', {item});
                      }}
                    />
                  </View>
                ))
              ) : (
                <View>
                  <Text
                    style={{
                      color: 'black',
                      alignSelf: 'center',
                      fontSize: 18,
                      marginTop: 20,
                    }}>
                    No Search Found
                  </Text>
                </View>
              )}
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
  container: {
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
