import React, {useEffect, useState} from 'react';
import Toast from 'react-native-simple-toast'
import Grid from 'react-native-infinite-scroll-grid';
import {getSession} from '../../../utils/Global';
import {API_URL} from '../../../utils/Service';
import axios from 'axios';
import Produk from './Produk';
import {
  ScrollView,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

const renderProduk = (item) => <Produk item={item} />;
// const renderGrid = (data) => (
//   <FlatGrid
//     data={data}
//     itemDimension={130}
//     renderItem={renderProduk}
//     spacing={10}
//     style={{
//       marginTop: 10,
//       flex: 1,
//     }}
//   />
// );

export default function DetailRekomendasi() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const loadMore = async function () {
    if (!isEnd) {
      const datas = JSON.parse(await getSession());
      const Data = await axios(
        `${API_URL}/customer_product/get_all_produk?page=${page}`,
        {
          headers: {Authorization: `Bearer ${datas.token}`},
        },
      );
      setPage(page + 1);

      let productData = Data?.data?.data?.produk;
      if (productData.size == 0) {
        Toast.show('React end of data', Toast.SHORT);
        setIsEnd(true);
      }
      let newData = data.concat(productData);

      setData(newData);
    }
    if (data === null) {
      console.log(data);
      // return <Text>loading</Text>;
      return <View style={{flex:1, justifyContent: 'center', flexDirection:'row',
      padding:10}}>
        <ActivityIndicator color="#0000ff" size="large"/>
      </View>
    }
  };

  

  useEffect(() => {
    setPage(1);
    loadMore();
    
  }, []);
  
  // console.log(data);
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <Grid
        numColumns={2}
        data={data}
        keyExtractor={(item) => item.id_produk}
        renderItem={renderProduk}
        onEndReached={() => loadMore()}
        // loadingMore={loadMore}
        marginExternal={4}
        marginInternal={4}
      />
    </SafeAreaView>
  );
}
