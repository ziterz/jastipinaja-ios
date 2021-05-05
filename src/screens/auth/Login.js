import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  BackHandler,
  Platform
} from 'react-native';
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Button } from 'react-native-paper';
import GoogleIcon from '../../assets/googleicon.svg';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { API_URL } from '../../utils/Service';
import { saveSession, AUTH } from '../../utils/Global';
import configureGoogleSign from '../../utils/GoogleLogin';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import OneSignal from 'react-native-onesignal';

import appleAuth, {
  AppleButton, AppleAuthRequestOperation, AppleAuthRequestScope, AppleAuthCredentialState
} from '@invertase/react-native-apple-authentication';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,

    // alignItems:'center'
  },
  TextInput: {
    marginVertical: 10,
    backgroundColor: 'transparent',
    fontSize: 15,
    left: 0
  },
  appleButton : {
    height: 40,
    width : '100%',
    marginVertical: 10
  },
  Button: {
    marginVertical: 20,
  },
  viewLogo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  register: {
    display: 'flex',
    flexDirection: 'row',
  },
  div: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  account: {
    color: '#A5A6AA',
    marginVertical: 20,
  },
  btn: {
    margin: 10,
    flex: 1,
    padding: 5,
    borderRadius: 8,
  },
  google: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'stretch',
    // alignSelf: 'stretch',
    // borderRadius: 5,
    // padding: 10,

    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    // shadowOpacity: 0.8,
    // elevation: 6,
    // shadowRadius: 15,
    // shadowOffset: {width: 1, height: 13},
  },
  iconGoogle: {
    marginRight: 10,
  },
  textGoogle: {
    fontWeight: 'bold',
  },
});

export default function Login() {
  
  const [auth, setauth] = useState({
    email: '',
    password: '',
  });
  const [loading, setloading] = useState(false);
  const [hidePass, setHidePass] = useState(true);
 

  const backAction = () => {
    console.log(Actions.currentScene)
    if (Actions.currentScene === 'login') {
      Alert.alert('Perhatian!', 'Apakah anda yakin ingin keluar?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'Ya', onPress: () => BackHandler.exitApp() },
      ]);
    }
  };

  Actions.refs.login = {
    onEnter: () => {
      console.log("hehe")
      configureGoogleSign();
      setBackPress();
    },
    onExit: () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    },
    isBack: 0,
  };

  async function setBackPress() {
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }

  const signInApple = async () => {

    //request login
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation : appleAuth.Operation.LOGIN,
      requestedScopes : [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    //get currenct auth state 
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    //use credentialstate response to ensure  the user is authorized 
    if (credentialState === appleAuth.State.AUTHORIZED){
      Toast.show('sukses bro', Toast.LONG); 
    }else {
      Toast.show('gagal', Toast.LONG);
    }
  };

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      try {
        const res = await axios.post(`${API_URL}/auth/login_google`, userInfo, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await AsyncStorage.setItem('auth', JSON.stringify(res.data.data));
        console.log(res.data);
        saveSession(res.data.data);
        setloading(false);
        if (res.data.data?.user?.role_user == 1) {
          Actions.reset('bottomNavbarCustomer');
        } else {
          Actions.reset('bottomNavbarMerchant');
        }
        OneSignal.sendTag("userId", `${res.data.data.user.id_user}`);
        OneSignal.sendTag("city", res.data.data.user.kota);
        OneSignal.sendTag("userRole", `${res.data.data.user.role_user}`);
      } catch (error) {
        console.log(error)
        setloading(false);
        Toast.show(
          error.response.data.message,
          Toast.SHORT,
        );
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Toast.show('Process Cancelled', Toast.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Toast.show('Process in progress', Toast.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Toast.show('Play services are not available', Toast.SHORT);
      } else {
        // some other error
        console.log(error)
        Toast.show(`Something else went wrong... ${error.toString()}`, Toast.SHORT);
      }
    }
  }
  const handleChange = (name) => (e) => {
    setauth({ ...auth, [name]: e });
  };
 
  const handleSubmit = async () => {
    setloading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await AsyncStorage.setItem('auth', JSON.stringify(res.data.data));
      console.log(res.data);
      saveSession(res.data.data);
      setloading(false);
      if (res.data.data?.user?.role_user == 1) {
        Actions.reset('bottomNavbarCustomer');
      } else {
        Actions.reset('bottomNavbarMerchant');
      }
      OneSignal.sendTag("userId", `${res.data.data.user.id_user}`);
      OneSignal.sendTag("userRole", `${res.data.data.user.role_user}`);
      OneSignal.sendTag("city", res.data.data.user.kota);
    } catch (error) {
      setloading(false);
      Toast.show('Email atau Password salah / belum terdaftar'
        // error.response.data.message,
        // Toast.SHORT,
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <TextInput
            label="Alamat Email"
            mode="flat"
            style={styles.TextInput}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            onChangeText={handleChange('email')}
          />
          <View style={{flex: 1, flexDirection: 'column'}}>
          <TextInput
            label="Password"
            mode="flat"
            autoCapitalize="none"
            secureTextEntry = {hidePass ? true : false}
            style={styles.TextInput}
            onChangeText={handleChange('password')}
          />
          <Icon
            style={{position: 'absolute', right: 5, bottom: 25}}
            name={hidePass ? "eye-off" : "eye"}
            color="grey"
            size={20}
            onPress={() => setHidePass(!hidePass)}
          />
          </View>
          <Text
            onPress={()=>Actions.push('forgot')}
            style={{ textAlign: 'right', marginVertical: 10, color: '#01579B' }}>
            Lupa kata sandi?
          </Text>
          <Button
            mode="contained"
            style={styles.Button}
            onPress={handleSubmit}
            disabled={loading}>
            Masuk
          </Button>
          {/* <GoogleSigninButton
            style={styles.google}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={() => signIn()}
          /> */}
          {/* <Button
            mode="outlined"
            uppercase={false}
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            onPress={() => signIn()}>
            <Icon name="google" size={17}/>  Sign in with Google
          </Button> */}
          {/* {Platform.OS === 'ios' &&
            <AppleButton
              style={styles.appleButton}
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              onPress={() => signInApple()}
            >
            </AppleButton>
          } */}
          {/* <TouchableOpacity style={styles.google} activeOpacity={2}>
            <GoogleIcon style={styles.iconGoogle} />
            <Text style={styles.textGoogle}>Masuk dengan google</Text>
          </TouchableOpacity> */}
          <View style={styles.div}>
            <Text style={styles.account}>belum punya akun? daftar sebagai</Text>
            <View style={styles.register}>
              <Button
                mode="contained"
                style={styles.btn}
                uppercase={false}
                onPress={() => Actions.registercustomer()}>
                Customer
              </Button>
              <Button
                mode="contained"
                // style={styles.btn}
                style={{margin: 10,
                  flex: 1,
                  padding: 5,
                  borderRadius: 8,backgroundColor: '#ec1c25'}}
                uppercase={false}
                onPress={() => Actions.registerMerchant()}>
                Merchant
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.viewLogo}>
          <Text style={{ color: '#fff' }}>oleh</Text>
          <Image source={require('../../assets/aldeox.png')} />
        </View>
      </View>
    </ScrollView>
  );
}
