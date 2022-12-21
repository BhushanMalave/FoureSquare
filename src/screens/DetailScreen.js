import React, {useState, useEffect} from 'react';
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

export const DetailScreen = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const state = useSelector(state => state.status.ratingState);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const item = route.params.item;
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');

  const mapRef = useRef(null);
  const call = async () => {
    const obj = {
      placeName: item.placeName,
      placeId: item._id,
    };
    const data = await placeDetails(obj);
    setData(data);
    // console.log(data)
  };

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
    call();
  }, []);

  const getOneTimeLocation = () => {
    Toast.show('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setTimeout(async () => {
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
            // Toast.show('Failed to animate direction');
          }
        }, 500);
        // Toast.show('You are Here');

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
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={require('../assets/images/back_icon.png')}
                  style={{height: 22, width: 26}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontSize: 22,
                  color: '#FFF',
                  marginLeft: 30,
                  marginTop: -5,
                }}>
                {data?.placeName}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={require('../assets/images/share_icon.png')}
                  style={{height: 22, width: 26}}
                />
                <Image
                  source={require('../assets/images/favourite_iconcopy.png')}
                  style={{height: 24, width: 26, marginLeft: 20}}
                />
              </View>
            </View>
            <View
              style={{
                marginTop:
                  width > height
                    ? Platform.OS === 'ios'
                      ? 160
                      : 130
                    : Platform.OS === 'ios'
                    ? 120
                    : 140,
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
                  height:60,
                }}>
                {data?.placeName}
              </Text>
              <View style={{marginTop: 0}}>
                <AirbnbRating
                  count={5}
                  defaultRating={3}
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
              navigation.navigate('PhotosGallery');
            }}>
            <Image
              source={require('../assets/images/photos_icon.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={{color: '#7A7A7A', marginTop: 3}}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewReviews');
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
            height:115,
          }}>
         {data?.overview}
        </Text>
        </ScrollView>
        <View
          style={{height: Platform.OS === 'ios' ? 180 : 230, marginTop: 20}}>
          {currentLatitude && currentLongitude !== '' ? (
            <Maps
              latitude={currentLatitude}
              longitude={currentLongitude}
              mapRef={mapRef}
            />
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
             {data?.address?.length > 45 ? data?.address?.substring(0,45)+'...' : data?.address}
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
              +91 {data?.phoneNumber}
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
        <View style={styles.buttonbody}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddReviews');
            }}
            style={styles.button}>
            <Text style={styles.buttontext}>Add Review</Text>
          </TouchableOpacity>
        </View>
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
});
