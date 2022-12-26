import React from 'react';
import {useState} from 'react';
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

import ImagePicker from 'react-native-image-crop-picker';
import {setInitialState} from '../redux/ReduxPersist/States';
import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import {useSelector, useDispatch} from 'react-redux';
import {addReview} from '../authorization/Auth';
import {addImages} from '../authorization/Auth';

export const AddReview = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const token = useSelector(state => state.userDetails.token);
  const [text, setText] = useState('');
  const [imgData, setImgData] = useState([]);

  const placeId = route.params.placeId;
  const data = route.params.data;
  const addRev = route.params.addRev;
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    // console.log(text);
    // console.log(imgData);
    let resp;
    let resp1;
    let payload;

    if (addRev === 1) {
      payload = new FormData();
      payload.append('placeId', placeId);
      payload.append('review', text);
      for (let i = 0; i < imgData.length; i++) {
        payload.append(imgData[i].name, {
          uri: imgData[i].path,
          type: imgData[i].mime,
          name: `${imgData[i].filename}.${imgData[i].mime.substring(
            imgData[i].mime.indexOf('/') + 1,
          )}`,
        });
      }

      console.log(payload);

      resp1 = await addReview(token, payload);
      console.log(resp1);
      if (resp1 !== undefined) {
        if (resp1.message === 'edited sucessfully(already reviwed)') {
          setImgData([]);
          setText('');
          Toast.show('Edited Successfully and Already Reviewed');
          dispatch(setInitialState());
          navigation.navigate('ViewReviews', {data, placeId});
        } else {
          setImgData([]);
          setText('');
          Toast.show('Review Added');
          dispatch(setInitialState());
          navigation.navigate('ViewReviews', {data, placeId});
        }
      }
    }

    if (addRev === 2) {
      if (imgData.length > 0) {
        payload = new FormData();
        payload.append('placeId', placeId);
        for (let i = 0; i < imgData.length; i++) {
          payload.append(imgData[i].name, {
            uri: imgData[i].path,
            type: imgData[i].mime,
            name: `${imgData[i].filename}.${imgData[i].mime.substring(
              imgData[i].mime.indexOf('/') + 1,
            )}`,
          });
        }
      }
      console.log(payload);
      resp = await addImages(token, payload);
      dispatch(setInitialState());
      console.log(resp);
      if (resp !== undefined) {
        setImgData([]);
        setText('');
        Toast.show('Uploaded Sucessfully');
        dispatch(setInitialState());
        navigation.navigate('PhotosGallery', {placeId, data});
      }
    }
  };

  const changeProfileImageFromLibrary = () => {
    ImagePicker.openPicker({
      width: 110,
      height: 110,
      cropping: true,
    })
      .then(img => {
        const obj = {
          id: uuid.v4(),
          name: 'image',
          path: img.path,
          fileName: img.filename,
          mime: img.mime,
        };
        setImgData(prevImg => [...prevImg, obj]);
      })
      .catch(er => Toast.show('User cancelled selection'));
  };
  const changeProfileImageFromCamera = () => {
    ImagePicker.openCamera({
      width: 110,
      height: 110,
      cropping: true,
    }).then(img => {
      setImage(img.path);
      const {filename, mime, path} = img;
    });
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.topbar}>
          <SafeAreaView>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 20 : 30,
                flexDirection: 'row',
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  if (addRev === 2) {
                    setImgData([]);
                    setText('');
                    dispatch(setInitialState());
                    navigation.navigate('PhotosGallery', {data, placeId});
                  } else if (addRev === 1) {
                    setImgData([]);
                    setText('');
                    dispatch(setInitialState());
                    navigation.navigate('ViewReviews', {data, placeId});
                  } else {
                    dispatch(setInitialState());
                    navigation.goBack();
                  }
                }}>
                <Image
                  style={styles.menu}
                  source={require('../assets/images/back_icon.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Avenir Book',
                  fontSize: 26,
                  color: '#fff',
                  marginTop: -5,
                  marginRight:
                    width > height
                      ? Platform.OS === 'ios'
                        ? 300
                        : 370
                      : Platform.OS === 'ios'
                      ? 105
                      : 120,
                }}>
                AddReview
              </Text>
            </View>
          </SafeAreaView>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{marginHorizontal: 15, marginVertical: 15}}>
            <Text
              style={{fontFamily: 'Avenir Book', fontSize: 20, color: 'black'}}>
              Write Review
            </Text>
          </View>

          <View style={{marginHorizontal: 15, marginVertical: 0, flex: 1}}>
            <View style={styles.body}>
              <TextInput
                multiline={true}
                numberOfLines={15}
                onChangeText={str => setText(str)}
                style={styles.textNotes}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            marginHorizontal: 15,
            marginVertical: 15,
            color: '#351347',
            fontFamily: 'Avenir Book',
            fontSize: 20,
          }}>
          Add a photos to your review
        </Text>
        <View
          style={{
            marginHorizontal: 15,
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {imgData?.map(item => (
            <Image
              source={{uri: item?.path}}
              style={{
                height: 80,
                width: 80,
                borderRadius: 10,
                marginRight: 10,
                marginTop: 10,
              }}
            />
          ))}
          <TouchableOpacity
            onPress={() => {
              changeProfileImageFromLibrary();
            }}>
            <Image
              source={require('../assets/images/aad_photo_icon.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 10,
                marginRight: 10,
                marginTop: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonbody}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: Platform.OS === 'ios' ? 110 : 80,
    backgroundColor: '#370F24',
  },
  menu: {
    height: 22,
    width: 22,
  },
  textNotes: {
    height: 200,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#FFF',
    borderColor: '#D7D7D7',
    color: '#3C4858',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  button: {
    height: 60,
    backgroundColor: '#301934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbody: {
    bottom: Platform.OS === 'ios' ? 0 : 2,
    position: 'absolute',
    width: '100%',
  },
  buttontext: {
    height: 28,
    width: 80,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
  },
});
