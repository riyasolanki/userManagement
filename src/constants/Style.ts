import { Platform, StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.divider
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.black
    },
    headerButtonText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: 'bold'
    },
    scrollContainer: {
        padding: 20
    },
    photoContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    imageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.primary
    },
    profilePreview: {
        width: '100%',
        height: '100%'
    },
    photoLabel: {
        marginTop: 8,
        color: Colors.primary,
        fontWeight: '600'
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: Colors.primary,
        marginBottom: 15,
        marginTop: 10,
        textTransform: 'uppercase'
    },
    inputGroup: {
        marginBottom: 15
    },
    photoContainer1: { alignItems: 'center', marginBottom: 20 },
    imageWrapper1: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    label: {
        fontSize: 11,
        color: Colors.label,
        fontWeight: '700',
        marginBottom: 6,
        textTransform: 'uppercase'
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.input,
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        backgroundColor: Colors.white,
        color: Colors.black
    },
    inputError: {
        borderColor: Colors.error,
        backgroundColor: Colors.lightRed
    },
    errorText: {
        color: Colors.error,
        fontSize: 10,
        marginTop: 4,
        fontWeight: '600'
    },
    readOnlyInput: {
        backgroundColor: Colors.readOnlyInputBackground,
        color: Colors.readOnlyInput
    },
    pickerTrigger: {
        borderWidth: 1,
        borderColor: Colors.input,
        borderRadius: 8,
        padding: 12,
        backgroundColor: Colors.white,
        height: 48,
        justifyContent: 'center'
    },
    pickerText: {
        fontSize: 14,
        color: Colors.black
    },
    placeholderText: {
        fontSize: 14,
        color: Colors.label
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    halfInput: {
        width: '48%'
    },
    thirdInput: {
        width: '31%'
    },
    divider: {
        height: 1,
        backgroundColor: Colors.divider,
        marginVertical: 15
    },
    submitButton: {
        backgroundColor: Colors.primary,
        padding: 18, borderRadius: 12,
        alignItems: 'center',
        marginVertical: 30,
        elevation: 3
    },
    submitButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700'
    },
    buttonColumn: {
        marginTop: 10,
    },
    loginBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 12,
    },
    secondaryBtn: {
        marginTop: 20,
        alignItems: 'center',
    },
    secondaryBtnText: {
        color: Colors.subText,
        fontSize: 14,
    },
    signUpText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    inputWrapper: {
        marginBottom: 15,
        minHeight: 85,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.label,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
        justifyContent: "center",
    },
    headerSection: {
        marginBottom: 30,
        alignItems: 'center',
    },
    brandText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.black,
    },
    subText: {
        fontSize: 14,
        color: Colors.subText,
        marginTop: 5,
        textAlign: 'center',
    },
    card: {
        backgroundColor: Colors.white,
        padding: 24,
        borderRadius: 20,
        ...Platform.select({
            ios: {
                shadowColor: Colors.black,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    topBar: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        paddingVertical: 5,
    },
    backButtonText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
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
        backgroundColor: Colors.lightGreen,
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
        color: Colors.black,
        letterSpacing: 1,
    },
    tagline: {
        fontSize: 14,
        color: Colors.readOnlyInput,
        marginTop: 8,
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 4,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    loginButtonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    signupButton: {
        backgroundColor: Colors.white,
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
    },
    signupButtonText: {
        color: Colors.primary,
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
        color: Colors.syncText,
        fontSize: 14,
    },
    headerButton: { fontSize: 16, color: '#4CAF50' },
    formContainer: { padding: 20, paddingBottom: 40 },
    imageSection: { alignItems: 'center', marginBottom: 25 },
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
    third: { width: '31%' },
    disabledInput: { backgroundColor: '#F5F5F5', color: '#999', borderColor: '#EEE' },
    saveButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
    saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});