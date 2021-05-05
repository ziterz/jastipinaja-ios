import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {API_URL} from '../../../utils/Service';
import {Actions} from 'react-native-router-flux';
import {convertToRupiah} from '../../../utils/Service';
const Produk = ({item}) => {
  const data = item.item;
  return (
    <TouchableOpacity
      transparent
      onPress={() => Actions.detailProduct({id_merchant: data.id_user})}
      activeOpacity={2}>
      <Card
        style={{
          width: '95%',
          height: 170,
          flex: 1,
          marginHorizontal: 5,
          marginVertical: 5,
        }}
        transparent>
        <Image
          source={{
            uri: `${API_URL}/${data.product_image_url}`,
          }}
          style={{
            width: '100%',
            flex: 1,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            resizeMode: 'cover',
          }}
        />
        <Card.Content
          style={{
            backgroundColor: '#fff',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 2,
          }}>
          <Text numberOfLines={1} style={{fontSize: 14, fontWeight: '400', marginTop:15, textAlign: 'left'}}>
            {data?.nama_produk}
          </Text>
          <Text style={{fontSize: 14, fontWeight:'bold', marginTop:4, textAlign:'left'}}>
            {convertToRupiah(data?.harga_produk)}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default Produk;
