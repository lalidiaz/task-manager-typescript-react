import { ToDo } from "../model";
import { useState, useRef, useEffect } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: ToDo;
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));

    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`single-todo ${snapshot.isDragging && "drag"}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="single-done-text"
            />
          ) : todo.isDone ? (
            <s className="single-todo-text">{todo.todo}</s>
          ) : (
            <span className="single-todo-text">{todo.todo}</span>
          )}

          <div className="icons-container">
            <span
              className="single-icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <ModeEditOutlineIcon />
            </span>
            <span className="single-icon" onClick={() => handleDelete(todo.id)}>
              <DeleteIcon />
            </span>
            <span className="single-icon" onClick={() => handleDone(todo.id)}>
              <CheckCircleIcon />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
