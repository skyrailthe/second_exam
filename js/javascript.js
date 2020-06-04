function onPageLoaded() {
    const input = document.querySelector("input[type='text']");
    const ul = document.querySelector("ul.todos");
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");
    const editButton = document.querySelector("button.clear");
    const showTipsButton = document.querySelector("button.showTips");
    const closeTipsButton = document.querySelector("a.closeTips");
    const overlay = document.querySelector("#overlay");

    function createTodo() {
        const li = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.classList.add("todo-text");
        const newTodo = input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement("span");
        deleteBtn.classList.add("todo-trash");
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt");
        deleteBtn.appendChild(icon);

        const editBtn = document.createElement("span");
        deleteBtn.classList.add("todo-trash");
        icon.classList.add("fas", "fa-trash-alt");
        deleteBtn.appendChild(icon);

        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn);
    }

    function listenDeleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }

    function listenEditTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.edit();
            event.stopPropagation();
        });
    }

    function onClickTodo(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }

    saveButton.addEventListener("click", () => {
        localStorage.setItem("todos", ul.innerHTML);
    });

    clearButton.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem('todos', ul.innerHTML);
    });

    showTipsButton.addEventListener("click", () => {
        overlay.style.height = "100%";
    });

    closeTipsButton.addEventListener("click", () => {
        overlay.style.height = "0";
    });

    function loadTodos() {
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }

    loadTodos();

    input.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });
    ul.addEventListener("click", onClickTodo);
}

document.addEventListener("DOMContentLoaded", onPageLoaded);