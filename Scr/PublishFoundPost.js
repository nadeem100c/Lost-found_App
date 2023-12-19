import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as SplashScreen from 'expo-splash-screen';
import { firebase } from '../config';
import "firebase/compat/firestore";
import { useFonts, Urbanist_600SemiBold } from '@expo-google-fonts/urbanist';
import "firebase/compat/firestore";
import "firebase/compat/storage";


const PublishLostsrc = ({ route }) => {

    const { selectedTime, selectedDate, searchLocation, category } = route.params;
    const parsedSelectedTime = new Date(selectedTime)
    const parsedSelectedDate = new Date(selectedDate)
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();
    const [fontsLoaded] = useFonts({
        Urbanist_600SemiBold,
    });

    const [images, setImages] = useState([null, null, null]);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');

    const handlebackbtn = () => {
        navigation.goBack();
    }

    const uploadImagesToStorage = async (images) => {
        const storageRef = firebase.storage().ref();
        const imageUrls = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];

            if (image) {
                const response = await fetch(image);
                const blob = await response.blob();
                const imageRef = storageRef.child(`images/${Date.now()}_${i}`);
                await imageRef.put(blob);
                const imageUrl = await imageRef.getDownloadURL();
                imageUrls.push(imageUrl);
            } else {
                imageUrls.push(null); // Handle cases where the image is not selected
            }
        }

        return imageUrls;
    };

    const handlePublish = async () => {
        if (!itemName || !description || !images.some(Boolean)) {
            alert('Please fill in all fields and upload at least one image');
            return;
        }

        const db = firebase.firestore();
        const currentUser = firebase.auth().currentUser;

        if (currentUser) {
            const userUID = currentUser.uid;

            try {
                setLoading(true);
                const imageUrls = await uploadImagesToStorage(images);

                const docRef = await db.collection('lostItems').add({
                    itemName: itemName,
                    description: description,
                    images: imageUrls,
                    time: selectedTime,
                    date: selectedDate,
                    location: searchLocation,
                    category: category,
                    userId: userUID,
                    type: 'Found',
                });

                alert('Item published successfully!');
                setLoading(false);
                navigation.navigate('myads');
            } catch (error) {
                console.error('Error adding item: ', error);
                alert('An error occurred while publishing the item: ' + error.message);
            }
        }
    };



    useEffect(() => {
        SplashScreen.preventAutoHideAsync();

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

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
                    <Image source={require('../assets/backbtn.png')} style={styles.backbtn} />
                </TouchableOpacity>
                <Text style={styles.title}>Found Post</Text>
            </View>

            <View style={styles.categorytxt}>
                <Text style={styles.txt}>Name</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    placeholder="Enter Found item Name"
                    style={styles.searchbar}
                    onChangeText={(text) => setItemName(text)}
                />
            </View>

            <View style={styles.descriptionView}>
                <Text style={styles.descriptiontxt}> Description</Text>
                <View style={styles.description}>
                    <TextInput
                        placeholder="Enter Description"
                        multiline
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>
            </View>

            <View style={{ marginLeft: 23, marginTop: 24 }}>
                <Text style={styles.uploadtxt}>Upload Photos</Text>
            </View>

            <View style={{ marginLeft: 23, marginTop: 24, flexDirection: "row" }}>
                {images.map((image, index) => (
                    <TouchableOpacity
                        style={styles.uploadicon}
                        key={`image_${index}`}
                        onPress={() => pickImage(index)}
                    >
                        {image && <Image source={{ uri: image }} style={styles.uploadimg} />}
                        <Image source={require('../assets/addingIcon.png')} style={styles.addingIconimg} />
                    </TouchableOpacity>
                ))}
            </View>




            <TouchableOpacity style={styles.nextbtn} onPress={handlePublish}>
                <Text style={styles.nexttxt}>Publish</Text>
            </TouchableOpacity>
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </SafeAreaView>
    );
}
export default PublishLostsrc
const styles = StyleSheet.create({
    btnView: {
        marginLeft: 28,
        flexDirection: "row",
        justifyContent: "center",
        flexDirection: "column-reverse",
    },
    backbtn: {
        width: 41,
        height: 41,
        borderWidth: 2,
        borderColor: "#E8ECF4",
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 21,
        alignSelf: "center",
        bottom: 35,
        fontFamily: "Urbanist_600SemiBold",
    },
    categorytxt: {
        marginTop: 30,
        marginLeft: 30,
    },
    txt: {
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 14,
        fontFamily: "Urbanist_600SemiBold",
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
        borderColor: '#a4a6a5',
    },
    searbaricon: {
        height: 14,
        width: 14,
        position: 'absolute',
        left: 45,
        marginTop: 24,
    },
    descriptionView: {
        marginTop: 24,
        marginLeft: 27,
        fontFamily: "Urbanist_600SemiBold",
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
        fontWeight: "600",
    },
    nextbtn: {
        marginTop: 24,
        width: "85%",
        height: 45,
        backgroundColor: "#7689D6",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    nexttxt: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: '600',
    },
    addingIconimg: {
        height: 23,
        width: 23,
        marginLeft: 24,
    },
    uploadicon: {
        height: 55,
        width: "20%",
        backgroundColor: "#E8ECF4",
        justifyContent: "center",
    },
    uploadimg: {
        height: 55,
        width: "100%",
        position: "absolute",
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
});
