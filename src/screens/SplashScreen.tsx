import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUsers } from "../redux/userSlice";
import { getUsers } from "../utils/storage";

export default function SplashScreen({ navigation }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      try {
        const users = await getUsers();
        dispatch(setUsers(users));

        const loggedUser = await AsyncStorage.getItem("@logged_in_user");

        setTimeout(() => {
          if (loggedUser) {
            navigation.replace("UserList"); 
          } else {
            navigation.replace("Welcome");
          }
        }, 1500); 
      } catch (error) {
        navigation.replace("Welcome");
      }
    };

    initApp();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
                <View style={styles.logoPlaceholder}>
                  <Text style={styles.logoIcon}>👥</Text>
                </View>
                <Text style={styles.brandName}>User Management</Text>
                <Text style={styles.tagline}>Secure System Administration Portal</Text>
              </View>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50",
  },
   brandContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E8F5E9',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 50,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 8,
  },
});