import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {Button, TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {API_URL} from '../../../../utils/Service';
import {set} from 'react-native-reanimated';
import PhoneInput from 'react-native-phone-number-input';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';

const styles = StyleSheet.create({
  TextInput: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },
  Button: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  dropdown: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    marginVertical: 10,
  },
});

export default function PilihAlamat({cart, packaging, alamat, shipping}) {
  const [ganti, setganti] = useState(false);

  const [alamatTujuan, setalamatTujuan] = useState(alamat);

  const [data, setData] = useState({
    provinsi: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    alamat_lengkap: '',
    kode_pos: '',
  });

  const [penerima, setpenerima] = useState(shipping);
  const [provinsi, setprovinsi] = useState([]);
  const [kota, setkota] = useState([]);
  const [kecamatan, setkecamatan] = useState([]);
  const [kelurahan, setkelurahan] = useState([]);
  const [kodepos, setkodepos] = useState([]);

  useEffect(() => {
    console.log('cart=', cart, 'packaging=', packaging, 'alamat=', alamat);
    fetchProvinsi();
  }, []);
  async function fetchProvinsi() {
    const Data = await axios(`${API_URL}/ongkir/alamat/provinsi`);
    const dropdown = Data.data.data
      .sort((a, b) => a.provinsi > b.provinsi)
      .map((value) => {
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
    const dropdown = Data.data.data
      .sort((a, b) => a.kabupaten > b.kabupaten)
      .map((value) => {
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
    const dropdown = Data.data.data
      .sort((a, b) => a.kecamatan > b.kecamatan)
      .map((value) => {
        return {label: value.kecamatan, value: value.kecamatan, hidden: false};
      });
    setkecamatan(dropdown);
  }

  async function fetchKelurahan(value) {
    const Data = await axios(
      `${API_URL}/ongkir/alamat/kelurahan?kecamatan=${value}`,
    );
    const dropdown = Data.data.data
      .sort((a, b) => a.kelurahan > b.kelurahan)
      .map((value) => {
        return {label: value.kelurahan, value: value.kelurahan, hidden: false};
      });
    setkelurahan(dropdown);
  }

  async function fetchKodepos(value) {
    const Data = await axios(
      `${API_URL}/ongkir/alamat/kodepos?kelurahan=${value}`,
    );
    const dropdown = Data.data.data
      .sort((a, b) => a.kodepos > b.kodepos)
      .map((value) => {
        return {label: value.kodepos, value: value.kodepos, hidden: false};
      });
    setkodepos(dropdown);
  }

  async function simpanAlamat() {
    for (var key in data) {
      // console.log(key, test[key]);
      if (data[key] !== null && (data[key] == '' || data[key] == '-')) return Toast.show('data belum lengkap') ;
     
    }
    setalamatTujuan(
      `${data.alamat_lengkap} ${data.provinsi} ${data.kota} ${data.kecamatan} ${data.kelurahan} ${data.kode_pos}`,
    );
    setganti(false);
  }

  const handleChange = (name) => (e) => {
    setData({...data, [name]: e});
  };
  const handleChangePenerima = (name) => (e) => {
    setpenerima({...penerima, [name]: e});
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


  Actions.refs.pilihAlamat = {
    onBack : () => {
      Actions.replace('detailPesanan', {
        cart,
        packaging,
        alamat : null,
        shipping,
      })
    }
  }
  console.log(alamatTujuan);
  console.log(data.alamat_lengkap);

  return (
    <SafeAreaView style={{backgroundColor: '#F7F7F7', flex: 1}}>
      <ScrollView>
        <Text style={{margin: 10, color: '#4E5157'}}>Alamat Pengiriman</Text>
        {ganti == false && (
          <View>
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'space-around',
                backgroundColor: '#fff',
                padding: 5,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="map-marker"
                  size={30}
                  color="red"
                  style={{marginRight: 10}}
                />
                <View>
                  {penerima && (
                    <Text
                      style={{
                        color: '#01579B',
                        fontWeight: 'bold',
                        fontSize: 15,
                      }}>
                      {`${penerima.penerima} (0${penerima.no_ponsel})`}
                    </Text>
                  )}
                  {
                    alamatTujuan != 'null null null null null null' ? <Text style={{fontSize: 14}}>{alamatTujuan}</Text> : <Text style={{fontSize: 15}}>Silahkan masukan alamat</Text>
                  }
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: 10,
                  justifyContent: 'flex-end',
                }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  style={styles.Button}
                  onPress={() => setganti(true)}>
                  Ganti Alamat
                </Button>
              </View>
            </View>
            
            

            {alamatTujuan != 'null null null null null null' ?  
            <Button
            mode="contained"
            uppercase={false}
            style={styles.Button}
            onPress={() =>
              Actions.replace('detailPesanan', {
                cart,
                packaging,
                alamat: alamatTujuan,
                shipping: penerima,
              })
            }
            >
            Pilih Alamat
          </Button>
            : 
            <Button
              mode="contained"
              uppercase={false}
              style={styles.Button}
              onPress={() =>
                Toast.show('Silahkan masukan alamat terlebih dahulu',Toast.LONG)
              }
              >
              Pilih Alamat
            </Button>
             }
            
          </View>
        )}



        
        {ganti == true && (
          <View>
            <TextInput
              label="Nama Penerima"
              mode="flat"
              style={styles.TextInput}
              value={penerima.penerima}
              onChangeText={handleChangePenerima('penerima')}
            />
            <PhoneInput
              label="Nomor Ponsel"
              mode="flat"
              style={{...styles.TextInput, marginHorizontal: 20}}
              defaultCode="ID"
              value={penerima.no_ponsel}
              onChangeText={handleChangePenerima('no_ponsel')}
            />
            <TextInput
              label="Alamat Lengkap"
              mode="flat"
              style={styles.TextInput}
              value={data.alamat_lengkap}
              onChangeText={handleChange('alamat_lengkap')}
            />
            <Text style={{marginLeft: 10, paddingTop: 5}}>Provinsi</Text>
            <Dropdown
              data={[...provinsi, {label: data.provinsi, value: data.provinsi}]}
              icon="chevron-down"
              iconColor="#E1E1E1"
              style={styles.dropdown}
              value={data.provinsi}
              onChangeText={(item) => {
                changeValue('provinsi', item);
              }}
              disabled={provinsi.length == 0}
            />
            <Text style={{marginLeft: 10, paddingTop: 5}}>
              Kota / Kabupaten
            </Text>
            <Dropdown
              data={[...kota, {label: data.kota, value: data.kota}]}
              icon="chevron-down"
              iconColor="#E1E1E1"
              style={styles.dropdown}
              value={data.kota}
              onChangeText={(item) => {
                changeValue('kota', item);
              }}
              disabled={kota.length == 0}
            />
            <Text style={{marginLeft: 10, paddingTop: 5}}>Kecamatan</Text>
            <Dropdown
              data={[
                ...kecamatan,
                {label: data.kecamatan, value: data.kecamatan},
              ]}
              icon="chevron-down"
              iconColor="#E1E1E1"
              style={styles.dropdown}
              value={data.kecamatan}
              onChangeText={(item) => {
                changeValue('kecamatan', item);
              }}
              disabled={kecamatan.length == 0}
            />
            <Text style={{marginLeft: 10, paddingTop: 5}}>Kelurahan</Text>
            <Dropdown
              data={[
                ...kelurahan,
                {label: data.kelurahan, value: data.kelurahan},
              ]}
              icon="chevron-down"
              iconColor="#E1E1E1"
              style={styles.dropdown}
              value={data.kelurahan}
              onChangeText={(item) => {
                changeValue('kelurahan', item);
              }}
              disabled={kelurahan.length == 0}
            />
            <Text style={{marginLeft: 10, paddingTop: 5}}>Kode Pos</Text>
            <Dropdown
              data={[
                ...kodepos,
                {label: `${data.kode_pos}`, value: `${data.kode_pos}`},
              ]}
              icon="chevron-down"
              iconColor="#E1E1E1"
              style={styles.dropdown}
              value={data.kode_pos}
              onChangeText={(item) => {
                changeValue('kode_pos', item);
              }}
              disabled={kodepos.length == 0}
            />
            <View>
              <Button
                mode="contained"
                uppercase={false}
                style={styles.Button}
                onPress={() => simpanAlamat()}>
                Simpan Alamat
              </Button>
              <Button
                mode="outlined"
                uppercase={false}
                style={{...styles.Button, marginTop: 10}}
                onPress={() => setganti(false)}>
                Batal Simpan
              </Button>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
