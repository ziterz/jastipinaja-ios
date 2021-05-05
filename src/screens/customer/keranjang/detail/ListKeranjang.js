import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {Card, Checkbox} from 'react-native-paper';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {API_URL, convertToRupiah} from '../../../../utils/Service';

const ListKeranjang = ({item, setChecked}) => {
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
            }}>
            <Checkbox
              status={item.checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked();
              }}
            />
            <View style={{flexDirection: 'row', display: 'flex', flex: 1}}>
              <Image
                source={{
                  uri: `${API_URL}/${itemData?.product_images[0].product_image_url}`,
                }}
                style={{width: 70, height: 60}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                  marginHorizontal: 10,
                }}>
                <Text style={{fontWeight: 'bold', color: '#000'}}>
                  {itemData?.product?.nama_produk}
                </Text>
                <Text style={{fontWeight: 'bold', color: '#01579B'}}>
                  {convertToRupiah(itemData.harga_produk)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    marginVertical: 10,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <IconEntypo name="trash" color="#DADADA" size={24} />
                  <Icon
                    name="minus-square-o"
                    color={itemData.quantity > 1 ? '#01579B' : '#DADADA'}
                    size={24}
                    onPress={() => {
                      itemData.quantity > 1
                        ? setJumlahs(itemData.quantity - 1)
                        : {};
                    }}
                  />
                  <Text
                    style={{fontWeight: 'bold', color: '#000', fontSize: 18}}>
                    {item.quantity}
                  </Text>
                  <Icon
                    name="plus-square-o"
                    color="#01579B"
                    size={24}
                    onPress={() => setJumlahs(itemData.quantity + 1)}
                  />
                </View>
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
export default ListKeranjang;
