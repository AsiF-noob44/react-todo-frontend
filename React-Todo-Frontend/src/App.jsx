import { useState } from "react";
import ModalForm from "./components/ModalForm";
import TodoList from "./components/TodoList";

function App() {
  /*
  States -> 3
    1. todos -> array of todo objects
    2. isModalOpen -> boolean to track modal visibility
    3. editingTab-> null or todo object being edited
  */

  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTab, setEditingTab] = useState(null);

  // Function to Open Add Modal
  const openAddModal = () => {
    setIsModalOpen(true);
    setEditingTab(null);
  };

  // Function to handle adding a new todo
  const handleAddTodo = (title, description) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [...prev, newTodo]);
    setIsModalOpen(false);
  };

  // Function to Open Edit Modal
  const openEditModal = (todo) => {
    setEditingTab(todo);
    setIsModalOpen(true);
  };

  // Function to handle updating an existing todo
  const handleUpdateTodo = (id, updatedTitle, updatedDescription) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, title: updatedTitle, description: updatedDescription }
          : todo
      )
    );
    setIsModalOpen(false);
    setEditingTab(null);
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="max-w-5xl mx-auto">
          {/* Title & Submit Button */}

          <div className="text-center ">
            <h1 className="text-3xl font-bold my-5">Todo App</h1>
            <button
              onClick={openAddModal}
              className="px-4 py-2 my-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600  "
            >
              Create Todo
            </button>
          </div>
          {/* End of Title & Submit Button */}

          {/* Todo List */}
          <TodoList
            todos={todos}
            onEdit={openEditModal}
            onDelete={handleDeleteTodo}
          />
          {/* End of Todo List */}

          {/* Modal Form */}
          <ModalForm
            key={editingTab ? editingTab.id : "new"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            initialTitle={editingTab ? editingTab.title : ""}
            initialDescription={editingTab ? editingTab.description : ""}
            onFormSubmit={
              editingTab
                ? (title, description) =>
                    handleUpdateTodo(editingTab.id, title, description)
                : handleAddTodo
            }
          />
          {/* End of Modal Form */}
        </div>
      </div>
    </>
  );
}

export default App;
