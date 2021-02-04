import React from "react"
import {
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   Dimensions,
   SafeAreaView,
} from "react-native"
import { connect } from "react-redux"
import Firebase from "../config/Firebase"
import MapInput from "../components/map/mapInput"
import globalStyles from "../assets/styles/index"
import HeaderNavigation from "../components/utils/HeaderNavigation"
import { Card, Button } from "react-native-elements"
import Ionicons from "react-native-vector-icons/Entypo"

const { width, height } = Dimensions.get("window")
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 1
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Profile extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         search: null,
      }
   }

   handleSignout = () => {
      Firebase.auth().signOut()
      this.props.navigation.navigate("Login")
   }

   getCoordsFromName = async (data) => {
      if (data) {
         this.setState({ search: data })
      }
   }

   addFavourite = async () => {
      const location = {
         lat: this.state.search.geometry["location"].lat,
         lng: this.state.search.geometry["location"].lat,
      }

      // Set read status on notifications against the userId
      firebase
         .database()
         .ref(`favourites/${this.state.search.place_id}/`)
         .update({
            ...this.state.search,
         })
   }

   render() {
      return (
         <View style={globalStyles.wrapperDefault}>
            <View style={globalStyles.containerCenter}>
               <HeaderNavigation />
            </View>
            <MapInput notifyChange={(loc) => this.getCoordsFromName(loc)} />

            {/* <Text>
               Hello
               {this.state.search ? this.state.search.description : null}
            </Text> */}

            {this.state.search && this.state.search.place_id ? (
               <View>
                  <Card title="Address details">
                     <Text>
                        Name:
                        {this.state.search.name}
                     </Text>

                     <Text>
                        Address:
                        {this.state.search.formatted_address}
                     </Text>
                     <Text>
                        Latitude:
                        {this.state.search.geometry["location"].lat}
                     </Text>
                     <Text>
                        Longitude:
                        {this.state.search.geometry["location"].lng}
                     </Text>

                     <Button
                        icon={<Ionicons name="plus" color="#ffffff" />}
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
               </View>
            ) : null}
         </View>
      )
   }
}

const styles = StyleSheet.create({})

const mapStateToProps = (state) => {
   return {
      user: state.user,
   }
}

export default connect(mapStateToProps)(Profile)
