import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'


const UserChating = () => {
    const UserName = "Theresa"
    const navigation = useNavigation()

    const handlebackbtn = () => {
        navigation.goBack()
    }
    const ChatContent = [
        {
            id: 1,
            massage: "Can i come over",
            time: "16,50",
            view: "Read"
        },
        {
            id: 2,
            massage: "Of course, let me know if you're on your way",
            time: "17.46",
            view: "Read"
        }
    ]
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={styles.btnView}>

                <TouchableOpacity onPress={handlebackbtn}>
                    <Image source={require("../assets/backButton.png")} style={styles.backbtn} />
                </TouchableOpacity>
                <Text style={styles.title}>{UserName}</Text>
                <View style={styles.actionbtn}>
                    <TouchableOpacity style={styles.callbtnView}>
                        <Image
                            source={require('../assets/callbtn.png')}
                            style={styles.callbtn}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            {
                ChatContent.map((item) =>
                    <View key={item.id} >
                        <View style={styles.arraycontent}>
                            <Text style={styles.massage}>{item.massage} </Text>
                            <View style={{ flexDirection: "row", paddingRight: 8 }}>
                                <Text style={styles.time}>{item.time} </Text>
                                <Text style={[styles.time, { marginLeft: 5 }]}>{item.view} </Text>
                            </View>
                        </View>
                        
                    </View>
                )
            }

            <View style={{
                flexDirection: "row", position: "absolute", justifyContent: "space-between", bottom: 2
            }}>
                <TouchableOpacity>
                    <Image
                        source={require("../assets/addingIcon.png")}
                        style={styles.addingbtn}
                    />
                </TouchableOpacity>

                <TextInput
                    placeholder="Type your message"
                    style={styles.input}

                />
                <TouchableOpacity>
                    <Image
                        source={require("../assets/sendingbtn.png")}
                        style={styles.sendingbtn}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default UserChating

const styles = StyleSheet.create({
    btnView: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        height: 60,
        borderBottomWidth: 1,
        borderRadius: 8,
        borderColor: "#E8ECF4",





    },
    backbtn: {
        marginTop: 10,
        height: 30,
        width: 30,
        marginTop: 16
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 21,
        marginLeft: 10,
        justifyContent: "center",
        marginTop: 22
    },
    callbtn: {
        height: 20,
        width: 20,
    },
    threedot: {
        height: 24,
        width: 24
    },
    actionbtn: {
        flexDirection: "row",
        position: "absolute",
        right: 15,
        marginTop: 21
    },
    addingbtn: {
        height: 30,
        width: 30
    },
    input: {
        height: 40,
        width: "85%",

    },
    sendingbtn: {
        height: 22,
        width: 25,
    },
    callbtnView: {
        marginRight: 10,
        marginTop: 2
    },
    massage: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "400",
        color: "white"
    },
    arraycontent: {
        marginTop: 20,
        fontSize: 20,
        height: 80,
        width: "50%",
        backgroundColor: "#7689D6",
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderTopLeftRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'flex-end',
        alignContent: "center",
        marginRight: 10,
        marginTop: 100
    },
    time: {
        fontSize: 8, color: "white",

    },
    repled: {
        height: 60,
        width: "90%"
    }
})