import AsyncStorage from "@react-native-async-storage/async-storage";

const USERS_KEY = "@system_users";

// --- Save Users ---
export const saveUsers = async (users: any[]) => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_KEY, jsonValue);
  } catch (e) {
    console.error("Error saving users to storage:", e);
  }
};

// --- Get Users ---
export const getUsers = async () => {
  try {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error getting users", error);
    return [];
  }
};

// --- Clear Storage (Logout) ---
export const clearStorage = async () => {
  try {
    // This removes ONLY the user data
    await AsyncStorage.removeItem(USERS_KEY);

    // OR if you want to wipe everything in the app:
    // await AsyncStorage.clear(); 

    console.log("Storage cleared successfully");
  } catch (e) {
    console.error("Error clearing storage:", e);
  }
};