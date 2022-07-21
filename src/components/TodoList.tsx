import { ToDo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  completedTodos: ToDo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const TodoList = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
    <>
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todo-list ${snapshot.isDraggingOver && "drag-active"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="heading">Active Tasks</span>
            <ul className="todos-list-container">
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todo-list  ${snapshot.isDraggingOver ? "drag-complete" : "remove"}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="heading">Completed Tasks</span>
            <ul className="todos-list-container">
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  key={todo.id}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />
              ))}
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default TodoList;
