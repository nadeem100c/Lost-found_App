import React,{useEffect} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen'


import Home from './Home';
import MyAds from './MyAds';
import Chat from './Chat';
import Profile from './Profile';

import {
  useFonts,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';

export default function TabScreens() {

  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
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
  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'Home':
        icon = 'ios-home-outline';
        break;
      case 'MyAds':
        icon = 'megaphone';
        break;
      case 'Chat':
        icon = 'chatbubble-ellipses-outline';
        break;
      case 'Profile':
        icon = 'person-outline';
        break;
    }

    return (
      <View>
        <Ionicons
          name={icon}
          size={25}
          color={routeName === selectedTab ? '#7689D6' : '#BDBDBD'}
        />
      </View>
    );
  };

  const renderTabBar = ({ routeName, selectedTab, navigate, }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        <View style={styles.iconContainer}>
          {_renderIcon(routeName, selectedTab)}
          <Text style={[styles.tabLabel, { color: routeName === selectedTab ? '#7689D6' : '#BDBDBD' }]}>
            {routeName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor="#FFFFFF"
      initialRouteName="Home"
      borderTopLeftRight
      screenOptions={{
        headerShown: false,
      }}

      renderCircle={({ selectedTab, navigate }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("addpost")}
          >
            <Feather name={'plus'} color="#7689D6" size={25}
              style={{ backgroundColor: "white", borderRadius: 4, }}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="Home"
        position="LEFT"
        component={() => <Home />}
      />
      <CurvedBottomBarExpo.Screen
        name="MyAds"
        component={() => <MyAds />}
        position="LEFT"
      />
      <CurvedBottomBarExpo.Screen
        name="Chat"
        component={() => <Chat />}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name="Profile"
        component={() => <Profile />}
        position="RIGHT"
      />

    </CurvedBottomBarExpo.Navigator>

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
    fontFamily:"Raleway_500Medium"
  },
});