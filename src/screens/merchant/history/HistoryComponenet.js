import * as React from 'react';
import {useState, useEffect} from 'react';
import {getSession} from '../../../utils/Global';
import {API_URL} from '../../../utils/Service';
import {View, StyleSheet, Dimensions, Text, RefreshControl} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import HistoryItem from '../../customer/history/tab/HistoryItem';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import EmptyScreen from '../../../components/EmptyScreen';
import { Actions } from 'react-native-router-flux';
const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#01579B'}}
    style={{backgroundColor: 'white'}}
    activeColor="#01579B"
    inactiveColor="#000"
    renderLabel={({route, focused, color}) => (
      <Text style={{color, margin: 8}}>{route.title}</Text>
    )}
  />
);
const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  
  const [belumDibayar, setBelumDibayar] = React.useState([]);
  const [dikemas, setDikemas] = React.useState([]);
  const [dikirim, setDikirim] = React.useState([]);
  const [selesai, setSelesai] = React.useState([]);
  
  Actions.refs.historyMerchant = {
    onEnter: () => fetchData()
  }

  const [routes] = React.useState([
    {key: 'belumDibayar', title: 'Belum Dibayar'},
    {key: 'dikemas', title: 'Dikemas'},
    {key: 'dikirim', title: 'Dikirim'},
    {key: 'selesai', title: 'Selesai'},
  ]);

  function orNull(data) {
    var icon = <IconMaterial name="assignment" size={40} />;

    return data.length > 0 ? (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HistoryItem props={data} />
      </ScrollView>
    ) : (
      <EmptyScreen image={icon} text={'Belum ada transaksi'} />
    );
  }

  const renderScene = SceneMap({
    belumDibayar: () => orNull(belumDibayar),
    dikemas: () => orNull(dikemas),
    dikirim: () => orNull(dikirim),
    selesai: () => orNull(selesai),
  });

  async function fetchData(){
    
    const datas = JSON.parse(await getSession());
    const Data = await axios(
      `${API_URL}/transaction/merchant_get_all`,
      {
        headers: {Authorization: `Bearer ${datas.token}`},
      },
    );
    const role_user = datas.user.role_user
    let dataTransaksi = Data.data.data.map(value => (
      {...value, role_user}
    ));
    dataTransaksi.sort((a,b) => a.createdAt<b.createdAt)
    setBelumDibayar(dataTransaksi.filter(value => value.status == 0));
    setDikemas(dataTransaksi.filter(value => value.status == 1));
    setDikirim(dataTransaksi.filter(value => value.status == 2));
    setSelesai(dataTransaksi.filter(value => value.status == 3));
  }
  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };
  useEffect(() => {
    fetchData();
  },[]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});
