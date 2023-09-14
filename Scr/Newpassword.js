import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React ,{useEffect}from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

const Newpassword = () => {
    const navigation = useNavigation();
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

            <View style={styles.txt}>
                <Text style={styles.passwordtxt}> Create New Password</Text>
                <Text style={styles.description}>Your new password must be unique from those </Text>
                <Text style={styles.description2}>previously used.</Text>
            </View>
            <View>
                <TextInput
                    placeholder="New Password"
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    style={styles.input2}
                />
            </View>
            <View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate("changedpassword")}
                >
                    <Text style={styles.btntext}>Reset Password</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default Newpassword

const styles = StyleSheet.create({
    backbtnstyl: {
        marginTop: 20,
        marginLeft: 20,
    },
    backbtn: {
        height: 41,
        width: 41
    },
    txt: {
        marginTop: 34,
        alignItems: "center"
    },
    passwordtxt: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Urbanist_600SemiBold"
    },
    description: {
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 18,
        width: "70%",
        color: "#8391A1",
        fontFamily: "Urbanist_500Medium"
    },
    description2: {
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 18,
        color: "#8391A1",
        fontFamily: "Urbanist_500Medium"

    },
    input: {
        marginLeft: 20,
        height: 50,
        width: "90%",
        borderRadius: 8,
        backgroundColor: "#E8ECF4",
        paddingLeft: 28,
        marginTop: 38
    },
    btn: {
        marginLeft: 20,
        height: 50,
        width: "90%",
        borderRadius: 8,
        backgroundColor: "#7689D6",
        marginTop: 20,
        justifyContent: "center"
    },
    btntext: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Urbanist_600SemiBold"

    },
    input2: {
        marginLeft: 20,
        height: 50,
        width: "90%",
        borderRadius: 8,
        backgroundColor: "#E8ECF4",
        paddingLeft: 28,
        marginTop: 10
    }
})