import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { CurrencyHelper, DateTimeHelper } from "@src/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParams } from "@src/navigation/AppNavigator/types";
import { ticketApi } from "@src/api";
import { Spinner } from "@nghinv/react-native-loading";
import { Images } from "@src/assets";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/selectors";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = NativeStackScreenProps<AppStackParams, "Reservation">;

const Item = ({ title, value }: { title: string; value: string }) => {
  return (
    <View style={styles.flexRow}>
      <Text style={[styles.title, { marginRight: 4 }]}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const ParkingReservationDetail = (props: Props) => {
  const [reservation, setReservation] = useState<Ticket>(null);
  const routeData = props.route.params;
  const userState = useAppSelector(selectUser);

  const checkOut = async (idTicket: string) => {
    try {
      const lateTime = dayjs(reservation.endTime)
        .add(10, "minute")
        .isBefore(new Date());
      const isCheckOut = await ticketApi.procedure(idTicket, "check_out");
      if (lateTime && isCheckOut.data.data) {
        Alert.alert("You are late!");
      }
      if (isCheckOut.data.data) {
        Alert.alert("Check out successfully!");
        props.navigation.navigate("App");
      } else {
        Alert.alert("Error!");
        props.navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Fail");
      props.navigation.goBack();
    }
  };

  const checkIn = async (idTicket: string) => {
    try {
      const res = await ticketApi.procedure(idTicket, "check_in");
      if (res.data.data) {
        Alert.alert("Check in successfully!");
        props.navigation.navigate("App");
      } else {
        Alert.alert(`${res.data.message}`);
        props.navigation.goBack();
      }
    } catch (error) {
      Alert.alert("Fail");
      props.navigation.goBack();
    }
  };

  const procedure = () => {
    console.log(`${reservation.state}`);
    if (reservation.state == "new") {
      checkIn(reservation.id);
    } else if ((reservation.state = "ongoing")) {
      checkOut(reservation.id);
    } else {
      Alert.alert("Ticket is expired");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await ticketApi.getOneWithExtend(routeData.ticketId);
        console.log(res);

        if (!res.data) {
          Alert.alert(`${res}`);
          props.navigation.goBack();
          return;
        }

        const data = res.data;
        setReservation(data);
        console.log(userState.companyID);
        if (data.state == "completed" || data.state == "cancel") {
          Alert.alert("QR code expired!");
          Spinner.hide();
          if (props.navigation.canGoBack()) {
            props.navigation.goBack();
          }
        }
      } catch (error) {
        console.log(error);
        Alert.alert(JSON.stringify(error));
        props.navigation.goBack();
      } finally {
        Spinner.hide();
      }
    })();
  }, []);

  return (
    <>
      {!reservation && Spinner.show()}
      {reservation && (
        <SafeAreaView style={{ flex: 1, paddingBottom: 20 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.headerText}>Parking ticket</Text>
            <View style={styles.card}>
              <Item
                title={"Parking area"}
                value={reservation?.parkingLot.name}
              />
              <Item title={"Address"} value={reservation?.parkingLot.address} />
              <Item
                title={"Vehicle"}
                value={`${reservation?.vehicle?.name} (${reservation?.vehicle?.number})`}
              />
              <Item
                title={"Parking spot"}
                value={`${reservation?.parkingSlot.block.code} - ${reservation?.parkingSlot?.name}`}
              />
              <Item
                title={"Date"}
                value={DateTimeHelper.formatDate(reservation?.startTime)}
              />
              <Item
                title={"Hours"}
                value={
                  dayjs(reservation?.startTime).format("HH:mm") +
                  " - " +
                  dayjs(reservation?.endTime).format("HH:mm")
                }
              />
              <FlatList
                data={reservation.ticketExtend}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => (
                  <>
                    <Text
                      style={styles.dash}
                      ellipsizeMode="clip"
                      numberOfLines={1}
                    >
                      - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                      - - - - - - - - - - - - - - - - - - - - - - - - -
                    </Text>
                    <Item
                      title={"Hours"}
                      value={
                        dayjs(item?.startTime).format("HH:mm") +
                        " - " +
                        dayjs(item?.endTime).format("HH:mm")
                      }
                    />

                    <Item
                      title={"Amount"}
                      value={CurrencyHelper.formatVND(item.total)}
                    />
                  </>
                )}
              ></FlatList>
              <Text style={styles.dash} ellipsizeMode="clip" numberOfLines={1}>
                - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                - - - - - - - - - - - - - - - - - - - - - -
              </Text>
              <Item
                title={"Total"}
                value={CurrencyHelper.formatVND(
                  reservation?.timeFrame?.cost +
                    (reservation.ticketExtend
                      ? reservation.ticketExtend.reduce(
                          (t, v) => t + Number(v.total),
                          0
                        )
                      : 0)
                )}
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
            </View>
          </ScrollView>
          {userState.companyID == reservation.parkingLot.companyID && (
            <AppButton style={styles.continueButton} onPress={procedure}>
              <Text style={styles.countinueText}>
                {reservation?.state == "new"
                  ? "Check in"
                  : reservation?.state == "ongoing"
                  ? "Check out"
                  : ""}
              </Text>
            </AppButton>
          )}
        </SafeAreaView>
      )}
    </>
  );
};

export default ParkingReservationDetail;

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    textAlign: "center",
  },
  card: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.light.background,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 16,
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
  title: { fontSize: 15, fontWeight: "500", color: Colors.light.subtitle },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    textAlign: "right",
    flex: 1,
  },
  dash: { color: Colors.light.subtitle },
  image: { width: 34, height: 34, marginVertical: 8 },
  wrapper: { flex: 1, marginHorizontal: 16 },
  continueButton: {
    marginVertical: 12,
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
  headerText: {
    fontSize: 20,
    color: Colors.light.primary,
    fontWeight: "700",
    textAlign: "center",
  },
});
