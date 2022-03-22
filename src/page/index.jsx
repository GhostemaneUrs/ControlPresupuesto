import React from "react";
import Header from "../components/Header/Header";
import NewBudget from "../components/NewBudget/NewBudget";

const index = () => {
  return (
    <>
      <div className="container-bg">
        <Header />
        <div className="container-1400">
          <NewBudget />
        </div>
      </div>
    </>
  );
};

export default index;
