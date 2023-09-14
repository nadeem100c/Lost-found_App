import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const AddPost = () => {
  const [selectdbtn, setSelectbtn] = useState(0)
  const navigation = useNavigation();
  const handlebackbtn = () => {
    navigation.goBack()
  }

  const Found = () => {
    setSelectbtn(1)
    navigation.navigate("foundad")
  }

  const Lost = () => {
    setSelectbtn(0)
    navigation.navigate("lostad")

  }
  return (
    <SafeAreaView >
      <View style={styles.btnView}>
        <TouchableOpacity onPress={handlebackbtn}>
        <Image source={require("../assets/backbtn.png")} style={styles.backbtn} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Post</Text>
      </View>

      <View style={styles.description}>
        <Text style={{ color: "#8391A1" }}>What kind of Post you want to Add?</Text>
      </View>

      <View style={styles.bothbtn}>
        <TouchableOpacity style={[styles.lost, { backgroundColor: selectdbtn == 0 ? "#7689D6" : "#faf9f5", borderColor: selectdbtn == 0 ? "#7689D6" : "#E8ECF4" }]}
          onPress={Lost}
          >
          <Text style={[styles.txt, { color: selectdbtn == 0 ? "white" : "#9c9a97" }]}>Lost</Text>

        </TouchableOpacity>

        <TouchableOpacity style={[styles.lost, { backgroundColor: selectdbtn == 1 ? "#7689D6" : "#faf9f5", borderColor: selectdbtn == 1 ? "#7689D6" : "#E8ECF4" }]}
          onPress={Found}
          >
          <Text style={[styles.txt, { color: selectdbtn == 1 ? "white" : "#9c9a97" }]}>Found</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default AddPost

const styles = StyleSheet.create({
  btnView: {
    marginLeft: 28,
    flexDirection: "row",
    justifyContent: "center",
    flexDirection: "column-reverse"
  },
  backbtn: {
    width: 41,
    height: 41
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 21,
    alignSelf: "center",
    bottom: 35
  },
  description: {
    alignSelf: "center",
    marginTop: 90,
    fontWeight: "500",
    fontSize: 16

  },
  bothbtn: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 24,

  },
  lost: {
    height: 42,
    width: '30%',
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 8,
    borderColor: "#8391A1",
  },
  txt: {
    color: "8391A1"
  }
})