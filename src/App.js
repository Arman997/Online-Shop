import React from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer";
import Items from "./components/Items.js";
import "./index.css";
import Categories from "./components/Categories.js";
import ShowFullItem from "./components/ShowFullItem.js";
import ShowContact from "./components/ShowContact.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          title: "stool",
          img: "chair_grey.jpeg",
          desc: "a very good chair for design solutions and just a comfortable chair for your home",
          category: "chairs",
          price: 49.99,
        },
        {
          id: 2,
          title: "table",
          img: "table_grey.jpeg",
          desc: "very high quality table that will complement your interior",
          category: "table",
          price: 149,
        },
        {
          id: 3,
          title: "lamp",
          img: "lamp.jpeg",
          desc: "very high quality and beautiful lamp with design solutions",
          category: "lamp",
          price: 34.99,
        },
        {
          id: 4,
          title: "sofa",
          img: "sofa.jpeg",
          desc: "very high quality and comfortable sofa for your home",
          category: "sofa",
          price: 299.99,
        },
        {
          id: 5,
          title: "ottoman",
          img: "ottoman.jpeg",
          desc: "beautiful ottomans with a minimalist design will integrate very well into your home",
          category: "ottoman",
          price: 89.99,
        },
      ],
      showFullItem: false,
      fullItem: {},
    };
    this.state.currentItems = this.state.items;
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.state.show = false;
  }
  changeShow = () => {
    this.setState({
      show: !this.state.show,
    });
    console.log("changed");
  };
  render() {
    return (
      <div className="wrapper">
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          changeShow={this.changeShow}
          show={this.state.show}
        >
          <ShowContact />
        </Header>
        <Categories chooseCategory={this.chooseCategory} />
        <Items
          onShowItem={this.onShowItem}
          items={this.state.currentItems}
          onAdd={this.addToOrder}
        />
        {this.state.showFullItem && (
          <ShowFullItem
            onAdd={this.addToOrder}
            onShowItem={this.onShowItem}
            item={this.state.fullItem}
          />
        )}
        <Footer />
      </div>
    );
  }

  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ showFullItem: !this.state.showFullItem });
  }

  chooseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category),
    });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) this.setState({ orders: [...this.state.orders, item] });
  }
}

export default App;
