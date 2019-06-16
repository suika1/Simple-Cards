import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton,
  Fab,
} from '@material-ui/core';

import {
  EditRounded,
  ClearRounded,
  AddRounded,
} from '@material-ui/icons/';

import Modal from './modal';

import s from './styles.scss';

export default class CardList extends React.Component {
  state = {
    isModalOpen: false,
    modalItemId: null,
  };

  componentDidMount = () => {
    const {
      getCardList,
    } = this.props;
    getCardList();
  }

  componentDidUpdate = (prevProps) => {
    const { isModalOpen } = this.state;
    const {
      cardList,
    } = this.props;

    if (!cardList.isFetching
      && isModalOpen
      && prevProps.cardList.isFetching
    ) {
      this.closeModal();
    }
  }

  openModal = (id) => this.setState({
    isModalOpen: true,
    modalItemId: id,
  });

  closeModal = () => this.setState({
    modalItemId: null,
    isModalOpen: false,
  });

  renderItem = (item) => {
    const {
      currentUser,
      deleteCard,
    } = this.props;

    return (
      <Grid item xs={5}>
        <Card>
          <CardHeader
            className={s.cardHeader}
            action={
              currentUser.id === item.userId ? (
                <CardActions>
                  <IconButton onClick={() => this.openModal(item.id)}>
                    <EditRounded />
                  </IconButton>
                  <IconButton onClick={() => deleteCard({ cardId: item.id })}>
                    <ClearRounded />
                  </IconButton>
                </CardActions> 
              ) : ''
            }
            title={(
              <Typography variant="h4" className={s.cardHeaderText}>
                {item.title}
              </Typography>
            )}
            subheader={moment(item.createdAt).format('DD.MM.YYYY')}
          />

          <CardContent>
            <Typography variant="body1" className={s.cardText}>
              {item.text}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }

  renderRows = () => {
    const {
      cardList: {
        items,
      },
    } = this.props;
    const rows = [];
    
    for (let i = 0; i < items.length; i = i + 2) {
      rows.push((
        <Grid key={i} container item xs={12} spacing={6} justify="space-around">
          {this.renderItem(items[i])}
          {/* if length is odd - display only 1 item in last row */}
          {i !== items.length - 1 && this.renderItem(items[i + 1])}
        </Grid>
      ))
    }
    return rows;
  }

  render() {
    const { modalItemId, isModalOpen } = this.state;
    const {
      cardList: {
        items,
      },
      updateCard,
      createCard,
      removeCurrentUser,
    } = this.props;

    return (
      <React.Fragment>
        {isModalOpen && (
          <Modal
            item={items.find(item => item.id === modalItemId)}
            onClose={this.closeModal}
            updateCard={updateCard}
            createCard={createCard}
          />
        )}      
        <Container maxWidth="md" className={s.container}>
          <Button
            onClick={removeCurrentUser}
            variant="contained"
            color="primary"
            className={s.exitBtn}
          >
            Выйти
          </Button>

          <Grid container spacing={6}>
            {this.renderRows()}
          </Grid>

          <Fab color="primary" className={s.createBtn} onClick={() => this.openModal(null)}>
            <AddRounded />
          </Fab>
        </Container>
      </React.Fragment>
    )
  }
}

CardList.propTypes = {
  getCardList: PropTypes.func.isRequired,
  createCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  cardList: PropTypes.shape({}).isRequired,
};
