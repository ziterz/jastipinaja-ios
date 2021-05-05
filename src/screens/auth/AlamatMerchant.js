import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Linking } from 'react-native';
import Toast from 'react-native-simple-toast';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { API_URL } from '../../utils/Service';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import axios from 'axios';

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
    marginVertical: 5,
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
    shadowOffset: { width: 1, height: 13 },
  },
  iconGoogle: {
    marginRight: 10,
  },
  textGoogle: {
    fontWeight: 'bold',
  },
  Checkbox: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  term: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default function AlamatMerchant(props) {
  const [data, setData] = useState({
    nama_lengkap: props.nama_lengkap,
    email: props.email,
    no_ponsel: props.no_ponsel,
    password: props.password,
    kelurahan: '',
    kecamatan: '',
    kota: '',
    provinsi: '',
    alamat_lengkap: '',
    kode_pos: '',
    role_user: 2,
  });

  const [provinsi, setprovinsi] = useState([]);
  const [kota, setkota] = useState([]);
  const [kecamatan, setkecamatan] = useState([]);
  const [kelurahan, setkelurahan] = useState([]);
  const [kodepos, setkodepos] = useState([]);

  async function fetchProvinsi() {
    const Data = await axios(`${API_URL}/ongkir/alamat/provinsi`);
    const dropdown = Data.data.data.sort((a, b) => a.provinsi > b.provinsi).map((value) => {
      return {label: value.provinsi, value: value.provinsi, hidden: false};
    });
    setprovinsi(dropdown);
  }
  async function fetchKota(value) {
    console.log(provinsi);
    const Data = await axios(
      `${API_URL}/ongkir/alamat/kabupaten?provinsi=${value}`,
    );
    console.log(Data);
    const dropdown = Data.data.data.sort((a, b) => a.kabupaten > b.kabupaten).map((value) => {
      return {label: value.kabupaten, value: value.kabupaten, hidden: false};
    });
    console.log(Data.data.data);
    setkota(dropdown);
  }

  async function fetchKecamatan(value) {
    const Data = await axios(
      `${API_URL}/ongkir/alamat/kecamatan?kabupaten=${value}`,
    );
    console.log(Data.data.data);
    const dropdown = Data.data.data.sort((a, b) => a.kecamatan > b.kecamatan).map((value) => {
      return {label: value.kecamatan, value: value.kecamatan, hidden: false};
    });
    setkecamatan(dropdown);
  }

  async function fetchKelurahan(value) {
    const Data = await axios(
      `${API_URL}/ongkir/alamat/kelurahan?kecamatan=${value}`,
    );
    const dropdown = Data.data.data.sort((a, b) => a.kelurahan > b.kelurahan).map((value) => {
      return {label: value.kelurahan, value: value.kelurahan, hidden: false};
    });
    setkelurahan(dropdown);
  }

  async function fetchKodepos(value) {
    const Data = await axios(
      `${API_URL}/ongkir/alamat/kodepos?kelurahan=${value}`,
    );
    const dropdown = Data.data.data.sort((a, b) => a.kodepos > b.kodepos).map((value) => {
      return {label: value.kodepos, value: value.kodepos, hidden: false};
    });
    setkodepos(dropdown);
  }

  const changeValue = (name, value) => {
    setData({ ...data, [name]: value });
    switch (name) {
      case 'provinsi':
        fetchKota(value);
        setData({
          ...data,
          provinsi: value,
          kota: '',
          kecamatan: '',
          kelurahan: '',
          kode_pos: '',
        });
        break;
      case 'kota':
        fetchKecamatan(value);
        setkelurahan([]);
        setkodepos([]);
        setData({
          ...data,
          kota: value,
          kecamatan: '',
          kelurahan: '',
          kode_pos: '',
        });
        break;
      case 'kecamatan':
        fetchKelurahan(value);
        setkodepos([]);
        setData({
          ...data,
          kecamatan: value,
          kelurahan: '',
          kode_pos: '',
        });
        break;
      case 'kelurahan':
        fetchKodepos(value);
        setData({
          ...data,
          kelurahan: value,
          kode_pos: '',
        });
        break;
      default:
        break;
    }
    console.log(data);
  };

  function checkProperties(obj) {
    const test = {
      provinsi: obj.provinsi,
      kota: obj.kota,
      kecamatan: obj.kecamatan,
      kelurahan: obj.kelurahan,
      alamat_lengkap: obj.alamat_lengkap,
      kode_pos: obj.kode_pos,
    };
    // if (data.alamat_lengkap.length == 0 ){
    //   return Toast.show('Masukan Alamat lengkap');
    // } else if (data.provinsi.length == 0 ){
    //   return Toast.show('Pilih Provinsi');
    // } else if (data.kota.length == 0 ){
    //   return Toast.show('Pilih Kota');
    // } else if (data.kecamatan.length == 0){
    //   return Toast.show('Pilih Kecamatan');
    // }else if (data.kelurahan.length == 0){
    //   return Toast.show('Pilih Kelurahan');
    // }else if (data.kode_pos.length == 0){
    //   return Toast.show('Pilih Kode pos');
    // }
    for (var key in test) {
      // console.log(key, test[key]);
      if (test[key] !== null && test[key] == '') return false;
    }
    return true;
  }
  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e });
  };

  // console.log(data, "wkowkowkowk")
  //checkbox term
  const [check, setChecked] = useState(false);

  async function daftarMerchant() {
    const is_valid = checkProperties(data);
    // console.log(is_valid,"validddd")
    if (is_valid) {
      console.log(data,"data aing")
      Axios.post(`${API_URL}/auth/daftar`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response,"sukses bor");
          if (response.data.statusCode == 200) {
            Toast.show('Berhasil Mendaftar Silahkan Login', Toast.LONG);
            Actions.replace('login');
          }
        })
        .catch((e) => {
          console.log(e,"gagal cuy");
          Toast.show("Masukan data yang sesuai", Toast.SHORT);
        });
    } else {
      Toast.show('data belum lengkap', Toast.SHORT);
    }
  }

  useEffect(() => {
    fetchProvinsi();
  }, []);

  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <TextInput
            label="Alamat Lengkap"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('alamat_lengkap')}
          />
          <Text>Provinsi</Text>
          <Dropdown
            data={[...provinsi, { label: data.provinsi, value: data.provinsi }]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{ backgroundColor: '#fafafa'}}
            value={data.provinsi}
            onChangeText={(item) => {
              changeValue('provinsi', item);
            }}
            disabled={provinsi.length == 0}
          />
          <Text>Kota / Kabupaten</Text>
          <Dropdown
            data={[...kota, { label: data.kota, value: data.kota }]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{ backgroundColor: '#fafafa' }}
            value={data.kota}
            onChangeText={(item) => {
              changeValue('kota', item);
            }}
            disabled={kota.length == 0}
          />
          <Text>Kecamatan</Text>
          <Dropdown
            data={[...kecamatan, { label: data.kecamatan, value: data.kecamatan }]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{ backgroundColor: '#fafafa' }}
            value={data.kecamatan}
            onChangeText={(item) => {
              changeValue('kecamatan', item);
            }}
            disabled={kecamatan.length == 0}
          />
          <Text>Kelurahan</Text>
          <Dropdown
            data={[...kelurahan, { label: data.kelurahan, value: data.kelurahan }]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{ backgroundColor: '#fafafa' }}
            value={data.kelurahan}
            onChangeText={(item) => {
              changeValue('kelurahan', item);
            }}
            disabled={kelurahan.length == 0}
          />
          <Text>Kode Pos</Text>
          <Dropdown
            data={[...kodepos, { label: `${data.kode_pos}`, value: `${data.kode_pos}` }]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{ backgroundColor: '#fafafa' }}
            value={data.kode_pos}
            onChangeText={(item) => {
              changeValue('kode_pos', item);
            }}
            disabled={kodepos.length == 0}
          />
          <View style={styles.Checkbox}>
            <Checkbox.Android
              status={check ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!check)}
            />
            <Text style={styles.term} onPress={() => Linking.openURL('https://jastipinaja.co.id/#/tac')}>Please read our Term and Conditions</Text>
          </View>
          {check && (
            <Button
              mode="contained"
              uppercase={false}
              style={styles.Button}
              onPress={() => daftarMerchant()}>
              Daftar sebagai Merchant
            </Button>
          )}
          <Text
            style={{ textAlign: 'center', marginVertical: 10, color: '#A5A6AA' }}>
            Sudah punya akun Jastip?
            <Text
              style={{ color: '#01579B' }}
              onPress={() => Actions.replace('login')}>
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
