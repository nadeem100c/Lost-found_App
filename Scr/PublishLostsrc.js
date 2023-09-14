import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Button, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';


const PublishLostsrc = () => {
    const navigation = useNavigation()
    const [fontsLoaded] = useFonts({
        Urbanist_300Light,
        Urbanist_400Regular,
        Urbanist_500Medium,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    });
    const [images, setImages] = useState([null, null, null]);

    const handlebackbtn = () => {
        navigation.goBack()
    }

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
        }, [fontsLoaded]);

       if (!fontsLoaded) {
          return null;
          }

    const pickImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let newImages = [...images];
            newImages[index] = result.assets[0].uri;
            setImages(newImages);
        }
    }



    return (
        <SafeAreaView>
            <View style={styles.btnView}>
                <TouchableOpacity onPress={handlebackbtn}>
                    <Image source={require("../assets/backbtn.png")} style={styles.backbtn} />
                </TouchableOpacity>
                <Text style={styles.title}>Lost Post</Text>
            </View>

            <View style={styles.categorytxt}>
                <Text style={styles.txt}>Name</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>

                <TextInput
                    placeholder='Enter Lost item Name '
                    style={styles.searchbar}
                />

            </View>
            <View style={styles.descriptionView}>
                <Text style={styles.descriptiontxt}> Description</Text>
                <View style={styles.description}>
                    <TextInput
                        placeholder='Enter Description'
                        multiline
                    />
                </View>
            </View>
            <View
                style={{
                    marginLeft: 23,
                    marginTop: 24
                }}
            >
                <Text style={styles.uploadtxt}>Upload Photos</Text>
            </View>
            <View style={{ marginLeft: 23, marginTop: 24, flexDirection: "row" }}>
                <TouchableOpacity
                    style={styles.uploadicon}
                    onPress={() => pickImage(0)} 
                >
                    {images[0] && <Image source={{ uri: images[0] }} style={styles.uploadimg} />}
                    <Image
                        source={require("../assets/addingIcon.png")}
                        style={styles.addingIconimg}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.uploadicon, { marginLeft: 10 }]}
                    onPress={() => pickImage(1)} 
                >
                    {images[1] && <Image source={{ uri: images[1] }} style={styles.uploadimg} />}
                    <Image
                        source={require("../assets/addingIcon.png")}
                        style={styles.addingIconimg}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.uploadicon, { marginLeft: 10 }]}
                    onPress={() => pickImage(2)} 
                >
                    {images[2] && <Image source={{ uri: images[2] }} style={styles.uploadimg} />}
                    <Image
                        source={require("../assets/addingIcon.png")}
                        style={styles.addingIconimg}
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.nextbtn} onPress={() => navigation.navigate("myads")}>
                <Text style={styles.nexttxt}>Publish</Text>
            </TouchableOpacity>

        </SafeAreaView>


    )
}

export default PublishLostsrc

const styles = StyleSheet.create({
    btnView: {
        marginLeft: 28,
        flexDirection: "row",
        justifyContent: "center",
        flexDirection: "column-reverse"
    },
    backbtn: {
        width: 41,
        height: 41,
        borderWidth: 2,
        borderColor: "#E8ECF4",
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 21,
        alignSelf: "center",
        bottom: 35,
        fontFamily: "Urbanist_600SemiBold"
    },
    categorytxt: {
        marginTop: 30,
        marginLeft: 30
    },
    txt: {
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 14,
        fontFamily: "Urbanist_600SemiBold"
    },
    searchbar: {
        marginLeft: 27,
        height: 40,
        width: '88%',
        backgroundColor: '#E8ECF4',
        marginTop: 13,
        borderRadius: 8,
        paddingLeft: 17,
        fontSize: 12,
        borderColor: '#a4a6a5'
    },
    searbaricon: {
        height: 14,
        width: 14,
        position: 'absolute',
        left: 45,
        marginTop: 24
    },
    descriptionView: {
        marginTop: 24,
        marginLeft: 27,
        fontFamily: "Urbanist_600SemiBold"
    },
    descriptiontxt: {
        fontSize: 12,
        fontWeight: "500",
    },
    description: {
        height: 80,
        width: "95%",
        fontSize: 12,
        backgroundColor: "#E8ECF4",
        marginTop: 13,
        borderRadius: 8,
        paddingLeft: 15,
        paddingBottom: 45,
        borderWidth: 0.5,
        borderColor: '#a4a6a5',
        paddingTop: 10,

    },
    uploadtxt: {
        marginTop: 24,
        marginLeft: 23,
        fontSize: 12,
        fontWeight: "600"
    },
    nextbtn: {
        marginTop: 24,
        width: "85%",
        height: 45,
        backgroundColor: "#7689D6",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    nexttxt: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: '600'
    },
    uploadtxt: {
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 15
    },
    addingIconimg: {
        height: 23,
        width: 23,
        marginLeft: 24

    },
    uploadicon: {
        height: 55,
        width: "20%",
        backgroundColor: "#E8ECF4",
        justifyContent: "center"
    },
    uploadimg: {
        height: 55,
        width: "100%",
        position: "absolute",

    }

})