import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import supabase from "./config/supabaseClient"; // Import your Supabase client

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from Supabase
  const fetchTodos = async () => {
    const { data, error } = await supabase.from("Assessment").select("*");
    if (error) console.error("Error fetching todos:", error);
    else setTodos(data);
  };

  // Function to add a new todo
  const addTodo = async () => {
    if (inputValue.trim()) {
      const { error } = await supabase
        .from("Assessment")
        .insert([{ task: inputValue, completed: false }]);

      if (error) {
        console.error("Error adding todo:", error);
      } else {
        setInputValue("");
        fetchTodos(); // Fetch the todos again to reflect the newly added todo
      }
    }
  };

  // Function to toggle the completed status of a todo
  const toggleTodo = async (index) => {
    const todo = todos[index];
    const { error } = await supabase
      .from("Assessment")
      .update({ completed: !todo.completed })
      .eq("id", todo.id);
    if (error) console.error("Error updating todo:", error);
    else {
      const newTodos = [...todos];
      newTodos[index].completed = !newTodos[index].completed;
      setTodos(newTodos);
    }
  };

  // Function to remove a todo
  const removeTodo = async (index) => {
    const todo = todos[index];
    const { error } = await supabase
      .from("Assessment")
      .delete()
      .eq("id", todo.id);
    if (error) console.error("Error removing todo:", error);
    else {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    }
  };

  // Function to edit a todo task
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].task);
  };

  const updateTodo = async (index) => {
    const todo = todos[index];
    const { error } = await supabase
      .from("Assessment")
      .update({ task: editingText })
      .eq("id", todo.id);
    if (error) console.error("Error updating todo:", error);
    else {
      const newTodos = [...todos];
      newTodos[index].task = editingText;
      setTodos(newTodos);
      setEditingIndex(null);
      setEditingText("");
    }
  };

  // Function to remove all completed todos
  const removeCompleted = async () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    const { error } = await supabase
      .from("Assessment")
      .delete()
      .in(
        "id",
        completedTodos.map((todo) => todo.id)
      );
    if (error) console.error("Error removing completed todos:", error);
    else {
      const newTodos = todos.filter((todo) => !todo.completed);
      setTodos(newTodos);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-8xl  text-darkorange font-bold mb-10  font-kaushan">
        To-Do List
      </h1>
      <div className="flex mb-6 w-full max-w-md items-center space-x-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new to-do..."
          className="border rounded-lg w-full px-4 py-2 text-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition"
        >
          Add
        </button>
        <button
          onClick={removeCompleted}
          className="bg-red text-white px-4 py-2 rounded-lg hover:bg-red transition"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <ul className="list-none w-full max-w-md">
        {todos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 mb-2 bg-white shadow rounded-lg border hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span
                onClick={() => toggleTodo(index)}
                className={`cursor-pointer text-lg font-medium ${
                  todo.completed ? "line-through text-red-500" : "text-gray-900"
                }`}
              >
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border rounded-lg p-1 "
                  />
                ) : (
                  todo.task
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {editingIndex === index ? (
                <button
                  onClick={() => updateTodo(index)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-400"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              )}
              <button
                onClick={() => removeTodo(index)}
                className="bg-red text-white px-3 py-1 rounded-lg hover:bg-red"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
