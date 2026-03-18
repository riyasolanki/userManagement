import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
  Image
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { launchImageLibrary } from 'react-native-image-picker';

import { updateUser } from "../redux/userSlice"; 
import { saveUsers, getUsers } from "../utils/storage"; 
import { api } from "../api/api";

export default function EditUserScreen({ route, navigation }: any) {
  const dispatch = useDispatch();
  const { user } = route.params;

  const [profileImage, setProfileImage] = useState(
    user.image || "https://dummyjson.com/icon/default/128"
  );

  useEffect(() => {
    console.log("Users:: ", user)
  }, [])

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    }
  });

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    });

    if (result.assets?.length) {
      const uri = result.assets[0].uri;

      if (uri) {
        setProfileImage(uri);
      }
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const updatedUserData = {
        ...user,
        ...data,
        image: profileImage,
      };

      dispatch(updateUser(updatedUserData));

      const existingUsers = await getUsers();
      const index = existingUsers.findIndex((u: any) => u.id === user.id);

      if (index !== -1) {
        existingUsers[index] = updatedUserData;
        await saveUsers(existingUsers);
      }

      try {
        await api.put(`users/${user.id}`, updatedUserData);
      } catch (apiError) {
        console.log("API Update skipped/failed (likely a local ID):", apiError);
      }

      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Critical Update Error:", error);
      Alert.alert("Error", "Failed to update user locally");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text style={[styles.headerButton, { fontWeight: 'bold' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>

        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
            <Image
              key={profileImage}
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>Edit</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.imageLabel}>Tap to change photo</Text>
        </View>

        {/* Read-Only Section */}
        <Text style={styles.sectionTitle}>System Info (Read Only)</Text>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Username</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={user.username} editable={false} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Account Role</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={user.role} editable={false} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={[styles.input, styles.disabledInput, { height: 'auto', minHeight: 60 }]}
            value={`${user.company?.name}\n${user.company?.title} • ${user.company?.department}`}
            editable={false}
            multiline={true} 
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>University</Text>
          <TextInput style={[styles.input, styles.disabledInput]} value={user.university} editable={false} />
        </View>

        <View style={styles.row}>
          <View style={styles.third}>
            <Text style={styles.label}>Birthday</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={user.birthDate} editable={false} />
          </View>
          <View style={styles.third}>
            <Text style={styles.label}>Age</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={String(user.age)} editable={false} />
          </View>
          <View style={styles.third}>
            <Text style={styles.label}>Gender</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={user.gender} editable={false} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.third}>
            <Text style={styles.label}>Height</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={`${user.height} cm`} editable={false} />
          </View>
          <View style={styles.third}>
            <Text style={styles.label}>Weight</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={`${user.weight} kg`} editable={false} />
          </View>
          <View style={styles.third}>
            <Text style={styles.label}>Blood</Text>
            <TextInput style={[styles.input, styles.disabledInput]} value={user.bloodGroup} editable={false} />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Editable Section */}
        <Text style={styles.sectionTitle}>Editable Information</Text>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>First Name</Text>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "First name is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="First Name" />
              )}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Last Name</Text>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="Last Name" />
              )}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.input} value={value} onChangeText={onChange} keyboardType="email-address" autoCapitalize="none" />
            )}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput style={styles.input} value={value} onChangeText={onChange} keyboardType="phone-pad" />
            )}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.saveButtonText}>Update Profile</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  headerButton: { fontSize: 16, color: '#4CAF50' },
  formContainer: { padding: 20, paddingBottom: 40 },
  imageSection: { alignItems: 'center', marginBottom: 25 },
  imageWrapper: { width: 100, height: 100, borderRadius: 50, position: 'relative' },
  profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#EEE' },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  editBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  imageLabel: { marginTop: 8, fontSize: 12, color: '#AAA', fontWeight: '600' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#AAA', marginBottom: 15, textTransform: 'uppercase' },
  inputGroup: { marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 20, justifyContent: 'space-between' },
  third: { width: '31%' },
  label: { fontSize: 14, color: '#555', marginBottom: 8, fontWeight: '500' },
  input: { borderWidth: 1, borderColor: '#DDD', borderRadius: 8, padding: 12, fontSize: 16, color: '#333', backgroundColor: '#FFF' },
  disabledInput: { backgroundColor: '#F5F5F5', color: '#999', borderColor: '#EEE' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 10, marginBottom: 25 },
  saveButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});