import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {API_URL} from '../../../utils/Service';
import axios from 'axios';
import {getSession} from '../../../utils/Global';
import {Actions} from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast'
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
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
  dropdown: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
});
const RequestProduct = () => {
  const [data, setData] = useState({
    nama_produk: '',
    detail_produk: '',
    nama_toko: '',
    provinsi: '',
    kota: '',
  });
  const [loading, setloading] = useState(false);
  const [auth, setauth] = useState({});


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
      default:
        break;
    }
    console.log(data);
  };

  // async function fetchProvinsi() {
  //   const Data = await axios(`${API_URL}/ongkir/alamat/provinsi`);
  //   const dropdown = Data.data.data.map((value) => {
  //     return {label: value.provinsi, value: value.provinsi, hidden: false};
  //   });
  //   console.log(Data.data);
  //   setprovinsi(dropdown);
  // }
  // async function fetchKota(value) {
  //   console.log(provinsi);
  //   const Data = await axios(
  //     `${API_URL}/ongkir/alamat/kabupaten?provinsi=${value}`,
  //   );
  //   console.log(Data);
  //   const dropdown = Data.data.data.map((value) => {
  //     return {label: value.kabupaten, value: value.kabupaten, hidden: false};
  //   });
  //   console.log(Data.data.data);
  //   setkota(dropdown);
  // }

  async function fetchData() {
    const datas = JSON.parse(await getSession());
    setauth(datas);
  }
  useEffect(() => {
    fetchData();
    fetchProvinsi();
  }, []);
  const handleSubmit = async () => {
    setloading(true);
    if (
      data.detail_produk === '' ||
      data.nama_toko === '' ||
      data.nama_produk === '' ||
      data.kota === '' ||
      data.provinsi === ''
    ) {
      setloading(false);
      Toast.show(`Input harap di isi dengan benar `, Toast.SHORT);
    } else {
      try {
        const res = await axios.post(`${API_URL}/request`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (res.data.statusCode === 200) {
          Actions.replace('daftarRequest');
        }
      } catch (error) {
        setloading(false);
        Toast.show(
          `create request failed !\n${error}`,
          Toast.SHORT,
        );
      }
    }
  };
  return (
    <ScrollView>
      <View style={styles.root}>
        <View>
          <TextInput
            label="Nama Produk"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('nama_produk')}
            value={data.nama_produk}
          />
          <TextInput
            label="Detail Produk"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('detail_produk')}
            value={data.detail_produk}
          />
          <TextInput
            label="Nama Toko"
            mode="flat"
            style={styles.TextInput}
            value={data.nama_toko}
            onChangeText={handleChange('nama_toko')}
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
          <Text style={{marginVertical: 10, marginHorizontal: 3, fontSize: 12, fontStyle: 'italic'}}>
          *untuk menjaga ketahanan produk, sementara kami hanya melayani wilayah diatas
          </Text>
          <Button
            mode="contained"
            uppercase={false}
            style={styles.Button}
            onPress={() => handleSubmit()}
            disabled={loading}>
            Buat Request
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
export default RequestProduct;
