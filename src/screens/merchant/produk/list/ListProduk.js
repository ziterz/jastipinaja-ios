import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  AsyncStorage,
  RefreshControl,
} from 'react-native';
import Produk from './Produk';
import axios from 'axios';
import {API_URL} from '../../../../utils/Service';
import {getSession} from '../../../../utils/Global';
import { Actions } from 'react-native-router-flux';
import EmptyScreen from '../../../../components/EmptyScreen';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

// import Loading from '../../components/Loading';

// const ListDataDetail = (item) => <LIstData item={item} />;
const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
function ListProduk() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  async function fetchData() {
    const datas = JSON.parse(await getSession());

    const Data = await axios(`${API_URL}/product/get_produk/`, {
      headers: {Authorization: `Bearer ${datas.token}`},
    });
    console.log(JSON.stringify(Data.data))
    setData(Data.data.data);
  }

  Actions.refs['listProduk'] = {
    onEnter: () => {
      fetchData() 
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView mode={'margin'} >
      <ScrollView
        style={{height:'100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {data.length > 0 ? 
        data?.map((data) => (
          <Produk
            style={{height: '100%'}}
            key={data.id_produk}
            data={data}
            fetchParent={fetchData}
          ></Produk>
        ))
         : 

        // <FlatList
        // style={{height: '100%'}}
        //   data={data}
        //   renderItem={ListDataDetail}
        //   keyExtractor={(item) => item.id}
        // /> :
        <EmptyScreen
          image={<IconMaterial name="shopping-cart" size={40} />}
          text={'Anda belum menambahkan produk'}
        /> }
      </ScrollView>
    </SafeAreaView>
  );
}
export default ListProduk;
