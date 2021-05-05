import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, View, Text, Image, Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import {TextInput, Button, Checkbox, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {API_URL} from '../../../../utils/Service';
import {getSession} from '../../../../utils/Global';
import {Actions} from 'react-native-router-flux';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import DatePicker from 'react-native-date-picker';
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
  Checkbox: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  packaging: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  typePesanan: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cardPlus: {
    display: 'flex',
    flex: 1,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 10,
  },
  image: {
    width: 70,
    flex: 1,
    height: 70,
    marginHorizontal: 10,
  },
});

export default function TambahProduk() {
  const today = moment();
  const [state, setstate] = useState({
    nama_produk: '',
    harga_produk: '',
    deskripsi_produk: '',
    nama_toko: '',
    berat_produk: '',
    masa_kadaluarsa: '',
    standard: '1',
    gift: '0',
    pre_order: 0,
    due_date: today.format('YYYY-MM-DD'),
    file_url: [],
  });
  const [packaging, setPackaging] = useState({
    standard: false,
    gift: false,
  });

  const [auth, setauth] = useState({});

  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());
      setauth(datas);
    }
    console.log(state);
    fetchData();
  }, []);
  const handleChange = (name) => (e) => {
    setstate({...state, [name]: e});
  };
  const handleChecked = (name) => {
    switch (name) {
      case 'standard':
        setPackaging((prevState) => ({
          ...packaging,
          standard: !prevState.standard,
        }));
        setstate({...state, standard: packaging.standard ? 0 : 1});
        break;
      case 'gift':
        setPackaging((prevState) => ({...packaging, gift: !prevState.gift}));
        setstate({...state, gift: packaging.gift ? 0 : 1});
        break;
      default:
        break;
    }
  };
  const selectPhotoTapped = async () => {
    launchImageLibrary({mediaType: 'photo'}, (response) => {
      let source = response.uri;
      if (source != undefined) {

      
      const data = new FormData();
      data.append('product_image', {
        name: response.fileName,
        type: 'image/jpg',
        uri: source,
      });
      axios
        .put(`${API_URL}/product/upload_image`, data, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          try {
            console.log('anying', res.data.data);
            setstate((prevState) => {
              return {
                ...state,
                file_url: [...prevState.file_url, res.data.data],
              };
            });
          } catch (error) {
            console.log('unyang', error);
          }
        })
        .catch((err) => {
          console.log(err);
          Toast.show('Update Foto gagal !', Toast.SHORT);
        });
      }
    });
  };
  const handleSubmit = async () => {
    if (state.file_url.length === 0) {
      Toast.show(`Input harap di isi dengan benar `, Toast.SHORT);
    } else {
      try {
        const res = await axios.post(
          `${API_URL}/product/tambah_produk`,
          state,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.token}`,
            },
          },
        );
        if (res.data.statusCode === 200) {
          Actions.produk();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handelTypePesanan = (name) => {
    setstate({...state, pre_order: name === 'normal' ? 0 : 1});
    console.log(state.pre_order)
  };
  const handleDeleteImage = async (index) => {
    Alert.alert(
      'Peringatan',
      `Apakah anda yakin akan menghapus gambar ke-${index + 1}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          const newFiles = state.file_url
          newFiles.splice(index, 1)
          setstate({...state, file_url: newFiles})
        }},
      ],
    );
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text>Tambah Gambar</Text>
        <ScrollView horizontal style={{marginVertical: 10}}>
          {state.file_url.map((res, i) => {
            return (
              <View>
                <Image style={styles.image} source={{uri: res}} key={i} />
                <Icon
                  name="times-circle"
                  size={25}
                  style={{
                    margin: 5,
                    position: 'absolute',
                    top: -5,
                    right: 0,
                    width: 25,
                    height: 25,
                    color: 'tomato',
                  }}
                  onPress={() => {
                    console.log(i)
                    handleDeleteImage(i);
                  }}
                />
              </View>
            );
          })}

          <Card
            style={styles.cardPlus}
            elevation={2}
            onPress={() => selectPhotoTapped()}>
            <Icon name="plus" size={30} />
          </Card>
        </ScrollView>

        <View>
          <TextInput
            label="Nama Produk"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('nama_produk')}
            value={state.nama_produk}
          />
          <TextInput
            label="Harga"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('harga_produk')}
            keyboardType="number-pad"
            value={state.harga_produk}
          />
          <TextInput
            label="Deskripsi Produk"
            mode="flat"
            style={styles.TextInput}
            maxLength={250}
            placeholder={"Masukan deskripsi disini maksimal 250 karakter"}
            onChangeText={handleChange('deskripsi_produk')}
            value={state.deskripsi_produk}
          />
          <TextInput
            label="Nama Toko (Toko Produsen)"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('nama_toko')}
            value={state.nama_toko}
          />
          <TextInput
            label="Berat Produk (gram)"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('berat_produk')}
            keyboardType="number-pad"
            value={state.berat_produk}
          />
          <TextInput
            label="Masa Kadaluarsa (hari)"
            mode="flat"
            style={styles.TextInput}
            onChangeText={handleChange('masa_kadaluarsa')}
            keyboardType="number-pad"
            value={state.masa_kadaluarsa}
          />
          <Text style={{paddingTop: 5, paddingBottom: 5}}>Jenis Pesanan</Text>
          {/* <DropDownPicker
            items={[
              {label: 'Normal', value: 'normal'},
              {label: 'Pre Order', value: 'preorder'},
            ]}
            defaultValue={state.pre_order == 1 ? 'preorder' : 'normal'}
            containerStyle={{height: 40}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={(item) => handelTypePesanan(item.value)}
          /> */}
          
          <Dropdown
            data={[state.pre_order,
              {label: 'Normal', value: 'normal' },
              {label: 'Pre Order', value: 'preorder'},
          ]}
            icon='chevron-down'
            iconColor='#E1E1E1'
            style={{ backgroundColor: '#fafafa'}}
            value={state.pre_order == 1 ? 'preorder' : 'normal'}
            // onChangeText={(item) => {
            //   handelTypePesanan(item.value);
            // }}
            onChangeText={(item) => {handelTypePesanan(item)}}
          
          />
          {state.pre_order == 1 && (
            <View>
              <Text style={{paddingLeft: 5, paddingVertical: 20}}>
                Batas Pemesanan
              </Text>
              <DatePicker
                date={moment(state.due_date).toDate()}
                mode="date"
                androidVariant="nativeAndroid"
                minimumDate={moment().toDate()}
                onDateChange={(date) => {
                  setstate({
                    ...state,
                    due_date: moment(date).format('YYYY-MM-DD'),
                  });
                  console.log(state);
                }}
              />
            </View>
          )}

          {/* <Text style={{paddingTop: 8}}>Packaging</Text>
          <View style={styles.packaging}>
            <View style={styles.Checkbox}>
              <Checkbox.Android
                status={packaging.standard ? 'checked' : 'unchecked'}
                onPress={() => handleChecked('standard')}
              />
              <Text>Standart</Text>
            </View>
            <View style={styles.Checkbox}>
              <Checkbox.Android
                status={packaging.gift ? 'checked' : 'unchecked'}
                onPress={() => handleChecked('gift')}
              />
              <Text>Gift</Text>
            </View>
          </View> */}
          <Button
            mode="contained"
            uppercase={false}
            style={styles.Button}
            onPress={() => handleSubmit()}>
            Tambah
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
