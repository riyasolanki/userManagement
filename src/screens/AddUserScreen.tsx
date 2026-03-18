import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { launchImageLibrary } from 'react-native-image-picker';

import { addUser } from "../redux/userSlice";
import { saveUsers, getUsers } from "../utils/storage";
import CustomPicker from "../components/CustomPicker";
import { styles } from "../constants/Style";

export default function AddUserScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [pickerType, setPickerType] = useState<'gender' | 'role' | null>(null);

    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        mode: "onTouched",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: "",
            username: "",
            role: "",
            birthDate: "",
            age: "",
            gender: "",
            university: "",
            companyName: "",
            title: "",
            department: "",
            height: "",
            weight: "",
            bloodGroup: "",
        }
    });


    const pickImage = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
        if (result.assets && result.assets.length > 0) {
            setProfileImage(result.assets[0].uri || null);
        }
    };

    const calculateAge = (birthDate: Date) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
        return age.toString();
    };

    const handleConfirmDate = (date: Date) => {
        const formattedDate = date.toISOString().split('T')[0];
        setValue("birthDate", formattedDate, { shouldValidate: true });
        setValue("age", calculateAge(date));
        setDatePickerVisibility(false);
    };

    const handleSelect = (value: string) => {
        if (pickerType === 'gender') setValue('gender', value, { shouldValidate: true });
        if (pickerType === 'role') setValue('role', value.toLowerCase(), { shouldValidate: true });
    };

    const onSubmit = async (data: any) => {
        try {
            const newUser = {
                id: Date.now(),
                ...data,
                image: profileImage || "https://dummyjson.com/icon/default/128",
                company: {
                    name: data.companyName,
                    title: data.title,
                    department: data.department,
                },
            };

            const existingUsers = await getUsers();
            const updatedUsers = [newUser, ...(existingUsers || [])];
            await saveUsers(updatedUsers);
            console.log("Saving Users:", updatedUsers);
            dispatch(addUser(newUser));

            Alert.alert("Success", "Account created successfully!", [
                { text: "Done", onPress: () => navigation.navigate("Login") }
            ]);
        } catch (error) {
            Alert.alert("Error", "Failed to create account.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.headerButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Create Account</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                    {/* Photo Container */}
                    <View style={styles.photoContainer}>
                        <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profilePreview} />
                            ) : (
                                <Text style={{ color: '#4CAF50', fontSize: 40 }}>+</Text>
                            )}
                        </TouchableOpacity>
                        <Text style={styles.photoLabel}>Upload Profile Photo</Text>
                    </View>

                    {/* Section: Identity */}
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>First Name</Text>
                            <Controller control={control} name="firstName" rules={{ required: "Required" }} render={({ field: { onChange, value } }) => (
                                <View>
                                    <TextInput style={[styles.input, errors.firstName && styles.inputError]} value={value} onChangeText={onChange} placeholder="Riya" />
                                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
                                </View>
                            )} />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Last Name</Text>
                            <Controller control={control} name="lastName" rules={{ required: "Required" }} render={({ field: { onChange, value } }) => (
                                <View>
                                    <TextInput style={[styles.input, errors.lastName && styles.inputError]} value={value} onChangeText={onChange} placeholder="Solanki" />
                                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
                                </View>
                            )} />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <Controller control={control} name="email" rules={{ required: "Email required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" } }} render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput style={[styles.input, errors.email && styles.inputError]} value={value} onChangeText={onChange} placeholder="riya@gmail.com" keyboardType="email-address" autoCapitalize="none" />
                                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                            </View>
                        )} />
                    </View>

                    {/* NEW: Mobile Number Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mobile Number</Text>
                        <Controller control={control} name="phone" rules={{ required: "Phone required", minLength: { value: 10, message: "Invalid phone number" } }} render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput style={[styles.input, errors.phone && styles.inputError]} value={value} onChangeText={onChange} placeholder="+91 00000 00000" keyboardType="phone-pad" />
                                {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
                            </View>
                        )} />
                    </View>

                    <View style={styles.divider} />

                    {/* Section: System */}
                    <Text style={styles.sectionTitle}>System Credentials</Text>
                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Username</Text>
                            <Controller control={control} name="username" rules={{ required: "Required" }} render={({ field: { onChange, value } }) => (
                                <View>
                                    <TextInput style={[styles.input, errors.username && styles.inputError]} value={value} onChangeText={onChange} placeholder="riya_s" autoCapitalize="none" />
                                    {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                                </View>
                            )} />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Role</Text>
                            <Controller control={control} name="role" rules={{ required: "Select role" }} render={({ field: { value } }) => (
                                <View>
                                    <TouchableOpacity onPress={() => setPickerType('role')} style={[styles.pickerTrigger, errors.role && styles.inputError]}>
                                        <Text style={value ? styles.pickerText : styles.placeholderText}>{value ? value.toUpperCase() : "Select"}</Text>
                                    </TouchableOpacity>
                                    {errors.role && <Text style={styles.errorText}>{errors.role.message}</Text>}
                                </View>
                            )} />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <Controller control={control} name="password" rules={{ required: "Required", minLength: { value: 6, message: "Min 6 chars" } }} render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput style={[styles.input, errors.password && styles.inputError]} value={value} onChangeText={onChange} placeholder="••••••••" secureTextEntry />
                                {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                            </View>
                        )} />
                    </View>

                    {/* Section: Birth/Gender */}
                    <View style={styles.row}>
                        <View style={styles.thirdInput}>
                            <Text style={styles.label}>Birth Date</Text>
                            <Controller control={control} name="birthDate" rules={{ required: "Required" }} render={({ field: { value } }) => (
                                <View>
                                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={[styles.pickerTrigger, errors.birthDate && styles.inputError]}>
                                        <Text style={value ? styles.pickerText : styles.placeholderText}>{value || "YYYY-MM-DD"}</Text>
                                    </TouchableOpacity>
                                    {errors.birthDate && <Text style={styles.errorText}>{errors.birthDate.message}</Text>}
                                </View>
                            )} />
                        </View>
                        <View style={styles.thirdInput}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput style={[styles.input, styles.readOnlyInput]} value={watch("age")} editable={false} placeholder="0" />
                        </View>
                        <View style={styles.thirdInput}>
                            <Text style={styles.label}>Gender</Text>
                            <Controller control={control} name="gender" rules={{ required: "Required" }} render={({ field: { value } }) => (
                                <View>
                                    <TouchableOpacity onPress={() => setPickerType('gender')} style={[styles.pickerTrigger, errors.gender && styles.inputError]}>
                                        <Text style={value ? styles.pickerText : styles.placeholderText}>{value || "Select"}</Text>
                                    </TouchableOpacity>
                                    {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
                                </View>
                            )} />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Section: Work & Education */}
                    <Text style={styles.sectionTitle}>Work & Education</Text>

                    {/* NEW: University Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>University</Text>
                        <Controller control={control} name="university" rules={{ required: "Required" }} render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput style={[styles.input, errors.university && styles.inputError]} value={value} onChangeText={onChange} placeholder="Northeastern University" />
                                {errors.university && <Text style={styles.errorText}>{errors.university.message}</Text>}
                            </View>
                        )} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Company Name</Text>
                        <Controller control={control} name="companyName" rules={{ required: "Required" }} render={({ field: { onChange, value } }) => (
                            <View>
                                <TextInput style={[styles.input, errors.companyName && styles.inputError]} value={value} onChangeText={onChange} placeholder="Pvt Ltd" />
                                {errors.companyName && <Text style={styles.errorText}>{errors.companyName.message}</Text>}
                            </View>
                        )} />
                    </View>

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Job Title</Text>
                            <Controller control={control} name="title" rules={{ required: "Required" }} render={({ field: { onChange, value } }) => (
                                <View>
                                    <TextInput style={[styles.input, errors.title && styles.inputError]} value={value} onChangeText={onChange} placeholder="Developer" />
                                    {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
                                </View>
                            )} />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Department</Text>
                            <Controller control={control} name="department" rules={{ required: "Required" }} render={({ field: { onChange, value } }) => (
                                <View>
                                    <TextInput style={[styles.input, errors.department && styles.inputError]} value={value} onChangeText={onChange} placeholder="Software" />
                                    {errors.department && <Text style={styles.errorText}>{errors.department.message}</Text>}
                                </View>
                            )} />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Section: Physical Attributes */}
                    <Text style={styles.sectionTitle}>Physical Attributes</Text>
                    <View style={styles.row}>
                        <View style={styles.thirdInput}>
                            <Text style={styles.label}>Height (cm)</Text>
                            <Controller control={control} name="height" render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="170" keyboardType="numeric" />
                            )} />
                        </View>
                        <View style={styles.thirdInput}>
                            <Text style={styles.label}>Weight (kg)</Text>
                            <Controller control={control} name="weight" render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="65" keyboardType="numeric" />
                            )} />
                        </View>
                        <View style={styles.thirdInput}>
                            <Text style={styles.label}>Blood</Text>
                            <Controller control={control} name="bloodGroup" render={({ field: { onChange, value } }) => (
                                <TextInput style={styles.input} value={value} onChangeText={onChange} placeholder="O+" autoCapitalize="characters" />
                            )} />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
                        <Text style={styles.submitButtonText}>Confirm Registration</Text>
                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={() => setDatePickerVisibility(false)}
                        maximumDate={new Date()}
                    />
                </ScrollView>
            </KeyboardAvoidingView>

            <CustomPicker
                visible={pickerType !== null}
                onClose={() => setPickerType(null)}
                onSelect={handleSelect}
                title={pickerType === 'role' ? "Select User Role" : "Select Gender"}
                options={pickerType === 'role' ? ["Admin", "Moderator", "User"] : ["Male", "Female", "Other"]}
            />
        </SafeAreaView>
    );
}