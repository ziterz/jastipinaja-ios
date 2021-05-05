import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JWTDecode from 'jwt-decode';
class CheckToken extends Component {
  componentDidMount() {
    this.checkToken();
  }

  checkToken = async () => {
    let token = await AsyncStorage.getItem('auth');
    const data = JSON.parse(token);
    if (data == null) {
      Actions.reset('viewPager');
    } else {
      const {exp} = JWTDecode(data.token);
      const expired = Date.now() >= exp * 1000;

      if (token) {
        if (data?.user.role_user === 1) {
          if (!expired) {
            Actions.reset('bottomNavbarCustomer');
          } else {
            Actions.reset('splashscreen');
          }
        } else {
          if (!expired) {
            Actions.reset('bottomNavbarMerchant');
          } else {
            Actions.reset('splashscreen');
          }
        }
      } else {
        Actions.replace('splashscreen');
      }
    }
  };

  render() {
    return <View />;
  }
}

export default CheckToken;
