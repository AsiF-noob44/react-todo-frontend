import { useState, useEffect } from "react";
import ModalForm from "./components/ModalForm";
import TodoList from "./components/TodoList";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/todos";

function App() {
  /*
  States -> 3
    1. todos -> array of todo objects
    2. isModalOpen -> boolean to track modal visibility
    3. editingTab-> null or todo object being edited
  */

  const [todos, setTodos] = useState([]);
  const [todoCount, setTodoCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTab, setEditingTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch todos from backend on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      const result = await response.json();

      if (result.success) {
        setTodos(result.data);
        setTodoCount(result.count || result.data.length);
      } else {
        setError("Failed to fetch todos");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to Open Add Modal
  const openAddModal = () => {
    setIsModalOpen(true);
    setEditingTab(null);
  };

  // Function to handle adding a new todo
  const handleAddTodo = async (title, description) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const result = await response.json();

      if (result.success) {
        setTodos((prev) => [result.data, ...prev]);
        setIsModalOpen(false);
      } else {
        alert(result.message || "Failed to create todo");
      }
    } catch (err) {
      alert("Error creating todo");
      console.error("Create error:", err);
    }
  };

  // Function to Open Edit Modal
  const openEditModal = (todo) => {
    setEditingTab(todo);
    setIsModalOpen(true);
  };

  // Function to handle updating an existing todo
  const handleUpdateTodo = async (id, updatedTitle, updatedDescription) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setTodos((prev) =>
          prev.map((todo) => (todo._id === id ? result.data : todo))
        );
        setIsModalOpen(false);
        setEditingTab(null);
      } else {
        alert(result.message || "Failed to update todo");
      }
    } catch (err) {
      alert("Error updating todo");
      console.error("Update error:", err);
    }
  };

  // Function to handle deleting a todo
  const handleDeleteTodo = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (result.success) {
          setTodos((prev) => prev.filter((todo) => todo._id !== id));
        } else {
          alert(result.message || "Failed to delete todo");
        }
      } catch (err) {
        alert("Error deleting todo");
        console.error("Delete error:", err);
      }
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
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            <button
              onClick={openAddModal}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
              + Create Todo
            </button>
          </div>
          {/* End of Title & Submit Button */}

          {/* Todo List */}
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading todos...</p>
            </div>
          ) : (
            <TodoList
              todos={todos}
              todoCount={todoCount}
              onEdit={openEditModal}
              onDelete={handleDeleteTodo}
            />
          )}
          {/* End of Todo List */}

          {/* Modal Form */}
          <ModalForm
            key={editingTab ? editingTab._id : "new"}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            initialTitle={editingTab ? editingTab.title : ""}
            initialDescription={editingTab ? editingTab.description : ""}
            onFormSubmit={
              editingTab
                ? (title, description) =>
                    handleUpdateTodo(editingTab._id, title, description)
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
