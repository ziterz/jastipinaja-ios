import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import {Card} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {API_URL, convertToRupiah} from '../../../../utils/Service';
const statusTarikDana = (status) => {
  switch (status) {
    case 0:
      return "Belum Request";
    case 1:
      return "Sedang Diproses"
      case 2:
      return "Sudah Cair"
    default:
      break;
  }
}
const ListBelumBayar = ({item}) => {
  console.log(item)
  const listNamaProduct = item.item.transaction_items.map(value => {
    return <Text style={{
      fontSize: 14,
      fontWeight: '700',
    }}>{value.product.nama_produk}</Text>
  })
  const imageProduct = item.item.transaction_items == null ? "" : `${API_URL}/${item.item.transaction_items[0].product.product_images[0].url_gambar}`
  const namaToko = item.item.transaction_items == null ? "" : item.item.transaction_items[0].product.nama_toko
  console.log(item);

  return (
    <TouchableOpacity
      style={{backgroundColor: '#F7F7F7'}}
      activeOpacity={2}
      onPress={() => Actions.rincian({data: item.item})}>
      <Card
        style={{
          flex: 1,
          marginVertical: 5,
        }}
        elevation={2}>
        <Card.Content>
          <Text style={{fontWeight: 'bold', color: '#01579B'}}>
            {/* {item.item.transaction_items[0].product.user.nama_lengkap} */}
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
                source={{
                  uri: imageProduct
                }}
                style={{width: 70, height: 60}}
              />
              
              <View
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                  flex: 1,
                  marginHorizontal: 10,
                }}>
                  {listNamaProduct}
                <Text style={{color: '#C4C4C4'}}>{namaToko}</Text>
                <Text style={{color: '#C4C4C4'}}>{item.item.id_transaksi}</Text>
                {(item.item.role_user == 2 && item.item.status == 3 && item.item.nomor_resi !== null) && <Text style={{fontWeight: 'bold', color: '#01579B'}}>
                  Status Tarik Dana: {"\n"}{statusTarikDana(item.item.tarik_dana)}
                </Text>}
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
                {convertToRupiah(item.item.gross_amount)}
              </Text>
              {(item.item.status == 3 && item.item.nomor_resi == null) && <Text style={{color: '#cd4e00', fontWeight: 'bold'}}>[Dibatalkan]</Text>}
              {(item.item.status == 3 && item.item.nomor_resi != null) && <Text style={{color: '#01579B', fontWeight: 'bold'}}>[Selesai]</Text>}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
export default ListBelumBayar;


