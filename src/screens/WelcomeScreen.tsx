import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert
} from "react-native";
import axios from "axios";
import { saveUsers } from "../utils/storage"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../constants/Style";

export default function WelcomeScreen({ navigation }: any) {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem("@logged_in_user");

      if (user) {
        navigation.replace("UserList");
      }
    };

    checkLogin();
  }, []);

  useEffect(() => {
    const syncInitialData = async () => {
      setIsSyncing(true);
      try {
        const response = await axios.get("https://dummyjson.com/users");
        if (response.data && response.data.users) {
          await saveUsers(response.data.users);
          console.log("System Sync Complete: Users cached locally.");
        }
      } catch (error) {
        Alert.alert("Sync Error", "Could not refresh user database. Using local cache.");
      } finally {
        setIsSyncing(false);
      }
    };

    syncInitialData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Branding Section */}
        <View style={styles.brandContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoIcon}>👥</Text>
          </View>
          <Text style={styles.brandName}>User Management</Text>
          <Text style={styles.tagline}>Secure System Administration Portal</Text>
        </View>

        {/* Action Section */}
        <View style={styles.buttonContainer}>
          {isSyncing ? (
            <View style={styles.syncBox}>
              <ActivityIndicator color="#4CAF50" size="small" />
              <Text style={styles.syncText}>Syncing Database...</Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={() => navigation.navigate("AddUser")}
              >
                <Text style={styles.signupButtonText}>Create Account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
