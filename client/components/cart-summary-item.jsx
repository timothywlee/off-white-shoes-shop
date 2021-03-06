import React from 'react';
import QuantityUpdate from './quantity-update';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      modal: false,
      fade: true,
      backdrop: 'static'
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
    this.toggleClickHandler = this.toggleClickHandler.bind(this);
  }

  componentDidMount() {
    this.getQuantity();
  }

  componentDidUpdate(prevState) {
    if (this.state.quantity !== prevState.quantity) {
      this.props.getCartItems();
    }
  }

  getQuantity() {
    this.setState({ quantity: this.props.quantity });
  }

  handleDelete() {
    const { product } = this.props;
    this.props.deleteItem(product.cartItemId);
    setTimeout(() => {
      this.props.getCartItems();
    }, 100);
  }

  incrementQuantity() {
    const { product } = this.props;
    let { quantity } = this.state;
    const newQuantity = ++quantity;
    this.setState({ quantity: newQuantity });

    this.props.updateCart({
      quantity: newQuantity,
      cartItemId: product.cartItemId
    });
  }

  decrementQuantity() {
    const { product } = this.props;
    let { quantity } = this.state;
    let newQuantity = --quantity;

    if (newQuantity < 1) {
      this.toggleClickHandler();
    }
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    this.setState({ quantity: newQuantity });
    this.props.updateCart({
      quantity: newQuantity,
      cartItemId: product.cartItemId
    });
  }

  toggleClickHandler() {
    this.setState({
      modal: !this.state.modal,
      fade: !this.state.fade
    });
  }

  render() {
    const { quantity, modal, fade, backdrop } = this.state;
    return (
      <div
        className='container border rounded bg-white shadow-sm my-2'
        style={{ padding: '0' }}>
        <div
          className='row d-flex justify-content-center align-items-center flex-row my-2'
          style={{ height: '260px' }}>
          <img
            src={this.props.product.image}
            className='cartSummaryImg'
            style={{ objectFit: 'contain', width: '42%' }}/>
          <div
            className='d-flex flex-column justify-content-center align-items-center'
            style={{ width: '50%' }}>
            <div className='d-flex flex-column mb-1 justify-content-center align-items-center'>
              <div
                className='d-flex font-weight-bold'
                style={{ fontSize: '17px', textAlign: 'center' }}>
                {this.props.product.name}
              </div>
              <div className='text-muted'>
                ${(this.props.product.price / 100).toFixed(2)}
              </div>
            </div>
            <QuantityUpdate
              increment={this.incrementQuantity}
              decrement={this.decrementQuantity}
              quantity={quantity} />
            <button
              className='d-flex btn btn-outline-dark justify-content-center mt-2'
              style={{ width: '130px' }}
              onClick={this.toggleClickHandler}>
              DELETE
            </button>
          </div>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggleClickHandler}
          fade={fade}
          backdrop={backdrop}
          centered>
          <ModalHeader
            toggle={this.toggleClickHandler}>
            Wait!
          </ModalHeader>
          <ModalBody
            className='d-flex justify-content-center align-items-center flex-column'>
            Are you sure you want to delete your selection of
            <div className='d-flex flex-row'>
              <div className='font-weight-bold'>
                {this.props.product.name}
              </div>
              <div>?</div>
            </div>
            <div
              className='font-weight-bold'>
                Quantity: {this.props.quantity}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className='btn btn-outline-primary btn-md'
              style={{ cursor: 'pointer' }}
              onClick={this.toggleClickHandler}>
              No
            </Button>
            <Button
              className='btn btn-outline-danger btn-md'
              style={{ cursor: 'pointer' }}
              onClick={this.handleDelete}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CartSummaryItem;
