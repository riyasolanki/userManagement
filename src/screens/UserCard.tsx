import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';

const UserCard = ({ user, onPress }: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
                <Image source={{ uri: user.image }} style={styles.profile} />

                <View style={styles.info}>
                    <Text style={styles.name}>
                        {user.firstName} {user.lastName}
                    </Text>

                    <Text style={styles.email}>
                        {user.email}
                    </Text>
                </View>

        </TouchableOpacity>
    );
};
export default UserCard;
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 12,
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    info: {
        marginLeft: 12,
        justifyContent: 'center'
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.name
    },
    email: {
        fontSize: 13,
        color: Colors.email,
        marginTop: 4
    }
})
