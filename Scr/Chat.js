import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, TextInput } from 'react-native';
import { firebase } from '../config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const Chat = ({ navigation }) => {
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [lastMessageTimes, setLastMessageTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const fetchConnectedUsers = async () => {
    try {
      const db = firebase.firestore();
      const currentUserID = firebase.auth().currentUser.uid;
      const userDataCollection = db.collection('UserData');
      const usersSnapshot = await userDataCollection.get();
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllUsers(usersData);
      setConnectedUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching connected users:', error);
      setLoading(false);
    }
  };

  const fetchLastMessageTimes = async () => {
    try {
      const db = firebase.firestore();
      const currentUserID = firebase.auth().currentUser.uid;
      const userTimestamps = {};

      if (connectedUsers.length > 0) {
        const lastMessagesPromises = connectedUsers.map(async (user) => {
          const chatRoomId = [currentUserID, user.id].sort().join('_');
          const chatRef = db.collection('chats').doc(chatRoomId).collection('messages');

          const lastMessage = await chatRef.orderBy('createdAt', 'desc').limit(1).get();
          const lastMessageData = lastMessage.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))[0];

          if (lastMessageData) {
            userTimestamps[user.id] = lastMessageData.createdAt.toDate();
            userTimestamps[user.id + '_message'] = lastMessageData.text;
          } else {
            userTimestamps[user.id] = null;
            userTimestamps[user.id + '_message'] = null;
          }
        });

        await Promise.all(lastMessagesPromises);
        setLastMessageTimes(userTimestamps);
      }
    } catch (error) {
      console.error('Error fetching last message timestamps:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchConnectedUsers();
      setLoading(false);
    }, [])
  );

  useEffect(() => {
    if (connectedUsers.length > 0) {
      fetchLastMessageTimes();
    }
  }, [connectedUsers]);

  const formatLastMessage = (timestamp, userId) => {
    const lastMessage = lastMessageTimes[userId + '_message'];
    return lastMessage
  };
  const handleChatroom = async (otherUserUID, userName) => {
    try {
      navigation.navigate('UserChat', { otherUserUID, userName });
    } catch (error) {
      console.error('Error handling chatroom:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredUsers = allUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(text.toLowerCase()) ||
        user.lastName.toLowerCase().includes(text.toLowerCase())
    );
    setConnectedUsers(filteredUsers);
  };

  useEffect(() => {
    setConnectedUsers(allUsers);
  }, [allUsers]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const connectedUsersWithMessages = connectedUsers
    .filter(user => lastMessageTimes[user.id])
    .sort((userA, userB) => {
      const timestampA = lastMessageTimes[userA.id];
      const timestampB = lastMessageTimes[userB.id];
      if (timestampA && timestampB) {
        return timestampB - timestampA; // Sort in descending order of timestamps
      }
      return 0;
    });

  const handleProfileImage = async (userId) => {
    const profileImageUrl = await fetchUserProfileImage(userId);
    return profileImageUrl;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <Text style={styles.headertxt}>Messages</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <TextInput
          placeholder='Search something here'
          style={styles.searchbar}
          onChangeText={handleSearch}
          value={searchText}
        />
        <Image
          source={require('../assets/Searchicon.png')}
          style={styles.searbaricon}
        />
      </View>
      <FlatList
        data={connectedUsersWithMessages}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleChatroom(item.id, `${item.firstName} ${item.lastName}`)}
            style={styles.userItem}
          >
            <View>
              <Image
                source={item.profileImage ? { uri: item.profileImage } : require('../assets/profileimage.png')}
                style={styles.userImage}
              />
            </View>
            <View style={styles.userInfo}>
              <View style={styles.userNameTime}>
                <Text style={{ fontWeight: "500" }}>{item.firstName} {item.lastName}</Text>
                <Text style={{ color: "#8391A1" }}>
                  {lastMessageTimes[item.id] ? (
                    new Date(lastMessageTimes[item.id]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                  ) : (
                    ''
                  )}
                </Text>
              </View>
              {lastMessageTimes[item.id] ? (
                <Text style={{ color: "#8391A1" }}>{formatLastMessage(lastMessageTimes[item.id], item.id)}</Text>
              ) : (
                <Text>No messages</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
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
  searchbar: {
    marginLeft: 16,
    height: 37,
    width: '92%',
    backgroundColor: '#E8ECF4',
    borderRadius: 8,
    paddingLeft: 40,
  },
  searbaricon: {
    height: 14,
    width: 14,
    position: 'absolute',
    left: 38,
    marginTop: 12
  },
  userItem: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: "#f2f1eb",
    elevation: 1,
    borderRadius: 8,
    width: "92%",
    alignSelf: "center"
  },
  userImage: {
    height: 50,
    width: 50,
    marginLeft: 5,
    marginTop: 5,
    borderRadius: 50
  },
  userInfo: {
    width: '80%',
    padding: 10,
    elevation: 1
  },
  userNameTime: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
