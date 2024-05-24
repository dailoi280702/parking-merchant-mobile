import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import TabBarBooking from "@src/components/BookingHistory/TabBarBooking";
import { Colors } from "@src/constants";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import CanceledBookingScreen from "./CanceledBookingScreen";
import CompletedBookingScreen from "./CompletedBookingScreen";
import OngogingBookingScreen from "./OngogingBookingScreen";
import ScheduledBookingScreen from "./ScheduledBookingScreen";

const Tab = createMaterialTopTabNavigator();

const BookingHistoryScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: Colors.light.background }}
        tabBar={(props: MaterialTopTabBarProps) => <TabBarBooking {...props} />}
        screenOptions={{ lazy: true }}
      >
        <Tab.Screen name="New">
          {(props) => <ScheduledBookingScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Ongoing">
          {(props) => <OngogingBookingScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Completed">
          {(props) => <CompletedBookingScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Cancel">
          {(props) => <CanceledBookingScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BookingHistoryScreen;
