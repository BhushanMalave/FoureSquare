import React,{useState,useEffect} from 'react';
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
} from 'react-native';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';

export const ViewPhoto = ({navigation,route}) => {
  const {height, width} = useWindowDimensions();
  const [data,setData] = useState('');

  const state = useSelector(state=> state.status.initialState);
  const dispatch = useDispatch();
  const name = route.params.name;
  const item = route.params.item;

 const share = async () => {
  shareOptions = {
    url: 'https' + item?.url.substring(4),
    message: `Place Name:${name}${'\n'}
    `,
  };
  try {
    const shareResponse = await Share.open(shareOptions);
    Toast.show('Shared Successfully');
  } catch (error) {
    console.log('error while sharing');
  }
};


 console.log(item)
  useEffect(() => {
   
  },[state]);


  return (
    <ImageBackground
      source={{uri:item?.url}}
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
              fontSize: 22,
              color: '#FFF',
             // marginLeft: 30,
             // marginTop: -5,
            }}>
          {name.length > 15 ? name.substring(0, 15) + '...' : name}
          </Text>
          <TouchableOpacity onPress={()=>{share()}}>
          <Image
            source={require('../assets/images/share_icon.png')}
            style={{height: 22, width: 26}}
          />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={styles.viewBottom}>
        <View style={{flexDirection:'row',marginTop:20,marginLeft:20,}}>
          {item.profilePic ? (
              <Image
              source={{uri:item.profilePic}}
              style={{height: 70, width: 70, borderRadius: 50}}
          />
          ) : (
            <Image
            source={require('../assets/images/login.webp')}
            style={{height: 70, width: 70, borderRadius: 50}}
        />
          )}
       
        <View style={{marginTop:0,marginLeft:20,}}>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 20,
                fontWeight: '500',
                color: 'white',
              textTransform:'capitalize'}}
            >
                 {item.name ? item?.name : 'User'}
            </Text>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 20,
                fontWeight: '500',
                color: 'white',}}
            >
                Added {moment(item?.createdOn).format('MMMM D, YYYY')}
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
