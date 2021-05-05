import React, {useRef} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {convertToRupiah} from '../../../utils/Service';
import moment from 'moment'
const styles = StyleSheet.create({
  viewFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
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
    marginLeft: 5,
    width: '60%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  textPrice : {
    fontSize:14,
    marginLeft:13,
    fontWeight:'bold'
  },
  textInner: {
    color: '#A5A6AA',
    fontWeight: 'normal',
    fontSize: 14,
  },
});

function Item({item, image, i, onPress}) {
  console.log(item)
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={2}>
      <View style={styles.viewFlex} key={i}>
        <View style={styles.viewInner}>
          <Image source={image} style={styles.imageContent} />
          <View style={styles.text}>
            <Text style={styles.title}>{item.nama_produk}</Text>
            <Text style={styles.textInner}>Toko: {item.nama_toko}</Text>
            <Text style={styles.textInner}>Jumlah Terjual: {item.total_terjual != null ? item.total_terjual : 0 } </Text>
            {item.pre_order == 1 && [
              <Text style={{color: '#01579B'}}>Pre-Order</Text>,
              <Text>
                Sampai {moment(item.due_date).format('DD-MMMM-YYYY')}
              </Text>,
            ]}
          </View>
        </View>
        <Text style={styles.textPrice}>{convertToRupiah(item.harga_produk)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Item;
