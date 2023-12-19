import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../config'; // Import your Firebase configuration
import { TouchableOpacity } from 'react-native-gesture-handler';

const UserAccountSrc = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userUID = currentUser.uid;
      const userRef = firebase.firestore().collection('UserData').doc(userUID);

      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            const profileImageUrl = userData.profileImage;
            const firstName = userData.firstName || '';
            const lastName = userData.lastName || '';
            const email = currentUser.email || '';
            setUserFullName(`${firstName} ${lastName}`);
            setUserEmail(email);
            setProfileImage(profileImageUrl);
          } else {
            console.log('No such document! User UID:', userUID);
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    }
  }, []);

  return (
    <SafeAreaView>
      <View>
        <View style={styles.imageContainer}>
          {profileImage && (
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
          )}
          <Image
            source={require('../assets/shadow.png')}
            style={{ height: 200, width: "100%", position: 'absolute', }}
          />
          <Image
            source={require('../assets/backButton.png')}
            style={{ height: 30, width: 30, position: 'absolute', marginLeft: 20 }}
          />
          <Text style={{ position: 'absolute', paddingTop: '38%', marginLeft: 20, fontWeight: "600", color: "white", fontSize: 20 }}>
            {userFullName}
          </Text>
          <Text style={{ position: 'absolute', marginLeft: 20, marginTop: "45%", color: "white" }}>
            {userEmail}
          </Text>
        </View>
        <View style={{ marginTop: 30, }}>
          <TouchableOpacity style={styles.info}>
            <View >
              <Text style={styles.infoTxt}>
                Personal Info
              </Text>
            </View>
            <Image
              source={require('../assets/forwrodicon.png')}
              style={{ height: 20, width: 20, }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.info}>
            <View >
              <Text style={styles.infoTxt}>
                Change Password
              </Text>
            </View>
            <Image
              source={require('../assets/forwrodicon.png')}
              style={{ height: 20, width: 20, }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.info}>
            <View >
              <Text style={styles.infoTxt}>
                Change Email Adress
              </Text>
            </View>
            <Image
              source={require('../assets/forwrodicon.png')}
              style={{ height: 20, width: 20, }}
            />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  profileImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  info: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: "#b0a79e",
    marginHorizontal: 20,
    backgroundColor: "white",
    height: 50,
    alignItems: "center",
    elevation: 2,
    paddingHorizontal: 10
  },
  infoTxt: {
    fontSize: 15,
    fontWeight: "500"
  }
});

export default UserAccountSrc;
