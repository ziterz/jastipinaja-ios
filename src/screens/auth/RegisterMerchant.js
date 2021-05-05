import Axios from 'axios';
import {API_URL} from '../../utils/Service';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Toast from 'react-native-simple-toast'
import {TextInput, Button} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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

export default function RegisterMerchant() {
  const [check, setChecked] = useState(false)
  const [checkFormat, setFormat] = useState(false)
  const [data, setData] = useState({
    email: '',
    nama_lengkap: '',
    password : '',
    confirmPassword : '',
    no_ponsel: '',
    kecamatan: '',
    kelurahan: '',
    kota: '',
    provinsi: '',
    alamat_lengkap: '',
    kode_pos: '',
    nomor_ktp: '',
    nama_bank: '',
    nomor_rekening: ''
  });

  const handleChange = (name) => (e) => {
    setData({...data, [name]: e});
  };
  const handleEmail = (name) => (e) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(e) === false) {
      // console.log("Email is Not Correct");
      setData({...data, [name]: e});
      setFormat(false)
      return false;
    }
    else {
      setData({...data, [name]: e});
      setFormat(true)
      // console.log("Email is Correct");
    }
    // setData({...data, [name]: e});
  }
  const [hidePass, setHidePass] = useState(true);

  async function checkProperties(){
    console.log(data.no_ponsel.length, "hehehehehe");
    if (data.nama_lengkap.length == 0 ){
      return Toast.show('Masukan nama merchant');
    } else if (data.email.length == 0 ){
      return Toast.show('Masukan email');
    } else if (!checkFormat){
      return Toast.show("Format email salah")
    }
    else if (data.no_ponsel.length < 8 ){
      return Toast.show('Nomer ponsel terlalu pendek');
    } else if (data.password.length < 6){
      return Toast.show('Password minimal memiliki 6 karakter');
    }
    try {
      await Axios.post(`${API_URL}/auth/checkemail`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setChecked(true)

      // console.log(data);
      // console.log(check, "ini check");
      // return data.email !== '' && data.nama_lengkap !== '' && data.password !== '' && data.no_ponsel !== 0 && check === true &&
      // data.email.length > 1 && data.nama_lengkap.length > 1 && data.no_ponsel.length > 8 && data.password.length >= 6
      Actions.alamatMerchant(data)
    } catch (error) {
      setChecked(false)
      Toast.show('Email sudah terdaftar, silahkan gunakan alamat email lain')
      return false
    }

    
  }
  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <TextInput
            label="Nama Merchant"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange("nama_lengkap")}
          />
          <TextInput
            label="Alamat Email"
            mode="flat"
            style={styles.TextInput}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            onChangeText={handleEmail("email")}
          />
          <PhoneInput
            defaultCode="ID"
            placeholder="812xxxxxxx"
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
            onChangeText={handleChange("no_ponsel")}
          />
          <View style={{flex: 1, flexDirection: 'column'}}>
          <TextInput
            label="Password"
            mode="flat"
            secureTextEntry = {hidePass ? true : false}
            style={styles.TextInput}
            autoCapitalize="none"
            onChangeText={handleChange("password")}
          />
          <Icon
            style={{position: 'absolute', right: 5, bottom: 25}}
            name={hidePass ? "eye-off" : "eye"}
            color="grey"
            size={20}
            onPress={() => setHidePass(!hidePass)}
          />
          </View>
          <Button
            mode="contained"
            uppercase={false}
            style={styles.Button}
            onPress={() => checkProperties()}>
            Selanjutnya
          </Button>
          <Text
            style={{textAlign: 'center', marginVertical: 10, color: '#A5A6AA'}}>
            Sudah punya akun Jastip?
            <Text style={{color: '#01579B'}} onPress={() => Actions.pop()}>Login</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
