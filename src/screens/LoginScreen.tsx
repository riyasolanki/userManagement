import React, { useEffect } from "react";
import { 
    View, 
    Alert, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    StatusBar, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableOpacity 
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../redux/userSlice";
import { getUsers } from "../utils/storage";
import { useForm, Controller } from "react-hook-form";

import CustomInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import Colors from "../constants/Colors";
import { styles } from "../constants/Style";

export default function LoginScreen({ navigation }: any) {
    const dispatch = useDispatch();
    const { users } = useSelector((state: any) => state.users);

    // ✅ React Hook Form
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched", // 👈 same UX as AddUser
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const loadLocalUsers = async () => {
            const localData = await getUsers();
            if (localData && localData.length > 0) {
                dispatch(setUsers(localData));
            }
        };
        loadLocalUsers();
    }, []);

    // ✅ Login Logic
    const handleLogin = (data: any) => {
        const user = users.find(
            (u: any) =>
                u.email.toLowerCase() === data.email.trim().toLowerCase() &&
                u.password === data.password
        );

        if (user) {
            navigation.replace("UserList");
        } else {
            Alert.alert("Login Failed", "Invalid email or password.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Top Navigation Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <View style={styles.innerContainer}>
                    
                    {/* Header */}
                    <View style={styles.headerSection}>
                        <Text style={styles.brandText}>User Management</Text>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                        <Text style={styles.subText}>
                            Sign in to access the system records.
                        </Text>
                    </View>

                    {/* Card */}
                    <View style={styles.card}>

                        {/* Email Field */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Email Address</Text>

                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Invalid email format",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomInput
                                        placeholder="Enter your email"
                                        value={value}
                                        onChangeText={onChange}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        style={errors.email && styles.inputError} // ✅ error border
                                    />
                                )}
                            />

                            {errors.email && (
                                <Text style={styles.errorText}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </View>

                        {/* Password Field */}
                        <View style={styles.inputWrapper}>
                            <Text style={styles.inputLabel}>Password</Text>

                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters required",
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <CustomInput
                                        placeholder="Enter your password"
                                        value={value}
                                        onChangeText={onChange}
                                        secureTextEntry
                                        style={errors.password && styles.inputError} // ✅ error border
                                    />
                                )}
                            />

                            {errors.password && (
                                <Text style={styles.errorText}>
                                    {errors.password.message}
                                </Text>
                            )}
                        </View>

                        {/* Buttons */}
                        <View style={styles.buttonColumn}>
                            <CustomButton
                                title="Login"
                                onPress={handleSubmit(handleLogin)}
                                style={styles.loginBtn}
                            />
                            
                            <TouchableOpacity 
                                style={styles.secondaryBtn}
                                onPress={() => navigation.navigate("AddUser")}
                            >
                                <Text style={styles.secondaryBtnText}>
                                    Don't have an account?{" "}
                                    <Text style={styles.signUpText}>Sign Up</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

//     container: {
//         flex: 1,
//         backgroundColor: '#F8F9FA',
//     },
//     topBar: {
//         height: 50,
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//     },
//     backButton: {
//         paddingVertical: 5,
//     },
//     backButtonText: {
//         color: '#4CAF50',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     innerContainer: {
//         flex: 1,
//         paddingHorizontal: 24,
//         paddingBottom: 40,
//         justifyContent: "center",
//     },
//     headerSection: {
//         marginBottom: 30,
//         alignItems: 'center',
//     },
//     brandText: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#4CAF50',
//         textTransform: 'uppercase',
//         letterSpacing: 2,
//         marginBottom: 8,
//     },
//     welcomeText: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         color: '#2D3436',
//     },
//     subText: {
//         fontSize: 14,
//         color: '#636E72',
//         marginTop: 5,
//         textAlign: 'center',
//     },
//     card: {
//         backgroundColor: 'white',
//         padding: 24,
//         borderRadius: 20,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 5 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 10,
//             },
//             android: {
//                 elevation: 5,
//             },
//         }),
//     },
//     inputWrapper: {
//         marginBottom: 15,
//         minHeight: 85,
//     },
//     inputLabel: {
//         fontSize: 12,
//         fontWeight: '700',
//         color: '#B2BEC3',
//         marginBottom: 8,
//         textTransform: 'uppercase',
//     },
//     errorText: {
//         color: '#D63031',
//         fontSize: 12,
//         marginTop: 5,
//         fontWeight: '500',
//     },
//     inputError: {
//         borderColor: '#D63031',
//         backgroundColor: Colors.lightRed,
//         borderWidth: 1.5,
//     },
//     buttonColumn: {
//         marginTop: 10,
//     },
//     loginBtn: {
//         backgroundColor: '#4CAF50',
//         borderRadius: 12,
//     },
//     secondaryBtn: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     secondaryBtnText: {
//         color: '#636E72',
//         fontSize: 14,
//     },
//     signUpText: {
//         color: '#4CAF50',
//         fontWeight: 'bold',
//     }
// });