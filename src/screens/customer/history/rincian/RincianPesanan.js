import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Linking,
  Clipboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {Card, Button, TextInput, Snackbar} from 'react-native-paper';
import {convertToRupiah, API_URL, INVOICE_URL} from '../../../../utils/Service';
import axios from 'axios';
import {getSession} from '../../../../utils/Global';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ScrollView} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import SimpleToast from 'react-native-simple-toast';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  contentFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  noPesanan: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
  },
  noPesananBlue: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#01579B',
  },
  textGrey: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#A5A6AA',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

export default function RincianPesanan({data}) {
  const [dataRincian, setData] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const refRBSheet = React.useRef(false);
  const [resi, setresi] = useState('');
  const [auth, setauth] = useState({});
  const [visible, setVisible] = React.useState(false);
  const [copy, setCopy] = useState('');
  const [pickup, setPickup] = useState(0);

  const onDismissSnackBar = () => {
    setVisible(false);
    setCopy('');
  };
  
  function showButton() {
    console.log(data.status, data.tarik_dana);
    if (data.status == 0 && auth.user.role_user == 1) {
      return (
        <Button
          mode="contained"
          style={{width: '90%', borderRadius: 10}}
          onPress={() => handleClick()}>
          Bayar Sekarang
        </Button>
      );
    } else if (data.status == 1 && auth.user.role_user == 2) {
      return (
        <>
        {pickup === 0 ? 
        <Button
          mode="contained"
          style={{width: '90%', borderRadius: 10, marginBottom:10}}
          onPress={() => handlePickup()}>
          Request Pickup
        </Button> 
        :
        <Button
          mode="contained"
          style={{width: '90%', borderRadius: 10, marginBottom:10,backgroundColor: 'grey'}}
          onPress={() => handlePickup()}>
          Request Pickup
        </Button> 
        }

        <Button
          mode="contained"
          style={{width: '90%', borderRadius: 10}}
          onPress={() => handleClick()}>
          Input Resi
        </Button>

        </>
      );
    } else if (data.status == 2 && auth.user.role_user == 1) {
      return (
        <Button
          mode="contained"
          style={{width: '90%', borderRadius: 10}}
          onPress={() => handleClick()}>
          Transaksi Selesai
        </Button>
      );
    } else if (
      data.status == 3 &&
      data.tarik_dana === 0 &&
      data.nomor_resi !== null &&
      auth.user.role_user == 2

    ) {
      return (
        <>
          <Button
            mode="contained"
            style={{width: '90%', borderRadius: 10, marginVertical: 5}}
            onPress={() => {
              Linking.openURL(`${INVOICE_URL}${data.id_transaksi}`);
            }}>
            Lihat Invoice
          </Button>
          <Button
            mode="outlined"
            style={{width: '90%', borderRadius: 10, marginVertical: 5}}
            onPress={() => handleClick()}>
            Request Tarik Dana
          </Button>
        </>
      );
    } else if (data.status == 3 && data.nomor_resi)  {
      return (
        <Button
          mode="contained"
          style={{width: '90%', borderRadius: 10}}
          onPress={() =>
            Linking.openURL(
              `https://jastipinaja.co.id/#/invoice/${data.id_transaksi}`,
            )
          }>
          Lihat Invoice
        </Button>
      );
    } else {
      return <View></View>;
    }
  }
  function getStatus(number) {
    const arr = ['Belum Bayar', 'Sudah Bayar', 'Dikirim', 'Diterima'];
    return arr[number];
  }
  const handleChange = (e) => {
    setresi(e);
  };
  const handlePickup = (e) => {
    let phone = '628174838282';
    let url = 'https://api.whatsapp.com/send?text=halo admin JastipinAja!, paket penjual dengan id transaksi : ' + data.id_transaksi + 'siap di pickup ya' + '&phone=' +phone;
    if (pickup === 0) {
      Linking.openURL(url);
      setPickup(1);
    } else {
      // setPickup(0);
      Toast.show('Anda Sudah menghubungi CS untuk pickup', Toast.LONG);
    }
  }
  async function fetchData() {
    const datas = JSON.parse(await getSession());
    const Data = await axios(
      `${API_URL}/transaction/rincian_pesanan/${data.id_transaksi}`,
      {
        headers: {Authorization: `Bearer ${datas.token}`},
      },
    );
    console.log(Data.data);
    setauth(datas);
    setData(Data.data.data);
  }
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  if (dataRincian === undefined) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const handleResi = async () => {
    try {
      const dataResi = {
        nomor_resi: resi,
      };
      const res = await axios.patch(
        `${API_URL}/transaction/${dataRincian.id_transaksi}/input_resi`,
        dataResi,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );
      if (res.data.statusCode === 200) {
        Actions.historyMerchant();
      }
      if (res.data.statusCode === 500) {
        Toast.show('Resi Anda Pernah Di input', Toast.LONG);
      }
    } catch (error) {
      Toast.show('Resi Anda Pernah Di input', Toast.LONG);
      console.log(error);
    }
  };
  function openPayment(link){
    if (Platform.OS === 'android'){
      Actions.rincianMidtrans({link});
    } else if (Platform.OS === 'ios'){
      Linking.openURL(link);
      console.log('canot open, ', link )
    }
  }
  const handleClick = async () => {
    switch (data.status) {
      case 0:
        console.log(dataRincian);
        openPayment(dataRincian.payment_link);
        break;
      case 1:
        refRBSheet.current.open();
        break;
      case 2:
        axios
          .patch(
            `${API_URL}/transaction/${dataRincian.id_transaksi}/terima`,
            null,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
              },
            },
          )
          .then((res) => {
            if (res.data.statusCode === 200) {
              Actions.pop();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log('dipanggil');
        break;
      case 3:
        axios
          .patch(
            `${API_URL}/transaction/${dataRincian.id_transaksi}/tarik_dana`,
            null,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
              },
            },
          )
          .then((res) => {
            if (res.data.statusCode === 200) {
              SimpleToast.show(
                'Berhasil request tarik dana\nTunggu verifikasi dari Admin',
                SimpleToast.SHORT,
              );
              Actions.pop();
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log('dipanggil');
        break;
      default:
        break;
    }
  };
  const copyToClipboard = (string) => {
    Clipboard.setString(string);
    setVisible(!visible);
    setCopy(`Copy Resi ${string}`);
  };
  const dibatalkan = dataRincian.status == 3 && dataRincian.nomor_resi == null;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.root}>
        <View style={styles.flex}>
          <Text style={styles.noPesanan}>No. Pesanan</Text>
          <Text style={styles.noPesananBlue}>{dataRincian.id_transaksi}</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentFlex}>
            <Text style={styles.noPesananBlue}>{dataRincian.penjual}</Text>
            <Text style={styles.noPesananBlue}>
              {dibatalkan ? 'Dibatalkan' : getStatus(dataRincian.status)}
            </Text>
          </View>
          {dataRincian &&
            dataRincian.transaction_items.map((res, i) => {
              console.log(res);
              return (
                <Card
                  style={{
                    marginVertical: 5,
                  }}
                  key={i}
                  elevation={2}>
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: 'row',
                        display: 'flex',
                        marginVertical: 10,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          display: 'flex',
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{
                            uri: `${API_URL}/${res.product.product_images[0].url_gambar}`,
                          }}
                          style={{width: 70, height: 60}}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            display: 'flex',
                            flex: 1,
                            marginHorizontal: 10,
                          }}>
                          <Text style={styles.noPesanan}>
                            {res.product.nama_produk}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          display: 'flex',
                        }}>
                        <Text style={{color: '#A5A6AA'}}>x{res.quantity}</Text>
                        <Text style={{fontWeight: 'bold', color: '#01579B'}}>
                          {convertToRupiah(
                            res.quantity * res.product.harga_produk,
                          )}
                        </Text>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              );
            })}

          <View style={styles.contentFlex}>
            <Text>Ongkos Kirim</Text>
            <Text>{convertToRupiah(dataRincian.ongkir)}</Text>
          </View>
          <View style={styles.contentFlex}>
            <Text>Biaya Layanan</Text>
            <Text>{convertToRupiah(dataRincian.biaya_layanan)}</Text>
          </View>
          <View style={styles.contentFlex}>
            <Text>Total Pembayaran</Text>
            <Text>{convertToRupiah(dataRincian.gross_amount)}</Text>
          </View>
          {!dibatalkan && dataRincian.status >1 && (
            <View>
              <View style={styles.contentFlex}>
                <Text>Nomor Resi</Text>
                <Text onPress={() => copyToClipboard(dataRincian.nomor_resi)}>
                  {dataRincian.nomor_resi}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity>
                  <Text
                    onPress={() =>
                      Linking.openURL('https://paxel.co/id/track-shipments')
                    }
                    style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      color: '#01579B',
                    }}>
                    Lacak Pesanan
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{marginTop: 30}}>
            <Text style={{fontWeight: 'bold'}}>Alamat Pengiriman</Text>
            <Text
              style={{
                color: '#01579B',
                fontWeight: 'bold',
                fontSize: 15,
                marginVertical: 5
              }}>
              {`${dataRincian.penerima} (0${dataRincian.no_ponsel})`}
            </Text>
            <Text>{dataRincian.alamat_tujuan}</Text>
          </View>
        </View>
        <View style={styles.button}>{showButton()}</View>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              padding: 20,
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginVertical: 10,
              }}>
              <TextInput
                label="Input Resi"
                mode="flat"
                style={styles.TextInput}
                autoCapitalize="none"
                onChangeText={handleChange}
                value={resi}
              />
            </View>
            <Button
              mode="contained"
              style={styles.button}
              uppercase={false}
              onPress={() => handleResi()}>
              Terapkan
            </Button>
          </View>
        </ScrollView>
      </RBSheet>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={1000}
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {copy}
      </Snackbar>
    </ScrollView>
  );
}
