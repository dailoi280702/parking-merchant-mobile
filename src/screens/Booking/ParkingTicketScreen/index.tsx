import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectUser } from "@src/store/selectors";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { DateTimeHelper } from "@src/utils";
import { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ClipboardDocumentListIcon } from "react-native-heroicons/outline";

import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import AppQRCode from "@src/components/Booking/QRCode";

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flex}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.value} numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
};

const ParkingTicketScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);
  const ref = useRef(null);

  const navigationHome = () => {
    dispatch(bookingActions.reset());
    navigation.navigate("HomeScreen");
  };

  const captureAndShare = async () => {
    try {
      const uri = await ref.current.capture();
      await shareImage(uri);
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  const shareImage = async (uri: any) => {
    try {
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Share Image",
      });
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText}>Parking ticket</Text>
        </View>
        <TouchableOpacity style={styles.copy} onPress={captureAndShare}>
          <ClipboardDocumentListIcon size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ paddingVertical: 4 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, paddingBottom: 96 }}>
          <View style={styles.card}>
            <Text style={styles.note}>
              Scan this when you are in the parking lot
            </Text>
            <ViewShot ref={ref} options={{ format: "png" }}>
              <View style={styles.imageView}>
                <AppQRCode
                  size={200}
                  content={"parking" + bookingState.idTicket}
                />
              </View>
            </ViewShot>
          </View>

          <Text style={styles.dash} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - -
          </Text>
          <View
            style={[
              styles.card,
              { alignItems: "flex-start", paddingVertical: 8 },
            ]}
          >
            <Item title={"Name"} value={userState?.displayName} />
            <Item
              title={"Parking area"}
              value={bookingState.parkingLot?.name}
            />
            <Text style={styles.address}>
              {bookingState.parkingLot.address}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Item
                  title={"Parking spot"}
                  value={`${bookingState.blockCode} - ${bookingState.parkingSlot.name}`}
                />
                <Item
                  title={"Date"}
                  value={DateTimeHelper.formatDate(bookingState.bookingDate)}
                />
                <Item title={"Phone number"} value={userState?.phoneNumber} />
              </View>
              <View style={{ flex: 1 }}>
                <Item
                  title={"Duration"}
                  value={DateTimeHelper.convertToHour(
                    bookingState.timeFrame?.duration,
                  )}
                />
                <Item
                  title={"Hours"}
                  value={`${DateTimeHelper.formatTime(
                    bookingState.startTime,
                  )} - ${DateTimeHelper.formatTime(bookingState.endTime)}`}
                />
                <Item
                  title={"Vehicle"}
                  value={`${bookingState.vehicle?.name} (${bookingState.vehicle?.number})`}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={navigationHome}>
        <Text style={styles.countinueText}>Back to home</Text>
      </AppButton>
    </SafeAreaView>
  );
};

export default ParkingTicketScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 20,
    color: Colors.light.primary,
    fontWeight: "700",
    textAlign: "center",
  },
  copy: {},
  card: {
    marginHorizontal: 8,
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: "center",
  },
  note: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.subtitle,
    marginBottom: 12,
  },
  code: { width: 180, height: 180 },
  dash: { marginHorizontal: 24 },
  bottom: {
    flexDirection: "row",
  },
  flex: {
    alignItems: "flex-start",
    marginVertical: 8,
  },
  title: { fontSize: 12, fontWeight: "500", color: Colors.light.subtitle },
  value: { fontSize: 16, fontWeight: "600", color: Colors.light.text },
  address: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 12,
  },
  continueButton: {
    marginTop: 12,
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
  },
  countinueText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
  imageView: {
    padding: 12,
    backgroundColor: Colors.light.background,
  },
});
