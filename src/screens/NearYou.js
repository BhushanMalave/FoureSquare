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
  ActivityIndicator,
} from 'react-native';
import {HotelViewComponent} from '../components/HotelViewComponent';
import Maps from '../components/Maps';
import Geolocation from '@react-native-community/geolocation';
import {useRef} from 'react';
import {nearYouPlaces} from '../authorization/Auth';

export const NearYou = ({navigation}) => {
  const [loading, setLoading] = useState(false);
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

  const getOneTimeLocation = async () => {
    Toast.show('Getting Location ...');
    setLoading(true);
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
         
            setLoading(false);
            const obj = {
              latitude: currentLatitude,
              longitude: currentLongitude,
            };
            const data = await nearYouPlaces(obj);
            setData(data);
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{height: 200}}>
        {currentLatitude && currentLongitude !== '' ? (
          <Maps
            latitude={currentLatitude}
            longitude={currentLongitude}
            mapRef={mapRef}
          />
        ) : null}
        {loading ? <ActivityIndicator size="large" color="#7A7A7A" /> : null}
      </View>

      {!data ? (
        <ActivityIndicator size="large" color="#7A7A7A" />
      ) : (
        <>
        {data?.map(item => (
          <View key={item?._id} >
             <HotelViewComponent
             item={item}
             onPress={() => {
            navigation.navigate('DetailScreen',{item});
          }}
        />

          </View>
        ))}
       
        </>
       
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
