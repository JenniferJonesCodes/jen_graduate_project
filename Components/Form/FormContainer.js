import React from 'react';

class FormContainer extends React.Component {
    state = { 
        fields: {}, 
        error: null, 
        success: null, 
        inProgress: false 
      };

      onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ inProgress: true });
    
        const fields = this.parseValues();
        const result = await this.props.onSubmit(...fields);
    
        if (typeof result === 'string') {
          return this.setState({ error: result, success: false, inProgress: false });
        }
        return this.setState({ error: null, success: true, inProgress: false });
      }

    render() {
        return (
          <form onSubmit={this.onSubmit}>
            {this.props.render({ onChange: this.onChange, values: this.state.fields }, this.state.inProgress)}
            {!this.state.inProgress && this.state.error ? this.state.error : null}
          </form>
        );
      }
};

export default FormContainer;
