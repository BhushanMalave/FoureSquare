import React, {useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewViewComponent} from '../components/ReviewComponent';
import {useDispatch, useSelector} from 'react-redux';
import { viewPhotoApi } from '../authorization/Auth';

export const PhotosGallery = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [data, setData] = useState('');
  const state = useSelector(state => state.status.initialState);
  const dispatch = useDispatch();
  const item = route.params.data._id;
  const name = route.params.data.placeName;
  const call = async () => {
    const body = {
      placeId: item,
    };
    const res = await viewPhotoApi(body);
    
    setData(res.reviews[0]);
    console.log("====",data.reviewImage.urls)
  };

  useEffect(() => {
    call();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={styles.topbar}>
        <SafeAreaView>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 20 : 40,
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                dispatch(setInitialState);
              }}>
              <Image
                style={styles.menu}
                source={require('../assets/images/back_icon.png')}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Avenir Book',
                fontSize: 22,
                color: '#fff',
                marginTop: -5,
              }}>
              {name.length > 15 ? name.substring(0, 15) + '...' : name}
            </Text>
            <Icon name="camera-plus-outline" size={24} color="#fff" />
          </View>
        </SafeAreaView>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
        <View style={styles.container}>

        {!data ? (
        <ActivityIndicator size="large" color="#7A7A7A" />
      ) : (
        <>
          {data?.reviewImage?.urls.map(item => (
             <TouchableOpacity
             onPress={() => {
               navigation.navigate('ViewPhoto',{});
             }}>
             <Image
               source={{uri:item}}
               style={{
                 height: Platform.OS === 'ios' ? 123 : 135,
                 width: Platform.OS === 'ios' ? 123 : 135,
                 marginVertical: 3,
                 marginHorizontal: 3,
               }}
             />
           </TouchableOpacity>
          ))}
        </> 
      )}
         
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: Platform.OS === 'ios' ? 110 : 100,
    backgroundColor: '#370F24',
  },
  menu: {
    height: 22,
    width: 22,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
  },
});
