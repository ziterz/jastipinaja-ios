import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import {getSession} from '../../../utils/Global';
import {API_URL} from '../../../utils/Service';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-simple-toast';

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
    marginVertical: 30,
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

export default function UbahAlamat() {
  const [data, setData] = useState({
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    alamat_lengkap: '',
    kode_pos: '',
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

  const handleChange = (name) => (e) => {
    setData({...data, [name]: e});
  };
  const changeValue = (name, value) => {
    setData({...data, [name]: value});
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
    for (var key in test) {
      console.log(key, test[key]);
      if (test[key] !== null && (test[key] == '' || test[key] == '-')) return false;
    }
    return true;
  }

  async function updateProfile() {
    const datas = JSON.parse(await getSession());
    const is_valid = checkProperties(data);
    if (is_valid) {
      axios
        .patch(`${API_URL}/auth/update_alamat`, data, {
          headers: {Authorization: `Bearer ${datas.token}`},
        })
        .then((response) => {
          if (response.data.statusCode === 200) {
            console.log(data);
            Toast.show(`Update alamat berhasil`, Toast.SHORT);
            Actions.pop();
            Actions.refresh();
          } else {
            Toast.show(
              `Update alamat gagal\n${response.data.message}`,
              Toast.SHORT,
            );
          }
        })
        .catch((e) => {
          Toast.show(`Gagal\n${e}`, Toast.SHORT);
        });
    } else {
      Toast.show(`Data masih ada yang kosong`, Toast.SHORT);
    }
  }
  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());

      const Data = await axios(`${API_URL}/auth/personal_data`, {
        headers: {Authorization: `Bearer ${datas.token}`},
      });
      const newData = Data.data.data;
      console.log(newData)
      if (newData.alamat_lengkap == null) {
        setData({
          ...data,
          alamat_lengkap: '',
          provinsi: '',
          kota: '',
          kecamatan: '',
          kelurahan: '',
          kode_pos: '',
        });
      } else {
        setData(Data.data.data);
      }
    }
    fetchData();
    fetchProvinsi();
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
        <View>
          <TextInput
            label="Alamat Lengkap"
            mode="flat"
            style={styles.TextInput}
            value={data.alamat_lengkap}
            onChangeText={handleChange('alamat_lengkap')}
          />
          <Text>Provinsi</Text>
          <Dropdown
            data={[...provinsi, {label: data.provinsi, value: data.provinsi}]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{backgroundColor: '#fafafa'}}
            value={data.provinsi}
            onChangeText={(item) => {
              changeValue('provinsi', item);
            }}
            disabled={provinsi.length == 0}
          />
          <Text>Kota / Kabupaten</Text>
          <Dropdown
            data={[...kota, {label: data.kota, value: data.kota}]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{backgroundColor: '#fafafa'}}
            value={data.kota}
            onChangeText={(item) => {
              changeValue('kota', item);
            }}
            disabled={kota.length == 0}
          />
          <Text>Kecamatan</Text>
          <Dropdown
            data={[...kecamatan, {label: data.kecamatan, value: data.kecamatan}]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{backgroundColor: '#fafafa'}}
            value={data.kecamatan}
            onChangeText={(item) => {
              changeValue('kecamatan', item);
            }}
            disabled={kecamatan.length == 0}
          />
          <Text>Kelurahan</Text>
          <Dropdown
            data={[...kelurahan, {label: data.kelurahan, value: data.kelurahan}]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{backgroundColor: '#fafafa'}}
            value={data.kelurahan}
            onChangeText={(item) => {
              changeValue('kelurahan', item);
            }}
            disabled={kelurahan.length == 0}
          />
          <Text>Kode Pos</Text>
          <Dropdown
            data={[...kodepos,{label: `${data.kode_pos}`, value: `${data.kode_pos}`}]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{backgroundColor: '#fafafa'}}
            value={data.kode_pos}
            onChangeText={(item) => {
              changeValue('kode_pos', item);
            }}
            disabled={kodepos.length == 0}
          />
          <Button
            mode="contained"
            uppercase={false}
            style={styles.Button}
            onPress={() => updateProfile()}>
            Simpan Alamat
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
