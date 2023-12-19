import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions, Button, RefreshControl, StyleSheet } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const GlassesSrc = ({ searchQuery, searchType }) => {
  const [data, setData] = useState([]);
  const [recentAds, setRecentAds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;

  const onRefresh = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  useEffect(() => {

  }, [searchQuery]);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      let query = firebase.firestore().collection('lostItems').where('category', '==', 'Glasses').orderBy('date', 'desc');

      if (searchType) {
        query = query.where('type', '==', searchType);
      }

      const querySnapshot = await query.get();
      const items = [];

      querySnapshot.forEach((doc) => {
        const itemData = doc.data();
        if (itemData.images && Array.isArray(itemData.images) && itemData.images.length > 0) {
          const firstImageURL = itemData.images[0];
          items.push({ id: doc.id, ...itemData, firstImageURL });
        } else {
          console.log('No valid images found for this item:', itemData);
        }
      });
 
      setData(items);
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
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
        <Text>Recent Ads</Text>
        <TouchableOpacity onPress={fetchData}>
          <Text>See more</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginBottom: 10 }}>
        <FlatList
          horizontal
          data={recentAds}
          keyExtractor={(item, index) => (item.uid ? item.uid : index.toString())}
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 10 }}>
              <Image
                source={{ uri: item.firstImageURL }}
                style={{ width: windowWidth * 0.5, height: 205, backgroundColor: "red", borderRadius: 8 }}
              />
              <View style={{ position: "absolute", top: 10, left: 10, right: 10 }}>
                <View style={{ alignSelf: "flex-end" }}>
                  <Text style={styles.type}>{item.type}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 120, justifyContent: "space-between" }}>
                  <Text style={{ color: "white", fontWeight: "500", fontSize: 14, lineHeight: 17 }}>
                    {item.category}
                  </Text>
                  <Text style={{ color: "white", fontWeight: "400", fontSize: 12 }}>
                    {formatDate(item.date)}
                  </Text>
                </View>
                <TouchableOpacity style={{
                  borderRadius: 8,
                  backgroundColor: "#7689D6",
                  height: 30,
                  justifyContent: "center",
                }}
                  onPress={() => navigation.navigate("details", { itemDetails: item })}
                >
                  <Text style={{
                    color: "white",
                    textAlign: "center"
                  }}>
                    View details
                  </Text>

                </TouchableOpacity>
              </View>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
          <Text>Lost Items Near Me</Text>
          <TouchableOpacity onPress={fetchData}>
            <Text>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => (item.uid ? item.uid : index.toString())}
          style={{ height: "53%", }}
          renderItem={({ item }) => (
            <View style={{
              marginTop: 15,
              height: 60,
              width: '100%',
              paddingTop: 5,
              backgroundColor: 'white',
              elevation: 5,
              borderRadius: 8,
              paddingHorizontal: 10,
              alignSelf: "center"
            }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.firstImageURL }}
                    style={{ width: 50, height: 50, borderRadius: 8, backgroundColor: "red", justifyContent: "center", marginLeft: 5 }}
                  />
                  <Text style={styles.type2}>
                    {item.type}
                  </Text>
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
              <View style={{ flexDirection: "row", justifyContent: "space-between", bottom: 30 }}>
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
                  <TouchableOpacity
                    onPress={() => navigation.navigate("details", { itemDetails: item })}>
                    <Text>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GlassesSrc;
const styles = StyleSheet.create({
  type: {
    color: 'white',
    fontWeight: '400',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 8,
    textAlign: "center",
    padding: 3
  },
  type2: {
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
