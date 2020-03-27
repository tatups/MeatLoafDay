import AsyncStorage from '@react-native-community/async-storage';

/**
 * Retrieves the food search string from AsyncStorage
 */
export function getSearchString() {

    return AsyncStorage.getItem('MeatLoafReplacement').then(val => {
        return val ?? 'Lihamureke';
    });
}
/**
 * Stores the food search string into AsyncStorage
 */
export function storeSearchString(searchString) {

    AsyncStorage.setItem('MeatLoafReplacement', searchString);
}