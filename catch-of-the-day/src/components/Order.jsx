import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  isFishAvailable = key => {
    const fish = this.props.fishes[key];
    return fish && fish.status === "available";
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    if (!this.isFishAvailable(key)) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available
        </li>
      );
    }
    return (
      <li key={key}>
        {count} lbs {fish.name}
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
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
        <ul className="order">{items.map(this.renderOrder)}</ul>
        <div className="total">
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    );
  }
}

export default Order;
