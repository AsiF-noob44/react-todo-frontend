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
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title & Submit Button */}

          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              📝 Todo App
            </h1>
            <p className="text-gray-600 mb-6">
              Organize your tasks efficiently
            </p>
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              + Create Todo
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
