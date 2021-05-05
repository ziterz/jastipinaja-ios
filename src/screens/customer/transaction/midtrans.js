import React from 'react';
import { Linking } from 'react-native';
import {WebView} from 'react-native-webview';


export default function Midtrans({data}) {

  return Platform.OS === 'android' ? (
    <WebView source={{uri: data.midtrans_data.link_payment}} />
    ) : 
    // (
    // <WebView source={{uri: data.midtrans_data.link_payment}} style={{marginTop:35}}/>
    // );
    (
      Linking.openURL(data.midtrans_data.link_payment)
    )

}
