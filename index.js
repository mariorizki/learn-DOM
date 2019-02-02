let todos = [];
let nextId = 0;

const todoList = {
  displayTodo: () => {
    if (todos.length === 0) {
      console.log('Your todo is empty!');
    } else {
      todos.forEach(todo => {
        if (todo.complete === true) {
          console.log(`${todo.todoText} (X)`);
        } else {
          console.log(`${todo.todoText} ()`);
        }
      });
    }
  },

  addTodo: todoText => {
    todos.push({
      id: nextId,
      todoText: todoText,
      complete: false
    });

    nextId++;
  },

  deleteTodo: idNumber => {
    const deleted = todos.filter(todo => {
      return todo.id !== idNumber;
    });

    todos = deleted;
  },

  editTodo: (idNumber, todoText) => {
    todos.map(todo => {
      if (todo.id === idNumber) {
        return (todo.todoText = todoText);
      } else {
        return todos;
      }
    });
  },

  toggleTodo: idNumber => {
    const toggleStatus = todos.map(todo => {
      if (todo.id === idNumber) {
        return (todo.complete = !todo.complete);
      } else {
        return todos;
      }
    });
  },

  toggleAll: () => {
    const totalTodo = todos.length;
    let totalCompleteTodo = 0;

    todos.forEach(todo => {
      if (todo.complete === true) {
        totalCompleteTodo++;
      }
    });

    if (totalCompleteTodo === totalTodo) {
      todos.map(todo => {
        return (todo.complete = false);
      });
    } else {
      todos.map(todo => {
        return (todo.complete = true);
      });
    }
  }
};
