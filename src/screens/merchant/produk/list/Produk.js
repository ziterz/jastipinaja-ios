import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, Image, Alert} from 'react-native';
import Toast from 'react-native-simple-toast'
import {Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconTrash from 'react-native-vector-icons/FontAwesome5';
import {Actions} from 'react-native-router-flux';
import {API_URL, convertToRupiah} from '../../../../utils/Service';
import {getSession, apiService, getConfig} from '../../../../utils/Global';
import axios from 'axios';
import moment from 'moment';
const Produk = ({data, fetchParent}) => {
  const [auth, setauth] = useState({});
  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());
      setauth(datas);
    }
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      await apiService
        .delete(`/product/delete_produk/${id}`, await getConfig())
        .then(() => {
          Toast.showWithGravityAndOffset(
            'Item di buang',
            Toast.LONG,
            Toast.BOTTOM,
            25,
            50,
          );
          fetchParent();
        })
        .catch((err) => {
          console.log(err);
          fetchParent();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteItem = () => {
    if (Actions.currentScene === '_produk'){
      Alert.alert('Perhatian!', 'Apakah anda yakin ingin menghapus produk?', [
        {
          text: 'Tidak',
          onPress: () => null,
          style: 'cancel'
        },
        {text: 'Ya', onPress: () => handleDelete(data.id_produk)},
      ]);
    }
  };
  const gambar = data.product_images[0].url_gambar;
  return (
    <TouchableOpacity style={{backgroundColor: '#F7F7F7'}} activeOpacity={2}>
      <Card
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
                  uri: gambar.includes("http") ? gambar :`${API_URL}/${gambar}`,
                }}
                style={{width: 100, height: 60}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                  flex: 1,
                  marginHorizontal: 10,
                }}>
                <Text style={{fontWeight: 'bold'}}>{data.nama_produk}</Text>
                <Text style={{fontWeight: 'bold', color: '#C4C4C4'}}>
                  {convertToRupiah(data.harga_produk)}
                </Text>
                 {data.pre_order == 1 && [<Text style={{color:'#01579B'}}>Produk Pre-Order</Text>, <Text>Sampai dengan {moment(data.due_date).format("DD-MMMM-YYYY")}</Text>]}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
              }}>
              <Icon
                name="edit"
                size={25}
                color="#01579B"
                style={{marginRight: 10}}
                onPress={() => Actions.editProduk({dataEdit: data})}
              />
              <IconTrash
                name="trash"
                size={20}
                color="#01579B"
                onPress={() => handleDeleteItem()}
              />
            </View>
          </View>
          
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
export default Produk;
