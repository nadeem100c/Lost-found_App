import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView, Dimensions } from 'react-native'
import React ,{useEffect}from 'react'
import * as SplashScreen from 'expo-splash-screen'
import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';
const Lostproduct = () => {
    const LostItem = [
        {
            id: 1,
            imagepath1: require('../assets/Glasses.png'),
            Title: "Glasses",
            imagepath2: require('../assets/editicon.png'),
            imagepath: require('../assets/deleteicon.png'),
            locationImg: require('../assets/Location.png'),
            timedate: "12 April 2023 , 2:14 Am",
            Location: "Lahore, Pakistan",
        },
        {
            id: 2,
            imagepath1: require('../assets/Glasses.png'),
            Title: "Glasses",
            imagepath2: require('../assets/editicon.png'),
            imagepath: require('../assets/deleteicon.png'),
            locationImg: require('../assets/Location.png'),
            timedate: "12 April 2023 , 2:14 Am",
            Location: "Lahore, Pakistan",
        },
        {
            id: 3,
            imagepath1: require('../assets/Glasses.png'),
            Title: "Glasses",
            imagepath2: require('../assets/editicon.png'),
            imagepath: require('../assets/deleteicon.png'),
            locationImg: require('../assets/Location.png'),
            timedate: "12 April 2023 , 2:14 Am",
            Location: "Lahore, Pakistan",
        },
        {
            id: 4,
            imagepath1: require('../assets/Glasses.png'),
            Title: "Glasses",
            imagepath2: require('../assets/editicon.png'),
            imagepath: require('../assets/deleteicon.png'),
            locationImg: require('../assets/Location.png'),
            timedate: "12 April 2023 , 2:14 Am",
            Location: "Lahore, Pakistan",
        },
    ];
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

    const RenderLostItem = ({ item }) => {
        return (

            <View style={styles.mainView}>
                <Image source={item.imagepath1} style={styles.productimg} />
                <Text style={styles.title}>{item.Title}</Text>
                <Image source={item.imagepath2} style={[styles.deleticon, { marginRight: 15, width: 20, marginTop: 2 }]} />
                <Image source={item.imagepath} style={styles.deleticon} />

                <View style={{ flexDirection: "column", top: 25, right: 50 }}>
                    <Text style={styles.timedate}>{item.timedate}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={item.locationImg} style={styles.locationimg} />
                        <Text style={styles.timedate}>{item.Location}</Text>
                    </View>

                </View>

            </View>


        )
    }
    return (
        <View>
            <FlatList
                data={LostItem}
                keyExtractor={(item) => item.id.toString()} // Convert id to string
                renderItem={RenderLostItem}
            />
        </View>
    )
}

export default Lostproduct

const styles = StyleSheet.create({
    header: {
        height: 60,
        width: "100%",
        backgroundColor: 'white',
        borderTopStartRadius: 8,
        borderTopRightRadius: 8,
        justifyContent: "center",
        borderBottomWidth: 3,
        borderColor: "#e1ebe4"

    },
    headertxt: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "600",
    },
    mainView: {
        flex: 1,
        marginTop: 15,
        alignSelf: "center",
        height: 77,
        width: "90%",
        flexDirection: "row",
        paddingTop: 5,
        backgroundColor: "white",
        elevation: 3,
        borderRadius: 8,

    },
    productimg: {
        height: 66,
        width: 62,
        borderRadius: 8,
        marginLeft: 10,

    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
        fontFamily:'Urbanist_500Medium'
    },
    deleticon: {
        height: 15,
        width: 15,
        right: 8,
        position: "absolute",

    },
    locationimg: {
        height: 11,
        width: 11
    },
    timedate: {
        fontSize: 8,
        color: "#1E1F4B",
        fontFamily:'Urbanist_400Regular'
    },
    bothbtn: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 24,
    }
})