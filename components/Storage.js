

import { AsyncStorage } from 'react-native';

storeSearchString = (value) => {
    try {
        AsyncStorage.setItem('MeatLoafReplacement', value);
    } catch (error) {
    }
};

getSearchString = () => {
    try {
        const value = AsyncStorage.getItem('MeatLoafReplacement');
        return value ?? 'Lihamureke';
    } catch (error) {
    }
};