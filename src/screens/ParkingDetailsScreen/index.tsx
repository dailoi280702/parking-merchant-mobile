import { Feather } from "@expo/vector-icons";
import TimeItem from "@src/components/Home/TimeItem";
import AppButton from "@src/components/common/AppButton";
import { Colors, Spacing } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectTimeFrames } from "@src/store/selectors";
import { timeFrameActions } from "@src/store/slices/timeFrameSlice";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ReadMore from "@src/components/common/ReadMore";
import { Spinner } from "@nghinv/react-native-loading";
import { parkingSlotApi } from "@src/api";

const ParkingDetailsScreen = ({ navigation }: any) => {
  const parkingLot: ParkingLot = useAppSelector(selectBooking).parkingLot;
  const timeFrames = useAppSelector(selectTimeFrames);
  const dispatch = useAppDispatch();
  const [numOfAvailableSlots, setNumOfAvailableSlots] = useState(0);

  const navigateNext = () => {
    if (numOfAvailableSlots > 0) {
      navigation.navigate("SelectVehicleScreen");
    }
  };

  useEffect(() => {
    const getNumOfSlots = async () => {
      try {
        Spinner.show();
        const startTime = dayjs();
        const endTime = startTime.add(1, "hour");
        const slotAvailable = await parkingSlotApi.getAvailableSlots(
          startTime.utc().format(),
          endTime.utc().format(),
          parkingLot?.id,
        );
        let num = 0;
        if (slotAvailable.data.data) {
          slotAvailable.data.data.forEach((e: any) => {
            num += e.parkingSlots.length;
          });
        }
        setNumOfAvailableSlots(num);
        console.log(num);
      } finally {
        Spinner.hide();
      }
    };

    if (parkingLot && parkingLot.id) {
      dispatch(timeFrameActions.getTimeFrames(parkingLot?.id));
      getNumOfSlots();
    }
  }, [parkingLot]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://shopping.saigoncentre.com.vn/Data/Sites/1/News/32/013.jpg",
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{parkingLot?.name}</Text>
          <View style={styles.flexRow}>
            <Feather name="map-pin" size={18} color={Colors.light.heading} />
            <Text numberOfLines={2} ellipsizeMode="tail" style={styles.address}>
              {parkingLot?.address}
            </Text>
          </View>
          <Text style={styles.title}>Operating hours</Text>
          <Text style={styles.hour}>
            {dayjs(parkingLot.startTime).format("HH:mm")} -{" "}
            {dayjs(parkingLot.endTime).format("HH:mm")}
          </Text>
          {parkingLot.description && (
            <>
              <Text style={styles.title}>Description</Text>
              <ReadMore
                maxLine={4}
                lineHeight={20}
                content={parkingLot?.description}
                styleText={styles.description}
              />
            </>
          )}
          <Text style={styles.title}>Parking time</Text>
          <FlatList
            data={timeFrames}
            renderItem={({ item }) => (
              <TimeItem period={item.duration} cost={item.cost} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      <AppButton
        style={{
          ...styles.button,
          opacity: numOfAvailableSlots > 0 ? 1 : 0.8,
        }}
        onPress={navigateNext}
      >
        <Text style={styles.textButton}>
          {numOfAvailableSlots > 0 ? "Book now" : "No slots available"}
        </Text>
      </AppButton>
    </View>
  );
};

export default ParkingDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingVertical: 20 },
  image: { height: 180, width: "100%", resizeMode: "cover", borderRadius: 12 },
  flexRow: { display: "flex", flexDirection: "row", alignItems: "center" },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginTop: 12,
    marginBottom: 4,
  },
  hour: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: Spacing.s,
  },
  address: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginLeft: Spacing.s,
  },
  description: { fontSize: 14, lineHeight: 18, color: Colors.light.subtitle },
  button: {
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
  },
  textButton: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
});
