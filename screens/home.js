import React, { useContext, useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../contexts/userContext';
import { asyncStorageObj } from '../shared/helpers/asyncStorage';
import { TodoButton } from '../shared/screens/button';
import { TodoItem } from './todoItem';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Home = ({ navigation }) => {

    // states
    const [ todoInput, setTodoInput ] = useState('');
    const [ todoItems, setTodoItems ] = useState([]);
    const [ logoutLoading, setLogoutLoading ] = useState(false);
    const [ addLoading, setAddLoading ] = useState(false);
    const [ deleteLoading, setDeleteLoading ] = useState(false);

    // context
    const { user } = useContext(UserContext);

    const logout = async () => {
        setLogoutLoading(true)
        try {
            setTimeout(async () => {
                await asyncStorageObj.clearStorage();
                navigation.replace('Login');
                setLogoutLoading(false);
            }, 1000);
        } catch (error) {
            console.log('logout error', error);
            setLogoutLoading(false);
        }
    }

    const handleLogout = async () => {
        logout();
    }

    const updateAsyncStorageForTodoUpdate = async () => {
        let itemsString = JSON.stringify(todoItems);
        await asyncStorageObj.putItem(user, itemsString);
        return true;
    }

    const handleTodoAdd = async () => {
        setAddLoading(true);
        try {
            setTodoItems([...todoItems, todoInput]);
            setAddLoading(false);
            setTodoInput('');
            
        } catch (error) {
            console.log('Add Todo Item error', error);
            setAddLoading(false);
        }
    }

    const handleDelete = async (index) => {
        setDeleteLoading(true);
        try {
            setTodoItems((prev) => {
                let newTodos = [...prev];
                newTodos.splice(index, 1);
                return newTodos;
            })
            setDeleteLoading(false);
            
        } catch (error) {
            console.log('Delete Todo Item error', error);
        }
    }

    useEffect(() => {
        const checkIfUsernameExists = async () => {
            // await AsyncStorage.clear();
            const username = await asyncStorageObj.getItem('todo-username');
            if(!username) {
                logout();
            }
        }

        const checkIfTodoItemsExistsForUser = async () => {
            let todoItemsString = await asyncStorageObj.getItem(user);
            let todoItemsArr = JSON.parse(todoItemsString);
            if(todoItemsArr.length) {
                setTodoItems(todoItemsArr);
            }
            else {
                setTodoItems([]);
            }
        }

        checkIfUsernameExists();
        checkIfTodoItemsExistsForUser();
    }, [])

    useEffect(() => {
        updateAsyncStorageForTodoUpdate();
    }, [todoItems]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <View style={styles.homeContainer}>
                    <View style={styles.headerContainer}>
                        <View><Text style={styles.headerText}>Welcome {user}</Text></View>
                        <TodoButton label='Logout' loading={logoutLoading} action={() => handleLogout()}></TodoButton>
                    </View>
                    <View style={styles.homeWrapper}>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                value={todoInput}
                                onChangeText={setTodoInput}
                                placeholder='Todo Item'
                            />
                            <TodoButton label='Add' action={() => handleTodoAdd()} disable={!todoInput.length} loading={addLoading}></TodoButton>
                        </View>
                        <View style={styles.totalCount}><Text style={styles.totalText}>Total Items: {todoItems.length}</Text></View>
                        <FlatList
                            data={todoItems}
                            keyExtractor={(x, index) => index.toString()}
                            renderItem={({item, index}) => <TodoItem item={item} handleDelete={handleDelete} index={index} loading={deleteLoading}></TodoItem>}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        display: 'flex',
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 4,
        rowGap: 20
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600'
    },
    homeWrapper: {
        flex: 1,
        display: 'flex',
        rowGap: 20
    },
    inputWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 20
    },
    input: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 10,
        minWidth: 200
    },
    totalCount: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    totalText: {
        fontSize: 20
    }
}) 