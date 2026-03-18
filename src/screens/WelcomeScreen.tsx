import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import axios from "axios";
import { saveUsers } from "../utils/storage"; // Assuming your storage helper
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Sync users from API to Local Storage on Mount
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  signupButton: {
    backgroundColor: '#FFF',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  signupButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '700',
  },
  syncBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  syncText: {
    color: '#95a5a6',
    fontSize: 14,
  },
  footerVersion: {
    fontSize: 12,
    color: '#bdc3c7',
    marginBottom: 10,
  }
});