import "./TodoApp.css";

import { useState } from "react";
import Todo from "./Todo";

function TodoApp() {
  // Stato per gestire il titolo del todo corrente
  const [title, setTitle] = useState("Buongiorno");
  
  // Stato per gestire la lista dei todos
  const [todos, setTodos] = useState([]);

  // Funzione per aggiornare il titolo mentre l'utente digita
  function handleChange(event) {
    const value = event.target.value;
    setTitle(value);  // Aggiorna lo stato con il nuovo valore
  };

  // Funzione per gestire l'invio del form e creare un nuovo todo
  function handleSubmit(e) {
    e.preventDefault();  // Previene il refresh della pagina

    // Crea un nuovo todo con un ID univoco e lo stato "completed" a false
    const newTodo = {
      id: crypto.randomUUID(),  // Crea un ID unico per ogni todo
      title: title,
      completed: false,
    };

    // Aggiunge il nuovo todo all'inizio della lista
    const temp = [...todos];  // Crea una copia della lista attuale di todos
    temp.unshift(newTodo);  // Aggiunge il nuovo todo in cima alla lista
    setTodos(temp);  // Aggiorna lo stato con la nuova lista di todos
    setTitle("");  // Resetta il campo di input dopo l'invio
  };

  // Funzione per aggiornare il titolo di un todo esistente
  function handleUpdate(id, value) {
    const temp = [...todos];  // Crea una copia della lista attuale di todos
    const item = temp.find((item) => item.id === id);  // Trova il todo corrispondente per ID
    item.title = value;  // Aggiorna il titolo del todo
    setTodos(temp);  // Aggiorna lo stato con la lista modificata
  };

  // Funzione per eliminare un todo dalla lista
  function handleDelete(id) {
    const temp = todos.filter(item => item.id !== id);  // Filtra tutti i todos tranne quello da eliminare
    setTodos(temp);  // Aggiorna lo stato con la nuova lista
  };

  // Render della componente
  return (
    <div className="todoContainer">
      <h1>Todo List</h1>
      
      {/* Form per creare un nuovo todo */}
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input 
          onChange={handleChange}  // Gestisce l'aggiornamento del titolo
          className="todoInput" 
          value={title}  // Imposta il valore del campo di input
        />
        <input
          onClick={handleSubmit}  // Invia il form al clic sul bottone
          type="submit" 
          value="Create Todo" 
          className="buttonCreate"
        />
      </form>

      {/* Lista dei todos */}
      <div className="todosContainer">
        {
          todos.map((item) => (
            // Render di ciascun Todo, con funzionalità di aggiornamento e cancellazione
            <Todo 
              key={item.id} 
              item={item} 
              onUpdate={handleUpdate}  // Funzione per aggiornare un todo
              onDelete={handleDelete}  // Funzione per cancellare un todo
            />
          ))
        }
      </div>
    </div>
  );
}

export default TodoApp;

