import { Colors } from "@src/constants";
import { useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import { FlatList, StyleSheet, Text, View } from "react-native";
import SelectableParkingSlot from "./SelectableParkingSlot";

type Props = {
  block: Block;
  slots: ParkingSlot[];
};

const ParkingSlotItem = ({ block, slots }: Props) => {
  const selectedSlot = useAppSelector(selectBooking).parkingSlot;

  return (
    <View>
      <Text style={styles.block}>{`Block - ${block.code}`}</Text>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SelectableParkingSlot
            selectedId={selectedSlot?.id}
            blockCode={block.code}
            slot={item}
          />
        )}
        scrollEnabled={false}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        key={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

export default ParkingSlotItem;

const styles = StyleSheet.create({
  block: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.heading,
    marginVertical: 12,
  },
  container: { display: "flex", flexWrap: "wrap" },
});
