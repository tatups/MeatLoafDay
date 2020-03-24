import React, { Component } from 'react';
import { Text, View } from 'react-native';
var DomParser = require('react-native-html-parser').DOMParser

let meatLoafExp = /Lihamureke/;

export class MeatLoafParser extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }


  componentDidMount() {
    return fetch('https://www.kurnii.fi')
      .then((response) => response.text())
      .then((responseText) => {

        // const html = response
        // let doc = new DomParser().parseFromString(html, 'text/html')
        // console.error(doc);
        let doc = new DomParser().parseFromString(responseText, 'text/html')
        this.parseDom(doc)
        this.setState({
          isLoading: false,
          dataSource: responseText,
        }, function () {

        });
      })
      .catch((error) => {
        console.error(error);
      });

  }


  render() {

    if (this.state.isLoading) {
      return (
        <Text style={{ alignItems: 'center', top: 50 }}>
          hiihuu
    </Text>
      )
    }
    else {

      return (
        < Text style={{ alignItems: 'center', top: 50 }
        }>
          {this.state.dataSource}
        </Text >
      );
    }

  }

  parseDom(rootNode) {


    let monday = rootNode.getElementById('monday');
    let tuesday = rootNode.getElementById('tuesday');
    let wednesday = rootNode.getElementById('wednesday');
    let thursday = rootNode.getElementById('thursday');
    let friday = rootNode.getElementById('friday');
    let saturday = rootNode.getElementById('saturday');
    let sunday = rootNode.getElementById('sunday');

    monPlaces = monday.getElementsByClassName('list');
    monObjects = this.mapToObjects(monPlaces);

    tuePlaces = tuesday.getElementsByClassName('list');
    tueObjects = this.mapToObjects(tuePlaces);

    wedPlaces = wednesday.getElementsByClassName('list');
    wedObjects = this.mapToObjects(wedPlaces);

    thuPlaces = thursday.getElementsByClassName('list');
    thuObjects = this.mapToObjects(thuPlaces);

    friPlaces = friday.getElementsByClassName('list');
    friObjects = this.mapToObjects(friPlaces);

    satPlaces = saturday.getElementsByClassName('list');
    satObjects = this.mapToObjects(satObjects);

    sunPlaces = sunday.getElementsByClassName('list');
    sunObjects = this.mapToObjects(sunPlaces);

    return [monObjects, tueObjects, wedObjects, thuObjects, friObjects, satObjects, sunObjects];

  }

  mapToObjects(listOfPlaces) {

    placeObjects = [...listOfPlaces].map(function (item) {
      containsMeatLoaf = meatLoafExp.test(item);
      restaurantName = item.getElementById('place').text;
      return { name: restaurantName, found: containsMeatLoaf };
    });
    return placeObjects;
  }


}


