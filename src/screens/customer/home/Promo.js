import React from 'react';
import {View, Image} from 'react-native';

const Promo = () => {
  return (
    <View>
      <Image
        source={require('../../../assets/slider.png')}
        style={{marginLeft: 20, resizeMode: 'cover'}}
      />
    </View>
  );
};

export default Promo;
