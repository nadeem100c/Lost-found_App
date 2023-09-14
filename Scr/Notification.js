import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

const Notification = () => {
    const Array = [
        {
            key: 1,
            ProfileImage: require('../assets/notificationImage.png'),
            notificationtxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            notificationTime: "1m ago."
        },
        {
            key: 2,
            ProfileImage: require('../assets/notificationImage.png'),
            notificationtxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            notificationTime: "1m ago."
        },
        {
            key: 3,
            ProfileImage: require('../assets/notificationImage.png'),
            notificationtxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            notificationTime: "1m ago."
        },
        {
            key: 4,
            ProfileImage: require('../assets/notificationImage.png'),
            notificationtxt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            notificationTime: "1m ago."
        },
    ]

    const NotificationDetails = () => {
        return (
            Array.map((element) => {
                return (
                    <TouchableOpacity key={element.key} style={styles.Container}>
                        <View style={{ flexDirection: "row", marginTop: 5, }}>
                            <Image
                                source={element.ProfileImage}
                                style={styles.ProfileImage}
                            />
                            <Text style={styles.notificationtxt}>{element.notificationtxt}</Text>
                        </View>
                        <View style={{ marginLeft: 25, bottom: 10 }}>
                            <Text style={styles.timetxt}>{element.notificationTime}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        )
    }
    const navigation = useNavigation();

    const hnadlebackbtn = () => {
        navigation.goBack()
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.btnView}>
                <TouchableOpacity onPress={hnadlebackbtn}>
                    <Image source={require("../assets/backbtn.png")} style={styles.backbtn} />
                </TouchableOpacity>
                <Text style={styles.title}>Notification</Text>
            </View>
            <TouchableOpacity style={styles.notification}>

            </TouchableOpacity>
            <NotificationDetails />
        </SafeAreaView>
    )
}

export default Notification  

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
        borderRadius: 8,
        backgroundColor: "#E8ECF4"
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 21,
        alignSelf: "center",
        bottom: 35
    },
    notification: {
        marginTop: 35,
    },
    ProfileImage: {
        height: 28,
        width: 27,
        marginTop: 5,
        marginLeft: 10
    },
    Container: {
        flexDirection: "column",
        height: 50,
        width: '90%',
        alignSelf: "center",
        textAlign: "center",
        backgroundColor: '#E8ECF4',
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2
    },
    notificationtxt: {
        fontSize: 10,
        color: "#1E232C",
        fontWeight: "400",
        lineHeight: 12,
        paddingTop: 5,
        marginLeft: 10
    },
    timetxt: {
        fontSize: 8,
        color: '#6C6C6C',
        fontWeight: "500",
        marginLeft: 20
    }
})