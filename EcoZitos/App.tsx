import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthProvider } from "./context/AuthContext";

import SplashScreen from "./screens/SplashScreen";
import Onboarding1 from "./screens/Onboarding1";
import Onboarding2 from "./screens/Onboarding2";
import Onboarding3 from "./screens/Onboarding3";

import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

import HomeComLogin from "./screens/HomeComLogin";
import MyActivity from "./screens/MyActivity";
import Notifications from "./screens/Notifications";
import Profile from "./screens/Profile";
import Settings from "./screens/Settings";
import ChangePassword from "./screens/ChagePassword";
import ChangePersonalData from "./screens/ChangePersonalData";
import Search from "./screens/Search";
import ProfileOtherUsers from "./screens/ProfileOtherUsers";
import ChallengeDetails from "./screens/ChallengeDetails";
import ShareChallenge from "screens/ShareChallenge";

import ProtectedRoute from "./components/ProtectedRoute";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* ROTAS LIVRES */}
          {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Onboarding1" component={Onboarding1} />
          <Stack.Screen name="Onboarding2" component={Onboarding2} />
          <Stack.Screen name="Onboarding3" component={Onboarding3} /> */}

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
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
          <Stack.Screen
            name="ChallengeDetails"
            children={() => (
              <ProtectedRoute>
                <ChallengeDetails />
              </ProtectedRoute>
            )}
          />
          <Stack.Screen
            name="ShareChallenge"
            children={() => (
              <ProtectedRoute>
                <ShareChallenge />
              </ProtectedRoute>
            )}
          />
          <Stack.Screen
            name="ProfileOtherUsers"
            children={() => (
              <ProtectedRoute>
                <ProfileOtherUsers />
              </ProtectedRoute>
            )}
          />
          {/* Search pode ser livre ou protegida — deixei livre como no teu fluxo */}
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
