import TaskItem from './TaskItem';

function TaskList({
  tasks,
  editingTaskId,
  editingText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange
}) {
  let taskElements = [];
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let isEditing = editingTaskId === task.id;
    
    taskElements.push(
      <TaskItem
        key={task.id}
        task={task}
        isEditing={isEditing}
        editingText={editingText}
        onToggle={onToggle}
        onDelete={onDelete}
        onStartEdit={onStartEdit}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
        onEditTextChange={onEditTextChange}
      />
    );
  }

  return (
    <ul className="task-list">
      {taskElements}
    </ul>
  );
}

export default TaskList;
