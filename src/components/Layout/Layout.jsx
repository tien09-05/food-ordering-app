import React, { useState } from "react";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";

const Layout = () => {
  const [isVisibleCart, setIsVisibleCart] = useState(false);

  const toggleCart = () => {
    setIsVisibleCart(!isVisibleCart);
  };
  return (
    <div>
      <Header toggleCart={toggleCart} />

      {isVisibleCart && <Carts toggleCart={toggleCart} />}
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
