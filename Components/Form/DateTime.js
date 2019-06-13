import React, {Component} from 'react';
import {DatePickerIOS, View, StyleSheet} from 'react-native';

export default class DateTime extends Component {
  constructor(props) {
    super(props);
    this.state = {chosenDate: new Date()};

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate});
  }

  render() {
    return (
        <DatePickerIOS 
          mode={this.props.mode}
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
    );
  }
}

