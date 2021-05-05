import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  AsyncStorage,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import ListData from '../listTab/ListBelumBayar';
// import axios from 'axios';
// import Loading from '../../components/Loading';

const ListDataDetail = (item) => <ListData item={item} />;
// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };
function HistoryItem({props}) {
  return (
    <SafeAreaView>
      <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      >
        <FlatList
          data={props}
          renderItem={ListDataDetail}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
export default HistoryItem;
