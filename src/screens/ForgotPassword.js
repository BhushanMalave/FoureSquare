import React,{useState} from 'react';
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
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextField} from 'rn-material-ui-textfield';
import { changePasswordApi } from '../authorization/Auth';
import Toast from 'react-native-simple-toast';

export const ForgotPassword = ({navigation,route}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? -11.5 : -25;
  const width2 = width < height ? -20.5 : -50;
  const [loading,isLoading] = useState(true);
  const Email= route.params.Email;
  const signinValidationSchema = yup.object().shape({
    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .min(6, ({min}) => `Password must be at least ${min} characters`)
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password do not match')
      .required(),
  });

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{flex: 1, marginHorizontal: 30}}>
            <View style={{alignItems: 'center',  marginTop: Platform.OS === 'ios' ?  40 :70}}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.viewTextInput}>
              <Formik
                validationSchema={signinValidationSchema}
                initialValues={{password: '', confirmPassword: ''}}
                onSubmit={async (values, {resetForm}) => {
                  const obj =
                  {
                    "email": Email,
                    "newPassword":values.password
                }
                console.log(obj)
                isLoading(false)
                const response = await changePasswordApi(obj);
                isLoading(true)
                console.log(response);
                  
                if(response?.message === "Your new password is updated. Please log in...")
                {
                  navigation.navigate('Login')
                  resetForm({initialValues: ''});
                  Toast.show("Password Updated ,Please Login!", Toast.SHORT);
                  } else {
                    console.log(response.message);
                  }

                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <>
                    <TextField
                      label="Enter Password"
                      name="password"
                      keyboardType="ascii-capable"
                      formatText={this.formatText}
                      onSubmitEditing={this.onSubmit}
                      ref={this.fieldRef}
                      textColor="#FFFFFF"
                      tintColor="#b5abab"
                      baseColor="#b5abab"
                      lineWidth={1}
                      autoCapitalize="none"
                      labelFontSize={17}
                      labelOffset={{y1: -5, x1: width1}}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      autoCorrect={false}
                      secureTextEntry={true}
                      style={{
                        fontFamily: 'Avenir Book',
                        fontSize: 22,
                        marginBottom: 5,
                        textAlign: 'center',
                        marginRight: 0,
                        marginTop: 18,
                        height:30,
                      }}
                      labelTextStyle={{
                        textAlign: 'center',
                        color: '#b5abab',
                        fontFamily: 'Avenir Book',
                        alignSelf: 'center',
                        paddingTop: Platform.OS === 'ios' ? 2 : 4,
                      }}
                      containerStyle={
                        {
                          // height:200,
                          // borderWidth:1,
                        }
                      }
                    />
                    {errors.password && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                        }}>
                        {errors.password}
                      </Text>
                    )}
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      keyboardType="ascii-capable"
                      formatText={this.formatText}
                      onSubmitEditing={this.onSubmit}
                      ref={this.fieldRef}
                      textColor="#FFFFFF"
                      tintColor="#b5abab"
                      baseColor="#b5abab"
                      lineWidth={1}
                      autoCapitalize="none"
                      labelFontSize={18}
                      labelOffset={{y1: -5, x1: width2}}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      autoCorrect={false}
                      secureTextEntry={true}
                      style={{
                        fontFamily: 'Avenir Book',
                        fontSize: 22,
                        marginBottom: 5,
                        textAlign: 'center',
                        marginRight: 0,
                        marginTop: 18,
                        height:30,
                      }}
                      labelTextStyle={{
                        textAlign: 'center',
                        color: '#b5abab',
                        fontFamily: 'Avenir Book',
                        alignSelf: 'center',
                        height: 50,
                        paddingTop: Platform.OS === 'ios' ? 2 : 4,
                      }}
                      containerStyle={
                        {
                          // height:200,
                          // borderWidth:1,
                        }
                      }
                    />
                    {errors.confirmPassword && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                        }}>
                        {errors.confirmPassword}
                      </Text>
                    )}

                    <View style={styles.container}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={!isValid}>
                        <Text style={styles.textbutton}>Submit</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTop: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 30 : 10,
    justifyContent: 'flex-end',
  },
  viewTextInput: {
    marginTop:Platform.OS === 'android' ?  100 : 90,
  },
  textskip: {
    fontFamily: 'Avenir Book',
    fontSize: 24,
    color: '#FFFFFF',
  },
  iconback: {
    marginTop: Platform.OS === 'android' ? 15 : 10,
    marginLeft: 10,
  },
  logo: {
    height: 28,
    width: 200,
    marginTop: 60,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#fff',
    marginTop: 90,
    fontSize: 24,
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#fff',
    marginTop: 0,
    fontSize: 24,
  },
  text2: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#fff',
    marginTop: 30,
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 110 :90,
    marginBottom:30,
  },
  button: {
    backgroundColor: 'transparent',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#FFF',
    width: '100%',
  },
  textbutton: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#FFFFFF',
  },
  textacc: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#FFFFFF',
    marginTop: 40,
  },
});
