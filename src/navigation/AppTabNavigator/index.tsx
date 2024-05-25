import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "@src/constants";
import useColorScheme from "@src/hooks/useColorScheme";
import { HomeIcon, QrCodeIcon } from "react-native-heroicons/outline";
import {
  HomeIcon as HomeIconSolid,
  QrCodeIcon as QrCodeIconSolid,
} from "react-native-heroicons/solid";
import HomeStack from "../Stack/HomeStack";
import { AppTabParams } from "./types";
import QRCode from "@src/screens/QRCode";

const Tab = createBottomTabNavigator<AppTabParams>();

const AppTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].primary,
        tabBarInactiveTintColor: "#90A3BC",
        headerShown: false,
        tabBarLabelStyle: { marginBottom: 6 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, focused }: any) =>
            focused ? (
              <HomeIconSolid color={color} />
            ) : (
              <HomeIcon color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={QRCode}
        options={{
          tabBarIcon: ({ color, focused }: any) =>
            focused ? (
              <QrCodeIcon color={color} />
            ) : (
              <QrCodeIconSolid color={color} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
