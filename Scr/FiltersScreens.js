import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation  } from '@react-navigation/native'
import DoubleSlider from './DoubleSlider'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

const buttonWidth = Dimensions.get('window').width
const multiuttonWidth = Dimensions.get('window').width

const FiltersScreens = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedbg, setselectedbg] = useState(null)
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const [location, setLocation] = useState('');

  const navigation = useNavigation()
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

  const btnWidth = buttonWidth * 0.2
  const multibtn = multiuttonWidth * 0.2

  const Backbtn = () => {
    navigation.goBack()
  }

  const categories = ["All", "bag", "wallet", "Electronic", "Jewelry", "Glasses"];

  const HandlebtnBG = (buttonindexing) => {
    setselectedbg(buttonindexing)
  }
  const handleSearchTypeButtonPress = (buttonIndex) => {
    setSelectedSearchType(buttonIndex);
  };

  const applyFilters = () => {
    let selectedType = null;
    let selectedCategoryName = null;

    if (selectedbg !== null && selectedbg < categories.length) {
      selectedCategoryName = categories[selectedbg];
    }
    console.log('Selected Type:', selectedType);
    console.log('Selected Category:', selectedCategoryName);
    console.log('Selected Location:', location);
    if (selectedSearchType === 11) {
      selectedType = 'Lost';
    } else if (selectedSearchType === 12) {
      selectedType = 'Found';
    }

    navigation.navigate('Tabs', {
      screen: 'Home',
      params: {
        searchType: selectedType,
        category: selectedbg !== null ? categories[selectedbg] : null,
        location: location,
      },
    });
  };

  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const resetFilters = () => {
    // Display an alert to confirm the reset action
    alert(
      "Reset Filters",
      "Are you sure you want to reset all filters?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          onPress: () => {
            setSelectedCategory(null);
            setselectedbg(null);
            setSelectedSearchType(null);
            setLocation('');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.btnView}>
          <TouchableOpacity onPress={Backbtn}>
            <Image source={require("../assets/backarrow.png")} style={styles.backbtn} />
          </TouchableOpacity>
          <Text style={styles.title}>Filters</Text>
        </View>
        <View style={styles.type}>
          <Text>Search Type</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[
              styles.LostFountbtn,
              { width: multibtn },
              selectedSearchType === 11 ? styles.buttonbg : {},
            ]}
            onPress={() => {
              handleSearchTypeButtonPress(11);
            }}
          >
            <Text style={styles.btntxt}>Lost</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.LostFountbtn,
              { width: multibtn },
              selectedSearchType === 12 ? styles.buttonbg : {},
            ]}
            onPress={() => {
              handleSearchTypeButtonPress(12);
            }}
          >
            <Text style={styles.btntxt}>Found</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.date}>
          <Text style={styles.datetxt}>Date</Text>
        </View>
        <View style={{ alignSelf: "center", height: 30 }}>
          <DoubleSlider />
        </View>
        <View style={{ marginTop: 28, marginLeft: 28, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Urbanist_500Medium" }}>today</Text>
          <Text style={{ fontFamily: "Urbanist_500Medium" }}>a week</Text>
          <Text style={{ fontFamily: "Urbanist_500Medium" }}>a month</Text>
          <Text style={{ fontFamily: "Urbanist_500Medium" }}>3 month</Text>
          <Text style={{ fontFamily: "Urbanist_500Medium" }}>6 month</Text>
          <Text style={styles.year}>a year</Text>
        </View>
        <View style={{ marginLeft: 28, marginTop: 36 }}>
          <Text style={{ fontSize: 12, fontFamily: "Urbanist_500Medium", lineHeight: 14 }}>Category</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.LostFountbtn, { width: multibtn }, selectedbg === 0 ? styles.buttonbg : {}]}
            onPress={() => { HandlebtnBG(0) }}
          >
            <Text style={styles.btntxt}>All</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.LostFountbtn, { width: multibtn }, selectedbg === 1 ? styles.buttonbg : {}]}
            onPress={() => { HandlebtnBG(1) }}
          >
            <Text style={styles.btntxt}>bag</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.LostFountbtn, { width: multibtn }, selectedbg === 2 ? styles.buttonbg : {}]}
            onPress={() => { HandlebtnBG(2) }}
          >
            <Text style={styles.btntxt}>wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.LostFountbtn, { width: multibtn }, selectedbg === 3 ? styles.buttonbg : {}]}
            onPress={() => { HandlebtnBG(3) }}
          >
            <Text style={styles.btntxt}>Electronic</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.LostFountbtn, { width: multibtn }, selectedbg === 4 ? styles.buttonbg : {}]}
            onPress={() => { HandlebtnBG(4) }}
          >
            <Text style={styles.btntxt}>Jewelry</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.LostFountbtn, { width: multibtn }, selectedbg === 5 ? styles.buttonbg : {}]}
            onPress={() => { HandlebtnBG(5) }}
          >
            <Text style={styles.btntxt}>Glasses</Text>
          </TouchableOpacity>


        </View>
        <View style={{ marginLeft: 28, marginTop: 19 }}>
          <Text style={{ fontSize: 12, fontFamily: "Urbanist_500Medium", lineHeight: 14 }}>Location</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>

          <TextInput
            placeholder='Location search '
            style={styles.searchbar}
            onChangeText={handleLocationChange}
          />
          <Image
            source={require('../assets/Searchicon.png')}
            style={styles.searbaricon}
          />
        </View>
        <TouchableOpacity style={styles.loginbtn}
          onPress={applyFilters}
        >
          <Text style={{ alignSelf: "center", color: "white", fontWeight: "600" }}>Apply</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginbtn}
          onPress={resetFilters}
        >
          <Text style={{ alignSelf: "center", color: "white", fontWeight: "600" }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default FiltersScreens

const styles = StyleSheet.create({
  btnView: {
    marginTop: 22,
    marginLeft: 28,
    flexDirection: "row"
  },
  backbtn: {
    width: 18,
    height: 15
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 21,
    marginLeft: 18,
    fontFamily: "Urbanist_600SemiBold"
  },
  type: {
    marginTop: 36,
    marginLeft: 28,
    fontFamily: "Urbanist_500Medium"
  },
  buttons: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 28
  },
  LostFountbtn: {
    height: 26,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#7689D6",
    marginRight: 4,
    justifyContent: "center"
  },
  btntxt: {
    textAlign: "center",
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    fontFamily: "Urbanist_500Medium"
  },
  date: {
    marginTop: 18,
    marginLeft: 28,
    fontFamily: "Urbanist_500Medium"
  },
  datetxt: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 14,
  },
  searchbar: {
    marginLeft: 27,
    height: 47,
    width: '85%',
    backgroundColor: '#EDEEEF',
    marginTop: 13,
    borderRadius: 8,
    paddingLeft: 40,
  },
  searbaricon: {
    height: 14,
    width: 14,
    position: 'absolute',
    left: 45,
    marginTop: 29
  },
  loginbtn: {
    height: 48,
    width: "85%",
    backgroundColor: "#7689D6",
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 40
  },
  buttonbg: {
    backgroundColor: "#7689D6",
  },
  year: {
    fontFamily: "Urbanist_500Medium",
    marginRight: 5
  }
})