import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { TodoButton } from '../shared/screens/button';
import { UserContext } from '../contexts/userContext';
import { asyncStorageObj } from '../shared/helpers/asyncStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({navigation}) => {

    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const { setUser } = useContext(UserContext);
    
    const handleLogin = async () => {
        if(username.length) {
            setLoading(true);
            try {
                setTimeout(async () => {
                    await asyncStorageObj.putItem('todo-username', username);
                    setUser(username);
                    navigation.replace('Home');
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log('Login Error', error);
                setLoading(false);
            }
        }
    }
    
    useEffect(() => {
        const checkIfUsernameExists = async () => {
            // await AsyncStorage.clear();
            const username = await asyncStorageObj.getItem('todo-username');
            if(username) {
                setUser(username);
                navigation.replace('Home');
            }
        }

        checkIfUsernameExists();
    }, [])
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={styles.loginContainer}>
                    <Text style={styles.header}>Todo App</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Username"
                        />
                        <View style={styles.loginButton}>
                            <TodoButton label={'Login'} action={() => handleLogin()} disable={username.length==0} loading={loading}></TodoButton>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loginContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        rowGap: 100
    },
    header: {
        fontSize: 36,
        fontWeight: '600'
    },
    inputContainer: {
        // flex: 1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 16
    },
    label: {
        fontSize: 16
    },
    input: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 10,
        minWidth: 200
    },
    loginButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%'
    }
})