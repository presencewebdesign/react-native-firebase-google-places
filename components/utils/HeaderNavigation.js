import React, { Component } from "react"
import { StyleSheet, Platform, View } from "react-native"
import Ionicons from "react-native-vector-icons/Entypo"
import { Header } from "react-native-elements"
import Firebase from "../../config/Firebase"

export default class BackgroundImage extends Component {
   constructor(props) {
      super(props)
   }

   handleSignout = () => {
      Firebase.auth().signOut()
      this.props.screenProps.navigation.navigate("Login")
   }
   render() {
      return (
         <View style={[styles.container, { backgroundColor: "#000" }]}>
            <Header
               centerComponent={{
                  text: "Search you favourite places",
                  style: {
                     color: "#fff",
                     fontSize: 18,
                     paddingTop: Platform.OS === "ios" ? 20 : 0,
                  },
               }}
               backgroundColor="#000"
               containerStyle={{
                  borderBottomWidth: 0,
                  borderBottomColor: "#003b6f",
                  marginTop: Platform.OS === "ios" ? -10 : -24,
                  marginBottom: Platform.OS === "ios" ? 10 : 0,
                  // height: (Platform.OS === 'ios' && Platform.Version) == 12.0 ? 88 : null
               }}
               rightComponent={
                  <Ionicons
                     onPress={this.handleSignout}
                     name="log-out"
                     type="font-awesome"
                     color="#fff"
                     style={{
                        top: 0,
                        left: 0,
                        fontSize: 28,
                        paddingLeft: 10,
                        paddingRight: 20,
                        paddingTop: Platform.OS === "ios" ? 15 : null,
                     }}
                  />
               }
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "stretch",
      justifyContent: "center",
   },
   backgroundImage: {
      flex: 1,
      width: null,
      height: Platform.isPad ? 400 : 200,
   },
   textStyle: {
      color: "white",
      alignItems: "stretch",
      justifyContent: "center",
      textAlign: "center",
      fontSize: 25,
   },
   overlay: {
      flex: 1,
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
   },
})
