import React, { FC } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Modal,
} from "react-native";

interface Props {
  visible: boolean;
  label?: string;
}

const CustomLoader: FC<Props> = ({ visible, label = "Loading..." }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#4FAF5A" />
          {label ? (
            <Text style={styles.label}>{label}</Text>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBox: {
    backgroundColor: "white",
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 15,
    color: "#444",
    fontWeight: "500",
  },
});
