import { StyleSheet, Platform } from "react-native"

export default StyleSheet.create({
   businessStatus: {
      backgroundColor: "red",
      color: "white",
      padding: 2,
      textAlign: "center",
   },

   wrapper: {
      flex: 1,
   },
   container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "stretch",
   },

   contain: {
      position: "relative",
      backgroundColor: "#fff",
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      paddingTop: 0,
      paddingLeft: 15,
      paddingRight: 15,
   },
   containerCenter: {
      flexDirection: "row",
      justifyContent: "center",
   },
})
