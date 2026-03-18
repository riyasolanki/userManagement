import React, {useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Colors from "../constants/Colors";

export default function UserDetailScreen({ route, navigation }: any) {

  const [user, setUser] = useState(route.params.user);
  // const { user } = route.params;

  // useEffect(() => {
  //   console.log("User ::", JSON.stringify(user))
  // },[])

  const handleExitPress = () => {
    navigation.navigate("EditUser", {
      user, onUpdate: (updatedUser: any) => setUser(updatedUser)
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleExitPress}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Profile Image Section */}
        <View style={styles.profileSection}>
          <View style={styles.imageShadow}>
            <Image
              style={styles.profileImage}
              source={{ uri: user.image }}
            />
          </View>
          <Text style={styles.userFullName}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.userRole}>{user.role}</Text>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Personal Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.label}>First Name</Text>
              <Text style={styles.value}>{user.firstName}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.label}>Last Name</Text>
              <Text style={styles.value}>{user.lastName}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoBlockFull}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoBlockThird}>
              <Text style={styles.label}>Birth Date</Text>
              <Text style={styles.value}>{user.birthDate}</Text>
            </View>
            <View style={styles.infoBlockThird}>
              <Text style={styles.label}>Age</Text>
              <Text style={styles.value}>{user.age}</Text>
            </View>
            <View style={styles.infoBlockThird}>
              <Text style={styles.label}>Gender</Text>
              <Text style={styles.value}>{user.gender}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoBlockFull}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>

        </View>

        {/* Professional Section */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Work & Education</Text>
          <View style={styles.infoBlockFull}>
            <Text style={styles.label}>Company</Text>
            <Text style={styles.value}>{user.company.name}</Text>
            <Text style={[styles.value, { fontSize: 14, color: '#636E72' }]}>
              {user.company.title} • {user.company.department}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoBlockFull}>
            <Text style={styles.label}>University</Text>
            <Text style={styles.value}>{user.university}</Text>
          </View>
        </View>

        {/* Health Stats Row */}
        <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-around' }]}>
          <View style={styles.infoBlockThird}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>{user.height}cm</Text>
          </View>
          <View style={styles.infoBlockThird}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.value}>{user.weight}kg</Text>
          </View>
          <View style={styles.infoBlockThird}>
            <Text style={styles.label}>Blood</Text>
            <Text style={styles.value}>{user.bloodGroup}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light grey background makes the white card pop
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#4CAF50",
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  backButton: {
    padding: 4,
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: Colors.white,
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  editText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  imageShadow: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 60,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.white,
  },
  userFullName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 15,
  },
  userRole: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 20,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#4CAF50",
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBlock: {
    width: '48%',
  },
  infoBlockThird: {
    width: '30%',
  },
  infoBlockFull: {
    width: '100%',
  },
  label: {
    fontSize: 12,
    color: '#B2BEC3',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F2F6',
    marginVertical: 15,
  },
});