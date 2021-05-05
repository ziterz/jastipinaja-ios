import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {Button} from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Actions} from 'react-native-router-flux';
import Ss1 from '../../assets/ss1.svg';
import Ss2 from '../../assets/ss2.svg';
import Ss3 from '../../assets/ss3.svg';

// import ss3 from '../../'

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginVertical: 70,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    // backgroundColor: '#01579B',
    borderRadius: 10,
    padding: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  vbtn: {
    width: '80%',
  },
  textRender: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#01579B',
  },
  textRenderBlack: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  dotStyle: {
    backgroundColor: '#01579B',
  },
});

const data = [
  {
    title: 'Satu aplikasi untuk segala kebutuhan Jastip kamu',
    image: <Ss1 style={styles.image} />,
    bg: '#fff',
  },
  {
    title: 'Kamu bisa nitip beli makanan yang kamu mau',
    image: <Ss2 style={styles.image} />,
    bg: '#fff',
  },
  {
    title: 'Yuk, gabung jadi Merchant atau Jastiper sekarang!',
    image: <Ss3 style={styles.image} />,
    bg: '#fff',
  },
];

export default function Onboarding() {
  const _renderItem = ({item}) => {
    return (
      <View style={[styles.slide]}>
        <Text style={styles.title}>{item.title}</Text>
        {item.image}
        <View style={styles.vbtn}>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => Actions.replace('login')}>
            Gabung Sekarang
          </Button>
        </View>
      </View>
    );
  };
  const _renderNextButton = () => {
    return (
      <View>
        <Text style={styles.textRender}>Selanjutnya</Text>
      </View>
    );
  };

  const _renderPreviousButton = () => {
    return (
      <View>
        <Text style={styles.textRenderBlack}>Kembali</Text>
      </View>
    );
  };
  const renderSkip = () => {
    return (
      <View>
        <Text style={styles.textRenderBlack}>Skip</Text>
      </View>
    );
  };
  const _keyExtractor = (item) => item.title;

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        data={data}
        renderNextButton={_renderNextButton}
        renderPrevButton={_renderPreviousButton}
        renderSkipButton={renderSkip}
        showPrevButton
        showSkipButton
        activeDotStyle={styles.dotStyle}
        onSkip={() => Actions.login()}
      />
    </View>
  );
}
