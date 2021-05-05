import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Button, Divider} from 'react-native-paper';
import DividerCustom from '../../../../assets/divider.svg';
import Someday from '../../../../assets/someday.svg';
import Gift from '../../../../assets/gift.svg';
import Box from '../../../../assets/box.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {getSession} from '../../../../utils/Global';
import {convertToRupiah, API_URL} from '../../../../utils/Service';
import axios from 'axios';

export default function DetailPesanan({packaging, cart, alamat, shipping}) {
  const [auth, setauth] = useState({});
  const [loading, setloading] = useState(false);
  const [token, setToken] = useState({});
  const [total, settotal] = useState(0);
  const [jenisPackaging, setJenisPackaging] = useState(packaging);
  const [alamatTujuan, setAlamatTujuan] = useState(alamat);
  const [penerima, setPenerima] = useState(shipping);
  const [biayaLayanan, setBiayaLayanan] = useState(0);

  function hitungTotal() {
    var total = 0;
    cart.forEach((value) => {
      total += value.product.harga_produk * value.quantity;
    });
    // total += jenisPackaging.price;
    total += 15000; //ongkir hardcode
    const biaya_layanan = Math.ceil(total * 0.015);
    total += biaya_layanan; //biaya layanan
    setBiayaLayanan(biaya_layanan);
    settotal(total);
  }
  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());
      const Data = await axios(`${API_URL}/auth/personal_data`, {
        headers: {Authorization: `Bearer ${datas.token}`},
      });
      const newAuth = Data.data.data;
      setauth(newAuth);
      setToken(datas);

      if (alamatTujuan == undefined) {
        setAlamatTujuan(
          `${newAuth.alamat_lengkap} ${newAuth.provinsi} ${newAuth.kota} ${newAuth.kecamatan} ${newAuth.kelurahan} ${newAuth.kode_pos}`,
        );
      }
      if (penerima == undefined) {
        setPenerima({
          penerima: newAuth.nama_lengkap,
          no_ponsel: newAuth.no_ponsel,
        });
      }
    }
    fetchData();
    hitungTotal();
  }, []);

  async function hapusCart() {
    const datas = JSON.parse(await getSession());
    cart.forEach((value) => {
      axios
        .delete(`${API_URL}/cart/${value.id_cart}`, {
          headers: {Authorization: `Bearer ${datas.token}`},
        })
        .then((response) => {
          console.log(response.data);
        });
    });
  }
  const handleTransaction = async () => {
    setloading(true);
    const dataTransaction = {
      alamat_tujuan: alamatTujuan,
      jenis_pengiriman: 1,
      biaya_layanan: biayaLayanan,
      // jenis_packaging: jenisPackaging.name === 'Parcel Packaging' ? 1 : 0,
      jenis_packaging: 0,
      penerima: penerima.penerima,
      no_ponsel: penerima.no_ponsel,
      produk: cart.map((value) => {
        return {
          id_produk: value.product.id_produk,
          quantity: value.quantity,
        };
      }),
    };
    console.log(dataTransaction);

    // console.log(dataTransaction)
    // setloading(false)

    axios
      .post(`${API_URL}/transaction/new`, dataTransaction, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        console.log('Berhasil');
        console.log(res.data);
        hapusCart().then((value) => {
          // Actions.replace('midtrans', {data: res.data.data});
          openPayment(res.data.data.midtrans_data.link_payment)
        });
      })
      .catch((error) => {
        setloading(false);
        Toast.show(`Transaction gagal ! ${error}`, Toast.SHORT);
      });
  };
  function openPayment(data){
    if (Platform.OS === 'android'){
      Actions.replace('midtrans', {data});
    } else if (Platform.OS === 'ios'){
      Linking.openURL(data);
      console.log('canot open, ', data )
    }
    

  }
  // console.log(auth.alamat_tujuan)
  // console.log(alamat)
  console.log(alamatTujuan)
  // console.log(auth.alamat_lengkap)
  return (
    <SafeAreaView style={{backgroundColor: '#F7F7F7', flex: 1}}>
      <ScrollView>
        
        <Text style={{margin: 10, color: '#4E5157', marginVertical: 20}}>
          Dikirim ke
        </Text>
        <TouchableOpacity
          onPress={() =>
            Actions.replace('pilihAlamat', {
              cart,
              packaging,
              alamat: alamatTujuan,
              shipping: penerima,
            })
          }>
          <View
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              padding: 10,
            }}>
            <Icon
              name="map-marker"
              size={30}
              color="red"
              style={{marginRight: 10}}
            />
            <View
              style={{
                width: '90%',
              }}>
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
              {alamatTujuan != 'null null null null null null' ?
              <Text style={{color: 'black'}}>{alamatTujuan}</Text> : <Text style={{color:'red', paddingTop:4,fontWeight:'bold'}}>Silahkan Isi Alamat Anda Di Profile / Gunakan Ganti Alamat</Text>
              }
            </View>
            <Icon name="angle-right" size={30} color="#A5A6AA" />
          </View>
        </TouchableOpacity>
        <DividerCustom style={{marginVertical: 10}} /> 
        <Text style={{margin: 10, color: '#4E5157', marginVertical: 10}}>
          Jenis Pengiriman
        </Text>
        <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            padding: 10,
          }}
          activeOpacity={2}
          onPress={() => Actions.jasaPengiriman()}>
          <Someday />
          <Text style={{width: '90%'}}>Sameday Delivery oleh Paxel</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity>
        {/*<Text style={{margin: 10, color: '#4E5157', marginVertical: 20}}>
          Jenis Packaging
        </Text>
         <TouchableOpacity
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            padding: 10,
          }}
          activeOpacity={2}
          onPress={() => Actions.replace('jasaPackaging', {cart, alamat: alamatTujuan, shipping: penerima})}>
          {packaging.name === 'Parcel Packaging' ? <Gift /> : <Box />}
          <Text>{packaging.name}</Text>
          <Icon name="angle-right" size={30} color="#A5A6AA" />
        </TouchableOpacity> */}
        <Text style={{margin: 10, color: '#4E5157', marginVertical: 20}}>
          Ringkasan Pesanan
        </Text>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            padding: 10,
          }}>
          {cart &&
            cart.map((value) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                }}
                key={value.id_cart}>
                <Text style={{fontWeight: 'normal', fontSize: 14,width:'80%'}}>
                  {value.product.nama_produk} x{value.quantity} pcs
                </Text>
                <Text
                  style={{fontWeight: 'bold', color: '#01579B', fontSize: 14}}>
                  {convertToRupiah(value.product.harga_produk * value.quantity)}
                </Text>
              </View>
            ))}

          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={{fontWeight: 'normal', fontSize: 14}}>
              Pie Susu - Rasa Keju x6 pcs
            </Text>
            <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 16}}>
              Rp120.000
            </Text>
          </View> */}
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={{fontWeight: 'normal', fontSize: 14}}>
              Biaya Packaging
            </Text>
            <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 16}}>
              {convertToRupiah(packaging.price)}
            </Text>
          </View> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={{fontWeight: 'normal', fontSize: 14,width:'80%'}}>
              Biaya Pengiriman
            </Text>
            <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 14}}>
              Rp 15.000
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={{fontWeight: 'normal', fontSize: 14}}>
              Biaya Layanan
            </Text>
            <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 14}}>
              {convertToRupiah(biayaLayanan)}
            </Text>
          </View>
          <Divider />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Total</Text>
            <Text style={{fontWeight: 'bold', color: '#01579B', fontSize: 16}}>
              {convertToRupiah(total)}
            </Text>
          </View>
          {alamatTujuan != 'null null null null null null'  ?
          <Button
            mode="contained"
            uppercase={false}
            style={{justifyContent: 'center', marginVertical: 20}}
            onPress={() => handleTransaction()}
            disabled={loading}>
            Bayar Sekarang
          </Button>
          :
          <Button
            mode="contained"
            uppercase={false}
            style={{justifyContent: 'center', marginVertical: 20}}
            
            onPress={() => Toast.show('Anda belum mengisi alamat, Silahkan Isi Alamat terlebih dahulu',Toast.LONG)}
            disabled={loading}>
            Bayar Sekarang
          </Button>

          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
