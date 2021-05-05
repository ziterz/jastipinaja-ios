import React from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
export default function AkunComponenet() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          activeOpacity={2}
          onPress={() => Actions.ubahProfil()}>
          <Text>Profil Toko</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          activeOpacity={2}
          onPress={() => Actions.ubahAlamat()}>
          <Text>Alamat Toko</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>

        <Divider />
        <TouchableOpacity
          onPress={()=>
            Linking.openURL('https://jastipinaja.co.id/#/faq')
          } 
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          activeOpacity={2}>
          <Text>Pusat Bantuan</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={()=>
            Linking.openURL('https://jastipinaja.co.id/#/privacy')
          } 
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          activeOpacity={2}>
          <Text>Kebijakan Jastip</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider/>
        <TouchableOpacity
          onPress={()=>
            Linking.openURL('https://jastipinaja.co.id/#/tac')
          } 
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          activeOpacity={2}>
          <Text>Syarat & Ketentuan</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          activeOpacity={2}>
          <Text>Kebijakan Jastip</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          activeOpacity={2}>
          <Text>Suka Jastip? Nilai kami!</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 15,
          }}
          onPress={() => Linking.openURL('https://apps.apple.com/id/app/jastipinaja/id1555013354')}
          activeOpacity={2}>
          <Text>Keluar</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider />
      </ScrollView>
    </SafeAreaView>
  );
}
