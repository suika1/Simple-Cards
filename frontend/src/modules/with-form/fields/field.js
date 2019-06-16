import React from 'react';

export default class Field extends React.Component {
  componentDidMount = () => {
    const {
      name,
      fieldProps: {
        changeField,
      },
      formValues,
    } = this.props;
    if (!formValues[name]) {
      changeField(name, '');
    }
  }

  componentWillUnmount = () => {
    const {
      name,
      fieldProps: {
        removeField,
      },
    } = this.props;
    removeField(name);
  }

  render() {
    const {
      name,
      Component,
      fieldProps: {
        changeField,
        removeField,
      },
      formValues,
      ...props
    } = this.props;
    return (
      <Component
        name={name}
        onChange={e => changeField(name, e.target.value)}
        value={formValues[name] || ''}
        {...props}
      />
    )
  }
}
