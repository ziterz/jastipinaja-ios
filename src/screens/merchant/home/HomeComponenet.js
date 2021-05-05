import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  BackHandler,
  Alert,
} from 'react-native';
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Actions} from 'react-native-router-flux';
import {apiService, getConfig} from '../../../utils/Global';
import {convertToRupiah} from '../../../utils/Service';
import {SafeAreaView} from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  divBlue: {
    flex: 1,
    backgroundColor: '#01579B',
    padding: 25,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Searchbar: {
    width: '70%',
  },
  icon: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    fontWeight: 'bold',
  },
  textHeader: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  root2: {
    padding: 25,
  },
  divCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  textCard: {
    fontWeight: 'bold',
    color: '#01579B',
    fontSize: 26,
    flexDirection: 'column-reverse'
  },
  penjualan: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    height: 50,
    padding: 10,
    marginVertical: 20,
  },
  textPenjualan: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#01579B',
  },
  pendapatan: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    height: 50,
    padding: 10,
    marginVertical: 20,
  },
});

export default function HomeComponenent() {
  const [data, setData] = useState({});
  const [summary, setSummary] = useState({
    belum_bayar: {jumlah_transaksi: 0, pendapatan_bersih: 0},
    dikirim: {jumlah_transaksi: 0, pendapatan_bersih: 0},
    diterima: {jumlah_transaksi: 0, pendapatan_bersih: 0},
    sudah_bayar: {jumlah_transaksi: 0, pendapatan_bersih: 0},
  });
  const backAction = () => {
    if (Actions.currentScene === '_homeMerchant') {
      Alert.alert('Perhatian!', 'Apakah anda yakin ingin keluar?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'Ya', onPress: () => BackHandler.exitApp()},
      ]);
    }
  };
  Actions.refs.homeMerchant = {
    onEnter: () => {
      personalData();
      summaryData();
      setBackPress();
    },
    onExit: () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    },
  };

  async function setBackPress() {
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }

  async function personalData() {
    const Data = await apiService.get('/auth/personal_data', await getConfig());
    setData(Data.data.data);
  }
  async function summaryData() {
    const Data = await apiService.get(
      '/transaction/merchant_get_summary',
      await getConfig(),
    );
    setSummary(Data.data.data);
  }
  useEffect(() => {
    personalData();
    summaryData();
  }, []);
  OneSignal.sendTag("userId", `${data.id_user}`);
  OneSignal.sendTag("userRole", `${data.role_user}`);
  OneSignal.sendTag("city", data.kota);
  console.log("city", data.kota);
  console.log("userId", `${data.id_user}`);
  console.log("userRole", `${data.role_user}`);

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.divBlue}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>{data.nama_lengkap}</Text>
            <Icon
              name="notifications"
              size={30}
              color="#fff"
              style={styles.icon}
              onPress={() => Actions.notifications()}
            />
          </View>
          {/* <Text style={styles.name}>Hari ini</Text> */}
          <View style={{...styles.divCard, marginTop: 10}}>
            <Card style={styles.card}>
              <Text style={{height:36}}>Menunggu Pembayaran</Text>
              <Text style={styles.textCard}>
                {summary.belum_bayar.jumlah_transaksi}
              </Text>
            </Card>
            <Card style={styles.card}>
              <Text style={{height:36}}>Siap Dikirim</Text>
              <Text style={styles.textCard}>
                {summary.sudah_bayar.jumlah_transaksi}
              </Text>
            </Card>
          </View>
        </View>
        <View style={styles.root2}>
          <Text>Ringkasan Penjualan</Text>
          <View style={styles.penjualan}>
            <Text>Jumlah Pesanan</Text>
            <Text style={styles.textPenjualan}>
              {summary.diterima.jumlah_transaksi}
            </Text>
          </View>
          <Text>Pendapatan</Text>
          <View style={styles.pendapatan}>
            <Text style={styles.textPenjualan}>
              {convertToRupiah(summary.diterima.pendapatan_bersih)}
            </Text>
          </View>
          <Text>Membership</Text>
          <View style={styles.pendapatan}>
            <Text style={styles.textPenjualan}>{data.status_official ? "Official Merchant" : "Jastiper"}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
