import { Colors } from "@src/constants";
import { ActivityIndicator, TouchableOpacity } from "react-native";

interface ButtonProps {
  width?: string;
  height?: string;
  onPress?: any;
  isLoading?: boolean;
  children: JSX.Element;
  style?: any;
}

const AppButton = ({
  width = "auto",
  height = "45",
  onPress = () => {},
  isLoading = false,
  children,
  style = {},
}: ButtonProps) => {
  const w = width == "auto" ? "auto" : parseInt(width);
  const h = height == "auto" ? "auto" : parseInt(height);
  const btnStyle = [styles.root, { width: w, height: h }, style];
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {isLoading && <ActivityIndicator style={{ marginRight: 12 }} />}
      {children}
    </TouchableOpacity>
  );
};

const styles = {
  root: {
    paddingVertical: "auto",
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: Colors.light.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    minHeight: 40,
    justifyContent: "center",
    color: "#fff",
    backgroundColor: Colors.light.primary,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
};

export default AppButton;
