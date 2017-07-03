import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);

    const { width, height, scale } = Dimensions.get('window');
    this.state = {
         width: width,
         height: height
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(event) {
     const { width, height } = event.nativeEvent.layout;
     this.setState({ width, height });
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Image source={{uri: params.webformatURL}} style={{width:this.state.width, height:this.state.height/2}}
          resizeMode='contain'
        />
        <Text>{params.tags}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: (Platform.OS === 'ios') ? 30 : 0,
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});