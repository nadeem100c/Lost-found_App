import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

const Chat = () => {
  const navigation = useNavigation()
  const Array = [
    {
      id: 1,
      Name: "Theresa ",
      TextDemo: "Okay, i’ll work on it when it’s...",
      Time: "06.21",
      masgCOunt: "4",
      MassageBadge: require("../assets/massageBadge.png"),
      profileImage: require('../assets/profileimage.png'),
      activeBadge: require('../assets/activeBadge.png'),
    },
    {
      id: 2,
      Name: "Theresa ",
      TextDemo: "Okay, i’ll work on it when it’s...",
      Time: "06.21",
      masgCOunt: "4",
      MassageBadge: require("../assets/massageBadge.png"),
      profileImage: require('../assets/profileimage.png'),
      activeBadge: require('../assets/activeBadge.png'),
    },
    {
      id: 3,
      Name: "Theresa ",
      TextDemo: "Okay, i’ll work on it when it’s...",
      Time: "06.21",
      masgCOunt: "4",
      MassageBadge: require("../assets/massageBadge.png"),
      profileImage: require('../assets/profileimage.png'),
      activeBadge: require('../assets/activeBadge.png'),
    },

  ]
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

  const ProfileList = () => {
    return (
      Array.map((element) => {
        return (

          <TouchableOpacity key={element.id} style={{ flexDirection: "column", marginLeft: 21 }}
            onPress={() => navigation.navigate('userChating')}
          >

            <View style={{ flexDirection: "row", }}>
              <Image
                source={element.profileImage}
                style={styles.profileimage}
              />
              <Text style={styles.name}>{element.Name}</Text>
              <Text style={styles.time}>{element.Time}</Text>

            </View>

            <View>
              <Image
                source={element.activeBadge}
                style={styles.activeBadge}
              />
              <Text style={styles.massagetxt}>
                Okay, i’ll work on it when it’s...
              </Text>
              <Image
                source={element.MassageBadge}
                style={styles.massagebadge}
              />
              <Text style={styles.masgbadgetxt}>{element.masgCOunt}</Text>
            </View>

          </TouchableOpacity>
        )
      })
    )
  }
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headertxt}>Messages</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          placeholder='Search...'
          style={styles.searchbar}
        />
        <Image
          source={require('../assets/Searchicon.png')}
          style={styles.searbaricon}
        />
      </View>
      <View style={{ marginTop: 20, }}>
        <ProfileList />
      </View>
    </SafeAreaView>

  )
}

export default Chat

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: "100%",
    backgroundColor: 'white',
    borderTopStartRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    borderBottomWidth: 3,
    borderColor: "#e1ebe4"

  },
  headertxt: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
    fontFamily:"Urbanist_600SemiBold"
  },
  searchbar: {
    marginLeft: 20,
    height: 45,
    width: '90%',
    backgroundColor: '#EDEEEF',
    marginTop: 13,
    borderRadius: 8,
    paddingLeft: 40,
    backgroundColor: "#E8ECF4"
  },
  searbaricon: {
    height: 14,
    width: 14,
    position: 'absolute',
    left: 35,
    marginTop: 28
  },
  filtericon: {
    width: 39,
    height: 36,
    marginTop: 13,
  },
  activeBadge: {
    height: 16,
    width: 16,
    position: "absolute",
    bottom: 15,
    marginLeft: 30

  },
  massagebadge: {
    height: 16,
    width: 15.5,
    position: "absolute", right: 20, bottom: 25
  },
  massagetxt: {
    marginLeft: 60,
    bottom: 25,
    fontSize: 13,
    fontWeight: "400",
    color: "#8391A1",
    fontFamily:"Urbanist_400Regular"

  },
  name: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
    marginTop: 5,
    fontFamily:"Urbanist_500Medium"
  },
  time: {
    position: "absolute",
    right: 20,
    color: "#8391A1",
    fontWeight: "600",
    fontFamily:"Urbanist_600SemiBold"
  },

  masgbadgetxt:
  {
    position: "absolute",
    right: 25,
    bottom: 26,
    fontSize: 10,
    color: "white",
    fontWeight: "bold"
  }
})