import React,{useState,useEffect} from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewViewComponent} from '../components/ReviewComponent';
import { useDispatch,useSelector } from 'react-redux';

export const ViewPhoto = ({navigation,route}) => {
  const {height, width} = useWindowDimensions();
  const [data,setData] = useState('');
  const state = useSelector(state=> state.status.initialState);
  const dispatch = useDispatch();
  console.log(route.params);
  //  const place_id =route.params.data._id;
  //  const img_id =route.params.data.reviews._id;
  //  console.log(place_id);
  //  console.log(img_id);
  const call = async () =>{
    const body={
      "placeId":item,
    }
    const res = await viewReviewApi(body);
    setData(res.reviews);
  }

  useEffect(() => {
    //call();
  },[state]);


  return (
    <ImageBackground
      source={require('../assets/images/images.jpeg')}
      resizeMode="cover"
      style={{flex: 1}}>
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
              source={require('../assets/images/close_icon_mdpi.png')}
              style={{height: 22, width: 26}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Avenir Medium',
              fontSize: 26,
              color: '#FFF',
              marginLeft: 30,
              marginTop: -5,
            }}>
          dhsagdsa
          </Text>
          <Image
            source={require('../assets/images/share_icon.png')}
            style={{height: 22, width: 26}}
          />
        </View>
      </SafeAreaView>
      <View style={styles.viewBottom}>
        <View style={{flexDirection:'row',marginTop:20,marginLeft:20,}}>
        <Image
            source={require('../assets/images/images.jpeg')}
            style={{height: 70, width: 70, borderRadius: 50}}
        />
        <View style={{marginTop:0,marginLeft:20,}}>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 20,
                fontWeight: '500',
                color: 'white',}}
            >
                 Satish Balu
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 20,
                fontWeight: '500',
                color: 'white',}}
            >
                Added May 12,2016
            </Text>
        </View>

        </View>
     

      </View>
    </ImageBackground>
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
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  viewBottom:{
    height:100,
    width:'100%',
    backgroundColor:'black',
    opacity:0.7,
    position:'absolute',
    bottom:0,
  }
});
