import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import Lostproduct from './Lostproduct';
import FoundSrc from './FoundSrc';
import {
  useFonts,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';


const MyAds = () => {
  const [selectsrc, setSeletsrc] = useState(0)
  const [fontsLoaded] = useFonts({
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
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

  const renderContent = () => {
    if (selectsrc === 0) {
      return <Lostproduct />;
    } else {
      return <FoundSrc />;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>

      <View style={styles.header}>
        <Text style={styles.headertxt}>My Ads</Text>
      </View>
      <View style={styles.bothbtn}>
        <TouchableOpacity
          onPress={() => setSeletsrc(0)}>
 
          <Text style={{ color: selectsrc == 0 ? "#7689D6" : "#8391A1", fontSize: 18, borderBottomWidth: selectsrc === 0 ? 2 : 0, borderColor: '#7689D6' ,fontFamily:"Urbanist_500Medium"}}>Lost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => setSeletsrc(1)}

        >
          <Text style={{ color: selectsrc == 1 ? "#7689D6" : "#8391A1", fontSize: 18, borderBottomWidth: selectsrc === 1 ? 2 : 0, borderColor: '#7689D6',fontFamily:"Urbanist_500Medium" }}>Found</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </SafeAreaView>



  );
};

export default MyAds

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: "100%",
    backgroundColor: 'white',
    borderTopStartRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    // borderBottomWidth: 3,
    borderColor: "#e1ebe4", elevation: 2,


  },
  headertxt: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily:"Urbanist_600SemiBold",
  },
  mainView: {
    flex: 1,
    marginTop: 15,
    alignSelf: "center",
    height: 77,
    width: "90%",
    flexDirection: "row",
    paddingTop: 5,
    backgroundColor: "white",
    elevation: 3,
    borderRadius: 8,

  },
  productimg: {
    height: 66,
    width: 62,
    borderRadius: 8,
    marginLeft: 10,

  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8
  },
  deleticon: {
    height: 15,
    width: 15,
    right: 8,
    position: "absolute",

  },
  locationimg: {
    height: 11,
    width: 11
  },
  timedate: {
    fontSize: 8,
    color: "#1E1F4B"
  },
  bothbtn: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 24,
  }
})