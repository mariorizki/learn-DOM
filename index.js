let todos = []
let nextId = 0

const todoList = {
  displayTodo: () => {
    let todosUl = document.querySelector('ul')
    todosUl.innerHTML = ''

    todos.forEach(todo => {
      let todoLi = document.createElement('li')

      if (todo.completed) {
        todoLi.textContent = `ID: ${todo.id} - ${todo.todoText} [v]`
      } else {
        todoLi.textContent = `ID: ${todo.id} - ${todo.todoText} [x]`
      }

      todosUl.appendChild(todoLi)
    })
  },

  addTodo: todoText => {
    event.preventDefault()

    todos.push({
      id: nextId,
      todoText: todoText,
      completed: false
    })

    nextId++
  },

  deleteTodo: idNumber => {
    const deleted = todos.filter(todo => {
      return todo.id !== idNumber
    })

    todos = deleted
  },

  editTodo: (idNumber, todoText) => {
    todos.map(todo => {
      if (todo.id === idNumber) {
        return (todo.todoText = todoText)
      } else {
        return todos
      }
    })
  },

  toggleTodo: idNumber => {
    const toggleStatus = todos.map(todo => {
      if (todo.id === idNumber) {
        return (todo.completed = !todo.completed)
      } else {
        return todos
      }
    })
  },

  toggleAll: () => {
    const totalTodo = todos.length
    let totalCompleteTodo = 0

    todos.forEach(todo => {
      if (todo.completed === true) {
        totalCompleteTodo++
      }
    })

    if (totalCompleteTodo === totalTodo) {
      todos.map(todo => {
        return (todo.completed = false)
      })
    } else {
      todos.map(todo => {
        return (todo.completed = true)
      })
    }
  }
}

const handlers = {
  toggleAll: () => {
    todoList.toggleAll()
    todoList.displayTodo()
  },

  addTodo: () => {
    let addTodoText = document.getElementById('addTodoText')
    todoList.addTodo(addTodoText.value)

    addTodoText.value = ''
    todoList.displayTodo()
  },

  editTodo: () => {
    let inputTodoId = document.getElementById('inputTodoId')
    let inputNewTodo = document.getElementById('inputNewTodo')
    todoList.editTodo(inputTodoId.valueAsNumber, inputNewTodo.value)

    inputTodoId.value = ''
    inputNewTodo = ''
    todoList.displayTodo()
  },

  deleteTodo: () => {
    let inputDeleteTodoId = document.getElementById('inputDeleteTodoId')
    todoList.deleteTodo(inputDeleteTodoId.valueAsNumber)

    inputDeleteTodoId = ''
    todoList.displayTodo()
  }
}
