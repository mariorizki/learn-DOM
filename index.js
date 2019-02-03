let todos = [];
let nextId = 0;

const todoList = {
  displayTodo: () => {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todos.forEach(todo => {
      let todoLi = document.createElement('li');
      todoLi.textContent = `ID: ${todo.id} - ${todo.todoText}`;
      todosUl.appendChild(todoLi);
    });
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

const handlers = {
  toggleAll: () => {
    todoList.toggleAll();
    todoList.displayTodo();
  },

  addTodo: () => {
    let addTodoText = document.getElementById('addTodoText');
    todoList.addTodo(addTodoText.value);

    addTodoText.value = '';
    todoList.displayTodo();
  },

  editTodo: () => {
    let inputTodoId = document.getElementById('inputTodoId');
    let inputNewTodo = document.getElementById('inputNewTodo');
    todoList.editTodo(inputTodoId.valueAsNumber, inputNewTodo.value);

    inputTodoId.value = '';
    inputNewTodo = '';
    todoList.displayTodo();
  },

  deleteTodo: () => {
    let inputDeleteTodoId = document.getElementById('inputDeleteTodoId');
    todoList.deleteTodo(inputDeleteTodoId.valueAsNumber);

    inputDeleteTodoId = '';
    todoList.displayTodo();
  }
};
