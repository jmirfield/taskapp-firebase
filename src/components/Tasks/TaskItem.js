import classes from './TaskItem.module.css';

const TaskItem = (props) => {
  const deleteTask = () => {
    props.onDelete(props.id)
  }
  return <li className={classes.task}>
    {props.children}
    <div className={classes.cell}>
      <button onClick={deleteTask}>X</button>
    </div>
  </li>
};

export default TaskItem;