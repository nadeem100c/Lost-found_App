import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Jewelry from './Jewelry';
import ButtonList from './ButtonList';
import AllAds from './AllAds.js';
import ElectronicsScreen from './ElectronicsScreen';
import GlassesScreen from './GlassesScreen';
import BagsScreen from '../Scr/BagsScreen';
import WelletScreen from '../Scr/WelletScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { firebase } from '../config.js';

import {
    useFonts,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist'


const Home = ({ route }) => {
    const [country, setCountry] = useState({});
    const { searchType, category, location } = route.params || {};
    const [activeScreen, setActiveScreen] = useState("AllAds");
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [fetchedItems, setFetchedItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);



    const navigation = useNavigation()

    const handleButtonPress = (screenName) => {
        setActiveScreen(screenName);
    };

    const [fontsLoaded] = useFonts({
        Urbanist_300Light,
        Urbanist_400Regular,
        Urbanist_500Medium,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    });
    useEffect(() => {

        const fetchData = async () => {
            console.log('Received category:', category);
            console.log('Received location:', location);
            try {
                let collectionRef;
                if (searchType === 'Lost' || searchType === 'Found') {

                    collectionRef = firebase
                        .firestore().collection('lostItems').where('type', '==', searchType);
                } else {

                    collectionRef = firebase.firestore().collection('lostItems');
                }

                const snapshot = await collectionRef.get();
                const items = [];
                snapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });

                setFetchedItems(items);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [searchType]);

    useEffect(() => {
        if (searchType) {
            switch (searchType.toLowerCase()) {
                case 'electronics':
                    setActiveScreen('Electronic');
                    break;
                case 'bags':
                    setActiveScreen('Bag');
                    break;
                case 'wallet':
                    setActiveScreen('Wellet');
                    break;
                case 'glasses':
                    setActiveScreen('Glasses');
                    break;
                default:
                    setActiveScreen('AllAds');
                    break;
            }
        }

        if (category) {
            switch (category.toLowerCase()) {
                case 'bag':
                    setActiveScreen('Bag');
                    break;
                case 'wallet':
                    setActiveScreen('Wellet');
                    break;
                case 'electronic':
                    setActiveScreen('Electronic');
                    break;
                case 'jewelry':
                    setActiveScreen('jewelry');
                    break;
                case 'glasses':
                    setActiveScreen('Glasses');
                    break;
                default:
                    setActiveScreen('AllAds');
                    break;
            }
        }
    }, [searchType, category]);


    useEffect(() => {
        SplashScreen.preventAutoHideAsync();

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    const handleSearch = () => {
        if (searchQuery.trim().length > 0) {
            if (activeScreen === 'AllAds') {
            } else if (activeScreen === 'Electronic') {

            } else if (activeScreen === 'jewelry') {

            } else if (activeScreen === 'Wellet') {

            } else if (activeScreen === 'Bag') {

            } else if (activeScreen === 'Glasses') {

            }

        } else {
            setActiveScreen('AllAds');
        }
    };

    const onSelectCountry = (selectedCountry) => {
        setCountry(selectedCountry);
        setModalVisible(false);
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SafeAreaView >
                <Text style={styles.locationtxt}>Location</Text>
                <View style={{ flexDirection: 'row', }}>
                    <View style={{ marginLeft: 20, marginVertical: 5, flexDirection: "row" }}>
                        <CountryPicker
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            withCountryNameButton
                            onSelect={onSelectCountry}
                            countryCode={country.cca2}
                            withFlagButton={false}
                            withFilter
                            withAlphaFilter
                            translation='eng'
                            closeable
                        />
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={{ fontSize: 20, fontWeight: "600" }}>{country.name}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={{ marginLeft: "5%", }}
                        >
                            <Image
                                source={require('../assets/drop.png')}
                                style={{ height: 20, width: 20, marginTop: 7, bottom: 6 }}
                            />
                        </TouchableOpacity>
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

                <View style={{ flexDirection: 'row' }}>

                    <TextInput
                        placeholder='Search something here'
                        style={styles.searchbar}
                        onChangeText={(text) => setSearchQuery(text)}
                        value={searchQuery}
                        returnKeyType='search'
                        onSubmitEditing={handleSearch}
                    />

                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={{ width: 5 }}>
                            <Image
                                source={require('../assets/crossicon.png')}
                                style={styles.clearIcon}
                            />
                        </TouchableOpacity>
                    )}
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
                        <ButtonList onPress={handleButtonPress} searchType={searchType} category={category} activeScreen={activeScreen} />
                    </ScrollView>

                </View>

                <View style={{ marginLeft: 16, marginTop: 20 }}>
                    {activeScreen === 'AllAds' && <AllAds searchQuery={searchQuery} searchType={searchType} category={category} />}
                    {activeScreen === 'Electronic' && <ElectronicsScreen searchQuery={searchQuery} searchType={searchType} />}
                    {activeScreen === 'jewelry' && <Jewelry searchQuery={searchQuery} searchType={searchType} />}
                    {activeScreen === 'Bag' && <BagsScreen searchQuery={searchQuery} searchType={searchType} />}
                    {activeScreen === 'Wellet' && <WelletScreen searchQuery={searchQuery} searchType={searchType} />}
                    {activeScreen === 'Glasses' && <GlassesScreen searchQuery={searchQuery} searchType={searchType} />}
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

    },
    Mapbtn: {
        height: 60,
        width: 60,
    },
    overlayContainer: {
        alignSelf: "baseline",
        zIndex: 1,

    },
    clearIcon: {
        height: 16,
        width: 16,
        right: 20,
        marginTop: 10
    },
    modalContainer: {

    },
    modalContent: {

    },
    modal: {

    },
    countryPickerButton: {


    },
});
