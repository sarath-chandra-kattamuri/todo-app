import AsyncStorage from "@react-native-async-storage/async-storage"

class AsyncStorageHelper {

    putItem = async (key, val) => {
        await AsyncStorage.setItem(key, val);
        return true;
    }

    getItem = async (key) => {
        return AsyncStorage.getItem(key); 
    }

    delItem = async (key) => {
        await AsyncStorage.removeItem(key);
        return true;
    }

    clearStorage = async () => {
        await AsyncStorage.multiRemove(['todo-username']);
        return true;
    }
}

export const asyncStorageObj = new AsyncStorageHelper();