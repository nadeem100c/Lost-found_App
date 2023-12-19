import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import * as SplashScreen from 'expo-splash-screen'
import { firebase } from '../config'
import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist'


const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [fontsLoaded] = useFonts({
        Urbanist_300Light,
        Urbanist_400Regular,
        Urbanist_500Medium,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    })
    const registrationUser = async (email, password, firstName, lastName) => {
        if (!email || !password || !firstName || !lastName) {
            alert("Please fill in all fields");
            return;
        }
        if (password !== confirmedPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            const verificationUrl = "https://my-lost-and-found-5c11c.firebaseapp.com";
            await firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: verificationUrl,
            });

            // Store user data in Firestore 
            await firebase.firestore().collection("UserData")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    firstName,
                    lastName,
                    email,
                    password
                });

            alert("Verification email sent and user registered!");
        } catch (error) {
            alert(error.message);
        }
    };


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
                        style={styles.textinput}
                        placeholder="First Name"
                        onChangeText={(firstName) => setfirstName(firstName)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.passwordinput}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Last Name"
                        onChangeText={(lastName) => setLastName(lastName)}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Password"
                        onChangeText={(password) => setPassword(password)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Confirm Password"
                        onChangeText={(confirmedPassword) => setConfirmedPassword(confirmedPassword)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginbtn2}
                    onPress={() => registrationUser(email, password, firstName, lastName)}
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