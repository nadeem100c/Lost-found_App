import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { firebase } from '../config'


import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';

const LoginSrc = ({ navigation }) => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            navigation.navigate('Tabs');
        } catch (error) {
            console.warn('Login Error:', error);
            alert(error.message);
        }
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
    const toggelVisiblehandle = () => {
        setPasswordVisible(!passwordVisible);
    }
    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white"
            }}>
            <View>

                <Text style={styles.title}>
                    Welcome back! Glad to
                </Text>
                <Text
                    style={[
                        styles.title2,
                        {
                            alignSelf: "center",
                            fontFamily: "Urbanist_600SemiBold"

                        }]}>
                    see you, Again!
                </Text>
                <View style={styles.input}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.passwordinput}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={!passwordVisible}
                    />
                </View>
                <TouchableOpacity
                    onPress={toggelVisiblehandle}
                >
                    <Image
                        source={require("../assets/showicon.png")}
                        style={{
                            width: 17,
                            height: 11,
                            marginLeft: "80%",
                            bottom: 32
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.forgetpassword}
                    onPress={() => {
                        navigation.navigate("forgetpassword")
                    }}
                >
                    <Text style={{ color: "#6A707C" }}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginbtn2}
                    onPress={() => loginUser(email, password)}
                >
                    <Text style={styles.loginbtn}>
                        Login
                    </Text>
                </TouchableOpacity>

                <View style={styles.Line}>
                    <View style={styles.border}>

                    </View>
                    <Text style={{
                        top: 8,
                        marginHorizontal: 15,
                        color: "#6A707C",
                        fontWeight: "600"
                    }}>
                        Or Login with</Text>
                    <View style={styles.border}>

                    </View>
                </View>

                <View style={styles.socialIcons}>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/Facebookbutton.png")}
                            style={styles.facebookicon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/Googlebutton.png")}
                            style={styles.googleicon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/Applebutton.png")}
                            style={styles.appleicon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.registerbtn}>
                    <Text>
                        Dont have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("registersrc")
                        }}
                    >
                        <Text style={{
                            color: "#9457E0",
                            fontWeight: "700",
                            marginLeft: 5,
                            fontFamily: "Urbanist_700Bold"
                        }}>
                            Register Now
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>

    )
}

export default LoginSrc

const styles = StyleSheet.create({
    backbtn: {
        height: 40,
        width: 40,
        marginTop: "5%",
        marginLeft: '7%'
    },
    title: {
        fontWeight: "600",
        fontSize: 29,
        lineHeight: 28,
        marginTop: 70,
        alignSelf: "center",
        fontFamily: "Urbanist_600SemiBold"
    },
    title2: {
        fontWeight: "600",
        fontSize: 29,
        lineHeight: 28,
        fontFamily: "Urbanist_600SemiBold"
    },
    input: {
        width: '85%',
        height: 56,
        marginTop: 50,
        alignSelf: "center",
        backgroundColor: "#E8ECF4",
        borderRadius: 8,

    },
    passwordinput: {
        width: '85%',
        height: 56,
        marginTop: 15,
        alignSelf: "center",
        backgroundColor: "#E8ECF4",
        borderRadius: 8,
    },
    forgetpassword: {
        alignItems: 'flex-end',
        marginRight: "10%",
        fontFamily: "Urbanist_600SemiBold"
    },
    loginbtn: {
        alignSelf: "center",
        paddingTop: 19,
        color: "white",
        fontWeight: "600",

    },
    Line: {
        flexDirection: "row",
        marginTop: 20,
        alignSelf: "center"
    },
    socialIcons: {
        marginTop: 24,
        flexDirection: "row",
        alignSelf: "center",
    },
    facebookicon: {
        height: 45,
        width: 95,
        margin: 6,
        borderWidth: 1,
        borderColor: "#4092FF",
        borderRadius: 5

    },
    googleicon: {
        height: 45,
        width: 95,
        margin: 6,
        borderWidth: 1,
        borderColor: "#FBBB00",
        borderRadius: 5

    },
    appleicon: {
        height: 45,
        width: 95,
        margin: 6,
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 5
    },
    registerbtn: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 10,
        marginTop: 23
    },
    loginbtn2: {
        marginTop: 32,
        backgroundColor: "#7689D6",
        height: 56,
        width: "85%",
        alignSelf: "center",
        borderRadius: 8
    },
    border: {
        borderBottomWidth: 2,
        width: 90,
        borderColor: "#E8ECF4"
    },
    textinput: {
        paddingTop: 14,
        paddingLeft: 10

    }


}) 