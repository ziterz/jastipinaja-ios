import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import {Avatar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import appleAuth, {
  AppleAuthRequestOperation, AppleAuthRequestScope, AppleAuthCredentialState
} from '@invertase/react-native-apple-authentication';
export default function AkunComponenet() {
  const [data, setData] = useState([]);
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      await GoogleSignin.revokeAccess();
      
      const appleAuthRequestResponse  = await appleAuth.performRequest({
        requestedOperation : appleAuth.Operation.LOGOUT,
      });
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse);
      if (credentialState === appleAuth.State.REVOKED) {

      }
    } catch (error) {
      console.error(error);
    }
    Actions.replace('login');
  };


  const backAction = () => {
    if (Actions.currentScene === '_akunCustomer'){
      Alert.alert('Perhatian!', 'Apakah anda yakin ingin keluar?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel'
        },
        {text: 'Ya', onPress: () => handleLogout()},
      ]);
    }
  }
  const openWhatsapp = () => {
    let phone = '628174838282' ;
    let url = 'https://api.whatsapp.com/send?text=halo admin JastipinAja!' + '&phone=' + phone;
    Linking.openURL(url)
  }

  useEffect(() => {
    const unsubcribe  = appleAuth.onCredentialRevoked(async () => {

    });
    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {data?.user?.nama_lengkap}
          </Text>
        </View>
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
          <Text>Profil Saya</Text>
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
          <Text>Alamat Saya</Text>
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
          onPress={() => Linking.openURL('https://apps.apple.com/id/app/jastipinaja/id1555013354')}
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
          activeOpacity={2}
          onPress={() => backAction()}>
          <Text>Keluar</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        <Divider />

        <TouchableOpacity>
          <Text
          onPress={()=>
            Linking.openURL('https://jastipinaja.co.id/#/faq')
          } 
          style={{
            marginVertical: 50, 
            marginHorizontal: 50, 
            fontSize: 12, 
            fontStyle: 'italic', 
            fontWeight: 'bold'}}>
            punya pertanyaan seputar JastipinAja? 
            jangan ragu untuk hubungi customer service kita di cs.jastipinaja@aldeoz.com
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => openWhatsapp()}>
            <Text style={{fontSize:13}}>   hubungi kami di :</Text>
            <View style={{marginTop: 2,flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="whatsapp" size={25} color="#00dd00"/>
              <Text style={{fontSize:13}}>  08174838282</Text>
            </View>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}
