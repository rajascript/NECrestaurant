import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class OrderMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty1: 0,
      qty2: 0,
      qty3: 0,
      qty4: 0,
      qty5: 0,
      qty6: 0,
      qty7: 0,
      qty8: 0,
      total: 0,
      items: []
    };
    this.increaseQty = this.increaseQty.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.orderMenuCompleted = this.orderMenuCompleted.bind(this);
  }
  increaseQty(item) {
    let currItem = "qty" + item;
    let currItems = this.state.items;
    let currQty = this.state[currItem];
    let itemId = "00" + item;
    if (currQty < 5) {
      currItems.push(itemId);
      let newTotal = currItems.length * 100;
      this.setState({
        [currItem]: currQty + 1,
        total: newTotal,
        items: currItems
      });
    }
  }
  decreaseQty(item) {
    let currItem = "qty" + item;
    let itemId = "00" + item;
    let currQty = this.state[currItem];

    if (currQty > 0) {
      let currItems = this.state.items;
      var index = currItems.indexOf(itemId);
      if (index !== -1) currItems.splice(index, 1);
      let newTotal = currItems.length * 100;
      let currQty = this.state[currItem];
      this.setState({
        [currItem]: currQty - 1,
        total: newTotal,
        items: currItems
      });
    }
  }
  orderMenuCompleted() {
    this.props.orderMenuCompleted();
  }
  render() {
    return (
      <Fragment>
        <div class="navbarwrapper">
          <div />
          <Link to="/">
            <div class="logowrapper">Indique</div>
          </Link>
          <div class="bottomhalfcontentwrapper">
            <div className="navbarlinkwrapper">
              <Link className="navbarlink" to="/about">
                ABOUT
              </Link>

              <Link className="navbarlink" to="/booking">
                BOOKING
              </Link>

              <Link className="navbarlink" to="/">
                MENU
              </Link>

              <Link className="navbarlink" to="/order">
                DELIVERY
              </Link>

              <Link className="navbarlink" to="/">
                CONTACT
              </Link>
            </div>
          </div>
        </div>
        <h3 className="orderMenu--intro">Order Menu</h3>
        <div className="orderMenu">
          <div className="orderMenu__container">
            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/1.jpg"
                alt="scallops"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">Scallops</h5>
                <h6 className="orderMenu--item--info2">
                  Fish Sauce, Palm Sugar or soft Brown Sugar, Garlic, Ginger,
                  Mint
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(1)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty1}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/2.jpg"
                alt="Chilli_chicken"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">Chilli Chicken</h5>
                <h6 className="orderMenu--item--info2">
                  Boneless chicken, Chilli sauce, Soya sauce, Onion, Garlic,
                  Celery, Spring Onion and Freshly chopped Coriander for
                  garnish.
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(2)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty2}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(2)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/3.jpg"
                alt="Steak_tartare"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">Steak Tartare</h5>
                <h6 className="orderMenu--item--info2">
                  Beef, Fillet Shallots, Cornichons, Nonpareille Capers,
                  Parsley, Egg
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(3)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty3}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(3)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/4.jpg"
                alt="Smoked_Salmon_Pancakes"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">
                  Smoked Salmon Pancakes
                </h5>
                <h6 className="orderMenu--item--info2">
                  Potato Pancakes with Smoked Salmon, Caviar and Dill Cream.
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(4)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty4}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(4)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/5.jpg"
                alt="Strawberry_Fudge
				"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">Strawberry Fudge</h5>
                <h6 className="orderMenu--item--info2">
                  Strawberry frosting and White Chocolate chips
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(5)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty5}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(5)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/6.jpg"
                alt="Nutella_Mouse"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">Nutella Mouse</h5>
                <h6 className="orderMenu--item--info2">
                  Nutella, Whipped cream, Brown Sugar, Dark Chocolate
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(6)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty6}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(6)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/7.jpg"
                alt="Homemade_Frozen_Yogurt"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">
                  Homemade Frozen Yogurt
                </h5>
                <h6 className="orderMenu--item--info2">
                  Heavy Whipped cream, all purpose flour, Eggs, Crushed
                  Pineapple, White Chocolate
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(7)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty7}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(7)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu--item">
              <img
                className="orderMenu--item--thumb"
                src="assets/8.jpg"
                alt="Rosses"
              />
              <div className="orderMenu--item--info">
                <h5 className="orderMenu--item--info1">
                  Red Rosses and Champagne
                </h5>
                <h6 className="orderMenu--item--info2">
                  Champagne Wrapped in hundered Beautiful Red Roses.
                </h6>
              </div>
              <h5 className="orderMenu--item--price">₹100</h5>
              <div className="orderMenu--item--qtyContainer">
                <button
                  className="orderMenu--item--buttonLess"
                  onClick={() => this.decreaseQty(8)}
                >
                  -
                </button>
                <h6 className="orderMenu--item--h6">{this.state.qty8}</h6>
                <button
                  className="orderMenu--item--buttonMore"
                  onClick={() => this.increaseQty(8)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="orderMenu__done">
              {this.state.total > 0 && (
                <h5 className="orderMenu__done--total">
                  Total: ₹{this.state.total}
                </h5>
              )}
              <button
                className="blogin"
                onClick={this.props.orderMenuConfirmed}
              >
                Order
              </button>
            </div>
          </div>
        </div>

        <footer class="navbarwrapper orderFooter">
          <div class="tophalfcontentwrapper">
            <div class="topleftcontentwrapper" />
          </div>
          <div class="bottomhalfcontentwrapper">
            <div class="navbarlinkwrapper">
              <a class="navbarlink" href="">
                <span class="glyphicon glyphicon-earphone" /> 7656576565
              </a>

              <a class="navbarlink" href=" ">
                This was a project made for NEC Technologies by Group 4
              </a>

              <a class="navbarlink" href="">
                <span class="glyphicon glyphicon-envelope" /> hi@indique.com
              </a>
            </div>
          </div>
        </footer>
      </Fragment>
    );
  }
}
