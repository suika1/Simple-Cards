import React from 'react';

import WithForm from 'modules/with-form';
import Field from 'modules/with-form/fields/field';

import {
  Modal,
  TextField,
  Button,
} from '@material-ui/core';

import s from './styles.scss';

class CardModal extends React.Component {
  componentDidMount = () => {
    const {
      fieldProps: {
        changeField,
      },
      item,
    } = this.props;

    if (!item) return;

    changeField('title', item.title);
    changeField('text', item.text);
  }

  render() {
    const {
      onClose,
      fieldProps,
      formValues,
      item,
      updateCard,
      createCard,
    } = this.props;

    return (
      <Modal
        open={true}
        onClose={onClose}
      >
        <div className={s.container}>
          <form className={s.form}>
            <Field
              name="title"
              type="text"
              label="Название"
              Component={TextField}
              fieldProps={fieldProps}
              formValues={formValues}
              margin="normal"
            />

            <Field
              name="text"
              type="text"
              label="Текст"
              Component={TextField}
              fieldProps={fieldProps}
              formValues={formValues}
              margin="normal"
              multiline={true}
            />

            <Button
              onClick={() => {
                if (item) {
                  updateCard({ formValues, cardId: item.id });
                } else {
                  createCard({ formValues });
                }
              }}
              variant="contained"
              color="primary"
              className={s.submitBtn}
            >
              {item ? 'Редактировать' : 'Создать'}
            </Button>
          </form>
        </div>
      </Modal>
    )
  }
}

export default WithForm(CardModal);
