import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen'
import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist'

const RegisterScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        Urbanist_300Light,
        Urbanist_400Regular,
        Urbanist_500Medium,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    })

    useEffect(() => {
        SplashScreen.preventAutoHideAsync()
        if (fontsLoaded) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded])
    if (!fontsLoaded) {
        return null
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View>
                <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>
                        Register to Get Started!
                    </Text>
                </View>

                <View style={styles.input1}>
                    <TextInput
                        placeholder='Enter your Username'
                    />
                </View>
                <View style={styles.passwordinput}>
                    <TextInput
                        placeholder='Enter your Email'

                    />

                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder='Enter your password'
                        secureTextEntry
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder='Confirm password'
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginbtn2}
                    onPress={() => {
                        navigation.navigate("Tabs")
                    }}
                >
                    <Text style={styles.loginbtn}>
                        Register
                    </Text>
                </TouchableOpacity>

                <View style={styles.Line}>
                    <View style={styles.line}>

                    </View>
                    <Text style={{
                        top: 9,
                        marginHorizontal: 15,
                        color: "#6A707C",
                        fontWeight: "600",
                        fontFamily: "Urbanist_600SemiBold",
                    }}>
                        Or Login with</Text>
                    <View style={styles.line}>

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
                    <Text style={{ fontFamily: "Urbanist_600SemiBold", }}>
                        Already Have an account?
                    </Text>

                    <TouchableOpacity style={{ marginLeft: 5 }}
                        onPress={() => {
                            navigation.navigate("login")
                        }}
                    >
                        <Text style={{
                            color: "#9457E0",
                            fontWeight: "700",
                            fontFamily: "Urbanist_600SemiBold"
                        }}>
                            Login Now
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>

    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    backbtn: {
        height: 40,
        width: 40,
        marginTop: "5%",
        marginLeft: '7%'
    },
    title: {
        fontWeight: "600",
        fontSize: 20,
        lineHeight: 28,
        marginTop: 87,
        fontFamily: "Urbanist_600SemiBold",

    },
    input: {
        width: '85%',
        height: 43,
        marginTop: 8,
        alignSelf: "center",
        backgroundColor: "#E8ECF4",
        borderRadius: 8,
        justifyContent: "center",
        paddingLeft: 17

    },
    passwordinput: {
        width: '85%',
        height: 43,
        marginTop: 8,
        alignSelf: "center",
        backgroundColor: "#E8ECF4",
        borderRadius: 8,
        justifyContent: "center",
        paddingLeft: 17
    },
    forgetpassword: {
        alignItems: 'flex-end',
        marginRight: "10%"
    },
    loginbtn: {
        alignSelf: "center",
        color: "white",
        fontWeight: "600",
        fontFamily: "Urbanist_600SemiBold",
    },
    Line: {
        flexDirection: "row",
        marginTop: 24,
        alignSelf: "center"
    },
    socialIcons: {
        marginTop: 24,
        flexDirection: "row",
        alignSelf: "center",
    },
    facebookicon: {
        height: 43,
        width: 95,
        margin: 6,
        borderWidth: 1,
        borderColor: "#4092FF",
        borderRadius: 5

    },
    googleicon: {
        height: 43,
        width: 95,
        margin: 6,
        borderColor: "#FBBB00",
        borderRadius: 5,
        borderWidth: 1,

    },
    appleicon: {
        height: 43,
        width: 95,
        margin: 6,
        borderColor: "#000000",
        borderRadius: 5,
        borderWidth: 1,
    },
    registerbtn: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 24,
    },
    loginbtn2: {
        marginTop: 32,
        backgroundColor: "#7689D6",
        height: 43,
        width: "85%",
        alignSelf: "center",
        borderRadius: 8,
        justifyContent: "center",
        paddingLeft: 17
    },
    input1: {
        width: '85%',
        height: 43,
        marginTop: 24,
        alignSelf: "center",
        backgroundColor: "#E8ECF4",
        borderRadius: 8,
        justifyContent: "center",
        paddingLeft: 17,
        fontFamily: "Urbanist_500Medium"
    },
    line: {
        borderBottomWidth: 2,
        width: 90,
        borderColor: "#E8ECF4"
    }


})