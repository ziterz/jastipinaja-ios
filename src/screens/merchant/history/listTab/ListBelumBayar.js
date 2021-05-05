import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';

const ListBelumBayar = ({item}) => {
  // const data = item.item;
  console.log(JSON.stringify(item.transaction_items[0]))
  return (
    <TouchableOpacity style={{backgroundColor: '#F7F7F7'}}>
      <Card
        style={{
          flex: 1,
          marginVertical: 5,
        }}
        elevation={2}>
        <Card.Content>
          <Text style={{fontWeight: 'bold', color: '#01579B'}}>
            Pie Susu Dhian Original
          </Text>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', display: 'flex', flex: 1}}>
              <Image
                source={require('../../../../assets/item.png')}
                style={{width: 70, height: 60}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                  flex: 1,
                  marginHorizontal: 10,
                }}>
                <Text style={{color: '#C4C4C4'}}>INV/20200906/XX/JT/92834</Text>
                <Text style={{fontWeight: 'bold'}}>Pie Susu - Rasa Keju</Text>
                <Text style={{color: '#C4C4C4'}}>x6</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                display: 'flex',
              }}>
              <Text style={{fontWeight: 'bold', color: '#000'}}>
                Total Pembayaran
              </Text>
              <Text style={{fontWeight: 'bold', color: '#01579B'}}>
                Rp130.000
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
export default ListBelumBayar;
