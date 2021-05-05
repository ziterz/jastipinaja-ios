import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  BackHandler,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {API_URL} from '../../../utils/Service';
import {getSession} from '../../../utils/Global';
import axios from 'axios';
import {Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Promo from './Promo';
import Rekomendasi from './Rekomendasi';
import SemuaProduk from './SemuaProduk.js';
import {Actions} from 'react-native-router-flux';
import OneSignal from 'react-native-onesignal';
import {apiService, getConfig} from '../../../utils/Global';

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
  },
  Searchbar: {
    width: '70%',
    height: 40,
  },
  icon: {
    marginLeft: 20,
  },
  name: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  root2: {
    padding: 25,
  },
});
const renderItem = (item) => <Promo item={item} />;
const renderRekomendasi = (item) => <Rekomendasi item={item} />;
const renderSemuaProduk = (item) => <SemuaProduk item={item} />;
export default function Home(props) {
  const [data, setData] = useState([]);
  const [auth, setauth] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [personal, setPersonal] = useState([]);
  const scrollRef = useRef();
  const backAction = () => {
    if (Actions.currentScene === '_homeCustomer') {
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

  Actions.refs.homeCustomer = {
    onEnter: () => {
      fetchData();
      setBackPress();
      setSearchQuery('');
    },
    onExit: () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      setSearchQuery('');
    },
    scrollToTop: () => {
      if (Actions.currentScene === '_homeCustomer') {
        scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
      } else {
        Actions.replace('homeCustomer');
        setSearchQuery('');
      }
    },

    isBack: 0,
  };


  async function setBackPress() {
    BackHandler.addEventListener('hardwareBackPress', backAction);
  }

  async function fetchData() {
    const datas = JSON.parse(await getSession());

    const Data = await axios(
      `${API_URL}/customer_product/get_all_produk?page=1`,
      {
        headers: {Authorization: `Bearer ${datas.token}`},
      },
    );

    setauth(datas);
    setData(Data.data?.data?.produk);
  }
  useEffect(() => {
    fetchData();
    setBackPress();
    personalData();
  }, []);
  const onChangeSearch = (query) => {
    Actions.search({query})
  }
  const handleSearch = () => {
    if (searchQuery !== '') {
      Actions.search({query: searchQuery});
      setSearchQuery('')
    }
  };
  async function personalData() {
    const Personal = await apiService.get('/auth/personal_data', await getConfig());
    setPersonal(Personal.data.data);
  }
  console.log(props.search);
  OneSignal.sendTag("userId", `${personal.id_user}`);
  OneSignal.sendTag("userRole", `${personal.role_user}`);
  OneSignal.sendTag("city", personal.kota);
  console.log("ahahahahahahha222222");
  console.log(personal);
  console.log("city", personal.kota);
  console.log("userId", `${personal.id_user}`);
  console.log("userRole", `${personal.role_user}`);
  return (
    <SafeAreaView>
      <ScrollView ref={scrollRef}>
        <View style={styles.root}>
          <View style={styles.divBlue}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.Searchbar}
              onPress={() => Actions.search({query: ''})}
              >
              <Searchbar
                numberOfLines={1}
                placeholder="Cari produk disini..."
                inputStyle={{height: '100%'}}
                // onChangeText={onChangeSearch}
                fontSize={15}
                value={searchQuery}
                // onIconPress={() => handleSearch()}
                onFocus={() => Actions.search({query: ''})}
                // onEnter={() => handleSearch()}
                // onSubmitEditing={() => handleSearch()}
              />
              </TouchableOpacity>

              <Icons
                name="list-alt"
                size={26}
                color="#fff"
                style={styles.icon}
                onPress={() => Actions.requestProduct()}
              />
              <Icon
                name="notifications"
                size={26}
                color="#fff"
                style={styles.icon}
                onPress={() => Actions.notifications()}
              />
            </View>
            <Text style={styles.name}>Hi, {auth?.user?.nama_lengkap}</Text>
            <FlatList
              data={data.slice(0, 5)}
              renderItem={renderItem}
              keyExtractor={(item) => item.id_produk}
              horizontal
            />
          </View>
          <View style={styles.root2}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
                Produk Terbaru
              </Text>
            </View>
            <FlatList
              data={data.slice(0, 5)}
              renderItem={renderRekomendasi}
              keyExtractor={(item) => item.id_produk}
              horizontal
            />
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
                Produk
              </Text>
              <Text
                onPress={() => Actions.detailRekomendasi()}
                style={{color: '#1847B0', fontWeight: 'bold', fontSize: 16}}>
                Lihat Semua
              </Text>
            </View>
            <FlatList
              data={data}
              renderItem={renderSemuaProduk}
              keyExtractor={(item) => item}
              style={{display: 'flex'}}
              numColumns={1}
            />
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
  );
}
