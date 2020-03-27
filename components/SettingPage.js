import React, { Component } from 'react';
import { Text, Button, TextInput, AsyncStorage, SafeAreaView, FlatList } from 'react-native';

const defaultValue = 'Lihamureke'

export class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settingValue: defaultValue
        }
    }

    componentDidMount = () => AsyncStorage.getItem('MeatLoafReplacement')
        .then((value) => {

            if (value != null) {
                this.setState({ settingValue: value })
            }

        })

    render() {
        return (
            <SafeAreaView>
                <Text>Settings</Text>
                <TextInput
                    style={{
                        height: 40, borderColor: 'gray', borderWidth: 1,
                    }}
                    value={this.state.settingValue}
                    onChangeText={(value) => this.storeKey(value)}

                />
                <Button onPress={() => this.props.navigation.navigate('Home')} title="Home" />

            </SafeAreaView>
        );
    }

    storeKey = (value) => {
        try {
            AsyncStorage.setItem('MeatLoafReplacement', value);
            this.setState({ settingValue: value });
        } catch (error) {
        }
    };

    retrieveKey = () => {
        try {
            const value = AsyncStorage.getItem('MeatLoafReplacement');
            if (value != null) {

                this.setState({ settingValue: value });

            }

        } catch (error) {
        }
    };
}


