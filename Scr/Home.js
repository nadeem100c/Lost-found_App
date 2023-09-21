import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, Image, TextInput, ScrollView, StyleSheet,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Jewelry from './Jewelry';
import ButtonList from './ButtonList';
import ElectronicsScreen from './ElectronicsScreen';
import GlassesScreen from './GlassesScreen';
import BagsScreen from '../Scr/BagsScreen';
import WelletScreen from '../Scr/WelletScreen';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist'


const Home = () => {
    const [selectedValue, setSelectedValue] = useState('Pakistan');
    const [activeScreen, setActiveScreen] = useState("Electronic");
    const navigation = useNavigation()
    const handleButtonPress = (screenName) => {
        setActiveScreen(screenName);
    };
    const handleValueChange = (itemValue) => {
        setSelectedValue(itemValue);
    };
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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView >
                <Text style={styles.locationtxt}>Location</Text>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ left: 16}}>
                        <Text style={styles.pickerValue} > {selectedValue}</Text>
                    </View>

                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={handleValueChange}
                            mode="dropdown"
                            style={{ fontFamily: "Urbanist_500Medium" }}
                        >
                            <Picker.Item label="Pakistan" value="Pakistan" />
                            <Picker.Item label="China" value="China" />
                            <Picker.Item label="America" value="America" />
                            <Picker.Item label="Africa" value="Africa" />
                            <Picker.Item label="Qatar" value="Qatar" />

                        </Picker>
                    </View>

                    <View style={styles.notificationiconView}>
                        <TouchableOpacity onPress={() => navigation.navigate("notications")}>
                            <Image
                                source={require('../assets/Notification.png')}
                                style={styles.notificationicon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.overlayContainer}
                    onPress={() => navigation.navigate("mapSrc")}
                >
                    <Image
                        source={require('../assets/Locationbtn.png')}
                        style={styles.Mapbtn}
                    />
                </TouchableOpacity  >
                <View style={{ flexDirection: 'row' }}>

                    <TextInput
                        placeholder='Search something here'
                        style={styles.searchbar} />
                    <Image
                        source={require('../assets/Searchicon.png')}
                        style={styles.searbaricon} />
                    <TouchableOpacity onPress={() => navigation.navigate("filters")}>
                        <Image
                            source={require('../assets/Filtericon.png')}
                            style={styles.filtericon} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginLeft: 16, marginTop: 11 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <ButtonList onPress={handleButtonPress} />
                    </ScrollView>
                </View>

                <View style={{ marginLeft: 16, marginTop: 20 }}>
                    {activeScreen === 'Electronic' && <ElectronicsScreen />}
                    {activeScreen === 'jewelry' && <Jewelry />}
                    {activeScreen === 'Bag' && <BagsScreen />}
                    {activeScreen === 'Wellet' && <WelletScreen />}
                    {activeScreen === 'Glasses' && <GlassesScreen />}
                </View>
            </SafeAreaView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    locationtxt: {
        marginLeft: 20,
        color: '#838383',
        fontSize: 12,
        height: 14,
        fontFamily: "Urbanist_600SemiBold"

    },
    notificationicon: {
        height: 21,
        width: 17,
        right: 17,
    },
    searchbar: {
        marginLeft: 16,
        height: 37,
        width: '82%',
        backgroundColor: '#E8ECF4',
        borderRadius: 8,
        paddingLeft: 40,
    },
    searbaricon: {
        height: 14,
        width: 14,
        position: 'absolute',
        left: 38,
        marginTop: 12
    },
    filtericon: {
        width: 39,
        height: 36,
    },
    Electronicsbtn: {
        marginTop: 20,
        marginLeft: 28,
        width: 20
    },
    picker: {
        width: 27,
        marginLeft: "5%",
        position: "relative",
        bottom: 10,
        borderRadius: 10,
        alignSelf: "center"
    },
    pickerValue: {
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "Urbanist_600SemiBold"
    },
    notificationiconView: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 10
    },
    Mapbtn: {
        height: 60,
        width: 60,
        position: 'absolute',
        top: 110,
        left: 20,
        bottom: "15%"
    },
    overlayContainer: {
        position: 'absolute',
        top: 570,
        left: "76%",
        zIndex: 1,
    },
});
