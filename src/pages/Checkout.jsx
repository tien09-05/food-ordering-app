import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../styles/checkout.css";

const Checkout = () => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const onChangeInput = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const shippingCost = 30;

  const totalAmount = cartTotalAmount + Number(shippingCost);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(info);
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={onChangeInput}
                  />
                </div>

                <div className="form__group">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={onChangeInput}
                  />
                </div>
                <div className="form__group">
                  <input
                    name="phone"
                    type="number"
                    placeholder="Phone number"
                    required
                    onChange={onChangeInput}
                  />
                </div>
                <div className="form__group">
                  <input
                    name="country"
                    type="text"
                    placeholder="Country"
                    required
                    onChange={onChangeInput}
                  />
                </div>
                <div className="form__group">
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                    onChange={onChangeInput}
                  />
                </div>
                <div className="form__group">
                  <input
                    name="postalCode"
                    type="number"
                    placeholder="Postal code"
                    required
                    onChange={onChangeInput}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Payment
                </button>
              </form>
            </Col>

            <Col lg="4" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
