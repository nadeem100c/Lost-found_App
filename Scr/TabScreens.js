
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from './Home';
import MyAds from './MyAds';
import Chat from './Chat';
import Profile from './Profile';
import AddPost from './AddPost';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <View style={{
      width: 55,
      height: 55,
      borderRadius: 27,
      backgroundColor: "#7689D6",
      borderColor:"#ddd",
     borderWidth:2,
      shadowOpacity:0.3,
      shadowRadius:3,
      shadowOffset:{
        height:3,
        width:3
      }
    }}>
      {children}
    </View>

  </TouchableOpacity>
)
export default function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarLabel: '',
        style: {
          position: "absolute",
          evelation: 3,
          borderRadius: 25,
          height: 70,
          left: 5,
          right: 5
        }
      }}
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/Home.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                Home
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="MyAds" component={MyAds}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/AdsIcon.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                My Ads
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen name='addpost' component={AddPost}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../assets/PlusButton.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  top:7
                }}
              />
            </View>

          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}
      />
      <Tab.Screen name="Chat" component={Chat}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/Chat.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                Chat
              </Text>
            </View>
          )
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          headerShown: false, tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center", top: 10 }}>
              <Image source={require("../assets/Profile.png")}
                resizeMode="contain"
                style={{
                  height: 22,
                  width: 22,
                  tintColor: focused ? "#7689D6" : "#748c94",
                }}
              />
              <Text style={{ color: focused ? "#7689D6" : "#748c94", fontSize: 10 }}>
                Profile
              </Text>
            </View>
          )
        }}
      />

    </Tab.Navigator>
  );
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',

  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7689D6',
    bottom: 30,
    shadowColor: 'green',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
  iconContainer: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: "Raleway_500Medium"
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'Ionicons',
    fontSize: 16,
    // ... other styles
  },
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
  },

});