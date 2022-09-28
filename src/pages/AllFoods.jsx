import React, { useMemo, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";

import products from "../assets/fake-data/products";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";

import "../styles/all-foods.css";
import "../styles/pagination.css";

const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const [sortBy, setSortBy] = useState("all");

  const searchedProduct = useMemo(() => {
    const productsAfterSearch = products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "asc") {
      return productsAfterSearch.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    } else if (sortBy === "desc") {
      return productsAfterSearch
        .sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
        .reverse();
    } else if (sortBy === "highPrice") {
      return productsAfterSearch.sort((a, b) => a.price - b.price);
    } else if (sortBy === "lowPrice") {
      return productsAfterSearch.sort((a, b) => a.price - b.price).reverse();
    } else {
      return productsAfterSearch;
    }
  }, [searchTerm, sortBy]);

  const productPerPage = 12;
  const visitedPage = pageNumber * productPerPage;
  const productsDisplay = searchedProduct.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProduct.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="All-Foods">
      <CommonSection title="All Foods" />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between ">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select
                  className="w-50"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="all">Default</option>
                  <option value="asc">Alphabetically, A-Z</option>
                  <option value="desc">Alphabetically, Z-A</option>
                  <option value="highPrice">High Price</option>
                  <option value="lowPrice">Low Price</option>
                </select>
              </div>
            </Col>

            {productsDisplay.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                <ProductCard item={item} />
              </Col>
            ))}

            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                previousLabel={"Prev"}
                nextLabel={"Next"}
                containerClassName=" paginationBttns "
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
