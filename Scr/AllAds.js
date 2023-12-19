import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions, RefreshControl, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { firebase } from '../config';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen'

import {
    useFonts,
    Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    Raleway_700Bold,
} from '@expo-google-fonts/raleway';
import {
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
} from '@expo-google-fonts/urbanist';


const AllAds = ({ searchQuery, searchType, category }) => {
    const [data, setData] = useState([]);
    const [recentAds, setRecentAds] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);

    const onRefresh = () => {
        fetchData();
    };
    const [fontsLoaded] = useFonts({
        Raleway_400Regular,
        Raleway_500Medium,
        Raleway_600SemiBold,
        Raleway_700Bold,
        Urbanist_300Light,
        Urbanist_400Regular,
        Urbanist_500Medium,
        Urbanist_600SemiBold,
        Urbanist_700Bold,
    });

    useEffect(() => {
        filterData();
    }, [searchQuery, searchType, category, data]);

    useEffect(() => {
        filterData();
    }, [data]);


    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );

    const HandleViewDetails = async (item) => {
        try {

            const userId = item.userId;
            const userDataSnapshot = await firebase.firestore().collection('UserData').doc(userId).get();

            if (userDataSnapshot.exists) {
                const userData = userDataSnapshot.data();
                const userName = `${userData.firstName} ${userData.lastName}`;
                navigation.navigate("details", { itemDetails: item, userName });
            } else {
                console.log('User data not found for userId:', userId);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const fetchData = async () => {
        try {
            setRefreshing(true);
            const querySnapshot = await firebase.firestore().collection('lostItems').orderBy('date', 'desc').get();
            const items = [];
            querySnapshot.forEach((doc) => {
                const itemData = doc.data();
                if (itemData.images && Array.isArray(itemData.images) && itemData.images.length > 0) {
                    const firstImageURL = itemData.images[0];
                    items.push({ id: doc.id, ...itemData, firstImageURL, userId: itemData.userId });
                } else {
                    console.log('No valid images found for this item:', itemData);
                }
            });

            let filteredItems = items;

            if (searchType === 'Lost' || searchType === 'Found') {
                filteredItems = items.filter(item => item.type === searchType);
            }

            if (searchQuery) {
                const trimmedQuery = searchQuery.trim().toLowerCase();
                filteredItems = filteredItems.filter(item =>
                    item.category.toLowerCase().includes(trimmedQuery) ||
                    item.location.toLowerCase().includes(trimmedQuery)
                );
            }

            setData(filteredItems);
            setRecentAds(filteredItems);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    const filterData = () => {
        const trimmedQuery = searchQuery.trim().toLowerCase();
        let filtered = [...data]; // Create a copy of the original data

        if (searchType && category) {
            filtered = filtered.filter(
                item =>
                    item.type === searchType &&
                    (item.category.toLowerCase().includes(trimmedQuery) ||
                        item.type.toLowerCase().includes(searchType) ||
                        item.location.toLowerCase().includes(trimmedQuery))
            );
        } else if (searchType === 'Lost' || searchType === 'Found') {
            filtered = filtered.filter(
                item =>
                    item.type === searchType &&
                    (item.category.toLowerCase().includes(trimmedQuery) ||
                        item.type.toLowerCase().includes(searchType) ||
                        item.location.toLowerCase().includes(trimmedQuery))
            );
        } else {

            filtered = filtered.filter(
                item =>
                    item.category.toLowerCase().includes(trimmedQuery) ||
                    item.location.toLowerCase().includes(trimmedQuery) ||
                    item.type.toLowerCase().includes(trimmedQuery)
            );
        }

        setFilteredData(filtered);
    };


    useEffect(() => {
        filterData();
    }, [searchQuery, searchType, category, data]);

    const formatDate = (date) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date.toDate()).toLocaleDateString(undefined, options);
    };
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
        <View >
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : filteredData.length === 0 ? (
                <Text style={{ fontSize: 18, textAlign: 'center', marginTop: 20 }}>
                    Result not Found
                </Text>

            ) : (
                <React.Fragment>
                    <View style=
                        {{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 2
                        }}
                    >
                        <Text style={{ fontFamily: "Urbanist_600SemiBold" }}>Recent Ads</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("seemore")} style={{ marginRight: 15 }} >
                            <Text style={{ color: "#8391A1", fontFamily: "Raleway_400Regular" }}>See more</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <FlatList
                            horizontal
                            data={filteredData}
                            keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (

                                <View style={{ marginRight: 10 }}>
                                    <ImageBackground
                                        source={{ uri: item.firstImageURL }}
                                        style={{
                                            width: windowWidth * 0.5,
                                            height: 205,
                                            borderRadius: 8,
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                        imageStyle={{ borderRadius: 8 }}>
                                        <Image
                                            source={require('../assets/shadow.png')}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                            }}
                                            resizeMode="cover"
                                        />
                                        <View style=
                                            {{
                                                position: 'absolute',
                                                top: 10,
                                                left: 10,
                                                right: 10
                                            }}>
                                            <View style=
                                                {{
                                                    alignSelf: "flex-end"
                                                }}>
                                                <Text style=
                                                    {{
                                                        color: 'white',
                                                        fontFamily: "Raleway_400Regular",
                                                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                                        borderRadius: 8,
                                                        textAlign: "center",
                                                        padding: 3
                                                    }}>
                                                    {item.type}
                                                </Text>
                                            </View>

                                            <View style=
                                                {{
                                                    flexDirection: 'row',
                                                    marginTop: 120
                                                }}>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontFamily: "Raleway_500Medium",
                                                        fontSize: 14,
                                                        lineHeight: 17,
                                                        bottom: 15
                                                    }}>
                                                    {item.category}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: 'white',
                                                        fontFamily: "Raleway_400Regular",
                                                        fontSize: 10,
                                                        position: "absolute",
                                                        color: '#D7D7D7',
                                                        right: 5,
                                                        bottom: 15
                                                    }}>
                                                    {formatDate(item.date)}
                                                </Text>
                                            </View>
                                            <TouchableOpacity style={{
                                                bottom: 10,
                                                borderRadius: 8,
                                                backgroundColor: "#7689D6",
                                                height: 30,
                                                justifyContent: "center",
                                            }}
                                                onPress={() => HandleViewDetails(item)}
                                            >
                                                <Text style={{
                                                    color: "white",
                                                    textAlign: "center",
                                                    fontFamily: "Urbanist_500Medium"
                                                }}>
                                                    View details
                                                </Text>

                                            </TouchableOpacity>

                                        </View>
                                    </ImageBackground>
                                </View>


                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    </View>





                    <View>
                        <View style=
                            {{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style=
                                {{
                                   fontFamily:"Urbanist_600SemiBold"
                                }}
                            >
                                Lost Items Near Me
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('seemore')}>
                                <Text style={{ marginRight: 15, color: "#8391A1",fontFamily:"Urbanist_400Regular" }}>See more</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: "62%" }}>

                            <FlatList
                                data={filteredData}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => (item.id ? item.id : index.toString())}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{
                                        height: 65,
                                        width: '97%',
                                        paddingTop: 8,
                                        backgroundColor: 'white',
                                        elevation: 5,
                                        borderRadius: 8,
                                        paddingHorizontal: 5,

                                        borderWidth: 1,
                                        borderColor: "#D8D8D8",
                                        marginBottom: 10


                                    }}
                                        onPress={() => HandleViewDetails(item)}
                                    >
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Image
                                                    source={{ uri: item.firstImageURL }}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        borderRadius: 8,
                                                        justifyContent: "center",
                                                        marginLeft: 5
                                                    }}
                                                />
                                                <Text style={styles.type}>
                                                    {item.type}
                                                </Text>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontFamily:"Raleway_500Medium",
                                                    marginLeft: 10
                                                }}>{item.category}</Text>
                                            </View>
                                            <View>
                                                <Text style={{
                                                    color: "#8391A1",
                                                    fontSize:13,
                                                    fontFamily:"Raleway_400Regular"
                                                }}>
                                                    {formatDate(item.date)}</Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: "row",
                                            bottom: 30
                                        }}>
                                            <View style={{
                                                flexDirection: "row",
                                                marginLeft: 60,

                                            }}>
                                                <Image
                                                    source={require('../assets/Location.png')}
                                                    style={{
                                                        height: 11,
                                                        width: 11,
                                                        marginTop: 2,
                                                        marginLeft: 10
                                                    }}
                                                />
                                                <Text style={{
                                                    color: '#1E1F4B',
                                                    fontSize: 10,
                                                    fontFamily:"Raleway_400Regular"
                                                }}>{item.location}</Text>
                                            </View>



                                            <TouchableOpacity
                                                onPress={() => HandleViewDetails(item)}
                                                style={{
                                                    position: "absolute", right: 10
                                                }}
                                            >
                                                <Text style={{ color: '#8391A1', fontFamily:"Raleway_400Regular"}}>View Details</Text>
                                            </TouchableOpacity>



                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>

                    </View>
                </React.Fragment>

            )

            }
        </View>
    );
};

export default AllAds;
const styles = StyleSheet.create({
    type: {
        position: "absolute",
        fontSize: 5,
        marginLeft: "17%",
        marginTop: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        textAlign: "center",
        borderRadius: 8,
        color: "white"
    }
})