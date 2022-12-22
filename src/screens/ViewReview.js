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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { ReviewViewComponent } from '../components/ReviewComponent';
import { viewReviewApi } from '../authorization/Auth';

export const ViewReview = ({navigation,route}) => {
  const {height,width} = useWindowDimensions();
  const [data,setData] = useState('');
  const item =route.params.data._id;
  console.log(item);
  const call = async () =>{
    const body={
      "placeId":item,
    }
    const res = await viewReviewApi(body);
    setData(res);
    console.log(data);
  }

  useEffect(() => {
    call();
  }, []);
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.topbar}>
        <SafeAreaView>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 20 : 40,
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
               <TouchableOpacity onPress={()=>{navigation.goBack()}}>
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
              Attil
            </Text>
            <Icon name="addfile" size={24} color="#fff"   onPress={()=>{navigation.navigate('AddReviews')}} />
          </View>
        </SafeAreaView>
      </View>
      <View style={{flex:1}}>
      {!data ? (
        <ActivityIndicator size="large" color="#7A7A7A" />
      ) : (
        <>
          {/* {data?.reviews.map(item => (
            <View key={item?._id}>
              <ReviewViewComponent
                item={item} 
              />
            </View>
          ))} */}
        </> 
      )}
    </View>
       
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
});
