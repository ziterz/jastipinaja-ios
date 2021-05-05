import React from 'react';
import {View, Text} from 'react-native';
const NotificationCard = ({item}) => {
  const data = item.item;
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 20,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              fontStyle: 'normal',
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            {data.nama_produk}
          </Text>
        </View>
        <View
          style={{
            width: 90,
            height: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: data.status === 0 ? '#A5A6AA' : '#01579B',
            borderRadius: 5,
          }}>
          {(data.status === 0) && <Text style={{color: '#fff', fontWeight: 'bold'}}>Menunggu</Text>}
          {(data.status === 1) && <Text style={{color: '#fff', fontWeight: 'bold'}}>Diteruskan</Text>}
          {(data.status === 2) && <Text style={{color: '#fff', fontWeight: 'bold'}}>Dibatalkan</Text>}
        </View>
      </View>
      <Text
        style={{
          fontStyle: 'normal',
          fontWeight: '500',
          color: '#A5A6AA',
        }}>
        {data.detail_produk}
      </Text>
    </View>
  );
};
export default NotificationCard;
