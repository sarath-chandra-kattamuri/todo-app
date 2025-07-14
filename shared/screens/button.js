import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const TodoButton = ({ label, action, disable, loading }) => {
    return (
        <TouchableOpacity disabled={disable || loading} onPress={action} style={disable ? styles.disableButton : styles.button}>
            {!loading ? <Text style={disable? styles.disableLabel : styles.label}>{label}</Text> : <ActivityIndicator size="small" color="#000" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    disableButton: {
        backgroundColor: '#00000010',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        borderColor: '#00000080',
        borderWidth: 1,
        width: 80,
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00000030',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        borderColor: '#00000080',
        borderWidth: 1,
        width: 80,
        display: 'flex',
        alignItems: 'center'
    },
    label: {
        fontSize: 16
    },
    disableLabel: {
        fontSize: 16,
        color: '#00000050'
    }
})