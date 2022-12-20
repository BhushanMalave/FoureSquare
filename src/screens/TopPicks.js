import React,{useState,useEffect} from 'react';
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
  PermissionsAndroid,
} from 'react-native';
import {HotelViewComponent} from '../components/HotelViewComponent';
import Geolocation from '@react-native-community/geolocation';
import {topPickPlaces} from '../authorization/Auth';
import {useRef} from 'react';

export const TopPicks = ({navigation}) => {
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
            console.log(obj);
            const data = await topPickPlaces(obj);
            setData(data);
            console.log(data);
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
      {!data ? (
        <ActivityIndicator size="large" color="#7A7A7A" />
      ) : (
        <HotelViewComponent
          onPress={() => {
            navigation.navigate('DetailScreen');
          }}
        />
      )}
     
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
