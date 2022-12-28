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
  RefreshControl,Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewViewComponent} from '../components/ReviewComponent';
import {useDispatch, useSelector} from 'react-redux';
import {viewPhotoApi} from '../authorization/Auth';
import {setInitialState} from '../redux/ReduxPersist/States';
import Share from 'react-native-share';

export const PhotosGallery = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [dataImg, setDataImg] = useState([10]);
  const [refreshing, setRefreshing] = useState(false);
  const login = useSelector(state => state.status.loginState);
  const state = useSelector(state => state.status.initialState);
  const dispatch = useDispatch();
  const placeId = route.params.placeId;
  const name = route.params.data.placeName;
  const data = route.params.data;
  const item = route.params.item;
  const addRev = 2;

  const getStructuredData = reviewArray => {
    let structuredImagesData = [];
    let tempObj = {};
    reviewArray.forEach(item => {
      item.reviewImage.urls.forEach(pic => {
        tempObj = {};
        tempObj.url = pic;
        tempObj.id = item?.userId?._id;
        tempObj.name = item?.userId?.fullName;
        tempObj.date =item.createdOn,
        tempObj.profilePic = item?.userId?.profileImage?.cloudinary_id,
        structuredImagesData.push(tempObj);
      });
    });
    return structuredImagesData;
  };
  const call = async () => { 
    const body = {
      placeId: placeId,
    };
    const res = await viewPhotoApi(body);
    const da = getStructuredData(res.reviews);
    setDataImg(da);
  };

  const log = () => {
    
    Alert.alert('', 'Login to add Photos', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Login',
        onPress: () => {
          dispatch(setLoginState(0));
        },
      },
    ]);
  };

  const onRefresh = React.useCallback(async () => {
    call();
  }, [refreshing]);

  useEffect(() => {
    call();
  }, [state]);

  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
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
                navigation.navigate('DetailScreen', {item});
                dispatch(setInitialState());
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
            {login === 1 ? (
              <TouchableOpacity onPress={()=>{log()}}>
                <Image source={require('../assets/images/aad_photo.png')} style={{height:24,width:34,}}/>
              </TouchableOpacity>
              
            ) : (
              <TouchableOpacity   onPress={() => {
                navigation.navigate('AddReviews', {placeId, addRev, data , item});
              }}>
              <Image source={require('../assets/images/aad_photo.png')} style={{height:24,width:34,}}/>
            </TouchableOpacity>
             
            )}
          </View>
        </SafeAreaView>
      </View>
      <ScrollView contentContainerStyle={{flex: 1, backgroundColor: 'black',height:height-100}}>
        <View style={styles.container}>
          {dataImg[0] === 10 ? (
            <ActivityIndicator
              size="large"
              color="#7A7A7A"
              style={{alignSelf: 'center', width: '100%'}}
            />
          ) : (
            <>
              {dataImg?.length > 0  ? (
                dataImg?.map(item => {
                  const id = item?.id;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('ViewPhoto', {name,item});
                      }}>
                      <Image
                        source={{uri: item.url}}
                        style={{
                          height: Platform.OS === 'ios' ? 123 : 135,
                          width: Platform.OS === 'ios' ? 123 : 135,
                          marginVertical: 3,
                          marginHorizontal: 3,
                        }}
                      />
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View
                  style={{
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      marginTop: 20,
                      alignSelf: 'center',
                    }}>
                    No Images Found
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </ScrollView>
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
