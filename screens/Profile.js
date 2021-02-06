import React from "react"
import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Dimensions,
   SafeAreaView,
   Linking,
} from "react-native"
import { connect } from "react-redux"
import Firebase from "../config/Firebase"
import MapInput from "../components/map/mapInput"
import globalStyles from "../assets/styles/index"
import HeaderNavigation from "../components/utils/HeaderNavigation"
import { Card, Button, ListItem } from "react-native-elements"
import Ionicons from "react-native-vector-icons/Entypo"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"

const { width, height } = Dimensions.get("window")
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 1
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

class Profile extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         search: null,
         favourites: [],
         region: {},
      }
   }

   componentDidMount = () => {
      this.getData()
   }

   getData = async () => {
      let userId = Firebase.auth().currentUser.uid
      const ArrayData = []
      Firebase.firestore()
         .collection("users")
         .doc(userId)
         .collection("place_id")
         .get()
         .then((snapshot) => {
            snapshot.forEach((doc) => {
               ArrayData.push(doc.data())
            })
         })
         .then(() => {
            this.setState({ favourites: ArrayData })
            console.log(
               "🚀 ~ file: Profile.js ~ line 121 ~ Profile ~ .then ~ ArrayData",
               ArrayData
            )
            this.setState({ search: null })
         })
         .catch((error) => {
            console.error("Error response: ", error)
         })
   }

   handleSignout = () => {
      Firebase.auth().signOut()
      //Firebase.messaging().unsubscribeFromTopic("loggedout")
      this.props.navigation.navigate("Login")
   }

   getCoordsFromName = async (data) => {
      if (data) {
         this.setState({ search: data })
      }
   }

   addFavourite = async () => {
      let userId = Firebase.auth().currentUser.uid

      const addData = {
         lat: this.state.search.geometry["location"].lat,
         lng: this.state.search.geometry["location"].lng,
         ...this.state.search,
      }

      Firebase.firestore()
         .collection("users")
         .doc(userId)
         .collection("place_id")
         .doc(this.state.search.place_id)
         .set(addData)
         .then(() => {
            this.getData()
         })
   }

   render() {
      return (
         <View style={globalStyles.wrapperDefault}>
            <View style={globalStyles.containerCenter}>
               <HeaderNavigation screenProps={this.props} />
            </View>
            <View style={globalStyles.containerCenter}>
               <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />
            </View>

            {this.state.search && this.state.search.place_id ? (
               <SafeAreaView>
                  <Card title="Address details">
                     <Text>
                        Name:
                        {this.state.search.name}
                     </Text>

                     <Text>
                        Address:
                        {this.state.search.formatted_address}
                     </Text>

                     {this.state.search.business_status ? (
                        <Text>
                           Business status:
                           {this.state.search.business_status}
                        </Text>
                     ) : null}

                     {this.state.search.international_phone_number ? (
                        <View>
                           <Text>
                              Phone number:
                              {this.state.search.international_phone_number}
                           </Text>

                           <Button
                              icon={
                                 <Ionicons
                                    style={{
                                       fontSize: 25,
                                       paddingRight: 10,
                                    }}
                                    name="phone"
                                    color="#ffffff"
                                 />
                              }
                              title="Make a call"
                              buttonStyle={{
                                 borderRadius: 0,
                                 marginLeft: 0,
                                 marginRight: 0,
                                 marginBottom: 0,
                                 marginTop: 20,
                                 backgroundColor: "#1A8A3C",
                              }}
                              onPress={() =>
                                 Linking.openURL(
                                    `tel:${this.state.search.international_phone_number}`
                                 )
                              }
                           ></Button>
                        </View>
                     ) : null}

                     {this.state.search && this.state.search.geometry ? (
                        <MapView
                           ref="map"
                           style={styles.mapContainer}
                           provider={PROVIDER_GOOGLE}
                           region={{
                              latitude: this.state.search.geometry["location"]
                                 .lat,
                              longitude: this.state.search.geometry["location"]
                                 .lng,
                              latitudeDelta: LATITUDE_DELTA,
                              longitudeDelta: LATITUDE_DELTA,
                           }}
                        >
                           <Marker
                              coordinate={{
                                 latitude: this.state.search.geometry[
                                    "location"
                                 ].lat,
                                 longitude: this.state.search.geometry[
                                    "location"
                                 ].lng,
                              }}
                              title={this.state.search.name}
                              description={this.state.search.formatted_address}
                           />
                        </MapView>
                     ) : null}

                     <Button
                        icon={
                           <Ionicons
                              style={{
                                 fontSize: 25,
                                 paddingRight: 10,
                              }}
                              name="plus"
                              color="#ffffff"
                           />
                        }
                        title="Add to Favourites"
                        buttonStyle={{
                           borderRadius: 0,
                           marginLeft: 0,
                           marginRight: 0,
                           marginBottom: 0,
                           marginTop: 20,
                        }}
                        onPress={() => {
                           this.addFavourite()
                        }}
                     ></Button>
                  </Card>
               </SafeAreaView>
            ) : null}

            {this.state.favourites && this.state.favourites.length > 0 ? (
               <ScrollView>
                  {this.state.favourites.map((l, i) => (
                     <ListItem
                        rightIcon={{
                           name: "chevron-right",
                           type: "font-awesome",
                        }}
                        subtitle={l.formatted_address}
                        key={i}
                        leftAvatar={{
                           source: { uri: l.icon },
                        }}
                        title={l.name}
                        subtitle={l.subtitle}
                        bottomDivider
                        onPress={() => {
                           Linking.openURL(l.url)
                        }}
                     />
                  ))}
               </ScrollView>
            ) : null}
         </View>
      )
   }
}

const styles = StyleSheet.create({
   mapContainer: {
      marginTop: 20,
      height: 150,
      width: "100%",
      justifyContent: "flex-end",
      alignItems: "center",
   },
})

const mapStateToProps = (state) => {
   return {
      user: state.user,
   }
}

export default connect(mapStateToProps)(Profile)
