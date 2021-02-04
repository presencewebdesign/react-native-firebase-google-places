import React, { Component } from "react"
import { TouchableOpacity, SafeAreaView } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import CONFIG from "../../config/vars"

class MapInput extends Component {
   render() {
      //const homePlace = { description: 'Home', geometry: { location: { lat: 52.631379, lng: 1.296969 } }};

      return (
         <GooglePlacesAutocomplete
            ref={(c) => (this.googlePlacesAutocomplete = c)}
            currentLocation={true}
            //predefinedPlaces={[homePlace]}
            placeholder="Search"
            minLength={2}
            autoFocus={true}
            returnKeyType={"search"}
            listViewDisplayed={"auto"}
            fetchDetails={true}
            onPress={(data, details = null) => {
               this.props.notifyChange(details)
               this.googlePlacesAutocomplete._handleChangeText("")
            }}
            renderRightButton={() => (
               <TouchableOpacity
                  style={{
                     position: "absolute",
                     right: 0,
                     // borderColor: 'red',
                     // borderWidth: 1,
                     padding: 0,
                     width: 50,
                     height: 51,
                  }}
                  onPress={() => {
                     this.googlePlacesAutocomplete._handleChangeText("")
                  }}
               >
                  <Icon
                     name="remove"
                     size={30}
                     style={{
                        color: "lightgrey",
                        position: "absolute",
                        right: 0,
                        top: 2,
                        padding: 10,
                        width: 50,
                     }}
                  />
               </TouchableOpacity>
            )}
            styles={{
               textInputContainer: {
                  width: "100%",
                  height: 55,
                  backgroundColor: "#000",
                  padding: 0,
                  borderTopWidth: 0,
                  borderBottomColor: "#000",
               },
               textInput: {
                  height: 40,
                  color: "#000",
                  fontSize: 18,
                  borderRadius: 0,
               },
               description: {
                  fontWeight: "bold",
               },
               predefinedPlacesDescription: {
                  color: "#000",
               },
            }}
            query={{
               // available options: https://developers.google.com/places/web-service/autocomplete
               key: CONFIG.PLACES_API_KEY,
               components: "country:uk",
               language: "en", // language of the results
            }}
            GooglePlacesSearchQuery={{
               // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
               rankby: "distance",
               types: ["doctor"],
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={200}
         />
      )
   }
}
export default MapInput
