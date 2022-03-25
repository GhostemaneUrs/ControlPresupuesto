import React, { useState } from "react";
import closeModal from "../../assets/img/cerrar.svg";
import Message from "../Message/Message";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const NewBudgetModal = ({
  saveExpense,
  isAnimateModal,
  setIsActiveModal,
  setIsAnimateModal,
}) => {
  const uniqueId = uuidv4();
  const [message, setMessage] = useState("");
  const [dataForm, setDataForm] = useState({
    id: "",
    expenseName: "",
    amount: "",
    category: "",
    date: Date.now(),
  });

  const handleCloseModal = () => {
    setIsAnimateModal(false);
    setTimeout(() => {
      setIsActiveModal(false);
    }, 500);
  };

  const resetForm = () => {
    setDataForm({
      expenseName: "",
      amount: "",
      category: "",
    });
  };

  const onSubmitExpense = (e) => {
    e.preventDefault();

    if (
      dataForm.expenseName === "" ||
      dataForm.amount === "" ||
      dataForm.category === ""
    ) {
      setMessage("All fields are required!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    dataForm.id = uniqueId;
    dataForm.date =  format(dataForm.date, "dd/MM/yyyy");
    saveExpense(dataForm);
    resetForm();
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={closeModal} alt="close modal" onClick={handleCloseModal} />
      </div>
      <form
        className={`formulario ${isAnimateModal ? "animar" : "cerrar"}`}
        onSubmit={onSubmitExpense}
      >
        <legend>New Expense</legend>
        {message && <Message type="error"> {message} </Message>}
        <div className="campo">
          <label htmlFor="expense">Expense Name</label>
          <input
            type="text"
            name="name-expense"
            placeholder="Add the name of the expense"
            value={dataForm.expenseName}
            onChange={(e) =>
              setDataForm({ ...dataForm, expenseName: e.target.value })
            }
            id="name-expense"
          />
        </div>
        <div className="campo">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            placeholder="Add the amount of the expense"
            value={dataForm.amount}
            onChange={(e) =>
              setDataForm({ ...dataForm, amount: Number(e.target.value) })
            }
            id="amount"
          />
        </div>
        <div className="campo">
          <label htmlFor="categort">Category</label>
          <select
            name="category"
            id="category"
            value={dataForm.category}
            onChange={(e) =>
              setDataForm({ ...dataForm, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            <option value="saving">Saving</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="miscellaniousExpense">
              Miscellaneous Expenses
            </option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <input type="submit" value="Add Expense" id="add-expense" />
      </form>
    </div>
  );
};

export default NewBudgetModal;
