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
    const todosDiv = document.getElementById('todos');
    todosDiv.innerHTML = '';

    todoList.data.forEach(todo => {
      const todoLi = document.createElement('div');
      todoLi.setAttribute('class', 'tasks');

      if (todo.completed === true) {
        todoLi.innerHTML = `<span class="completed">${
          todo.todoText
        }</span> <button class="btn btn-danger" onclick="todoList.deleteTodo(${
          todo.id
        })">X</button> <button onclick="todoList.editTodo(${
          todo.id
        })" class="btn btn-warning">edit</button>`;
      } else {
        todoLi.innerHTML = `${
          todo.todoText
        } <button class="btn btn-danger" onclick="todoList.deleteTodo(${
          todo.id
        })">X</button> <button onclick="todoList.editTodo(${
          todo.id
        })" class="btn btn-warning">edit</button>`;
      }

      todosDiv.appendChild(todoLi);
    });
  },

  addTodo: todoText => {
    todoText.preventDefault();

    const newTodo = {
      id: nextId,
      todoText: document.getElementById('addTodoText').value,
      completed: false
    };

    if (newTodo !== '') {
      // Push new data
      todoList.data.push(newTodo);
      Storage.set(todoList.data);
      document.getElementById('addTodoText').value = '';
      nextId++;
      todoList.displayTodo();
    }
  },

  deleteTodo: idNumber => {
    const deleted = todoList.data.filter(todo => {
      return todo.id !== idNumber;
    });

    todoList.data = deleted;
    Storage.set(todoList.data);

    todoList.displayTodo();
  },

  editTodo: idNumber => {
    const textInput = prompt('Edit task to...');

    if (textInput !== null) {
      const edited = todoList.data.map(todo => {
        if (todo.id === id) {
          todo.todoText = textInput;
        }
        return todo;
      });

      todoList.data = edited;

      Storage.set(todoList.data);
      todoList.displayTodo();
    }
  },

  toggleTodo: idNumber => {
    const toggleStatus = todoList.data.map(todo => {
      if (todo.id === idNumber) {
        return (todo.completed = !todo.completed);
      } else {
        return todoList.data;
      }
    });

    Storage.set(todoList.data);
    todoList.displayTodo();
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
    todoList.data(displayTodo);
  }
};

todoList.displayTodo();
