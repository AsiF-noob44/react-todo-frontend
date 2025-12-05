import TodoItem from "./TodoItem";

const TodoList = ({ todos, todoCount, onEdit, onDelete }) => {
  if (!todos || todos.length === 0) {
    return (
      <div className="text-center bg-white rounded-xl shadow-md p-12 mt-4">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-gray-500 text-lg">No todos yet!</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first todo to get started
        </p>
      </div>
    );
  }
  return (
    <div className="mt-4">
      {/* Total Todos Counter */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm font-semibold text-blue-700">
          📊 Total Todos: <span className="text-lg">{todoCount}</span>
        </p>
      </div>

      {/* Todo Items */}
      <div className="space-y-3">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            todoCount={todoCount}
            todoIndex={index + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
