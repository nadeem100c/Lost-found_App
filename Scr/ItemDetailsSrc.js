import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { defaulStyles } from "pinar";
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import * as SMS from 'expo-sms'
import {
  useFonts,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

const ItemDetailsSrc = () => {
  const navigation = useNavigation()
  const [isAvailable, setIsAvailable] = useState(false)
  const handlebackbtn = () => {
    navigation.goBack()
  }
  useEffect(() => {
    const checkSmsAvailability = async () => {
      const isSmsAvailable = await SMS.isAvailableAsync();
      setIsAvailable(isSmsAvailable);
    };

    checkSmsAvailability();
  }, []);

  const Sendsms = async () => {
    const { result } = await SMS.sendSMSAsync(
      ["03097183906", "0398488888"],
      " "
    )
    console.log(result)
  }
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


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.btnView}>
        <TouchableOpacity onPress={handlebackbtn}>
          <Image source={require("../assets/backbtn.png")} style={styles.backbtn} />
        </TouchableOpacity>
        <Text style={styles.title}>Details</Text>
        <TouchableOpacity onPress={handlebackbtn}>
          <Image source={require("../assets/ShareIcon.png")} style={styles.sharebtn} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 310 }}>
        <Carousel style={{ justifyContent: "center", marginTop: 30, }}>
          <View>
            <Image source={require("../assets/crousalimg.png")}
              style={styles.SlideImg} />
          </View>
          <View>
            <Image source={require("../assets/crousalimg.png")}
              style={styles.SlideImg} />
          </View>
          <View>
            <Image source={require("../assets/crousalimg.png")}
              style={styles.SlideImg} />
          </View>
        </Carousel>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity style={styles.masgbtn}
          onPress={Sendsms}
        >{isAvailable ? <Image
          source={require('../assets/MasgIcon.png')}
          style={{ width: 83, height: 24, }}
        /> : <Text>SMS not Send</Text>}

        </TouchableOpacity>
        <TouchableOpacity style={[styles.masgbtn, { marginLeft: 10 }]}>
          <Image
            source={require('../assets/CallIcon.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, marginLeft: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.ItemName}>Glasses</Text>
          <Text style={styles.timeDate}>12 April 2023 , 2:14 Am</Text>
        </View>
        <Text style={styles.Description}> Description</Text>
        <View style={styles.descriptiontxt}>
          <Text style={{ color: "#8391A1", fontFamily: "Urbanist_400Regular" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Image
              source={require('../assets/Location.png')}
              style={styles.LocotionIcon}
            />
            <Text style={styles.location}>Lahore, Pakistan</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.ViewMapbtn}>
        <Text style={styles.btntxt}>View on map</Text>
      </TouchableOpacity>
    </SafeAreaView >
  );
};

export default ItemDetailsSrc;
const styles = StyleSheet.create({
  btnView: {
    marginLeft: 28,
    flexDirection: "row",
    justifyContent: "center",
    flexDirection: "column-reverse"
  },
  backbtn: {
    width: 41,
    height: 41,
    borderWidth: 2,
    borderColor: "#E8ECF4",
    borderRadius: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 21,
    alignSelf: "center",
    bottom: 35,
    fontFamily: 'Urbanist_600SemiBold'
  },
  sharebtn: {
    position: "absolute",
    right: 20,
    marginTop: 30,
    height: 20,
    width: 25,
    backgroundColor: "white",
    borderRadius: 8
  },
  masgbtn: {
    borderWidth: 1,
    borderColor: "#7689D6",
    borderRadius: 8,
    height: 50,
    width: '40%',
    justifyContent: "center",
    alignItem: "center",
    alignItems: "center"
  },
  LocotionIcon: {
    height: 16,
    width: 16,
    tintColor: "#8391A1"
  },
  Description: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15,
    marginTop: 14
  },
  ItemName: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    fontFamily: "Urbanist_500Medium",
  },
  timeDate: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 15,
    color: "#1E1F4B",
    marginRight: 10
  },
  location: {
    fontSize: 12,
    fontWeight: '400',
    color: "#8391A1",
    lineHeight: 15
  },
  ViewMapbtn: {
    height: 45,
    width: "90%",
    backgroundColor: "#7689D6",
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20
  },
  btntxt: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    fontFamily: "Urbanist_600SemiBold"

  },
  descriptiontxt: {
    flexDirection: "column",
    color: "#8391A1",
    marginTop: 8,

  },
  SlideImg: {
    alignItems: "center",
    height: 240,
    width: "70%",
    alignSelf: "center",
    borderRadius: 8
  },
})

