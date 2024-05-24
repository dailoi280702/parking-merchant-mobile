import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from "@src/assets";
import AppButton from "@src/components/common/AppButton";
import AppModalMessage from "@src/components/common/AppModalMessage";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectUser } from "@src/store/selectors";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { ticketActions } from "@src/store/slices/ticketSlice";
import { CurrencyHelper, DateTimeHelper } from "@src/utils";
import dayjs from "dayjs";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flexRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const SummaryScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const confirmBooking = async () => {
    const idUser = await AsyncStorage.getItem("idUser");

    const data = {
      vehicleId: bookingState.vehicle?.id,
      userId: userState?.id || idUser,
      parkingSlotId: bookingState.parkingSlot?.id,
      parkingLotId: bookingState.parkingLot?.id,
      timeFrameId: bookingState.timeFrame?.id,
      startTime: dayjs(bookingState.startTime).utc().format(),
      endTime: dayjs(bookingState.endTime).utc().format(),
      total: bookingState.timeFrame?.cost,
    };

    console.log(data);

    dispatch(
      ticketActions.createTicket({
        vehicleId: bookingState.vehicle?.id,
        userId: userState?.id || idUser,
        parkingSlotId: bookingState.parkingSlot?.id,
        parkingLotId: bookingState.parkingLot?.id,
        timeFrameId: bookingState.timeFrame?.id,
        startTime: dayjs(bookingState.startTime).utc().format(),
        endTime: dayjs(bookingState.endTime).utc().format(),
        total: bookingState.timeFrame?.cost,
      }),
    )
      .unwrap()
      .then((res) => {
        dispatch(
          bookingActions.update({
            field: "idTicket",
            value: res.id,
          }),
        );

        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        Alert.prompt("fail", String(err), [
          {
            text: "back to home",
            onPress: () => {
              navigation.naviate("HomeScreen");
            },
          },
        ]);
        console.log(err);
      })
      .finally(() => {
        setVisible(true);
      });
  };

  const navigateNext = (isSuccess: boolean) => {
    setVisible(false);
    if (isSuccess) {
      navigation.navigate("ParkingTicketScreen");
    } else {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Item title={"Parking area"} value={bookingState.parkingLot?.name} />
          <Item title={"Address"} value={bookingState.parkingLot?.address} />
          <Item
            title={"Vehicle"}
            value={`${bookingState.vehicle?.name} (${bookingState.vehicle?.number})`}
          />
          <Item
            title={"Parking spot"}
            value={`${bookingState.blockCode} - ${bookingState.parkingSlot?.name}`}
          />
          <Item
            title={"Date"}
            value={DateTimeHelper.formatDate(bookingState.bookingDate)}
          />
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
        </View>
        <View style={styles.card}>
          <Item
            title={"Amount"}
            value={CurrencyHelper.formatVND(bookingState.timeFrame?.cost)}
          />
          {/* <Item title={"Fees"} value={"20.000 ₫"} /> */}
          <Text style={styles.dash} ellipsizeMode="clip" numberOfLines={1}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - -
          </Text>
          <Item
            title={"Total"}
            value={CurrencyHelper.formatVND(bookingState.timeFrame?.cost)}
          />
        </View>
        <View
          style={[
            styles.card,
            styles.flexRow,
            { alignItems: "center", marginBottom: 60 },
          ]}
        >
          <Image source={Images.Money} style={styles.image} />
          <View style={styles.wrapper}>
            <Text style={styles.cash} numberOfLines={2}>
              Cash
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectPaymentScreen")}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.light.primary,
                  fontWeight: 500,
                }}
              >
                Chanage payment method
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={confirmBooking}>
        <Text style={styles.countinueText}>Book now</Text>
      </AppButton>

      {isVisible && (
        <AppModalMessage
          isVisible={isVisible}
          isSuccess={isSuccess}
          onOk={() => navigateNext(isSuccess)}
          okText={isSuccess ? "View parking ticket" : "Back to home"}
          message={
            isSuccess
              ? "Successfully made ticket"
              : "Something went wrong while booking, maybe the slot was taken, please try again"
          }
        />
      )}
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  card: {
    marginTop: 4,
    marginHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 6,
    paddingVertical: 4,
    // paddingHorizontal: 16,
    shadowColor: "#6F7EC9",
    shadowOffset: {
      width: -1,
      height: -1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 8,
  },
  title: { fontSize: 14, fontWeight: "500", color: Colors.light.subtitle },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "right",
    flex: 1,
  },
  dash: { color: Colors.light.subtitle },
  image: { width: 34, height: 34, marginVertical: 8 },
  wrapper: { flex: 1, marginHorizontal: 16 },
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
  cash: { fontSize: 18, fontWeight: "600", color: Colors.light.text },
});
