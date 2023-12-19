import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ScrollView , ActivityIndicator} from 'react-native';
import { firebase } from '../config';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const EditAdScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [updatedItem, setUpdatedItem] = useState({ ...item });
    const [newImages, setNewImages] = useState([null, null, null]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (item.images && item.images.length > 0) {
            const existingImages = item.images.slice(0, 3);
            setNewImages(existingImages);
        }
    }, [item.images]);

    const updateExistingImages = () => {

        setUpdatedItem({ ...updatedItem, images: newImages });
    };

    const handleItemNameChange = (text) => {
        setUpdatedItem({ ...updatedItem, itemName: text });
    };
    const handleDateChange = (text) => {
        const newDate = new Date(text);
        setUpdatedItem({ ...updatedItem, date: newDate });
    };


    const saveItemName = async () => {
        try {
            setLoading(true);
            const imageUrls = await uploadImages(updatedItem.images);
            await firebase.firestore().collection('lostItems').doc(item.id).update({
                itemName: updatedItem.itemName,
                description: updatedItem.description,
                location: updatedItem.location,
                time: updatedItem.time,
                date: updatedItem.date,
                category: updatedItem.category,
                images: imageUrls || [],
            });

            console.log('Item name and images updated successfully');
            setLoading(false);
            navigation.goBack();
        } catch (error) {
            console.error('Error updating item name and images:', error);

        }
    };






    const uploadImages = async (images) => {
        try {
            const imageUrls = [];

            // Loop through the selected images and upload each one to Firebase Storage
            for (let i = 0; i < images.length; i++) {
                const imageUri = images[i];
                const response = await fetch(imageUri);
                const blob = await response.blob();

                // Replace 'images' with your Firebase Storage reference
                const imageRef = firebase.storage().ref().child(`images/${item.id}/${i}`);

                await imageRef.put(blob);

                // Get the download URL for the uploaded image
                const url = await imageRef.getDownloadURL();
                imageUrls.push(url);
            }

            return imageUrls;
        } catch (error) {
            console.error('Error uploading images:', error);
            return [];
        }
    };

    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {

            const selectedImages = result.assets.map((asset) => asset.uri);

            setUpdatedItem({ ...updatedItem, images: selectedImages });
        }
    };
    const handleImageChange = (index, selectedImage) => {
        const updatedImages = [...newImages];
        updatedImages[index] = selectedImage;
        setNewImages(updatedImages);

        const updatedItemImages = updatedImages.filter((image) => image !== null);
        setUpdatedItem({ ...updatedItem, images: updatedItemImages });
    };
    const pickImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleImageChange(index, result.uri);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={styles.title}>Update Post</Text>
            <Text style={styles.txtHeading}>ItemName</Text>
            <TextInput
                value={updatedItem.itemName}
                onChangeText={handleItemNameChange}
                style={styles.searchbar}
            />
            <Text style={styles.txtHeading}>Description</Text>

            <TextInput
                value={updatedItem.description}
                onChangeText={(text) => setUpdatedItem({ ...updatedItem, description: text })}
                multiline
                numberOfLines={4}
                style={styles.searchbar}
            />
            <Text style={styles.txtHeading}>Date</Text>
            <TextInput
                value={updatedItem.date ? updatedItem.date.toDate().toDateString() : ''}
                onChangeText={(text) => {

                }}
                style={styles.searchbar}
                editable={false}
            />

            <Text style={styles.txtHeading}>Time</Text>

            <TextInput
                value={updatedItem.time ? updatedItem.time.toDate().toLocaleTimeString() : ''}
                onChangeText={(text) => {

                }}
                style={styles.searchbar}
                editable={false}
            />
            <Text style={styles.txtHeading}>Category</Text>

            <TextInput
                value={updatedItem.category}
                onChangeText={(text) => setUpdatedItem({ ...updatedItem, category: text })}
                style={styles.searchbar}
            />
            <Text style={styles.txtHeading}>Location</Text>

            <TextInput
                value={updatedItem.location}
                onChangeText={(text) => setUpdatedItem({ ...updatedItem, location: text })}
                style={styles.searchbar}
               
            />

            <View style={{ flexDirection: "row", marginLeft: 23, marginTop: 24 }}>
                {[...newImages, null, null, null].slice(0, 3).map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        style={{ width: '30%', marginRight: 10 }}
                        onPress={() => pickImage(index)}
                    >
                        {image ? (
                            <Image source={{ uri: image }} style={{ width: '100%', height: 100 }} />
                        ) : (
                            <View style={{ backgroundColor: "#E8ECF4", height: 100, justifyContent: "center", alignItems: "center" }}>
                                <Text>Select Image</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={saveItemName} style={styles.savebtn} >
                <Text style={styles.savetxt}>Save Item Name</Text>
            </TouchableOpacity>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </SafeAreaView>
    );
};

export default EditAdScreen;
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 21,
        alignSelf: "center",

    },
    searchbar: {
        marginLeft: 10,
        height: 50,
        width: '88%',
        backgroundColor: '#E8ECF4',
        marginTop: 13,
        borderRadius: 8,
        paddingLeft: 40,
    },
    savebtn: {
        marginTop: 24,
        width: "90%",
        height: 45,
        backgroundColor: "#7689D6",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 8,

    },
    savetxt: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: '600'

    },
    txtHeading: {
        marginLeft: 20,
        fontWeight: "500",
        fontSize: 15,
        color: "#BDBDBD"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    },
})