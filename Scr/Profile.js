import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';




function Profile() {
  const [userFirstName, setUserFirstName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const navigation = useNavigation();
  const Points = 1234


  const fetchProfileImage = async (userUID) => {
    const userRef = firebase.firestore().collection('UserData').doc(userUID);
    try {
      const doc = await userRef.get();
      if (doc.exists) {
        const userData = doc.data();
        const profileImageUrl = userData.profileImage;
        setImageUri(profileImageUrl);
      } else {
        console.log('No such document! User UID:', userUID);
      }
    } catch (error) {
      console.log('Error getting document:', error);
    }
  };
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userUID = currentUser.uid;
      fetchProfileImage(userUID); // Fetch and set profile image on component mount
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          fetchProfileImage(user.uid); // Fetch and set profile image when user logs back in
        }
      });
      return () => unsubscribe(); // Unsubscribe from the listener on unmount
    }
  }, []);

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

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userUID = currentUser.uid;
      const userRef = firebase.firestore().collection('UserData').doc(userUID);

      userRef.get().then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const firstName = userData.firstName;
          setUserFirstName(firstName);
        } else {
          console.log('No such document! User UID:', userUID);
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
      });
    }
  }, []);



  const HandleLogOut = async () => {
    try {
      await firebase.auth().signOut()
      navigation.navigate("login")
    } catch (error) {
      console.error("Error loggin out:", error)
    }
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result && !result.cancelled) {
      const image = result.assets[0];

      try {
        const response = await fetch(image.uri);
        const blob = await response.blob();

        const user = firebase.auth().currentUser;
        const userUID = user.uid;

        const storageRef = firebase.storage().ref().child(`profile_images/${userUID}`);
        await storageRef.put(blob);

        const imageURL = await storageRef.getDownloadURL();
        setImageUri(imageURL);

        // Update user profile with imageURL in Firestore
        const userRef = firebase.firestore().collection('UserData').doc(userUID);
        await userRef.update({ profileImage: imageURL });

      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      // Handle the case when the image selection is canceled
      console.log('Image selection canceled.');
    }
  };


  const handleDeleteAccount = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete your account?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                await user.delete();
                navigation.navigate('login');
              } catch (error) {
                console.error('Error deleting account:', error);
              }
            },
          },
        ],
        { cancelable: true }
      );
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
          <Text style={styles.username}>{userFirstName}</Text>
        </View>
        <View style={styles.userPoints}>
          <Image
            source={require("../assets/bankemojy.png")}
            style={styles.bankemojy}
          />
          <Text style={styles.pointtxt}>Points:{' '}{Points}</Text>
        </View>
        <TouchableOpacity style={styles.screens}
          onPress={() => navigation.navigate("accountscreen")}
        >
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
        <TouchableOpacity style={styles.screens} 
        onPress={ () => navigation.navigate("SuppotContact")}
        >
          <View style={styles.accountView}>
            <Image
              source={require("../assets/smsnotification.png")}
              style={styles.profileicon}
            />
            <Text style={styles.accounttxt}>Contact </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutbtn}
          onPress={HandleLogOut}
        >
          <Text style={styles.btntext}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deletebtn} onPress={handleDeleteAccount}>
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
