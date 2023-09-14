import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Lostad = (time) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');



    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setSelectedDate(date)
        hideDatePicker();
    };


    const navigation = useNavigation()
    const handlebackbtn = () => {
        navigation.goBack()
    }
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirmTime = (time) => {
        setSelectedTime(time)
        hideTimePicker();
    };

    return (
        <SafeAreaView>
            <View style={styles.btnView}>
                <TouchableOpacity onPress={handlebackbtn}>
                    <Image source={require("../assets/backbtn.png")} style={styles.backbtn} />
                </TouchableOpacity>
                <Text style={styles.title}>Lost Post</Text>
            </View>

            <View style={styles.categorytxt}>
                <Text style={styles.txt}>Category</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>

                <TextInput
                    placeholder='Search Category'
                    style={styles.searchbar}
                />
                <Image
                    source={require('../assets/Searchicon.png')}
                    style={styles.searbaricon}
                />
            </View>

            <View style={styles.categorytxt}>
                <Text style={styles.txt}>Location</Text>
            </View>

            <View style={{ flexDirection: 'row' }}>

                <TextInput
                    placeholder='Search Location'
                    style={styles.searchbar}
                />
                <Image
                    source={require('../assets/Searchicon.png')}
                    style={styles.searbaricon}
                />
            </View>

            <View style={styles.datetime}>
                <View style={{ alignItems: "center" }}>
                    <Text style={[styles.txt, {}]}>Date Lost</Text>
                </View>

                <View style={{ width: "50%" }}>
                    <Text style={[styles.txt]}>Time Lost</Text>
                </View>
            </View>

            <View style={styles.boxContainer}>
                <View style={styles.boxContainer}>
                    <TouchableOpacity style={styles.datebox}
                        onPress={showDatePicker}
                    >
                        <Image source={require("../assets/calendar.png")}
                            style={styles.calenderimg}
                        />
                        <Text style={styles.boxtxt}>{selectedDate ? selectedDate.toDateString() : 'Select Date'}</Text>
                        <Image source={require("../assets/dropdown.png")}
                            style={styles.dropdown} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.datebox}
                        onPress={showTimePicker}
                    >
                        <Image source={require("../assets/time.png")}
                            style={styles.calenderimg}
                        />
                        <Text style={styles.boxtxt}>{selectedTime ? selectedTime.toLocaleTimeString() : "Select Time"}</Text>
                        <Image source={require("../assets/dropdown.png")}
                            style={styles.dropdown} />
                    </TouchableOpacity>
                </View>



            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />
            <TouchableOpacity style={styles.nextbtn} onPress={() => navigation.navigate("publishLost")}>
                <Text style={styles.nexttxt}>Next</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Lostad

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
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 21,
        alignSelf: "center",
        bottom: 35
    },
    categorytxt: {
        marginTop: 30,
        marginLeft: 30
    },
    txt: {
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 14
    },
    searchbar: {
        marginLeft: 27,
        height: 37,
        width: '88%',
        backgroundColor: '#E8ECF4',
        marginTop: 13,
        borderRadius: 8,
        paddingLeft: 40,
    },
    searbaricon: {
        height: 14,
        width: 14,
        position: 'absolute',
        left: 45,
        marginTop: 24
    },
    datetime: {
        marginTop: 30,
        marginLeft: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    datebox: {
        height: 40,
        width: '47%',
        backgroundColor: "#E8ECF4",
        borderRadius: 8,
        justifyContent: "center"
    },
    boxContainer: {
        marginLeft: 15,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    calenderimg: {
        height: 14,
        width: 14,
        position: "absolute",
        marginLeft: 10,
    },
    boxtxt: {
        // marginLeft:30,
        fontSize: 12,
        color: "#8391A1",
        textAlign: "center"
    },
    dropdown: {
        height: 6,
        width: 10,
        position: "absolute",
        right: 10
    },
    nextbtn: {
        marginTop: 24,
        width: "90%",
        height: 45,
        backgroundColor: "#7689D6",
        alignSelf: "center",
        justifyContent: "center",
        borderRadius: 8
    },
    nexttxt: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: '600'

    }
})