import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, FlatList, AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

var DomParser = require('react-native-html-parser').DOMParser

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  item: {
    padding: 10,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  text: {
    fontSize: 18,
  },
  success: {
    backgroundColor: 'green'
  },
  failure: {
    backgroundColor: 'red'
  }
});

function Item({ item, searchString }) {

  if (item.data.containsMeatLoaf) {
    return (<View style={[styles.item, styles.success]}>
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.data.listOfPlacesWithMeatLoaf}</Text>
    </View>);
  }
  else {
    return (<View style={[styles.item, styles.failure]}>
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>No {searchString} :(</Text>
    </View>);
  }
}



export class MeatLoafParser extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      searchString: ''
    }
  }






  componentDidMount() {


    const { navigation } = this.props;
    this.focusListener = navigation.addListener("focus", () => {
      this.refreshData();
    });

    this.refreshData();



  }

  componentWillUnmount() {
    this.focusListener;
  }



  render() {

    if (this.state.isLoading) {
      return (
        <Text style={{ alignItems: 'center', top: 50 }}>
          Loading...
    </Text>
      )
    }
    else {

      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.title}
            data={this.state.dataSource}
            renderItem={({ item }) =>
              <Item item={item} searchString={this.state.searchString} />

            }
          />
          <Button onPress={() => this.props.navigation.navigate('Settings')} title="Settings" />

        </SafeAreaView>
      );
    }

  }
  /**
   * Parses the DOM from kurnii.fi and transforms it into weekday view objects 
   * 
   */
  parseDom(rootNode) {


    let monday = rootNode.getElementById('monday');
    let tuesday = rootNode.getElementById('tuesday');
    let wednesday = rootNode.getElementById('wednesday');
    let thursday = rootNode.getElementById('thursday');
    let friday = rootNode.getElementById('friday');
    let saturday = rootNode.getElementById('saturday');
    let sunday = rootNode.getElementById('sunday');

    let monPlaces = monday.getElementsByClassName('list');
    let monObjects = this.mapToObjects(monPlaces);
    let monData = { title: 'Monday', data: monObjects };

    let tuePlaces = tuesday.getElementsByClassName('list');
    let tueObjects = this.mapToObjects(tuePlaces);
    let tueData = { title: 'Tuesday', data: tueObjects };

    let wedPlaces = wednesday.getElementsByClassName('list');
    let wedObjects = this.mapToObjects(wedPlaces);
    let wedData = { title: 'Wednesday', data: wedObjects };

    let thuPlaces = thursday.getElementsByClassName('list');
    let thuObjects = this.mapToObjects(thuPlaces);
    let thuData = { title: 'Thursday', data: thuObjects };

    let friPlaces = friday.getElementsByClassName('list');
    let friObjects = this.mapToObjects(friPlaces);
    let friData = { title: 'Friday', data: friObjects };

    let satPlaces = saturday.getElementsByClassName('list');
    let satObjects = this.mapToObjects(satPlaces);
    let satData = { title: 'Saturday', data: satObjects };

    let sunPlaces = sunday.getElementsByClassName('list');
    let sunObjects = this.mapToObjects(sunPlaces);
    let sunData = { title: 'Sunday', data: sunObjects };

    return [monData, tueData, wedData, thuData, friData, satData, sunData];

  }
  /**
   * Parses DOM containing list of restaurant names and menus for menus containing the search string
   * Returns a view object with flag set to true if any of the restaurants contained the search string, 
   * and string with restaurant names containing the search string 
   */
  mapToObjects(listOfPlaces) {

    let meatLoafExp = new RegExp('/' + this.state.searchString + '/');

    var placeObjects = Array.from(listOfPlaces).reduce(function (aggregate, item) {
      var containsMeatLoaf = meatLoafExp.test(item);
      if (containsMeatLoaf) {
        var restaurantName = item.querySelect('.place')[0].textContent;
        aggregate.containsMeatLoaf = true;
        aggregate.listOfPlacesWithMeatLoaf.push(restaurantName);
      }
      return aggregate;
    }, { containsMeatLoaf: false, listOfPlacesWithMeatLoaf: [] });

    placeObjects.listOfPlacesWithMeatLoaf = placeObjects.listOfPlacesWithMeatLoaf.join(', ');
    placeObjects.listOfPlacesWithMeatLoaf = this.state.searchString + ' found in: ' + placeObjects.listOfPlacesWithMeatLoaf;


    return placeObjects;
  }
  /**
   * Loads the search string from local storage and parses the dom to generate the weekly view
   */
  refreshData() {

    const key = 'MeatLoafReplacement';
    AsyncStorage.getItem(key).then(val => {
      this.setState({ searchString: val ?? 'Lihamureke' });
    });

    fetch('https://www.kurnii.fi')
      .then((response) => response.text())
      .then((responseText) => {

        let doc = new DomParser().parseFromString(responseText, 'text/html')
        let data = this.parseDom(doc)
        this.setState({
          isLoading: false,
          dataSource: data,
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });


  }

}




