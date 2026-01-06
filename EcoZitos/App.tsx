import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeSemLogin from "./screens/HomeSemLogin";
import HomeComLogin from "./screens/HomeComLogin";
import MyActivity from "./screens/MyActivity";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import ChangePassword from "./screens/ChagePassword";
import ChangePersonalData from "./screens/ChangePersonalData";
import Search from "./screens/Search";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeSemLogin" component={HomeSemLogin} />
        <Stack.Screen name="HomeComLogin" component={HomeComLogin} />
        <Stack.Screen name="MyActivity" component={MyActivity} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ChangePersonalData" component={ChangePersonalData} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
