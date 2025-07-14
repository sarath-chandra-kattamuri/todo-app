import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TodoButton } from '../shared/screens/button';

export const TodoItem = ({ item, handleDelete, loading, index }) => {
    return (
        <View style={ styles.itemContainer }>
            <Text style={ styles.itemText }>{item}</Text>
            <TodoButton label='Delete' action={() => handleDelete(index)} loading={loading}></TodoButton>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 20,
        marginVertical: 10,
        paddingHorizontal: 10
    },
    itemText: {
        fontSize: 18,
        flex: 1
    }
})
