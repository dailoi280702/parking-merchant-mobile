import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { parkingSlotApi } from "@src/api";
import { Colors } from "@src/constants";
import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Spinner } from "@nghinv/react-native-loading";
dayjs.extend(utc);

type Props = {
  isShow: boolean;
  onClose: any;
  distance: number;
  navigateBooking: () => void;
};

const DetailModal = (props: Props) => {
  const { isShow, onClose } = props;
  const ref = React.useRef<BottomSheet>(null);
  const parkingLot = useAppSelector(selectBooking).parkingLot;
  const [numOfAvailableSlots, setNumOfAvailableSlots] = useState(0);

  const onOpenBottomSheetHandler = (index: number) => {
    ref?.current?.snapToIndex(index);
  };

  useEffect(() => {
    if (isShow === true) {
      onOpenBottomSheetHandler(0);
    } else {
      ref?.current?.close();
      // onOpenBottomSheetHandler(-1);
    }
  }, [isShow]);

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
      getNumOfSlots();
    }
  }, [parkingLot]);

  return (
    <>
      <BottomSheet
        ref={ref}
        index={-1}
        enablePanDownToClose={true}
        onClose={onClose}
        snapPoints={[280, "52%", "95%"]}
        style={{
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          borderRadius: 16,
        }}
      >
        <BottomSheetView>
          <View
            style={{
              paddingHorizontal: 20,
              height: "100%",
              backgroundColor: "white",
            }}
          >
            {parkingLot ? (
              <>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: Colors.light.primary,
                      lineHeight: 24,
                    }}
                    numberOfLines={2}
                  >
                    {parkingLot?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 20,
                      color: Colors.light.subtitle,
                      textAlign: "justify",
                    }}
                  >
                    Description: {parkingLot?.description}
                  </Text>
                  <View style={{ ...styles.flexRow, marginVertical: 12 }}>
                    <Feather
                      name="map-pin"
                      size={18}
                      color={Colors.light.heading}
                    />
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: Colors.light.heading,
                        lineHeight: 18,
                        width: "90%",
                        marginLeft: 12,
                      }}
                    >
                      {parkingLot?.address}
                    </Text>
                  </View>
                </View>
                <View style={{ ...styles.flexRow, marginVertical: 12 }}>
                  <View
                    style={{
                      backgroundColor: Colors.light.primary,
                      padding: 4,
                      borderRadius: 4,
                    }}
                  >
                    <MaterialIcons
                      name="directions-walk"
                      size={18}
                      color={Colors.light.background}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      marginHorizontal: 8,
                      color: Colors.light.heading,
                    }}
                  >
                    {Math.round(props.distance * 100) / 100}km
                  </Text>
                  <View
                    style={{
                      backgroundColor: Colors.light.primary,
                      padding: 5,
                      borderRadius: 4,
                      marginLeft: 24,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="parking"
                      size={16}
                      color={Colors.light.background}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      marginHorizontal: 8,
                      color: Colors.light.heading,
                    }}
                  >
                    {numOfAvailableSlots} slots available
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btnBook}
                  onPress={props.navigateBooking}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "700",
                      color: Colors.light.background,
                      textAlign: "center",
                    }}
                  >
                    View details
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>No data</Text>
            )}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  btnBook: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    height: 42,
    marginVertical: 12,
  },
  header: {
    backgroundColor: Colors.light.background,
    shadowColor: Colors.light.primary,
    shadowOffset: { width: -1, height: -4 },
    shadowRadius: 2,
    shadowOpacity: 0.15,
    paddingTop: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  flexRow: { display: "flex", flexDirection: "row", alignItems: "center" },
});

export default DetailModal;
