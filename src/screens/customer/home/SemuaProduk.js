import React, {useRef} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {API_URL, convertToRupiah} from '../../../utils/Service';
import moment from 'moment'
const styles = StyleSheet.create({
  viewFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
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
    width: '70%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 7,
 
  },
  textInner: {
    color: '#A5A6AA',
    fontWeight: 'normal',
    fontSize: 14,
  },
});

function SemuaProduk({item, image, i, onPress}) {
  console.log(item)
  const data = item.item
  const gambar = data.product_image_url
  return (
    <TouchableOpacity transparent
    onPress={() => Actions.detailProduct({id_merchant: data.id_user})}>
      <View style={styles.viewFlex} key={i}>
        <View style={styles.viewInner}>
          <Image source={{
            uri: gambar.includes("http") ? gambar :`${API_URL}/${gambar}`,
          }}
          style={styles.imageContent} />
          <View style={styles.text}>
            <Text numberOfLines={2} style={styles.title}>{data.nama_produk}</Text>
            <Text style={styles.textInner}>Toko: {data.nama_toko}</Text>
            <Text style={styles.textInner}>Jumlah Terjual: {data.total_terjual != null ? data.total_terjual : 0 } </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default SemuaProduk;
