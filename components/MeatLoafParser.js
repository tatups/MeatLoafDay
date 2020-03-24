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
    return fetch('https://www.cotton-club.fi/ruokalista')
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
    console.log(rootNode);
    console.error('hii');
    let days = rootNode.getElementsByClassName('module pricelist');

    console.error(days)
    console.error(meatLoafExp.exec(meatLoafCandidates))

  }
}


