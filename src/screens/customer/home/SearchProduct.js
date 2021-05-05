import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Appbar,
  Searchbar,
  RadioButton,
  Button,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL, convertToRupiah} from '../../../utils/Service';
import {getSession} from '../../../utils/Global';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
import Item from './Item';
import EmptyScreen from '../../../components/EmptyScreen';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  viewFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewContent: {
    padding: 20,
  },
  imageContent: {
    width: 80,
    height: 80,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  viewInner: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  official: {
    color: '#01579B',
    fontWeight: 'normal',
    fontSize: 16,
  },
  address: {
    color: '#4E5157',
    fontWeight: 'normal',
    fontSize: 16,
  },
  textInner: {
    color: '#A5A6AA',
    fontWeight: 'normal',
    fontSize: 16,
  },
  Searchbar: {
    width: '70%',
    marginLeft: 10,
    height: 40,
  },
  appbar: {
    padding: 10,
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  batal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: '#ffff',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    width: '90%',
    height: 35
  },
  radio: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
  },
  urutan: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    marginVertical: 20,
  },
});
const SearchProduct = ({query}) => {
  const image = {uri: 'https://reactjs.org/logo-og.png'};
  const [data, setData] = useState([]);
  const [auth, setauth] = useState({});
  const refRBSheet = useRef();
  const [searchQuery, setSearchQuery] = useState(query);
  const [checked, setChecked] = useState('terendah');
  const searchRef = useRef();

  Actions.refs.searchProduct = {
    onEnter : () => {
      searchRef.current?.focus()
    }
  }

  useEffect(() => {
    async function fetchData() {

      searchRef.current?.focus()
      if (searchQuery != ''){
        
      const datas = JSON.parse(await getSession());

      const Data = await axios(
        `${API_URL}/customer_product/get_all_produk?search=${searchQuery}`,
        {
          headers: {Authorization: `Bearer ${datas.token}`},
        },
      );
      setauth(datas);
      setData(Data.data?.data?.produk);
      console.log(Data.data);
      }
    }
    fetchData();
  }, []);
  const onChangeSearch = (query) => {
    setSearchQuery(query)
    setTimeout(() => {
      if (query != searchQuery){
        handleSearch()
      }
    },500)
  };
  const handleSearch = async () => {
    if (searchQuery !== '') {
      const datas = JSON.parse(await getSession());

      const Data = await axios(
        `${API_URL}/customer_product/get_all_produk?page=1&search=${searchQuery}&sort=${checked}`,
        {
          headers: {Authorization: `Bearer ${datas.token}`},
        },
      );
      setauth(datas);
      setData(Data.data?.data?.produk);
      // console.log(Data.data);
    } else {
      const datas = JSON.parse(await getSession());

      const Data = await axios(
        `${API_URL}/customer_product/get_all_produk?sort=terendah`,
        {
          headers: {Authorization: `Bearer ${datas.token}`},
        },
      );
      setauth(datas);
      setData(Data.data?.data?.produk);
      console.log(Data.data);
    }
  };
  const handleFilter = async () => {
    const datas = JSON.parse(await getSession());

    const Data = await axios(
      `${API_URL}/customer_product/get_all_produk?page=1&search=${searchQuery}&sort=${checked}`,
      {
        headers: {Authorization: `Bearer ${datas.token}`},
      },
    );

    setauth(datas);
    setData(Data.data?.data?.produk);
    refRBSheet.current.close();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Appbar.Header style={styles.appbar}>
            <View style={styles.header}>
              <Searchbar
                ref={searchRef}
                numberOfLines={1}
                placeholder="Cari produk disini..."
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.Searchbar}
                // onIconPress={() => handleSearch()}
                // onFocus={() => handleSearch()}
                // onEnter={() => handleSearch()}
                onSubmitEditing={() => handleSearch()}
                inputStyle={{height: '100%'}}
                fontSize={15}
              />
              <Icon
                name="filter"
                size={26}
                color="#fff"
                style={styles.icon}
                onPress={() => refRBSheet.current.open()}
              />
              <Text
                style={styles.batal}
                onPress={() => Actions.pop({search: ''})}>
                Batal
              </Text>
            </View>
          </Appbar.Header>
          <View style={styles.root}>
            {data &&
              data.map((res, i) => {
                return (
                  <View>
                    <Item
                      image={{uri: `${API_URL}/${res.product_image_url[0]}`}}
                      item={res}
                      i={i}
                      onPress={() =>
                        Actions.detailProduct({id_merchant: res.id_user})
                      }
                    />
                    <Divider
                      style={{
                        borderBottomColor: 'grey',
                        borderBottomWidth: 0.2,
                      }}
                    />
                  </View>
                );
              })}
            {data.length == 0 && (
              <EmptyScreen
                image={<IconMaterial name="search" size={40} />}
                text={'Data tidak ditemukan'}
              />
            )}
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={200}
          customStyles={{
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <Text style={styles.urutan}>Urutkan berdasarkan :</Text>

          <View style={styles.bottom}>
            <View style={styles.grid}>
              <View style={styles.radio}>
                <RadioButton.Android
                  value="first"
                  status={checked === 'terendah' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('terendah')}
                />
                <Text>Harga Terendah</Text>
              </View>
              <View style={styles.radio}>
                <RadioButton.Android
                  value="first"
                  status={checked === 'tertinggi' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('tertinggi')}
                />
                <Text>Harga Tertinggi</Text>
              </View>
              <View style={styles.radio}>
                <RadioButton.Android
                  value="first"
                  status={checked === 'terbaru' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('terbaru')}
                />
                <Text>Terbaru</Text>
              </View>
            </View>
            <Button
              mode="contained"
              style={styles.button}
              uppercase={false}
              onPress={() => handleFilter()}>
              Terapkan
            </Button>
          </View>
        </RBSheet>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SearchProduct;
