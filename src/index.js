/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ListView,
  View,
  Platform,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import DetailsScreen from './DetailsScreen';

const PixabayKey = '<insert pixabay key here>';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Search Images',
    // header: null
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
       rowHasChanged: (row1, row2) => row1.id !== row2.id
     });
    this.state = {
      text: '',
      dataSource: this.ds
    };
  }

  async searchImages() {
    try
    {
      let searchString = this.state.text;
      console.log(`Searching for ${searchString}`);
      let response = await fetch(`https://pixabay.com/api/?key=${PixabayKey}&q=${searchString}`);
      let responseJson = await response.json();
      this.setState({dataSource:this.ds.cloneWithRows(responseJson.hits)});
      console.log(`Got ${responseJson.total} results`);
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Search images'
          style={{height: 40}}
          onChangeText={
            text=>this.setState({text:text})
          }
        />
        <Button title='Search'
          onPress={() => this.searchImages()}
        />
        <ListView
          dataSource={this.state.dataSource}
          keyExtractor={item => item.id}
          renderRow={item =>
            (
              <TouchableHighlight
                onPress={()=>navigate('Details', item)}
              >
                <View style={styles.rowContainer}>
                  <Image
                    source={{uri: item.previewURL}}
                    style={{width:50, height:50}}/>
                  <Text>{item.tags}</Text>
                </View>
              </TouchableHighlight>
            )
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    paddingTop: 4,
    paddingLeft: 4,
    paddingRight: 4
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
    //paddingLeft: 4
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


const PixabayBrowser = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen }
});

export default PixabayBrowser;