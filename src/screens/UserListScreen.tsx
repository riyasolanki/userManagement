import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setUsers } from "../redux/userSlice";
import { getUsers, clearStorage } from "../utils/storage"; // Assume clearStorage handles logout
import UserCard from "./UserCard";
import Colors from "../constants/Colors";

export default function UserListScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const { users, skip, limit, loading, total } = useSelector(
    (state: any) => state.users
  );

  const onEndReachedCalledDuringMomentum = useRef(false);

  // Load offline users first
  useEffect(() => {
    const loadOfflineUsers = async () => {
      const offlineUsers = await getUsers();
      if (offlineUsers && offlineUsers.length > 0) {
        dispatch(setUsers(offlineUsers));
      }
    };
    loadOfflineUsers();
  }, []);

  // Initial API call
  useEffect(() => {
    dispatch(fetchUsers({ limit: 10, skip: 0 }));
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Logout", 
        style: "destructive", 
        onPress: async () => {
          await clearStorage();
          navigation.replace("Login"); // Redirect to login screen
        } 
      },
    ]);
  };

  const loadMore = () => {
    if (!loading && users.length < total && !onEndReachedCalledDuringMomentum.current) {
      dispatch(fetchUsers({ limit, skip }));
      onEndReachedCalledDuringMomentum.current = true;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>User Management List</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onPress={() =>
              navigation.navigate("UserDetail", { user: item })
            }
          />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size={"large"} color={Colors.primary} style={styles.loader} />
          ) : <View style={{ height: 20 }} />
        }
        ListEmptyComponent={
          !loading ? <Text style={styles.emptyText}>No users found.</Text> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Matches the details screen background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle glass effect
  },
  logoutText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  loader: {
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#B2BEC3',
    fontSize: 16,
  }
});