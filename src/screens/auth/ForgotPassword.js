import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Alert
} from 'react-native';
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, Button} from 'react-native-paper';
import GoogleIcon from '../../assets/googleicon.svg';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {API_URL} from '../../utils/Service';

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

export default function Forgot() {
  const [auth, setauth] = useState({
    email: '',
  });
  const handleChange = (name) => (e) => {
    setauth({...auth, [name]: e});
  };
  const [loading, setloading] = useState(false);  

  const handleSubmit = async () => {
    if (auth.email===''){
      Toast.show('Harap masukan email anda')
      return;
    }
    setloading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/forgot_password`, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setloading(false);
      Toast.show('Tautan untuk merubah password telah di kirim ke email')
      Actions.pop()
      
    } catch (error) {
      setloading(false);
      Toast.show('Isian belum lengkap/Email belum terdaftar'
        // error.response.data.message,
        // Toast.SHORT,
      );
    }
  };
  useEffect(() => {
  }, []);
  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
        <Text style={{fontWeight: 'bold', fontSize:20, color: '#000', marginVertical: 20}}>
            Kesulitan Mengakses akun anda?
        </Text>
        <Text style={{fontSize:15, color: '#000', marginVertical: 20}}>
            Masukan email yang telah anda daftarkan. Kami akan mengirimkan 
            pesan beserta tautan untuk mengatur kata sandi anda
        </Text>
          <TextInput
            label="Alamat Email"
            mode="flat"
            style={styles.TextInput}
            keyboardType="email-address"
            autoCompleteType="email"
            autoCapitalize="none"
            onChangeText={handleChange('email')}
          />
         
          <Button
            mode="contained"
            onPress={()=> handleSubmit()}
            style={styles.Button}
            disabled={loading}>
            Kirim Email
          </Button>
        
        </View>
      </View>
    </ScrollView>
  );
}
