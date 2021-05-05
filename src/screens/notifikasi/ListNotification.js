import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, FlatList, SafeAreaView, View, Text} from 'react-native';
import LIstData from './NotificationCard';
import axios from 'axios';
import {API_URL} from '../../utils/Service';
import {getSession} from '../../utils/Global';
import NotificationEmpty from "../../assets/notification_empty.svg"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginVertical: 40,
    fontSize: 20,
    fontWeight: 'bold'
  }
});
function ListNotification() {
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState({});
  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());

      const Data = await axios.get(`${API_URL}/notification`, {
        headers: {Authorization: `Bearer ${datas.token}`},
      });
      setAuth(datas);
      const notifications = Data?.data?.data;
      notifications.sort((a,b) => a.action_time<b.action_time)
      setData(notifications);
    }
    fetchData();
  }, []);
  const LIstDataDetail = (item) => <LIstData item={item} />;

  return (data.length == 0 ? <View
      style={styles.container}>
        <NotificationEmpty />
        <Text style={styles.text}>Belum Ada Notifikasi Baru</Text>
      </View> :
        <SafeAreaView>
        <ScrollView>
           <FlatList
             data={data}
             renderItem={LIstDataDetail}
             keyExtractor={(item) => item.id}
           />
         </ScrollView>
      </SafeAreaView>
  );
}
export default ListNotification;

      // {/*  */}