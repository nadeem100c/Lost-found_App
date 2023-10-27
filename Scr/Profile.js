import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context'

function Profile() {
  const [imageUri, setImageUri] = useState(null);
  const Username = { firstName }
  const Points = 1234
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) { // Change "cancelled" to "canceled"
      setImageUri(result.assets[0].uri); // Use "assets" array to access selected assets
    }
  };

  return (
    <SafeAreaView>


      <View>
        <View style={styles.header}>
          <Text style={styles.headertxt}>Profile</Text>
        </View>
        <View style={styles.imagepicker}>
          <Image source={require("../assets/profiledami.png")} style={styles.profileimg} />
          {imageUri && <Image source={{ uri: imageUri }} style={styles.profileimg} />}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={require("../assets/cameraicon.png")}
              style={styles.cameraicon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.UserView}>
          <Text style={styles.username}>{Username}</Text>
        </View>
        <View style={styles.userPoints}>
          <Image
            source={require("../assets/bankemojy.png")}
            style={styles.bankemojy}
          />
          <Text style={styles.pointtxt}>Points:{' '}{Points}</Text>
        </View>
        <TouchableOpacity style={styles.screens}>
          <View style={styles.accountView}>
            <Image
              source={require("../assets/profileicon.png")}
              style={styles.profileicon}
            />
            <Text style={styles.accounttxt}>Account Detail</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.screens}>
          <View style={styles.accountView}>
            <Image
              source={require("../assets/setting.png")}
              style={styles.profileicon}
            />
            <Text style={styles.accounttxt}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.screens}>
          <View style={styles.accountView}>
            <Image
              source={require("../assets/smsnotification.png")}
              style={styles.profileicon}
            />
            <Text style={styles.accounttxt}>Contact </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutbtn}>
          <Text style={styles.btntext}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deletebtn}>
          <Text style={styles.deltext}>Delete Account</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
export default Profile;
const styles = StyleSheet.create({
  cameraicon: {
    height: 35,
    width: 35,
    marginLeft: 70,
    marginTop: 80
  },
  header: {
    height: 60,
    width: "100%",
    backgroundColor: 'white',
    borderTopStartRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: "center",
    borderColor: "#e1ebe4",
    elevation: 2,
  },
  headertxt: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  profileimg: {
    height: 110,
    width: 110,
    borderRadius: 60,
    position: "absolute"
  },
  imagepicker: {
    marginTop: 35,
    alignSelf: "center"
  },
  UserView: {
    alignSelf: "center",
    marginTop: 30
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
  },
  bankemojy: {
    height: 21,
    width: 21, marginRight: 10
  },
  userPoints: {
    flexDirection: 'row',
    marginTop: 12,
    height: 38,
    width: "60%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderColor: "#7689D6"
  },
  pointtxt: {
    color: "#7689D6",
    fontSize: 14,
    fontWeight: '600'
  },
  screens: {
    marginTop: 15,
    marginLeft: 20
  },
  accounttxt: {
    marginLeft: 15,
    fontWeight: "500",
    fontSize: 15
  },
  accountView: {
    flexDirection: "row",
    height: 60,
    width: '80%',
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: '#ECECEC'
  },
  logoutbtn: {
    height: 45,
    width: "90%",
    backgroundColor: "#7689D6",
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  btntext: {
    color: "white",
    fontWeight: "600",
    fontSize: 15
  },
  deletebtn: {
    height: 45,
    width: "90%",
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  deltext: {
    color: "#DF1818",
    fontWeight: "500",
    fontSize: 15
  },
})
