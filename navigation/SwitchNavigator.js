import { createSwitchNavigator, createAppContainer } from "react-navigation"
//import PushNotifications from "../screens/PushNotifications"
import Login from "../screens/Login"
import Signup from "../screens/Signup"
import Profile from "../screens/Profile"

const SwitchNavigator = createSwitchNavigator(
   {
      // PushNotifications: {
      //    screen: PushNotifications,
      // },
      Login: {
         screen: Login,
      },
      Signup: {
         screen: Signup,
      },
      Profile: {
         screen: Profile,
      },
   },
   {
      initialRouteName: "Login",
   }
)

export default createAppContainer(SwitchNavigator)
