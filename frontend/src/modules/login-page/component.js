import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Container,
  Tabs,
  Tab,
  Button,
} from '@material-ui/core';

import WithForm from 'modules/with-form';
import Field from 'modules/with-form/fields/field';

import * as urls from 'appUrls';
import * as localStorage from 'api/localStorage';

import cx from 'classnames';

import s from './styles.scss';

const TAB_VALUES = {
  login: 'login',
  registration: 'registration',
};

const TABS = [{
  label: 'Вход',
  value: TAB_VALUES.login,
}, {
  label: 'Регистрация',
  value: TAB_VALUES.registration,
}];

const FIELDS_BY_TAB = {
  [TAB_VALUES.login]: [{
    name: 'email',
    label: 'Email',
    type: 'email',
  }, {
    name: 'password',
    label: 'Пароль',
    type: 'password',
  }],
  [TAB_VALUES.registration]: [{
    name: 'email',
    label: 'Email',
    type: 'email',
  }, {
    name: 'password',
    label: 'Пароль',
    type: 'password',
  }, {
    name: 'passwordAgain',
    label: 'Пароль ещё раз',
    type: 'password',
  }],
};

const BUTTONS_BY_TAB = {
  [TAB_VALUES.login]: {
    label: 'Войти',
    action: 'loginUser',
  },
  [TAB_VALUES.registration]: {
    label: 'Зарегистрироваться',
    action: 'createUser',
  },
}

class LoginForm extends React.Component {
  state = {
    currentTab: TABS[0].value,
  }

  changeTab = (e, newVal) => this.setState({
    currentTab: newVal,
  });

  componentDidUpdate = (prevProps) => {
    const {
      loginPage,
      historyPush,
    } = this.props;

    // if login or registration succeeded
    if (
      !loginPage.isFetching
      && !loginPage.errorMessage
      && prevProps.loginPage
      && prevProps.loginPage.isFetching
    ) {
      historyPush(urls.cardList);
    }
  }

  render() {
    const {
      fieldProps,
      formValues,
      loginPage: {
        errorMessage,
      },
    } = this.props;
    const { currentTab } = this.state;

    const isAnyOfFieldsEmpty = !!FIELDS_BY_TAB[currentTab].find(field => {
      return !formValues[field.name];
    });

    const isSubmitBtnDisabled = isAnyOfFieldsEmpty || (
      currentTab === TAB_VALUES.registration
      && formValues.password !== formValues.passwordAgain
    );

    const error = (() => {
      if (errorMessage === 'User already exists' || errorMessage === 'Bad email') {
        return 'email';
      }
      return '';
    })();

    return (
      <Container maxWidth="sm" >
        <Tabs
          value={currentTab}
          onChange={this.changeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {TABS.map((tab, idx) => (
            <Tab
              key={idx}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>

        <form className={s.form}>
          {FIELDS_BY_TAB[currentTab].map((field, idx) => (
            <Field
              key={idx}
              Component={TextField}
              fieldProps={fieldProps}
              formValues={formValues}
              margin="normal"
              variant="outlined"
              error={error === field.name}
              {...field}
            />
          ))}

          <Button
            onClick={() => this.props[BUTTONS_BY_TAB[currentTab].action]({ formValues })}
            variant="contained"
            color="primary"
            className={cx(s.submitBtn, {
              [s.submitBtnDisabled]: isSubmitBtnDisabled,
            })}
            disabled={isSubmitBtnDisabled}
          >
            {BUTTONS_BY_TAB[currentTab].label}
          </Button>
        </form>
      </Container>
    )
  }
}

LoginForm.propTypes = {
  formValues: PropTypes.shape({}).isRequired,
  fieldProps: PropTypes.shape({}).isRequired,
  createUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginPage: PropTypes.shape({}).isRequired,
  historyPush: PropTypes.func.isRequired,
};

export default WithForm(LoginForm);
