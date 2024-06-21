import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="decriptionbox">
      <div className="decriptionbox-navigator">
        <div className="decriptionbox-nav-box">Description</div>
        <div className="decriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="decriptionbox-description">
        <p>
          Electronic commerce (e-commerce) refers to companies and individuals
          that buy and sell goods and services over the internet. E-commerce
          operates in different types of market segments and can be conducted
          over computers, tablets, smartphones, and other smart devices. Nearly
          every imaginable product and service is available through e-commerce
          transactions, including books, music, plane tickets, and financial
          services such as stock investing and online banking.
        </p>
        <p>
          An ecommerce platform is a service that allows you to make money
          online through your own website. Shopify is an example of an ecommerce
          company that enables individuals, creators, and businesses of all
          sizes to sell online and in person through a brick-and-mortar store.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
