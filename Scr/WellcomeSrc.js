import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import * as SplashScreen from "expo-splash-screen"
import {
  useFonts,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

const WellcomeSrc = ({ navigation, route }) => {
  const { user } = route.params; // Access the user prop from route.params
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

  // If fonts are not loaded, return null
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Image
          source={require("../assets/findimage.png")}
          style={styles.findimage}
        />
      </View>

      <View style={{ marginTop: 88 }}>
        <Text style={styles.title}>
          Lost&Found
        </Text>
      </View>

      <TouchableOpacity
        style={styles.loginbtn}
        onPress={() => {
          if (user) {
            navigation.navigate('login');
          } else {
            navigation.navigate('Tabs');
          }
        }}
      >
        <Text style={styles.btntext}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rigisterbtn}
        onPress={() => {
          navigation.navigate("registersrc")
        }}
      >
        <Text style={styles.rgster}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.txt}>
          Continue as a guest
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default WellcomeSrc

const styles = StyleSheet.create({
  findimage: {
    width: "60%",
    height: 246,
    marginTop: 95,
    alignSelf: "center"

  },
  findicon: {
    width: 55,
    height: 40,
    marginTop: 30,
    alignSelf: "center"
  },
  title: {
    alignSelf: "center",
    fontWeight: "500",
    lineHeight: 30,
    fontSize: 25,
    fontFamily: "Urbanist_600SemiBold"


  },
  loginbtn: {
    width: "85%",
    height: 56,
    backgroundColor: "#7689D6",
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 24,
    justifyContent: "center",


  },
  rigisterbtn: {
    width: "85%",
    height: 56,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 8,
    borderWidth: 1,
    justifyContent: "center"
  },
  txt: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    marginTop: 24,
    fontFamily: "Urbanist_600SemiBold"



  },
  btntext: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "white",
    fontFamily: "Urbanist_600SemiBold"



  },
  rgster: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#1E232C",
    fontFamily: "Urbanist_600SemiBold"
  }


})