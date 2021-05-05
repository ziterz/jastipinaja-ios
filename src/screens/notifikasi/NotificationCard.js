import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
const NotificationCard = ({item}) => {
  const notificationType = item.item.notification_type
  const title_notification = notificationType == 0 ? 
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
    <Icon name="wallet" size={20} color="#01579B" />
    <Text
      style={{
        marginHorizontal: 10,
      }}>
      Pembayaran · {moment(item?.item?.action_time).format('DD MMM YYYY')}
    </Text>
  </View> : 
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <Icon name="ballot" size={20} color="#F05651" />
        <Text
          style={{
            marginHorizontal: 10,
          }}>
          Request · {moment(item?.item?.action_time).format('DD MMM YYYY')}
        </Text>
      </View>
  console.log(notificationType)
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: 20,
      }}>
        {title_notification}
      <Text
        style={{
          fontStyle: 'normal',
          fontWeight: 'bold',
          marginVertical: 10,
        }}>
        {item?.item?.title}
      </Text>
      <Text
        style={{
          fontStyle: 'normal',
          fontWeight: '500',
          color: '#A5A6AA',
        }}>
        {item?.item?.content}
      </Text>
    </View>
  );
};
export default NotificationCard;
