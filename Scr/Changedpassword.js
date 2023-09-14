import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React ,{useEffect}from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'

import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
const Changedpassword = () => {

    const navigation = useNavigation()
    const hnadlebackbtn = () => {
        navigation.goBack()
    }
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
    return (
        <SafeAreaView>
            <View style={styles.backbtnstyl}>
                <TouchableOpacity onPress={hnadlebackbtn}>
                    <Image
                        source={require("../assets/backbtn.png")}
                        style={styles.backbtn}
                    />
                </TouchableOpacity>
            </View>
            <Image
                source={require('../assets/afterchnaged.png')}
                style={styles.img}
            />
            <View style={{ alignSelf: "center", marginTop: 24 }}>
                <Text style={styles.titletxt}>
                    Password Changed!
                </Text>
            </View>
            <View style={{ alignSelf: "center" ,marginTop:8}}>
                <Text style={{ color: "#8391A1" }}>Your password has been changed successfully.</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        navigation.navigate("login")
                    }}
                >
                    <Text style={styles.btntext}> Back to login</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>


    )
}

export default Changedpassword

const styles = StyleSheet.create({
    backbtnstyl: {
        marginTop: 20,
        marginLeft: 20,
    },
    img: {
        height: 185,
        width: 185,
        alignSelf: "center",
        marginTop: 60
    },
    titletxt: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 20,
    },
    btn: {
        marginLeft: 20,
        height: 50,
        width: "90%",
        borderRadius: 8,
        backgroundColor: "#7689D6",
        marginTop: 42,
        justifyContent: "center"
    },
    btntext: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600",
    }
})