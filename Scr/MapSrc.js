import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const MapSrc = () => {
    const navigation = useNavigation();

    const [ShowData, setShowData] = useState(false);
    const [SelectedItem, setSelectedItem] = useState(null);

    const LostItem = [
        {
            id: 1,
            imagepath1: require('../assets/Glasses.png'),
            Title: "Glasses",
            date: "12 April 2023 , 2:14 AM",
            Location: "8 min",
            imagepath: require('../assets/vahical.png'),
        },

    ];

    const hnadlebackbtn = () => {
        navigation.goBack();
    };

    const handleMarkerData = (item) => {
        setSelectedItem(item);
        setShowData(true);
    };

    const DefaultLocation = {
        latitude: 31.470694920060218,
        longitude: 74.272284251686,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const Marker1 = {
        latitude: 31.467829765678456,
        longitude: 74.26662061020231,
    };

    const RenderLostItem = ({ item }) => {
        return (
            <View style={styles.LostListView}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={item.imagepath1} style={styles.ItemImage} />
                    <View>
                        <Text style={styles.itemTitle}>{item.Title}</Text>
                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <Image source={item.imagepath} style={styles.LocationImg} />
                            <Text style={styles.itemDate}>{item.date}</Text>
                        </View>
                        <Text style={styles.Locationtxt}>{item.Location}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.detailsView}>
                    <Text style={styles.detailbtb}>View Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.backbtnstyl}>
                <TouchableOpacity onPress={hnadlebackbtn}>
                    <Image
                        source={require("../assets/backbtn.png")}
                        style={styles.backbtn}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', position: "absolute", marginTop: 75,  }}>
                <TextInput
                    placeholder='Search something here'
                    style={styles.searchbar}
                />
                <Image
                    source={require('../assets/Searchicon.png')}
                    style={styles.searbaricon}
                />
                <TouchableOpacity onPress={() => navigation.navigate("filters")}>
                    <Image
                        source={require('../assets/Filtericon.png')}
                        style={styles.filtericon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={DefaultLocation}
                >
                    <Marker
                        style={styles.marker}
                        coordinate={Marker1}
                        onPress={() => handleMarkerData(LostItem[0])}
                    >
                        {ShowData && SelectedItem && SelectedItem.id === LostItem[0].id && (
                            <Callout style={styles.callout}>
                                <ScrollView>
                                    <RenderLostItem item={SelectedItem} />
                                    {/* Add more items as needed */}
                                </ScrollView>
                            </Callout>
                        )}
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/pinIcon.png")}
                                style={{ height: 75, width: 56 }}
                            />
                        </TouchableOpacity>
                    </Marker>
                </MapView>
            </View>
        </SafeAreaView>
    );
};

export default MapSrc;


const styles = StyleSheet.create({
    backbtnstyl: {
        marginLeft: 20,
        position: "absolute"
        , marginTop: 40, zIndex: 1
    },
    backbtn: {
        height: 41,
        width: 41
    },
    searchbar: {
        marginLeft: 27,
        height: 37,
        width: '80%',
        backgroundColor: '#E8ECF4',
        borderRadius: 8,
        paddingLeft: 40,
        marginTop: 20,
    },
    searbaricon: {
        height: 14,
        width: 14,
        position: 'absolute',
        left: 45,
        marginTop: 32,
    },
    filtericon: {
        width: 39,
        height: 36,
        marginTop: 20,
    },
    mapContainer: {
        flex: 1,
    },
    marker: {
        justifyContent: "center"
    },
    map: {
        flex: 1,
        height: '100%',
        width: '100%',
    },
    itemContainer: {
        padding: 5,
        borderBottomColor: '#E0E0E0',
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 8,
    },
    image2: {
        width: "100%",
        height: "100%",
        position: "absolute",
        borderRadius: 8
    },
    title: {
        fontSize: 16,
        position: "absolute",
        color: "#FFFFFF",
        fontWeight: "500",
        lineHeight: 16,
        left: 10,
        bottom: 45

    },
    type: {
        fontSize: 14,
        color: '#858585',
        position: "absolute",
        backgroundColor: "#D7D7D7",
        width: 45,
        height: 25,
        borderRadius: 8,
        paddingLeft: 8,
        right: 12,
        top: 12,
        paddingTop: 3

    },
    date: {
        fontSize: 12,
        color: '#D7D7D7',
        position: "absolute",
        right: 9,
        bottom: 45
    },
    detailsbtn: {
        position: "absolute",
        backgroundColor: "#7689D6",
        height: 33,
        width: "91%",
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        left: 8,
        bottom: 9
    },
    heading: {
        fontSize: 12,
        fontWeight: "600",
    },
    LostListView: {
        flexDirection: "column",
        height: 75,
        width: 230,
        borderRadius: 8,
        borderColor: "#E8ECF4",
        backgroundColor: "white",
        elevation: 3,
        backgroundColor: "#FFFFFF",
    },
    ItemImage: {
        height: 71,
        width: 56,
        borderRadius: 8,
        marginLeft: 30,
        borderWidth:3,
        backgroundColor:"red",
        bottom:10,
    },
    itemTitle: {
        marginLeft: 10,
        fontSize: 10,
        fontWeight: "500",
        position: "absolute",
        width:50
    },
    itemDate: {
        position: "absolute",
        color: "#8391A1",
        fontSize: 10,
        fontWeight: "400",
        marginLeft: 15,
        width: 130,
    },
    detailbtb: {
        color: "white",
        fontSize: 10,
        fontWeight: "400",
        textAlign:"center",
        paddingTop:2
    },
    Mapbtn: {
        height: 60,
        width: 60,
    },
    LocationImg: {
        height: 12,
        width: 12,
        marginLeft: 10
    },
    detailsView: {
        backgroundColor: "#7689D6",
        width: 100,
        height: 20,
        marginLeft: 10,
        borderRadius: 8,
        alignSelf:"center",
        bottom:25

    },
    Locationtxt: {
        marginTop: 10,
        bottom: 10,
        marginLeft: 15,
        fontSize:10,
        fontWeight:"400",
    },
    callout: {
        width: 250,
        borderRadius: 8,
        maxHeight: 300,
    },
});
