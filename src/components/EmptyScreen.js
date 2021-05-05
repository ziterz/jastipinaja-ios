import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  },
  text: {
    marginVertical: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
function EmptyScreen({image, text}) {
  return (
    <View style={styles.container}>
      {image}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

export default EmptyScreen;
