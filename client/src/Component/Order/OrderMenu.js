import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class OrderMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qty1: 0,
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
									fish sauce palm sugar or soft brown sugar Garlic, ginger, mint
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

						<button
							className="orderMenu__done blogin"
							onClick={this.props.orderMenuConfirmed}
						>
							Order
						</button>
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
