import React from 'react';

const WithForm = (WrappedComponent) => {
  return class WithForm extends React.Component {
    state = {
      values: {},
    }

    getValues = () => this.state.values || {};

    changeFieldValue = (fieldName, value) => {
      if (!fieldName || !fieldName.length) return;
      this.setState(state => ({
        values: {
          ...state.values,
          [fieldName]: value,
        }
      }));
    }

    removeField = (fieldName) => this.setState(state => ({
        values: Object.entries(state.values)
          .filter(([name]) => name !== fieldName)
          .reduce((prev, [curName, curVal]) => {
            prev[curName] = curVal;
            return prev;
          }, {}),
    }));
    
    render() {
      return (
        <WrappedComponent
          formValues={this.getValues()}
          fieldProps={{
            changeField: this.changeFieldValue,
            removeField: this.removeField,
          }}
          {...this.props}
        />
      )
    }
  }  
}

export default WithForm;
