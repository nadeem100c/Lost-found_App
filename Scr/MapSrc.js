import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity,TextInput,Dimensions } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


const CustomMarker = ({ title, image }) => (
  <Marker
    coordinate={{
      latitude: 31.471171217121025,
      longitude: 74.2766496454977,
    }}
  >
    <Image
      source={image}
      style={styles.customMarkerImage}
    />
    <Callout>
      <View style={styles.customCalloutContainer}>
        <Text style={styles.customCalloutTitle}>{title}</Text>
        <Image
          source={require('../assets/Glasses.png')} // Replace with your image path
          style={styles.calloutImage}
        />
        <TouchableOpacity style={styles.calloutButton}>
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </Callout>
  </Marker>
);

const Map = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const handleGoBack = () => {
    navigation.goBack();
  };
  const handler = () => {
    navigation.navigate('Filters');
};

  return (
  
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 31.468051020683458,
          longitude: 74.2665457003265,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <CustomMarker
          title="Glasses"
          image={require('../assets/Marker.png')} // Replace with your image path
        />
      </MapView>



      <View style={{ flexDirection: "row", position: "absolute", alignItems: "center", top: screenHeight*0.05, marginLeft: "2.5%", }}>
      <TouchableOpacity 
      onPress={handleGoBack}
      >
      <Image style={{
        width: 41,
              width: screenWidth * 0.11,
              height: 41,
              height: screenHeight * 0.057,
              // top: 20,
              left: "40%"
        
      }}
      source={require("../assets/backbtn.png")} />
      </TouchableOpacity>
      </View>
      

      <View style={{
        position: 'relative',
        position: 'absolute',
        top: screenHeight*0.123,
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor:"red",
        marginLeft: "6%"
      }}>

        <TextInput style={{
          backgroundColor: "#F7F8F9",
          borderWidth: 1,
          borderColor: "#EDEEEF",
          width: "84%",
          // width:279,
          height: 37,
          height: screenHeight * 0.05,
          borderRadius: 8,
          fontSize: RFValue(12),
        //   fontFamily: "Urbanist_500Medium",
          letterSpacing: 0.1,
          color: "#8C9199",
          position: "relative",
          paddingLeft: screenWidth*0.12,

        }}
          placeholder='Search something here' />
        <Ionicons
          name="search"
          size={RFValue(17)}
          color="#888888"

          style={{
            position: "absolute",
            left: "5%",


          }}
        />

        <View style={{
          backgroundColor: "#7689D6",
          width: 39,
          width: "12%",
          height: 36,
          height: screenHeight * 0.05,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          left: "7%"
        }}>
          <TouchableOpacity onPress={handler}>

            <Image style={{
              //  width: 23,
              width: screenWidth * 0.062,
              //  height: 22, 
              height: screenHeight * 0.062,
              resizeMode: "contain"
            }}
              source={require('../assets/Filtericon.png')} />
          </TouchableOpacity>
        </View>
      </View>

  

    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  customMarkerImage: {
    width: 40,
    height: 40,
    resizeMode:"contain"
  },
  customCalloutContainer: {
    width: 188,
    height:120,
    alignItems: 'center',
    borderRadius:30
  },
  customCalloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calloutImage: {
    width: 50,
    height: 50,
    marginTop: 10,
    resizeMode: 'cover',
  },
  calloutButton: {
    backgroundColor: '#7689D6',
    padding: 6,
    borderRadius: 6,
    // marginTop: 10,
    width:120,
    height:27,
    alignItems:"center",
    justifyContent:"center"
  },
  buttonText: {
    color: 'white',
    // fontWeight: 'bold',
  },
});

export default Map;