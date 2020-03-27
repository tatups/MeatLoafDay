import React, { Component } from 'react';
import { View, Button, SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import { getSearchString, storeSearchString } from './Storage';

export class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            settingValue: ''
        }
    }

    componentDidMount = () => getSearchString()
        .then((value) => {
            this.setState({ settingValue: value })
        })

    render() {
        return (
            <SafeAreaView>
                <Input
                    inputStyle={{
                        borderBottomWidth: 1

                    }}
                    value={this.state.settingValue}
                    onChangeText={(value) => this.storeKey(value)}
                    label='Search string'

                />
                <View
                    style={{
                        marginTop: 5,
                    }}
                />
                <Button onPress={() => this.props.navigation.navigate('Home')} title="Home" />

            </SafeAreaView>
        );
    }
    /**
     * Stores the settingValue in local storage and sets settingValue state to value 
     */
    storeKey = (value) => {
        try {
            storeSearchString(value);
            this.setState({ settingValue: value });
        } catch (error) {
        }
    };

    /**
     * Retrieves the settingValue from local storage and sets settingValue state to the retrieved value
     */
    retrieveKey = () => {
        try {
            let value = getSearchString();
            this.setState({ settingValue: value });

        } catch (error) {
        }
    };
}


