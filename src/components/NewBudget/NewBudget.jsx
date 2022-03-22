import React from "react";

const NewBudget = () => {
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form action="" className="formulario">
        <div className="campo">
          <label htmlFor="">Definir Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="text"
            placeholder="Añade tu prespuesto"
          />
        </div>
        <input type="submit" value="Añadir" />
      </form>
    </div>
  );
};

export default NewBudget;
