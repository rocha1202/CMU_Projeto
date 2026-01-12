import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./context/AuthContext";

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

import ProtectedRoute from "./components/ProtectedRoute";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>

          {/* ROTAS LIVRES */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HomeSemLogin" component={HomeSemLogin} />

          {/* ROTAS PROTEGIDAS */}
          <Stack.Screen
            name="HomeComLogin"
            children={() => (
              <ProtectedRoute>
                <HomeComLogin />
              </ProtectedRoute>
            )}
          />

          <Stack.Screen
            name="Profile"
            children={() => (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )}
          />

          <Stack.Screen
            name="MyActivity"
            children={() => (
              <ProtectedRoute>
                <MyActivity />
              </ProtectedRoute>
            )}
          />

          <Stack.Screen
            name="Notifications"
            children={() => (
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            )}
          />

          <Stack.Screen
            name="Settings"
            children={() => (
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            )}
          />

          <Stack.Screen
            name="ChangePassword"
            children={() => (
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            )}
          />

          <Stack.Screen
            name="ChangePersonalData"
            children={() => (
              <ProtectedRoute>
                <ChangePersonalData />
              </ProtectedRoute>
            )}
          />

          {/* Search pode ser livre */}
          <Stack.Screen name="Search" component={Search} />

        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
