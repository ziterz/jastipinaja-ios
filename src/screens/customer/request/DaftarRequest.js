import React, {useState, useEffect} from 'react';
import {ScrollView, FlatList, SafeAreaView} from 'react-native';
import LIstData from './DetailCardRequest';
import axios from 'axios';
import {API_URL} from '../../../utils/Service';
import {getSession} from '../../../utils/Global';
function DaftarRequest() {
  const [data, setData] = useState([]);
  const [auth, setauth] = useState({});
  useEffect(() => {
    async function fetchData() {
      const datas = JSON.parse(await getSession());

      const Data = await axios.get(`${API_URL}/request`, {
        headers: {Authorization: `Bearer ${datas.token}`},
      });
      setauth(datas);
      setData(Data?.data?.data);
    }
    fetchData();
  }, []);
  const LIstDataDetail = (item) => <LIstData item={item} />;

  return (
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
export default DaftarRequest;
