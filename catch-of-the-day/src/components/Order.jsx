import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  };
  
  isFishAvailable = key => {
    const fish = this.props.fishes[key];
    return fish && fish.status === "available";
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const transitionOptions = {
      classNames: "order",
      key: { key },
      timeout: { enter: 500, exit: 500 }
    };
    if (!fish) {
      return null;
    }
    if (!this.isFishAvailable(key)) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions} key={key}>
        <li>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name}
            <span className="price">{formatPrice(count * fish.price)}</span>
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const order = this.props.order;
    const fishes = this.props.fishes;
    const items = Object.keys(order);

    const total = items.reduce((total, key) => {
      const quantity = order[key];
      const fish = fishes[key];
      if (this.isFishAvailable(key)) {
        return total + fish.price * quantity;
      }
      return total;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {items.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    );
  }
}

export default Order;
