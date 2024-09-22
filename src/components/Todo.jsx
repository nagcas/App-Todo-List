import { useState } from "react";

function Todo({ item, onUpdate, onDelete }) {
  // Stato per gestire se il todo è in modalità modifica o visualizzazione
  const [isEdit, setIsEdit] = useState(false);

  // Componente per il form di modifica del todo
  function FormEdit() {
    // Stato per memorizzare il nuovo valore dell'input quando si modifica il todo
    const [newValue, setNewValue] = useState(item.title);

    // Funzione che previene il refresh della pagina al submit del form
    function handleSubmit(e) {
      e.preventDefault();
    };

    // Aggiorna lo stato con il valore digitato dall'utente
    function handleChange(e) {
      const value = e.target.value;
      setNewValue(value);
    };

    // Gestisce il clic del bottone per aggiornare il todo
    function handleclickUpdateTodo() {
      onUpdate(item.id, newValue);  // Chiama la funzione di aggiornamento passata come prop
      setIsEdit(false);  // Esce dalla modalità di modifica
    };

    // Ritorna il form di modifica del todo
    return (
      <form className="todoUpdateForm" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="todoInput" 
          onChange={handleChange}  // Aggiorna lo stato del nuovo valore
          value={newValue}  // Imposta il valore dell'input al nuovo titolo del todo
        />
        <button className="button" onClick={handleclickUpdateTodo}>Update</button>  {/* Bottone per confermare l'aggiornamento */}
      </form>
    );
  };

  // Componente per visualizzare il todo in modalità di sola lettura
  function TodoElement() {
    return (
      <div className="todoInfo">
        {/* Mostra il titolo del todo */}
        <span className="todoTitle">{item.title}</span>
        {/* Bottone per entrare in modalità modifica */}
        <button className="button" onClick={() => setIsEdit(true)}>Edit</button>
        {/* Bottone per cancellare il todo */}
        <button className="buttonDelete" onClick={() => onDelete(item.id)}>Delete</button>
      </div>
    );
  };

  // Ritorna la visualizzazione condizionale del todo:
  // Se è in modalità modifica mostra il form, altrimenti mostra l'elemento normale
  return (
    <>
      <div className="todo">
        {isEdit ? <FormEdit /> : <TodoElement />}
      </div>
    </>
  );
};

export default Todo;

