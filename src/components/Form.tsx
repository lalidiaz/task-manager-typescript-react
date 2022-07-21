import React, { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const Form = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <h3 className="heading">Add a task</h3>
      <div className="form-content">
        <input
          ref={inputRef}
          type="input"
          placeholder="Enter a task"
          className="form-input"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="form-btn" type="submit">
          <AddIcon />
        </button>
      </div>
    </form>
  );
};

export default Form;
