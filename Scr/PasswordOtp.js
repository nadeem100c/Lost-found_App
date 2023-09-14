import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
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
const PasswordOtp = () => {

    const [f1, setf1] = useState("")
    const [f2, setf2] = useState("")
    const [f3, setf3] = useState("")
    const [f4, setf4] = useState("")

    const navigation = useNavigation();
    const et1 = useRef()
    const et2 = useRef()
    const et3 = useRef()
    const et4 = useRef()
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
                <Text style={styles.passwordtxt}> OTP Verification</Text>
                <Text style={styles.description}>Enter the verification code we just sent on your</Text>
                <Text style={styles.description2}> email address.</Text>
            </View>
            <View style={styles.boxView}>
                <TextInput
                    keyboardType='number-pad'
                    maxLength={1}
                    ref={et1}
                    value={f1}
                    onChangeText={txt => {
                        setf1(txt)
                        if (txt.length >= 1) {
                            et2.current.focus();
                        }
                    }}
                    style={[styles.box, { borderColor: f1.length >= 1 ? "#7689D6" : "#F7F8F9", backgroundColor: f1.length >= 1 ? "#F7F8F9" : "#E8ECF4", fontFamily: 'Urbanist_700Bold' }]} />

                <TextInput
                    keyboardType='number-pad'
                    maxLength={1}
                    ref={et2}
                    value={f2}
                    onChangeText={txt => {
                        setf2(txt)
                        if (txt.length >= 1) {
                            et3.current.focus();
                        } else if (txt.length < 1) {
                            et1.current.focus()
                        }

                    }}
                    style={[styles.box, { borderColor: f2.length >= 1 ? "#7689D6" : "#F7F8F9", backgroundColor: f2.length >= 1 ? "#F7F8F9" : "#E8ECF4",fontFamily: 'Urbanist_700Bold' }]} />
                <TextInput
                    keyboardType='number-pad'
                    maxLength={1}
                    ref={et3}
                    value={f3}
                    onChangeText={txt => {
                        setf3(txt)
                        if (txt.length >= 1) {
                            et4.current.focus();
                        } else if (txt.length < 1) {
                            et2.current.focus()
                        }
                    }}
                    style={[styles.box, { borderColor: f3.length >= 1 ? "#7689D6" : "#F7F8F9", backgroundColor: f3.length >= 1 ? "#F7F8F9" : "#E8ECF4",fontFamily: 'Urbanist_700Bold' }]} />
                <TextInput
                    keyboardType='number-pad'
                    maxLength={1}
                    ref={et4}
                    value={f4}
                    onChangeText={txt => {
                        setf4(txt)
                        if (txt.length < 1) {
                            et3.current.focus()
                        }
                    }}
                    style={[styles.box, { borderColor: f4.length >= 1 ? "#7689D6" : "#F7F8F9", backgroundColor: f4.length >= 1 ? "#F7F8F9" : "#E8ECF4", fontFamily: 'Urbanist_700Bold' }]} />

            </View>

            <View>
                <TouchableOpacity style={[styles.btn, { backgroundColor: f1 !== "" && f2 !== "" && f3 !== "" && f4 !== "" ? "#7689D6" : "#a1a09f" }]}
                    // disabled={f1 !== "" && f2 !== "" && f3 !== "" && f4 !== "" ? "#7689D6" : "#a1a09f"}
                    onPress={() => navigation.navigate("newpassword")}
                >
                    <Text style={[styles.btntext,]}>Verify Code</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default PasswordOtp
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
        color: "#8391A1",
        alignSelf: "center",
        fontFamily: "Urbanist_500Medium",
        marginTop:10
    },
    description2: {
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 18,
        color: "#8391A1",
        fontFamily: "Urbanist_500Medium",

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
        height: 50,
        width: "85%",
        borderRadius: 8,
        backgroundColor: "#7689D6",
        marginTop: 23,
        justifyContent: "center",
        alignSelf: "center"
    },
    btntext: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "Urbanist_600SemiBold"
    },
    boxView: {
        marginTop: 30,
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",

    },
    box: {
        height: 60,
        width: "20%",
        borderWidth: 0.5,
        borderRadius: 8,
        justifyContent: "space-between",
        marginLeft: 10,
        fontWeight: "700",
        fontSize: 22,
        textAlign: "center"

    }
})