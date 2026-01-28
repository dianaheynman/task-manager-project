import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAdd(trimmedText);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="הכנס משימה חדשה"
        aria-label="טקסט המשימה"
      />
      <button type="submit">הוסף</button>
    </form>
  );
}

export default TaskForm;
