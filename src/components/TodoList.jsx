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
      <div className="mb-4 p-4 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
        <p className="text-sm font-semibold text-gray-700">
          <span className="text-blue-600">📊 Total Todos:</span>
          <span className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white font-bold text-lg">
            {todoCount}
          </span>
        </p>
      </div>

      {/* Todo Items */}
      <div className="space-y-3">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo._id}
            todo={todo}
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
