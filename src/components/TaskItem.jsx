function TaskItem({
  task,
  isEditing,
  editingText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange
}) {
  let itemClassName = "task-item";
  if (task.completed) {
    itemClassName = itemClassName + " completed";
  }

  let content;
  if (isEditing) {
    content = (
      <div className="task-edit-inline">
        <input
          type="text"
          value={editingText}
          onChange={(e) => onEditTextChange(e.target.value)}
          autoFocus
        />
        <button className="save-btn" onClick={onSaveEdit}>Save</button>
        <button className="cancel-btn" onClick={onCancelEdit}>Cancel</button>
      </div>
    );
  } else {
    content = (
      <>
        <div className="task-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="task-text">{task.text}</span>
        </div>
        <div className="task-actions">
          <button className="edit" onClick={() => onStartEdit(task)}>Edit</button>
          <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </>
    );
  }

  return (
    <li className={itemClassName}>
      {content}
    </li>
  );
}

export default TaskItem;
