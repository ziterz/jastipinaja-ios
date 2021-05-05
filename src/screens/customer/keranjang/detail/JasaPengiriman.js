import React from 'react';
import {ScrollView, Text, View, SafeAreaView} from 'react-native';
import Someday from '../../../../assets/someday.svg';

export default function JasaPengiriman() {
  return (
    <SafeAreaView style={{backgroundColor: '#F7F7F7', flex: 1}}>
      <ScrollView>
        <Text style={{margin: 10, color: '#4E5157'}}>Jenis Pengirimane</Text>
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
          <Text>Sameday Delivery oleh Paxel</Text>
          <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 16}}>
            Rp15.000
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
