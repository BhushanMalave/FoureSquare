import React, {useState, useEffect} from 'react';
import Toast from 'react-native-simple-toast';
import Share from 'react-native-share';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Maps from '../components/Maps';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useSelector, useDispatch} from 'react-redux';
import {RatingModel} from '../components/RatingModel';
import {setRatingState} from '../redux/ReduxPersist/States';
import Geolocation from '@react-native-community/geolocation';
import {useRef} from 'react';
import {placeDetails} from '../authorization/Auth';
import {addFavouriteApi} from '../authorization/Auth';
import {setInitialState} from '../redux/ReduxPersist/States';
import {setOverallRating} from '../redux/ReduxPersist/User';
import {setPlaceId} from '../redux/ReduxPersist/User';

export const DetailScreen = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const state = useSelector(state => state.status.ratingState);
  const login = useSelector(state => state.status.loginState);
  const token = useSelector(state => state.userDetails.token);
  const favData = useSelector(state => state.userDetails.userFavData);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const item = route.params.item;
  const placeId = route.params.item._id;
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [rating, setRating] = useState('');

  const share = async () => {
    shareOptions = {
      url: 'https' + data?.placeImages?.url.substring(4),
      message: `Place Name:${data?.placeName}${'\n'}Address:${
        data?.address
      }${'\n'}Phone No:${
        data?.placePhone
      }${'\n'}Rating:${data?.totalrating}${'\n'}`,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      Toast.show('Shared Successfully');
    } catch (error) {
      console.log('error while sharing');
    }
  };

  const mapRef = useRef(null);
  const call = async () => {
    const obj = {
      placeName: item.placeName,
      placeId: item._id,
    };
    const data = await placeDetails(obj);
    setData(data);
    setCurrentLongitude(data?.location?.coordinates[0]);
    setCurrentLatitude(data?.location?.coordinates[1]);

    const no = item?.totalrating / 2;
    setRating(no);
    dispatch(setOverallRating(rating));
    dispatch(setPlaceId(item._id));
  };

  const addToFavourite = async id => {
    const body = {
      placeId: id,
    };
    const res = await addFavouriteApi(token, body);
    console.log(res);
    dispatch(setInitialState());
  };

  const removeFromFavourite = async id => {
    const body = {
      placeId: id,
    };
    const res = await addFavouriteApi(token, body);
    console.log(res);
    dispatch(setInitialState());
  };

  useEffect(() => {
    call();
  }, [state]);

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{uri: item?.placeImages?.url}}
        style={styles.hotelimg}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 0.5, 1]}
          style={{height: 330}}
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.0)', 'rgba(0,0,0,0.8)']}>
          <SafeAreaView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                marginTop: Platform.OS === 'android' ? 30 : 10,
                height: 130,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  dispatch(setInitialState());
                }}>
                <Image
                  source={require('../assets/images/back_icon.png')}
                  style={{height: 22, width: 26}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontSize: 24,
                  color: '#FFF',
                  marginLeft: 30,
                  marginTop: -5,
                  height: 100,
                  width: '60%',
                  textAlign: 'center',
                }}>
                {data?.placeName}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TouchableOpacity onPress={()=>{share()}}>
                <Image
                  source={require('../assets/images/share_icon.png')}
                  style={{height: 22, width: 26, marginRight: 5}}
                />
                </TouchableOpacity>
                {login === 1 ? (
                  <Pressable>
                    <Image
                      source={require('../assets/images/favourite_icon_copy.png')}
                      style={styles.star}
                    />
                  </Pressable>
                ) : favData?.length > 0 ? (
                  favData.filter(ele => ele._id === item._id)?.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        addToFavourite(data?._id);
                      }}>
                      <Image
                        source={require('../assets/images/favourite_icon.png')}
                        style={styles.star}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        removeFromFavourite(data?._id);
                      }}>
                      <Image
                        source={require('../assets/images/favourite_icon_copy.png')}
                        style={styles.star}
                      />
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      removeFromFavourite(data?._id);
                    }}>
                    <Image
                      source={require('../assets/images/favourite_star.png')}
                      style={styles.star}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                marginTop:
                  width > height
                    ? Platform.OS === 'ios'
                      ? 60
                      : 30
                    : Platform.OS === 'ios'
                    ? 30
                    : 50,
                marginHorizontal:
                  width > height
                    ? Platform.OS === 'ios'
                      ? 160
                      : 200
                    : Platform.OS === 'ios'
                    ? 25
                    : 25,
              }}>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontSize: 20,
                  color: 'white',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: 40,
                }}>
                {data?.keywords}
              </Text>
              <View style={{marginTop: 0}}>
                <AirbnbRating
                  count={5}
                  defaultRating={rating}
                  size={20}
                  isDisabled={true}
                  showRating={false}
                />
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            marginHorizontal: 75,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              {
                dispatch(setRatingState());
              }
            }}>
            <Image
              source={require('../assets/images/rating_icon.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={{color: '#7A7A7A', marginTop: 3}}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PhotosGallery', {placeId, data});
            }}>
            <Image
              source={require('../assets/images/photos_icon.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={{color: '#7A7A7A', marginTop: 3}}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewReviews', {data, placeId});
            }}>
            <Image
              source={require('../assets/images/review_icon.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={{color: '#7A7A7A', marginTop: 3}}>Review</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0.3,
            marginTop: 20,
            marginHorizontal: 25,
            marginBottom: 20,
            opacity: 0.5,
            color: '#7A7A7A',
          }}
        />

        <Text
          style={{
            marginHorizontal: 25,
            fontFamily: 'Avenir Book',
            fontSize: 22,
            color: '#351347',
          }}>
          Overview
        </Text>
        <ScrollView>
          <Text
            style={{
              marginLeft: 25,
              fontFamily: 'Avenir Book',
              fontSize: 18,
              color: '#8D8D8D',
              lineHeight: 23,
              marginTop: 10,
              marginRight: 20,
              height: 115,
            }}>
            {data?.overview}
          </Text>
        </ScrollView>
        <View
          style={{height: Platform.OS === 'ios' ? 180 : 230, marginTop: 20}}>
          {currentLatitude && currentLongitude !== '' ? (
            <Maps latitude={currentLatitude} longitude={currentLongitude} />
          ) : null}
        </View>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          locations={[0.4, 0.8]}
          colors={['rgba(249, 245, 238 ,1)', 'rgba(249, 245, 238,0)']}
          style={{
            height: Platform.OS === 'ios' ? 180 : 230,
            marginTop: Platform.OS === 'ios' ? -180 : -230,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 18,
                color: '#7A7A7A',
                fontWeight: '500',
                marginTop: 20,
                width: '50%',
                marginLeft: Platform.OS === 'ios' ? 10 : 15,
              }}>
              {data?.address?.length > 45
                ? data?.address?.substring(0, 45) + '...'
                : data?.address}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 18,
                color: '#7A7A7A',
                fontWeight: '500',
                marginTop: 20,
                marginLeft: Platform.OS === 'ios' ? 10 : 15,
              }}>
              +91 {data?.phoneNumber.substring(2,13)}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 18,
                color: '#7A7A7A',
                fontWeight: '500',
                marginTop: 20,
                marginLeft: Platform.OS === 'ios' ? 10 : 15,
              }}>
              Drive : 5km
            </Text>
          </View>
        </LinearGradient>
        {login === 2 ? (
          <View style={styles.buttonbody}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AddReviews', {data});
              }}
              style={styles.button}>
              <Text style={styles.buttontext}>Add Review</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonbody}>
            <View
              style={styles.button}>
              <Text style={styles.buttontext}>Add Review</Text>
            </View>
          </View>
        )}
      </View>
      <RatingModel />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hotelimg: {
    flex: 1,
    height: 300,
  },
  button: {
    height: 70,
    backgroundColor: '#301934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbody: {
    width: '100%',
  },
  buttontext: {
    height: 28,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
  },
  star: {
    height: 24,
    width: 28,
  },
});
