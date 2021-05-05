import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Toast from 'react-native-simple-toast'
import {TextInput, Button, Avatar} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import IconStore from '../.././../assets/store.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {getSession} from '../../../utils/Global';
import {API_URL} from '../../../utils/Service';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import configureGoogleSign from '../../../utils/GoogleLogin';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Axios from 'axios';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,

    // alignItems:'center'
  },
  TextInput: {
    marginVertical: 10,
    backgroundColor: 'transparent',
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
    // justifyContent: 'space-between',
    // width: '65%',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: {width: 1, height: 13},
  },
  iconGoogle: {
    marginRight: 10,
  },
  textGoogle: {
    fontWeight: 'bold',
  },
});

export default function UbahProfil() {
  const [data, setData] = useState({
    nama_lengkap: '',
    email: '',
    no_ponsel: '',
    nomor_ktp: '',
    nama_bank: '',
    nomor_rekening: '',
    role_user: 1,
  });

  const [nama, setNama] = useState('');

  const handleChange = (name) => (e) => {
    setData({...data, [name]: e});
  };

  async function updateProfile() {
    const datas = JSON.parse(await getSession());
    axios.patch(`${API_URL}/auth/update_profil`, data, {
      headers: {Authorization: `Bearer ${datas.token}`}
    })
      .then((response) => {
        console.log(response)
        Toast.show(`Update profile berhasil`, Toast.SHORT);
        Actions.pop();
      })
      .catch((e) => {
        console.log(e)
        Toast.show(`Gagal\n${e}`, Toast.SHORT);
      });
  }
  async function registerGoogle() {
    try {
      const datas = JSON.parse(await getSession());
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      Axios.put(`${API_URL}/auth/daftar_google`, userInfo, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${datas.token}`
        },
      }).then(res => {
        Toast.show(res.data.message, Toast.SHORT)
      }).catch(err => {
        Toast.show(err.response.data.message, Toast.SHORT)
      })      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Toast.show('Process Cancelled',Toast.SHORT);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Toast.show('Process in progress',Toast.SHORT);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Toast.show('Play services are not available',Toast.SHORT);
      } else {
        // some other error
        console.log(error)
        Toast.show(`Something else went wrong... ${error.toString()}`,Toast.SHORT);
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());

      const Data = await axios(`${API_URL}/auth/personal_data`, {
        headers: {Authorization: `Bearer ${datas.token}`},
      });
      setData(Data.data.data);
      console.log(Data.data.data)
      setNama(Data.data.data.nama_lengkap);
    }
    configureGoogleSign();
    fetchData();
  }, []);
  if (data === null) {
    // return <Text>loading</Text>;
    return <View style={{flex:1, justifyContent: 'center', flexDirection:'row',
    padding:10}}>
      <ActivityIndicator color="#0000ff" size="large"/>
    </View>
  }
  console.log(data)

  return (
    <ScrollView>
      <View style={styles.root}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginVertical: 20,
          }}>
          <IconStore />
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{nama}</Text>
        </View>
        <View>
          <TextInput
            label="Nama Lengkap"
            mode="flat"
            style={styles.TextInput}
            value={data.nama_lengkap}
            onChangeText={handleChange('nama_lengkap')}
          />
          <TextInput
            label="Alamat Email"
            mode="flat"
            style={styles.TextInput}
            keyboardType="email-address"
            autoCompleteType="email"
            value={data.email}
            disable={true}
          />
          <PhoneInput
            defaultCode="ID"
            placeholder="Nomor Ponsel"
            containerStyle={{
              width: '100%',
              marginVertical: 10,
              backgroundColor: 'transparent',
              borderBottomWidth: 1,
              borderBottomColor: '#A5A6AA',
            }}
            textContainerStyle={{
              backgroundColor: 'transparent',
            }}
            textInputProps={{
              value:`${data.no_ponsel}`
            }}
            onChangeText={handleChange('no_ponsel')}
          />
          
          {data.role_user == 2 ? (
            
              <View>
                <TextInput
                  label="Nama Pemilik Rekening"
                  mode="flat"
                  style={styles.TextInput}
                  value={data.nomor_ktp}
                  onChangeText={handleChange('nomor_ktp')}
                />
                <TextInput
                  label="Nama Bank"
                  mode="flat"
                  style={styles.TextInput}
                  value={data.nama_bank}
                  onChangeText={handleChange('nama_bank')}
                />
                <TextInput
                  label="Nomor Rekening"
                  mode="flat"
                  style={styles.TextInput}
                  keyboardType="numeric"
                  value={data.nomor_rekening}
                  onChangeText={handleChange('nomor_rekening')}
                />
              </View>
            
          ) : (
            <></>
          )}

          <Button
            mode="contained"
            uppercase={false}
            style={styles.Button}
            onPress={() => updateProfile()}>
            Simpan Profil
          </Button>

          <Button
            mode="outlined"
            uppercase={false}
            onPress={() => registerGoogle()}>
            <Icon name="google" size={18}/>   Daftarkan Akun Google
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
