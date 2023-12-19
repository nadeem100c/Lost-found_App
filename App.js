import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WellcomeSrc from './Scr/WellcomeSrc';
import LoginSrc from './Scr/LoginSrc';
import TabScreens from './Scr/TabScreens';
import FiltersScreens from './Scr/FiltersScreens';
import RegisterScreen from './Scr/RegisterScreen';
import ForgetPassword from './Scr/ForgetPassword';
import PasswordOtp from './Scr/PasswordOtp';
import Newpassword from './Scr/Newpassword';
import Changedpassword from './Scr/Changedpassword';
import AddPost from './Scr/AddPost';
import Lostad from './Scr/Lostad';
import Founded from './Scr/Founded';
import DetailsSrc from './Scr/ItemDetailsSrc';
import PublishLostsrc from './Scr/PublishLostsrc';
import MyAds from './Scr/MyAds';
import Notification from './Scr/Notification';
import MapSrc from './Scr/MapSrc';
import ItemDetailsSrc from './Scr/ItemDetailsSrc';
import { firebase } from './config'
import Chat from './Scr/Chat';
import UserChat from './Scr/UserChat';
import SeeMore from './Scr/SeeMore';
import PublishFoundPost from './Scr/PublishFoundPost'
import UserAccountSrc from './Scr/UserAccountSrc'
import EditAdScreen from './Scr/EditAdScreen'
import SupportContact from './Scr/SupportContact';


const Stack = createStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState("");

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Tabs" : "wellcome"}>
        {
          user ? (
            <>
              <Stack.Screen name="Tabs" component={TabScreens} options={{ headerShown: false }} />
              <Stack.Screen name="filters" component={FiltersScreens} options={{ headerShown: false }} />
              <Stack.Screen name='addpost' component={AddPost} options={{ headerShown: false }} />
              <Stack.Screen name='lostad' component={Lostad} options={{ headerShown: false }} />
              <Stack.Screen name='foundad' component={Founded} options={{ headerShown: false }} />
              <Stack.Screen name='details' component={DetailsSrc} options={{ headerShown: false }} />
              <Stack.Screen name='publishLost' component={PublishLostsrc} options={{ headerShown: false }} />
              <Stack.Screen name='myads' component={MyAds} options={{ headerShown: false }} />
              <Stack.Screen name='notications' component={Notification} options={{ headerShown: false }} />
              <Stack.Screen name='mapSrc' component={MapSrc} options={{ headerShown: false }} />
              <Stack.Screen name='itemDetails' component={ItemDetailsSrc} options={{ headerShown: false }} />
              <Stack.Screen name='chat' component={Chat} options={{ headerShown: false }} />
              <Stack.Screen name='UserChat' component={UserChat} options={{ headerShown: false }} />
              <Stack.Screen name='seemore' component={SeeMore} options={{ headerShown: false }} />
              <Stack.Screen name='publishfoundpost' component={PublishFoundPost} options={{ headerShown: false }} />
              <Stack.Screen name='accountscreen' component={UserAccountSrc} options={{ headerShown: false }} />
              <Stack.Screen name='EditAd' component={EditAdScreen} options={{ headerShown: false }} />
              <Stack.Screen name='SuppotContact' component={SupportContact} options={{ headerShown: false }} />










            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WellcomeSrc} initialParams={{ user }} options={{ headerShown: false }} />
              <Stack.Screen name="registersrc" component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="login" component={LoginSrc} options={{ headerShown: false }} />
              <Stack.Screen name='forgetpassword' component={ForgetPassword} options={{ headerShown: false }} />
              <Stack.Screen name='passwordotp' component={PasswordOtp} options={{ headerShown: false }} />
              <Stack.Screen name='newpassword' component={Newpassword} options={{ headerShown: false }} />
              <Stack.Screen name='changedpassword' component={Changedpassword} options={{ headerShown: false }} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
