import React, { useEffect, useState, } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import Carousel, { } from "pinar";
import { SafeAreaView, } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import * as SMS from 'expo-sms'
import { firebase } from '../config';
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
  const [userData, setUserData] = useState(null);

  const route = useRoute();
  const itemDetails = route.params.itemDetails;
  const formattedDate = itemDetails.date.toDate().toLocaleString();
  const userName = route.params.userName; // Access userName from route params


  const images = itemDetails.images || [];
  const category = itemDetails.category || 'Category Not Provided';
  const date = itemDetails.date || 'Date Not Provided';
  const description = itemDetails.description || 'Description Not Provided';
  const location = itemDetails.location || 'Location Not Provided';

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


  const [fontsLoaded] = useFonts({
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
  });
  useEffect(() => {
    if (userId) {

      const fetchUserData = async () => {
        try {
          const userDoc = await firebase.firestore().collection('UserData').doc(userId).get();
          if (userDoc.exists) {

            const userData = userDoc.data();
            setUserData(userData); // Set the fetched user data in state
          } else {
            console.log(`User data not found for userId: ${userId}`);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId]);
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleShare = () => {
    const formattedDate = itemDetails.date.toDate().toLocaleString();
    const message = `Check out this item: ${itemDetails.category}\nDate: ${formattedDate}\nDescription: ${itemDetails.description}\nLocation: ${itemDetails.location}`;

    Share.share({
      message,
      url: itemDetails.images[0],
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {

          } else {

          }
        } else if (result.action === Share.dismissedAction) {

        }
      })
      .catch(error => console.error(error));
  };
  const userId = itemDetails.userId;


  const handleMasgIconPress = () => {
    // ...
    if (userId) {
      navigation.navigate('UserChat', { otherUserUID: userId, userName });
    } else {
      console.log('User ID not found.');

    }

  };



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.btnView}>
        <TouchableOpacity onPress={handlebackbtn}>
          <Image source={require("../assets/backbtn.png")} style={styles.backbtn} />
        </TouchableOpacity>
        <Text style={styles.title}>Details</Text>
        <TouchableOpacity onPress={handleShare}>
          <Image source={require("../assets/ShareIcon.png")} style={styles.sharebtn} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 310 }}>
        <View style={{ height: 310 }}>
          <Carousel style={{ justifyContent: "center", marginTop: 30 }}>
            {itemDetails.images.length > 0 ? (
              itemDetails.images.map((image, index) => (
                <View key={index}>
                  <Image source={{ uri: image }} style={styles.SlideImg} />
                </View>
              ))
            ) : (
              <View style={styles.noImageContainer}>
                <Text style={styles.noImageText}>No Image Available</Text>
              </View>
            )}
          </Carousel>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.masgbtn}
          onPress={handleMasgIconPress}
        >
          <Image source={require('../assets/MasgIcon.png')} style={{ width: 83, height: 24 }} />
        </TouchableOpacity>







        <TouchableOpacity style={[styles.masgbtn, { marginLeft: 10 }]}

        >
          <Image source={require('../assets/CallIcon.png')} />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30, marginLeft: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.ItemName}>{itemDetails.category}</Text>
          <Text style={styles.timeDate}>{formattedDate}</Text>
        </View>
        <Text style={styles.Description}>Description</Text>
        <View style={styles.descriptiontxt}>
          <Text style={{ color: "#8391A1", fontFamily: "Urbanist_400Regular" }}>
            {itemDetails.description}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Image source={require('../assets/Location.png')} style={styles.LocotionIcon} />
            <Text style={styles.location}>{itemDetails.location}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.ViewMapbtn}>
        <Text style={styles.btntxt}>View on map</Text>
      </TouchableOpacity>
    </SafeAreaView>


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

