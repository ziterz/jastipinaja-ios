import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  View,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';
import Toast from 'react-native-simple-toast'
import {Button, Card, Checkbox} from 'react-native-paper';
import ListKeranjang from './detail/ListKeranjang';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {API_URL, convertToRupiah} from '../../../utils/Service';
import {getSession} from '../../../utils/Global';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyScreen from '../../../components/EmptyScreen';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

function KeranjangComponenet() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [auth, setauth] = useState({});
  const [harga, setharga] = useState(1000);
  const [value, setvalue] = useState([]);

  Actions.refs.keranjang = {
    onEnter: () => fetchData()
  }
  
    const detail = (data) => {
      if (data === null) {
        // return <Text>loading</Text>;
        return <View style={{flex:1, justifyContent: 'center', flexDirection:'row',
        padding:10}}>
          <ActivityIndicator color="#0000ff" size="large"/>
        </View>
      }
    return data.length > 0 ? (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            flex: 1,
          }}>
          {data &&
            data.map((item, index) => (
              // <TouchableOpacity key={index}
              //   style={{backgroundColor: '#F7F7F7'}}
              //   activeOpacity={2}>
                <Card key={index}
                  style={{
                    flex: 1,
                    marginVertical: 5,
                  }}
                  elevation={2}>
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: 'row',
                        display: 'flex',
                        marginVertical: 10,
                      }}>
                      <Checkbox.Android
                        status={item.checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(index);
                        }}
                        color='#000'
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          display: 'flex',
                          flex: 1,
                        }}>
                        <Image
                          source={{
                            uri: `${API_URL}/${item.product.product_images[0].url_gambar}`,
                          }}
                          style={{width: 70, height: 60}}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            display: 'flex',
                            marginHorizontal: 15,
                            width:'80%'
                          }}>
                          <Text numberOfLines={1} style={{fontWeight: 'bold', color: '#000',width:'80%'}}>
                            {item?.product?.nama_produk}
                          </Text>
                          <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'grey',width:'80%'}}>
                            {item?.product?.user?.nama_lengkap}
                          </Text>
                          <Text style={{fontWeight: 'bold', color: '#01579B'}}>
                            {convertToRupiah(item.product.harga_produk)}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              display: 'flex',
                              marginVertical: 10,
                              justifyContent: 'flex-start',
                              alignItems: 'stretch',
                            }}>
                            <IconEntypo
                              name="trash"
                              color="#DADADA"
                              size={20}
                              onPress={() => deleteCart(item, index)}
                            />
                            <Text style={{color:'#fff', fontSize:8}}>.</Text>
                            <Text style={{color:'#fff', fontSize:8}}>.</Text>
                            <Icon
                              name="minus-square-o"
                              color={item.quantity > 1 ? '#01579B' : '#DADADA'}
                              size={22}
                              onPress={() => {
                                item.quantity > 1
                                  ? setJumlah(index, item.quantity - 1)
                                  : {};
                              }}
                            />
                            <Text style={{color:'#fff', fontSize:8}}>.</Text>
                            <Text style={{color:'#fff', fontSize:8}}>.</Text>
                            <View style={{width:33, alignItems:'center'}}>  
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: '#000',
                                  fontSize: 16,
                                  // width: 30,
                                  alignItems: 'center'
                                
                                }}>
                                {item.quantity}
                              </Text>
                            </View>  
                            <Text style={{color:'#fff', fontSize:8}}>.</Text>
                            <Text style={{color:'#fff', fontSize:8}}>.</Text>
                            <Icon
                              name="plus-square-o"
                              color="#01579B"
                              size={22}
                              onPress={() =>
                                setJumlah(index, item.quantity + 1)
                              }
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card.Content>
                </Card>
              // </TouchableOpacity>
            ))}

          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              marginVertical: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>Total</Text>
            <Text>{convertToRupiah(harga)}</Text>
          </View>
          <Button
            mode="contained"
            onPress={() => {
              const checkedData = data.filter((value) => value.checked)
              const userIds = checkedData.map((value) => {
                return value.product.id_user;
              });
              function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
              }
              var unique = userIds.filter(onlyUnique);
              if (unique.length > 1) {
                Toast.show(
                  'Anda melakukan checkout lebih dari satu toko, silahkan ulangi',Toast.SHORT
                );
              } else {
                if (checkedData.length > 0) {
                  Actions.detailPesanan({
                    packaging: {name: 'Packaging Biasa', price: 5000},
                    cart: data.filter((value) => value.checked),
                  });
                } else {
                  Toast.show('Silahkan pilih barang', Toast.LONG);
                }
              }
            }}>
            Buat Pesanan
          </Button>
        </View>
      </ScrollView>
    ) : (
      <EmptyScreen
        image={<IconMaterial name="shopping-cart" size={40} />}
        text={'Keranjang anda belum terisi'}
      />
    );
  };
  async function updateCart(data) {
    const value = {
      quantity: data.quantity,
    };
    const datas = JSON.parse(await getSession());
    axios
      .patch(`${API_URL}/cart/${data.id_cart}`, value, {
        headers: {Authorization: `Bearer ${datas.token}`},
      })
      .then((response) => console.log(response.data));
  }
  async function deleteCart(dataCart, index) {
    const datas = JSON.parse(await getSession());
    axios
      .delete(`${API_URL}/cart/${dataCart.id_cart}`, {
        headers: {Authorization: `Bearer ${datas.token}`},
      })
      .then((response) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
      });
  }

  async function hitungHarga(data) {
    var total = 0;
    data.forEach((element) => {
      total += element.checked
        ? element.product.harga_produk * element.quantity
        : 0;
    });
    setharga(total);
  }
  async function fetchData() {
    const datas = JSON.parse(await getSession());

    const Data = await axios.get(`${API_URL}/cart`, {
      headers: {Authorization: `Bearer ${datas.token}`},
    });
    setauth(datas);
    setData(Data.data?.data);
    var listCart = Data.data.data;
    listCart = listCart.map((value) => {
      return {...value, checked: false};
    });
    console.log(listCart);
    setData(listCart);
    hitungHarga(listCart);
  }

  useEffect(() => {
    fetchData();
  }, []);
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

  function setChecked(index) {
    const newData = [...data];
    newData[index].checked = !newData[index].checked;
    setData(newData);
    hitungHarga(newData);
  }
  function setJumlah(index, jumlah) {
    const newData = [...data];
    newData[index].quantity = jumlah;
    setData(newData);
    hitungHarga(newData);
    updateCart(newData[index]);
  }
  return detail(data);
}
export default KeranjangComponenet;
