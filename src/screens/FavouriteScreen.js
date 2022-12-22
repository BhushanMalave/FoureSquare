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
  ActivityIndicator,
} from 'react-native';
import {FaviouriteViewComponent} from '../components/FavouriteViewComponent';
import { getFavouriteApi } from '../authorization/Auth';
import { setUserFavData } from '../redux/ReduxPersist/User';
import { useDispatch,useSelector } from 'react-redux';
import { addFavouriteApi } from '../authorization/Auth';
import { setInitialState } from '../redux/ReduxPersist/States';

export const Favourite = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [text, setText] = useState('');
  const [text1, setText1] = useState(null);
  const [text2, setText2] = useState(null);
  const [iconState, setIconState] = useState(true);
  const data= useSelector(state => state.userDetails.userFavData);
  const state = useSelector(state=> state.status.initialState);
  const dispatch=useDispatch();
  const token = useSelector(state=>state.userDetails.token);
  const latitude = useSelector(state=>state.userDetails.userlatitude);
  const longitude =useSelector(state=>state.userDetails.userlongitude);


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

  const handleText1 = string => {
    setText1(string);
  };
  const handleText2 = string => {
    setText2(string);
  };

  const handleSearch = () => {};

  const favouriteDataCall = async() => {
    const body ={
      'latitude':latitude,
      "longitude":longitude,
    }
    const res = await getFavouriteApi(token,body);
     dispatch(setUserFavData(res));  
     console.log("hdhs")  ;
}
const removeFromFavourite = async (id) => {
  const body ={
    "placeId":id,
  }
  const res = await addFavouriteApi(token,body);
  console.log(res);
}


useEffect(() => {
  favouriteDataCall(); 
}, [state]);


  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.topbar}>
          <SafeAreaView style={{flex: 1}}>
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
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Avenir Medium',
                  fontSize: 28,
                  marginTop: -5,
                  fontWeight: '500',
                }}>
                Favourites
              </Text>

              {iconState ? (
                <TouchableOpacity
                  onPress={() => {
                    setIconState(false);
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
                source={require('../assets/images/search_icon.png')}
                style={{tintColor: '#cccccc', marginTop: 12, marginLeft: 20}}
              />
              <TextInput
                name="search"
                placeholder="Search"
                placeholderTextColor={'#ccc'}
                style={styles.textInput}
                onChangeText={handleText1}
                onChange={handleSearch}
              />
            </View>
          </SafeAreaView>
        </View>

        <View>
          <>
            <View showsVerticalScrollIndicator={false}>
              {!data ? (
                <ActivityIndicator size="large" color="#7A7A7A" />
              ) : (
                <>
                  {data?.map(item => (
                    <View key={item?._id}>
                      <FaviouriteViewComponent
                        item={item}
                        onPress={()=>{ navigation.navigate('DetailScreen', {item})}}
                        onLongPress={() => {removeFromFavourite(item?._id);
                          dispatch(setInitialState());
                          }}
                      />
                    </View>
                  ))}
                </>
              )}
            </View>

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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
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
                            style={{
                              fontSize: 16,
                              marginRight: 25,
                              marginTop: 20,
                            }}
                            source={require('../assets/images/filter_selected.png')}
                          />
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </>
            )}
          </>
        </View>
      </ScrollView>
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
});
