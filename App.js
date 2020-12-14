import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png';

export default function App() {
  return (
    <View style={styles.container}>

        {/*<Image source={logo} style={{ width: 305, height: 159 }} />*/}

        {/*Loading image by using URL*/}
        <Image source={{ uri: "https://i.imgur.com/TkIrScD.png"}} style={{ width: 305, height: 159 }} />


      <Text style={{color: '#FF0000', fontSize: 18}}>
        Add custom style
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
