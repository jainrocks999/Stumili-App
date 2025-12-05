import React, { createContext, useContext, useRef, useState } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastContextType {
  showToast: (msg: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  const [toast, setToast] = useState({
    message: "",
    type: "info" as ToastType,
  });

  const showToast = (msg: string, type: ToastType = "info") => {
    setToast({ message: msg, type });

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 20,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }, 1800);
    });
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "✔";
      case "error":
        return "✖";
      case "warning":
        return "⚠";
      default:
        return "ℹ";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Animated.View
        style={[
          styles.toastContainer,
          { opacity, transform: [{ translateY }] },
          styles[toast.type],
        ]}
      >
        <Text style={styles.icon}>{getIcon()}</Text>
        <Text style={styles.toastText}>{toast.message}</Text>
      </Animated.View>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",

    // premium shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 999,
    maxWidth: "90%",
  },

  toastText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 8,
  },

  icon: {
    color: "#fff",
    fontSize: 18,
    marginRight: 4,
    fontWeight: "bold",
  },

  // ===== COLORS FOR EACH TYPE =====
  success: { backgroundColor: "#2ecc71" }, // green
  error: { backgroundColor: "#e74c3c" }, // red
  warning: { backgroundColor: "#f1c40f" }, // yellow
  info: { backgroundColor: "#3498db" }, // blue
});
