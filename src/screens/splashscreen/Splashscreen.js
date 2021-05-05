import React, {useEffect} from 'react';
import {View, Text, Image, StatusBar, Animated} from 'react-native';
import {Actions as NavigationActions} from 'react-native-router-flux';
import Spalsh from '../../assets/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWTDecode from 'jwt-decode';

export default function Splashscreen() {
  const logoOpacity = new Animated.Value(0);

  useEffect(() => {
    async function effect() {
      let token = await AsyncStorage.getItem('auth');
      const data = JSON.parse(token);
      StatusBar.setHidden(true, 'none');
      if (data == null) {
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() =>
          setTimeout(async () => {
            StatusBar.setHidden(false, 'slide');
            NavigationActions.reset('viewPager');
          }, 1000),
        );
      } else {
        const {exp} = JWTDecode(data.token);
        const expired = Date.now() >= exp * 1000;

        if (token) {
          if (data?.user.role_user === 1) {
            if (!expired) {
              Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start(() =>
                setTimeout(async () => {
                  StatusBar.setHidden(false, 'slide');
                  NavigationActions.reset('bottomNavbarCustomer');
                }, 1000),
              );
            } else {
              Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start(() =>
                setTimeout(async () => {
                  StatusBar.setHidden(false, 'slide');
                  NavigationActions.reset('viewPager');
                }, 1000),
              );
            }
          } else {
            if (!expired) {
              Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start(() =>
                setTimeout(async () => {
                  StatusBar.setHidden(false, 'slide');
                  NavigationActions.reset('bottomNavbarMerchant');
                }, 1000),
              );
            } else {
              Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start(() =>
                setTimeout(async () => {
                  StatusBar.setHidden(false, 'slide');
                  NavigationActions.reset('viewPager');
                }, 1000),
              );
            }
          }
        } else {
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start(() =>
            setTimeout(async () => {
              StatusBar.setHidden(false, 'slide');
              NavigationActions.reset('viewPager');
            }, 1000),
          );
        }
      }
    }
    effect();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{marginTop: '50%'}}>
        <Spalsh />
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
            marginTop: 200,
            textAlign: 'center',
          }}>
          From
        </Text>
      </View>
      {/* <Text
        style={{
          alignItems: 'center',
          textAlign: 'center',
          fontSize: 14,
          color: 'black',
          marginBottom: 20
        }}>
          From
      </Text> */}
      <Image
        source={require('../../assets/aldeox.png')}
        style={{marginBottom: 20}}
      />
    </View>
  );
}
