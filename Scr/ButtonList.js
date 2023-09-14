import React, { useState,useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';

const btnWidth = Dimensions.get("window").width

export default function ButtonList({ onPress }) {

  const [pressed, setPressed] = useState("Electronic");
  const Width = btnWidth * 0.2
  const handlePress = (category) => {
    setPressed(category);
    onPress(category);
  };

  const getCategoryButtonStyle = (category) => {
    if (category === pressed) {
      return styles.btnPressed;
    }
    return [styles.btn, { width: Width }];
  };
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => handlePress('Electronic')}
        style={getCategoryButtonStyle('Electronic')}
      >
        <Text style={[styles.txt, { color: pressed === "Electronic" ? "white" : "#8391A1" ,fontFamily:"Raleway_500Medium"}]}>Electronic</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress('jewelry')}
        style={getCategoryButtonStyle('jewelry')}
      >
        <Text style={[styles.txt, { color: pressed === "jewelry" ? "white" : "#8391A1" ,fontFamily:"Raleway_500Medium"}]}>jewelry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress('Bag')}
        style={getCategoryButtonStyle('Bag')}
      >
        <Text style={[styles.txt, { color: pressed === "Bag" ? "white" : "#8391A1" ,fontFamily:"Raleway_500Medium"}]}>Bag</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress('Wellet')}
        style={getCategoryButtonStyle('Wellet')}
      >
        <Text style={[styles.txt, { color: pressed === "Wellet" ? "white" : "#8391A1" ,fontFamily:"Raleway_500Medium"}]}>Wellet</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handlePress('Glasses')}
        style={getCategoryButtonStyle('Glasses')}
      >
        <Text style={[styles.txt, { color: pressed === "Glasses" ? "white" : "#8391A1" ,fontFamily:"Raleway_500Medium"}]}>Glasses</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 34,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: '#E8ECF4',
    height: 34,
  },
  btnPressed: {
    flex: 1,
    height: 34,
    marginHorizontal: 2,
    borderRadius: 8,
    backgroundColor: '#7689D6',
    width: 90
  },
  txt: {
    alignSelf: 'center',
    paddingTop: 6,
    // color: '#8391A1',
  },
});
