import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {API_URL} from '../../../utils/Service';
import {Actions} from 'react-native-router-flux';
import FormatImage from '../../../utils/FormatImage';
import {convertToRupiah} from '../../../utils/Service';

const Rekomendasi = ({item}) => {
  const data = item.item;
  const gambar = FormatImage(data.product_image_url)
  console.log(gambar)
  return (
    <TouchableOpacity
      transparent
      onPress={() => Actions.detailProduct({id_merchant: data.id_user})}>
      <Card
        style={{width: 150, height: 170, flex: 1, marginRight: 10, marginVertical:25}}
        transparent>
        <Image
          source={{
            uri: gambar,
          }}
          style={{
            width: 150,
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
          <Text numberOfLines={1} style={{fontSize: 14, marginTop: 15, textAlign: 'left'}}>{data?.nama_produk}</Text>
          <Text style={{fontSize: 14, fontWeight:'bold', marginTop:4, textAlign:'left'}}>
            {convertToRupiah(data?.harga_produk)}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default Rekomendasi;
