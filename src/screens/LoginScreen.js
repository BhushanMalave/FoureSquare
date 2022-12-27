import React, { useState } from 'react';
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
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextField} from 'rn-material-ui-textfield';
import {signInApi} from '../authorization/Auth';
import {forgotPasswordApi} from '../authorization/Auth';
import {setToken} from '../redux/ReduxPersist/User';
import {useDispatch} from 'react-redux';
import {setLoginState} from '../redux/ReduxPersist/States';


export const Login = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? -15.5 : -45;
  const width2 = width < height ? -15.5 : -50;
  let [email,setEmail] = useState('') ;
  const [loading,isLoading] = useState(true);
  const [loading1,isLoading1] = useState(true);

  const handleForgotPassword = async () => {
    console.log(
      email
    )
    const obj = {
      email: email,
    };
    console.log(obj);
    isLoading1(false);
    const response = await forgotPasswordApi(obj);
    isLoading1(true);
    if (response?.message === 'Otp sent, please check your mail') {
      navigation.navigate('Verification', {email});
    }
  };
  const signinValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Enter correct Email')
      .required('Enter is required'),

    password: yup
      .string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .min(6, ({min}) => `Password must be at least ${min} characters`)
      .required('Enter correct password'),
  });
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{flex: 1, marginHorizontal: 30}}>
            <View style={styles.viewTop}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setLoginState(1));
                }}>
                <Text style={styles.textskip}>Skip {'>'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 30}}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.viewTextInput}>
              <Formik
                validationSchema={signinValidationSchema}
              
                initialValues={{email: '', password: ''}}
                onSubmit={async (values, {resetForm}) => {
                
                    setEmail(values.email)
                
                    const obj = {
                      email: values.email,
                      password: values.password,
                    };
                    console.log(obj);
                    console.log(email)
                    isLoading(false);

                    const res = await signInApi(obj);

                    isLoading(true);

                    if (res?.message === 'Login successful') {
                      dispatch(setToken(res.access_token));
                      dispatch(setLoginState(2));
                      resetForm({initialValues: ''});
                    }
                   
                  
                 
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,
                  values,
                  errors,
                  isValid,
                }) => (
                  <>
                    <TextField
                      label="Email"
                      name="email"
                      keyboardType="email-address"
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
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      autoCorrect={false}
                      style={{
                        fontFamily: 'Avenir Book',
                        fontSize: 22,
                        marginBottom: 5,
                        textAlign: 'center',
                        marginRight: 0,
                        marginTop: 18,
                        height: 30,
                      }}
                      labelTextStyle={{
                        textAlign: 'center',
                        color: '#b5abab',
                        fontFamily: 'Avenir Book',
                        alignSelf: 'center',
                        height: 50,
                        paddingTop: Platform.OS === 'ios' ? 2 : 4,
                      }}
                    />
                    {errors.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: 'red',
                          alignSelf: 'center',
                        }}>
                        {errors.email}
                      </Text>
                    )}

                    <TextField
                      label="Password"
                      name="email"
                      keyboardType="ascii-capable"
                      textColor="#FFFFFF"
                      tintColor="#b5abab"
                      baseColor="#b5abab"
                      lineWidth={1}
                      autoCapitalize="none"
                      labelFontSize={18}
                      labelOffset={{y1: -5, x1: width1}}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      autoCorrect={false}
                      secureTextEntry={true}
                      style={{
                        fontFamily: 'Avenir Book',
                        fontSize: 24,
                        marginBottom: 5,
                        textAlign: 'center',
                        marginTop: 10,
                        marginLeft: 10,
                        height: 30,
                      }}
                      labelTextStyle={{
                        textAlign: 'center',
                        color: '#b5abab',
                        fontFamily: 'Avenir Book',
                        height: 50,
                        paddingTop: Platform.OS === 'ios' ? 2 : 4,
                      }}
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
                  
                       <TouchableOpacity
                       onPress={() => {
                         handleForgotPassword();
                         handleReset();
                       }}>
                       <Text style={styles.text}>Forgot Password?</Text>
                     </TouchableOpacity>
                   
                   
                    <View style={styles.container}>
                      {loading ? (
                         <TouchableOpacity
                         onPress={() => {
                         
                           handleSubmit();
                         }}
                         style={styles.button}
                         disabled={!isValid}>
                         <Text style={styles.textbutton}>Login</Text>
                       </TouchableOpacity>

                      ):(
                        <ActivityIndicator size="large" color="#7A7A7A" style={styles.button1}/>
                      )}
                     
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('CreateNewAccount');
                      }}>
                      <Text style={styles.textacc}>Create Account</Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: '#3B3C57',
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                        alignSelf: 'center',
                        marginTop: 30,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Avenir Light',
                          fontSize: 18,
                          color: '#FFFFFF',
                          textAlign: 'center',
                          marginTop: 7,
                        }}>
                        OR
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        marginTop: 30,
                        paddingBottom: 30,
                      }}>
                      <Image
                        source={require('../assets/images/facebook_btn.png')}
                        style={{width: 160, height: 45, marginRight: 8}}
                      />
                      <Image
                        source={require('../assets/images/g_btn.png')}
                        style={{width: 160, height: 45, marginLeft: 8}}
                      />
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
    marginTop: 70,
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
    marginTop: 40,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#b5abab',
    marginTop: 35,
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
  button1: {
    backgroundColor: 'transparent',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
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
