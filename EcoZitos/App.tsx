import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import HomeSemLogin from "./screens/HomeSemLogin";
import HomeComLogin from "./screens/HomeComLogin";
import MyActivity from "./screens/MyActivity";
import Notifications from "./screens/Notifications";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeSemLogin" component={HomeSemLogin} />
        <Stack.Screen name="HomeComLogin" component={HomeComLogin} />
        <Stack.Screen name="MyActivity" component={MyActivity} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
