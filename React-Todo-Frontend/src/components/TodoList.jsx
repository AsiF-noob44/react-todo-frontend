import TodoItem from "./TodoItem";

const TodoList = ({ todos, onEdit, onDelete }) => {
  if (!todos || todos.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No todos available. Please add some todos first.
      </div>
    );
  }
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
