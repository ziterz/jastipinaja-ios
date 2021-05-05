import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  RadioButton,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-simple-toast'
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFa from 'react-native-vector-icons/FontAwesome';
import {Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import {Actions} from 'react-native-router-flux';
import {getSession} from '../../../utils/Global';
import axios from 'axios';
import {API_URL, convertToRupiah} from '../../../utils/Service';
import Item from './Item';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import formatImage from '../../../utils/FormatImage'
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  viewFlex: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    position:'absolute',
    top: 16,
    left : -2,
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
});

const stylesRB = StyleSheet.create({
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  a :{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    height: 130
  },
  button: {
    width: '90%',
    height: 38
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
  urutan1: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20,
    width:'75%'
  },
  urutan: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 20,
    width:'30%'
  },
});
const DetailProduct = ({id_merchant}) => {
  const image = {uri: 'https://reactjs.org/logo-og.png'};
  const [data, setData] = useState(null);
  const [auth, setauth] = useState({});
  const [checked, setChecked] = useState(false);
  const refRBSheet = useRef(false);
  const [selectedProduct, setSelectedProduct] = useState({
    id_produk: 0,
    quantity: 0,
  });

  async function addToCart() {
    const data = {
      id_produk: selectedProduct.id_produk,
      quantity: selectedProduct.quantity,
    };

    const datas = JSON.parse(await getSession());
    axios
      .post(`${API_URL}/cart`, data, {
        headers: {Authorization: `Bearer ${datas.token}`},
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          // console.log(response.data.message);
          Toast.show(
            `${selectedProduct.nama_produk} telah ditambahkan ke keranjang`,
            Toast.SHORT,
          );
          refRBSheet.current.close();
        } else {
          Toast.show(
            `${selectedProduct.nama_produk} gagal ditambahkan ke keranjang`,
            Toast.SHORT,
          );
        }
      })
      .catch((e) => {
        Toast.show(e, Toast.SHORT);
      });
  }

  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());

      const Data = await axios(`${API_URL}/product/get_produk/${id_merchant}`, {
        headers: {Authorization: `Bearer ${datas.token}`},
      });
      // console.log(data)
      // console.log(datas)
      // console.log(Data.data.data)
      // console.log(Data.data);
      // console.log(Data.data)
      setauth(datas);
      setData(Data.data.data);
    }
    fetchData();
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
        <ImageBackground
          style={{resizeMode: 'cover'}}
          source={require('../../../assets/bg_image.jpeg')}
          style={styles.image}>
     
          {/* <View style={styles.viewFlex}>
            <TouchableOpacity  onPress={()=> Actions.pop()}>
            <Icon
              name="chevron-back-circle-sharp"
              color="#DADADA"
              fontWeight="bold"
              size={36}
              onPress={() => Actions.pop()}
            />
            </TouchableOpacity>
          </View> */}
          {/* <View style={{backgroundColor:'red'}}> */}
          <TouchableOpacity  onPress={()=> Actions.pop()}>
          <View style={{padding:20, marginTop:10}}>
          <Icon
              name="chevron-back-circle-sharp"
              color="#DADADA"
              fontWeight="bold"
              size={36}
              onPress={() => Actions.pop()}
          />
          </View>
          </TouchableOpacity>
          <View style={{justifyContent:'center', alignItems:'center',alignContent:'center',zIndex:1, elevation:3,flex:1,top:-30}}>
            <Text style={{justifyContent:'center', alignItems:'center',alignContent:'center',fontSize:28, color: 'white'}}>{data.nama_lengkap}</Text>
          </View>
          

 
        </ImageBackground>
        <View style={styles.viewContent}>
        {(data.status_official == 0 ) && <Text style={styles.official}>Jastiper</Text>}
        {(data.status_official == 1 ) && <Text style={styles.official}>Official Merchant</Text>}
          <Text style={styles.title}>{data.nama_lengkap}</Text>
          <Text style={styles.address}>{data.kota}</Text>
        </View>
        {data &&
          data.products.map((res, i) => {
            return (
              <Item
                item={res}
                image={{uri: formatImage(res.product_images[0].url_gambar)}}
                i={i}
                onPress={() => {

                  setSelectedProduct({
                    ...res,
                    quantity: 1,
                  });

                  if(res.pre_order == 1 && res.due_date < moment().format("YYYY-MM-DD")){
                    Toast.show("Produk sudah lewat masa pre order, silahkan order produk lain", Toast.SHORT)
                  } else {
                  refRBSheet.current.open();
                  }
                }}
              />
            );
          })}

        <Divider />
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
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              height: 70,
            }}>
            <Text numberOfLines={1} style={stylesRB.urutan1}>{selectedProduct.nama_produk}</Text>
            <Text style={stylesRB.urutan}>
              {convertToRupiah(
                selectedProduct.harga_produk * selectedProduct.quantity,
              )}
            </Text>
          </View>
          <Text numberOfLines={4} style={{fontSize:12, paddingHorizontal:20}}>{selectedProduct.deskripsi_produk}</Text>

          <View style={stylesRB.a}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                marginVertical: 10,
                alignItems: 'center',
                padding: 8,
              }}>
              <View style={{backgroundColor: 'white', borderWidth: 3, borderRadius: 10, borderColor:'#01579B'}}>
                <IconFa
                  name="minus"
                  color={true ? '#01579B' : '#DADADA'}
                  size={24}
                  style={{
                    margin: 5,
                  }}
                  onPress={() => {
                    selectedProduct.quantity > 1
                      ? setSelectedProduct({
                          ...selectedProduct,
                          quantity: selectedProduct.quantity - 1,
                        })
                      : {};
                  }}
                />
                </View>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#000',
                  fontSize: 20,
                  margin: 10,
                }}>
                {selectedProduct.quantity}
              </Text>
              <View style={{backgroundColor: 'white', borderWidth: 3, borderRadius: 10, borderColor:'#01579B'}}>
                <IconFa
                  name="plus"
                  color="#01579B"
                  size={24}
                  onPress={() => {
                    setSelectedProduct({
                      ...selectedProduct,
                      quantity: selectedProduct.quantity + 1,
                    });
                  }}
                  style={{
                    margin: 5,
                  }}
                />
              </View>
            </View>
            <View style={{paddingTop:10}}>
              <Button
                height={34}
                mode="contained"
                style={stylesRB.button}
                uppercase={false}
                onPress={() => addToCart()}>
                Tambahkan ke keranjang
              </Button>
            </View>
          </View>
        </RBSheet>
      </View>
    </ScrollView>
  );
};
export default DetailProduct;
