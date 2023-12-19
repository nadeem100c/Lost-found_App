import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions, } from 'react-native';
import { firebase } from '../config';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SeeMore = () => {
    const [data, setData] = useState([]);
    const [recentAds, setRecentAds] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const windowWidth = Dimensions.get('window').width;


    useEffect(() => {
        fetchData();
    }, []);

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


            setData(items.reverse());


            setRecentAds(items);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date.toDate()).toLocaleDateString(undefined, options);
    };

    return (
        <SafeAreaView>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                    All Ads
                </Text>

            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => (item.id ? item.id : index.toString())}

                renderItem={({ item }) => (
                    <View style={{
                        flex:1,
                        height: 60,
                        width: '96%',
                        paddingTop: 5,
                        backgroundColor: 'white',
                        elevation: 5,
                        borderRadius: 8,
                        paddingHorizontal: 10,
                        alignSelf: "center",
                        marginBottom:10,
                        marginHorizontal:15
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{ uri: item.firstImageURL }}
                                    style={{ width: 50, height: 50, borderRadius: 8, backgroundColor: "red", justifyContent: "center", marginLeft: 5 }}
                                />
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '500',
                                    marginLeft: 10
                                }}>{item.category}</Text>
                            </View>
                            <View>
                                <Text>{formatDate(item.date)}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space between", bottom: 30 }}>
                            <View style={{ flexDirection: "row", marginLeft: 60 }}>
                                <Image
                                    source={require('../assets/Location.png')}
                                    style={{ height: 11, width: 11, marginTop: 2, marginLeft: 10 }}
                                />
                                <Text style={{
                                    color: '#1E1F4B',
                                    fontSize: 10,
                                }}>{item.location}</Text>
                            </View>
                            <View>
                                <View style={{ justifyContent: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => HandleViewDetails(item)}
                                        style={{
                                            marginLeft: "55%"
                                        }}
                                    >
                                        <Text style={{}}>View Details</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )

}

export default SeeMore
