import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { firebase } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


const UserChat = ({ route }) => {
  const navigation = useNavigation()
  const { otherUserUID,  userName } = route.params || {};

  if (!otherUserUID) {
    console.error('Other user ID is undefined');
    return null;
  }

  const [messages, setMessages] = useState([]);
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser;
  const chatRoomId = [currentUser.uid, otherUserUID].sort().join('_');
  const chatRef = db.collection('chats').doc(chatRoomId);

  useEffect(() => {
    const chatRoomId = [currentUser.uid, otherUserUID].sort().join('_');
    const chatRef = db.collection('chats').doc(chatRoomId).collection('messages');

    const unsubscribe = chatRef
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            _id: doc.id,
            user: { _id: data.senderId },
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });

        setMessages(newMessages.reverse());
      });

    return () => unsubscribe();
  }, [currentUser.uid, db, otherUserUID]);





  const onSend = async newMessages => {
    const chatRoomId = [currentUser.uid, otherUserUID].sort().join('_');
    const chatRef = db.collection('chats').doc(chatRoomId).collection('messages');

    await Promise.all(
      newMessages.map(async message => {
        await chatRef.add({
          ...message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          senderId: currentUser.uid,
        });
      })
    );
  };

  const handlebackbtn = () => {
    navigation.navigate("chat")
  };


  const onDelete = async (messageId) => {
    try {
      const confirmDelete = await confirmMessageDeletion(); // Show confirmation alert

      if (confirmDelete) {
        await chatRef.collection('messages').doc(messageId).delete();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const confirmMessageDeletion = () => {
    return new Promise((resolve) => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this message?',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => resolve(true),
          },
        ],
        { cancelable: true }
      );
    });
  };

  const handleMediaSelection = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        const selectedImage = pickerResult.assets[0];

        const newMessage = {
          _id: Math.round(Math.random() * 1000000),
          image: selectedImage.uri,
          user: {
            _id: currentUser.uid,
          },
          createdAt: new Date(),
        };

        const updatedMessages = await updateMessagesWithRemoteURLs([newMessage]);
        onSend(updatedMessages);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };
  const uploadImageToStorage = async (uri, imageName) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`images/${imageName}`);
      await ref.put(blob);
      const downloadURL = await ref.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      throw error;
    }
  };

  const updateMessagesWithRemoteURLs = async (newMessages) => {
    try {
      const updatedMessages = await Promise.all(
        newMessages.map(async (message) => {
          if (message.image && message.image.startsWith('file://')) {
            const imageUri = message.image;
            const imageName = `${currentUser.uid}_${Date.now()}.jpg`;
            const downloadURL = await uploadImageToStorage(imageUri, imageName);

            return {
              ...message,
              image: downloadURL,
            };
          }
          return message;
        })
      );
      return updatedMessages;
    } catch (error) {
      console.error('Error updating messages with URLs:', error);
      throw error;
    }
  };

  const handleSend = async (newMessages) => {
    try {
      const chatRoomId = [currentUser.uid, otherUserUID].sort().join('_');
      const chatRef = db.collection('chats').doc(chatRoomId).collection('messages');

      const messagesWithRemoteURLs = await updateMessagesWithRemoteURLs(newMessages);

      // Add the updated messages with cloud URLs to Firestore
      await Promise.all(
        messagesWithRemoteURLs.map(async (message) => {
          await chatRef.add({
            ...message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            senderId: currentUser.uid,
          });
        })
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 ,}}>
      <View style={styles.btnView}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={handlebackbtn}
            style={{ marginLeft: 10, }}
          >
            <Image source={require('../assets/backbtn.png')} style={styles.backbtn} />
          </TouchableOpacity>
          <Text style={styles.title}>{userName}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Image source={require("../assets/callbtn.png")}
              style={{
                height: 20,
                width: 20
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../assets/threedot.png")}
              style={{
                height: 24,
                width: 24
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => handleSend(messages)}
        placeholder="Type your message "
        textInputProps={{
          paddingLeft: 40,
          
        }}

        renderMessage={(props) =>
          props.currentMessage.image ? (
            <TouchableOpacity
              onLongPress={() => onDelete(props.currentMessage._id)}
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <View style={{
                flexDirection: 'row', justifyContent: props.currentMessage.user._id === currentUser.uid ? 'flex-end' : 'flex-start',
              }}>
                {props.currentMessage.image && (
                  <Image
                    source={{ uri: props.currentMessage.image }}
                    style={styles.imageStyle}
                  />
                )}
                <View style={{ right: "20%", justifyContent: "flex-end", marginBottom: 10 }}>
                  <Text style={props.currentMessage.user._id === currentUser.uid ? styles.sentTime : styles.receivedTime}>
                    {moment(props.currentMessage.createdAt).format('HH:mm')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onLongPress={() => onDelete(props.currentMessage._id)}
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: props.currentMessage.user._id === currentUser.uid ? 'flex-end' : 'flex-start' }}>
                <View style={[styles.messageBubble, props.currentMessage.user._id === currentUser.uid ? styles.sentMessageBubble : styles.receivedMessageBubble]}>
                  <Text style={props.currentMessage.user._id === currentUser.uid ? styles.sentMessageText : styles.receivedMessageText}>
                    {props.currentMessage.text}
                  </Text>
                  <View style={styles.timeContainer}>
                    <Text style={props.currentMessage.user._id === currentUser.uid ? styles.sentTime : styles.receivedTime}>
                      {moment(props.currentMessage.createdAt).format('HH:mm')}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

          )
        }

      />
      <View style ={{backgroundColor:"white"}}>
        <TouchableOpacity onPress={handleMediaSelection} style={styles.mediaButton}>
          <Image source={require('../assets/PlusIcon.png')} style={styles.mediaIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserChat;
const styles = StyleSheet.create({
  messageBubble: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginHorizontal: 10
  },
  sentMessageBubble: {
    backgroundColor: '#007AFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 0,
  },
  receivedMessageBubble: {
    backgroundColor: '#EAEAEA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 0,
  },
  sentMessageText: {
    color: 'white',
    fontSize: 16,
  },
  receivedMessageText: {
    color: 'black',
    fontSize: 16,
  },
  sentTime: {
    fontSize: 12,
    color: 'white',
  },
  receivedTime: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  headertxt: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Urbanist_500Medium',
    alignSelf: "center"
  },
  backbtn: {
    width: 41,
    height: 41,
    borderWidth: 2,
    borderColor: "#E8ECF4",
    borderRadius: 8,
    marginTop: 10

  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 21,
    alignSelf: "center",
    marginLeft: 10

  },
  btnView: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    height: 60
  },
  imageStyle: {
    height: 230,
    width: "60%",
    marginBottom: 5,
    borderWidth: 5,
    borderColor: "#7689D6",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8

  },
  mediaInputContainer: {
    flexDirection: 'row',

  },
  mediaButton: {
    bottom: 35,
    marginLeft: 10,
    backgroundColor: "#e0d4d3",
    width: 30
  },
  mediaIcon: {
    height: 30,
    width: 30,
    tintColor: "blue"
  },
});

