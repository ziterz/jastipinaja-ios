import React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Someday from '../../../../assets/gift.svg';
import Box from '../../../../assets/box.svg';
import {Actions} from 'react-native-router-flux';
export default function JasaPackaging({cart, alamat, shipping}) {
  console.log({cart, alamat})
  return (
    <SafeAreaView style={{backgroundColor: '#F7F7F7', flex: 1}}>
      <ScrollView>
        <Text style={{margin: 10, color: '#4E5157'}}>Jenis Pengiriman</Text>
        <TouchableOpacity
          key={1}
          activeOpacity={2}
          onPress={() =>
            Actions.replace('detailPesanan',{
              packaging: {name: 'Packaging Biasa', price: 5000},
              cart: cart,
              alamat,
              shipping
            })
          }>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Box />
            <Text>Packaging Biasa</Text>
            <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 16}}>
              Rp5.000
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          key={2}
          onPress={() =>
            Actions.replace('detailPesanan',{
              packaging: {name: 'Parcel Packaging', price: 10000},
              cart: cart,
              alamat,
              shipping
            })
          }
          activeOpacity={2}>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Someday />
            <Text>Parcel Packaging</Text>
            <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 16}}>
              Rp10.000
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
