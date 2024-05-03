import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../index.css";
import Order from "./Order";

const showOrders = (props) => {
  let sum = 0;
  props.orders.forEach((el) => (sum += parseFloat(el.price)));

  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className="sum"> Sum:{new Intl.NumberFormat().format(sum)}$ </p>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>Cart is empty</h2>
    </div>
  );
};

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false);

  return (
    <header>
      {props.show ? props.children : <></>}
      <div>
        <span className="logo"> House Staff </span>
        <ul className="nav">
          <li>about us</li>
          <li onClick={() => props.changeShow()}>contacts</li>
          <li>Personal Area</li>
        </ul>
        <FaShoppingCart
          onClick={() => setCartOpen((cartOpen = !cartOpen))}
          className={`shop-card-button ${cartOpen && "active"}`}
        />
        {cartOpen && (
          <div className="shop-card">
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
      </div>
      <div className="presentation"></div>
    </header>
  );
}
