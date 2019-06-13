import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

export default class FormField extends Component{
  constructor(props) {
    super(props);
    this.state = '';
  }
   //need to pass what I will be using the input for so I can have a title for each
    render() {
        return (
          <TextInput style={styles.container}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            {...this.props}
          />
        );
      }
    
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 5,
  }
});
