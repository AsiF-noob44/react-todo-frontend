import { useEffect, useRef, useState } from "react";

const ModalForm = ({
  isOpen,
  onClose,
  initialTitle,
  initialDescription,
  onFormSubmit,
}) => {
  // Local states for title and description which will be pre-filled in case of editing
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) return; // Prevent submission if either field is empty
    onFormSubmit(trimmedTitle, trimmedDescription);
    setTitle("");
    setDescription("");
  };

  // If modal is not open, don't render anything, if open render the modal
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <div className="mb-4 text-center">
          {" "}
          <h2 className="text-xl font-semibold mb-4">
            {/* Add / Edit Todo */}
            {initialTitle ? "Edit Your Todo" : "Create Your Todo"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Title..."
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Description..."
          ></textarea>
          <div className="flex justify-end">
            {/* Close Button */}

            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 font-semibold"
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 disabled:opacity-50 font-semibold"
            >
              {initialTitle ? "Update Todo" : "Add Todo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
