import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { firebase } from '../config';
import 'firebase/compat/firestore';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import FoundSrc from './FoundSrc';

import {
  useFonts,
  Urbanist_500Medium,
} from '@expo-google-fonts/urbanist';

const MyAds = () => {
  const [selectsrc, setSeletsrc] = useState(0);
  const [lostItems, setLostItems] = useState([]);

  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Urbanist_500Medium,
  });

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      const userUID = currentUser.uid;
      const userRef = firebase.firestore().collection('lostItems').where('userId', '==', userUID).where('type', '==', 'Lost');

      const unsubscribe = userRef.onSnapshot((querySnapshot) => {
        const userDataArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setLostItems(userDataArray);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  const deleteItem = (itemId) => {
    firebase.firestore().collection('lostItems').doc(itemId).delete()
      .then(() => {
        console.log('Item deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting item: ', error);
      });
  };

  const openEditAd = (item) => {
    navigation.navigate("EditAd", { item });
  };

  const renderItem = ({ item }) => (
    <View style={styles.mainView}>
      <Image source={{ uri: item.images[0] || '' }} style={styles.productimg} />
      <View style={{ flexDirection: 'column', marginLeft: 10 }}>
        <View style={{ flexDirection: "row", }}>
          <TouchableOpacity onPress={() => openEditAd(item)}>
            <Image
              source={require("../assets/editicon.png")}
              style={styles.editIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteItem(item.id)}
            style={{
              position: "absolute",
            left:200
            }}
          >
            <Image
              source={require("../assets/deleteicon.png")}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>{item.itemName || 'N/A'}</Text>
        </View>
        <View>
          <Text style={styles.infoText}>
            {item.date && item.date.toDate ? moment(item.date.toDate()).format("D MMMM YYYY") : 'N/A'}
          </Text>
          <Text style={styles.infoText}>
            {item.time && item.time.toDate ? moment(item.time.toDate()).format("h:mm A") : 'N/A'}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={require('../assets/Location.png')}
            style={styles.locationIcon}
          />
          <Text style={[styles.infoText, styles.locationText]}>{item.location || 'N/A'}</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    if (selectsrc === 0) {
      if (lostItems.length === 0) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>No Ads Available yet</Text>
          </View>
        );
      } else {
        return (
          <FlatList
            data={lostItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        );
      }
    } else if (selectsrc === 1) {
      return <FoundSrc />;
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headertxt}>My Ads</Text>
      </View>
      <View style={styles.bothbtn}>
        <TouchableOpacity
          onPress={() => setSeletsrc(0)}>
          <Text style={{ color: selectsrc == 0 ? "#7689D6" : "#8391A1", fontSize: 18, borderBottomWidth: selectsrc === 0 ? 2 : 0, borderColor: '#7689D6', fontFamily: "Urbanist_500Medium" }}>Lost</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 20 }}
          onPress={() => setSeletsrc(1)}>
          <Text style={{ color: selectsrc == 1 ? "#7689D6" : "#8391A1", fontSize: 18, borderBottomWidth: selectsrc === 1 ? 2 : 0, borderColor: '#7689D6', fontFamily: "Urbanist_500Medium" }}>Found</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

export default MyAds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderTopStartRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    borderColor: '#e1ebe4',
    elevation: 2,
  },
  headertxt: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Urbanist_500Medium',
    alignSelf: "center"
  },
  mainView: {
    marginTop: 15,
    alignSelf: 'center',
    height: 90,
    width: '90%',
    flexDirection: 'row',
    paddingTop: 5,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  productimg: {
    height: 80,
    width: 80,
    borderRadius: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  infoText: {
    color: '#1E1F4B',
    fontSize: 10,
    marginLeft: 10
  },
  bothbtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 24,
  },
  tabText: (selectedTab, tab) => ({
    color: selectedTab === tab ? '#7689D6' : '#8391A1',
    fontSize: 18,
    borderBottomWidth: selectedTab === tab ? 2 : 0,
    borderColor: '#7689D6',
    fontFamily: 'Urbanist_500Medium',
    marginRight: 10
  }),
  editIcon: {
    height: 20,
    width: 20,
    position: "absolute",
    left: 170,
  },
  deleteIcon: {
    height: 15,
    width: 15,

  },
  locationIcon: {
    height: 11,
    width: 11,
    marginLeft: 8,
    marginTop: 2,
  },
  locationText: {
    right: 8
  }
});
