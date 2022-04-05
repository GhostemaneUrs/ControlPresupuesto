import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { formatAmount } from "../../helpers/functions";
import savingIcon from "../../assets/img/icono_ahorro.svg";
import homeIcon from "../../assets/img/icono_casa.svg";
import foodIcon from "../../assets/img/icono_comida.svg";
import leisureIcon from "../../assets/img/icono_ocio.svg";
import healthIcon from "../../assets/img/icono_salud.svg";
import subscriptionsIcon from "../../assets/img/icono_suscripciones.svg";
import miscellaniousExpenseIcon from "../../assets/img/icono_gastos.svg";

const ListBudget = ({ expenses, setExpensesEdit, deleteExpense }) => {
  const dictionaryIcon = {
    saving: savingIcon,
    home: homeIcon,
    food: foodIcon,
    leisure: leisureIcon,
    health: healthIcon,
    subscriptions: subscriptionsIcon,
    miscellaniousExpense: miscellaniousExpenseIcon,
  };

  const leadingActions = (expense) => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpensesEdit(expense)}>Editar</SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (expense) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => deleteExpense(expense.id)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <main>
      <div className="listado-gastos contenedor">
        <h2>{expenses.length ? "Expenses" : "You have no expenses yet"}</h2>
        <div className="scroll">
          {expenses.map((expense) => (
            <SwipeableList key={expense.id}>
              <SwipeableListItem
                leadingActions={leadingActions(expense)}
                trailingActions={trailingActions(expense)}
              >
                <div className="gasto sombra">
                  <div className="contenido-gasto">
                    <img src={dictionaryIcon[expense.category]} alt="icono" />
                    <div className="descripcion-gasto">
                      <p className="categoria">{expense.category}</p>
                      <p className="nombre-gasto"> {expense.expenseName}</p>
                      <p className="fecha-gasto">
                        {" "}
                        Agregado el: {""} {expense.date}
                      </p>
                    </div>
                  </div>
                  <p className="cantidad-gasto">
                    {formatAmount(expense.amount)}
                  </p>
                </div>
              </SwipeableListItem>
            </SwipeableList>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ListBudget;
