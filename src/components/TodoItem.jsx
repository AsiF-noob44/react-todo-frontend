import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
const TodoItem = ({ todo, todoCount, todoIndex, onEdit, onDelete }) => {
  return (
    <div className="flex items-start justify-between p-4 rounded-lg mb-3 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 text-white font-bold text-sm shadow-sm">
          {todoIndex}
        </div>
        <div className="text-xs text-gray-500 font-medium">
          of {todoCount}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800 mb-1">
          {todo.title}
        </h3>
        <p className="text-gray-600 mb-2">{todo.description}</p>
        <p className="text-xs text-gray-400">
          Created: {new Date(todo.createdAt).toLocaleString()}
        </p>
        {todo.updatedAt && todo.createdAt !== todo.updatedAt && (
          <p className="text-xs text-gray-400 mt-1">
            Updated: {new Date(todo.updatedAt).toLocaleString()}
          </p>
        )}
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <MdEdit size={20} />
        </button>

        <button
          onClick={() => onDelete(todo._id)}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <MdDeleteForever size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
