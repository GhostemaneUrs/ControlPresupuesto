import React, { useState } from "react";
import Message from "../Message/Message";

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setBudget(Number(e.target.value));
  };

  const onSubmitBudget = (e) => {
    e.preventDefault();
    if (!budget || budget < 0) {
      setMessage("Please enter a valid budget");
      setBudget(0);
      return;
    }
    setMessage("");
    setIsValidBudget(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form action="" className="formulario" onSubmit={onSubmitBudget}>
        <div className="campo">
          <label htmlFor="">Define Budget</label>
          <input
            type="number"
            value={budget}
            className="nuevo-presupuesto"
            placeholder="Enter Your Budget"
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Add your budget" />
        {message && <Message type="error"> {message} </Message>}
      </form>
    </div>
  );
};

export default NewBudget;
