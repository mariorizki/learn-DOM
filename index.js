let nextId = 0;

const Storage = {
  set: value => {
    if (value !== null) localStorage.setItem('tasks', JSON.stringify(value));
  },

  get: () => {
    const data = JSON.parse(localStorage.getItem('tasks'));
    if (data !== null) return data;
    else return [];
  }
};

const todoList = {
  data: Storage.get(),

  displayTodo: (data = todoList.data) => {
    let todosUl = document.getElementById('todos');
    todosUl.innerHTML = '';

    todoList.data.forEach(todo => {
      let todoLi = document.createElement('div');
      todoLi.setAttribute('class', 'tasks');

      if (todo.completed === true) {
        todoLi.innerHTML = `${
          todo.todoText
        } <button class="btn btn-btn-danger" onclick="todoList.deleteTodo(${
          todo.id
        })">X</button>`;
      } else {
        todoLi.innerHTML = `${
          todo.todoText
        } <button class="btn btn-danger" onclick="todoList.deleteTodo(${
          todo.id
        })">X</button>`;
      }

      todosUl.appendChild(todoLi);
    });
  },

  addTodo: todoText => {
    event.preventDefault();

    todoList.data.push({
      id: nextId,
      todoText: todoText,
      completed: false
    });

    Storage.set(todoList.data);

    nextId++;
  },

  deleteTodo: idNumber => {
    const deleted = todoList.data.filter(todo => {
      return todo.id !== idNumber;
    });

    todoList.data = deleted;
    Storage.set(todoList.data);

    todoList.displayTodo();
  },

  editTodo: (idNumber, todoText) => {
    todoList.data.map(todo => {
      if (todo.id === idNumber) {
        return (todo.todoText = todoText);
      } else {
        return todoList.data;
      }
    });

    Storage.set(todoList.data);
    todoList.displayTodo();
  },

  toggleTodo: idNumber => {
    const toggleStatus = todoList.data.map(todo => {
      if (todo.id === idNumber) {
        return (todo.completed = !todo.completed);
      } else {
        return todos;
      }
    });

    Storage.set(todoList.data);
  },

  toggleAll: () => {
    const totalTodo = todoList.data.length;
    let totalCompleteTodo = 0;

    todoList.data.forEach(todo => {
      if (todo.completed === true) {
        totalCompleteTodo++;
      }
    });

    if (totalCompleteTodo === totalTodo) {
      todoList.data.map(todo => {
        return (todo.completed = false);
      });
    } else {
      todoList.data.map(todo => {
        return (todo.completed = true);
      });
    }

    Storage.set(todoList.data);
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
  }
};
