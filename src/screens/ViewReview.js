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
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ReviewViewComponent} from '../components/ReviewComponent';
import {viewReviewApi} from '../authorization/Auth';
import {useDispatch, useSelector} from 'react-redux';
import {setInitialState} from '../redux/ReduxPersist/States';

export const ViewReview = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const [dataReview, setDataReview] = useState('');
  const login = useSelector(state => state.status.loginState);
  const state = useSelector(state => state.status.initialState);
  const dispatch = useDispatch();
  const placeId = route.params.placeId;
  const name = route.params.data.placeName;
  const data = route.params.data;
  const item = route.params.item;
  const addRev = 1;
 

  const call = async () => {
    const body = {
      placeId: placeId,
    };
    const res = await viewReviewApi(body);
    setDataReview(res.reviews);
  };

  const onRefresh = React.useCallback(async () => {
    call();
  }, [refreshing]);

  useEffect(() => {
    call();
  }, [state]);
  return (
    <ScrollView style={{flex: 1}}  refreshControl={
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
              <Icon name="addfile" size={24} color="#fff" />
            ) : (
              <Icon
                name="addfile"
                size={24}
                color="#fff"
                onPress={() => {
                  navigation.navigate('AddReviews', {
                    placeId,
                    addRev,
                    data,
                    item,
                  });
                }}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
      <View style={{flex: 1}}>
        {!dataReview ? (
          <ActivityIndicator size="large" color="#7A7A7A" />
        ) : dataReview?.[0] ? (
          dataReview?.map(item => (
            <View key={item?._id}>
              <ReviewViewComponent item={item} />
            </View>
          ))
        ) : (
          <View
            style={{
              width: '100%',
            }}>
            <Text
              style={{
                color: 'black',
                marginTop: 20,
                alignSelf: 'center',
              }}>
              No Reviews Found
            </Text>
          </View>
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
