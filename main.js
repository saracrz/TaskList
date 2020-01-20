function toDo(){

  let data = localStorage.getItem("todoList") ? JSON.parse(
    localStorage.getItem("todoList")) : {items: []};

  function updateLocalStorage(){
      localStorage.setItem("todoList", JSON.stringify(data));
  }

  let todo = document.querySelector('#todo');
  let completed = document.querySelector('#completed');
  let item = document.querySelector('#item');
    document.querySelector("#add").addEventListener("click", add_item);
    item.addEventListener("keydown", function(e){
      if(e.code === "Enter"){
        add_item();
      }
      
    });
    //Print items saved in Local Storage
    if(data.items){
      for(let i = 0; i<data.items.length; i++){
          attachToDom(data.items[i]);
      }
    }

  function add_item(){
    if(!item.value)return;
    let current_item ={
      id: Math.floor(Math.random()*100),
      value: item.value, 
      completed: false
    }
    data.items.push(current_item);
    attachToDom(current_item);//attaching elements to print
    item.value = '';
    updateLocalStorage();
  }
  //Add Tasks to the list
  function attachToDom(data){
    let placeholder = data.completed ? completed : todo;
    placeholder.innerHTML += render(data);
  }
  function render(data){
    return ` <ul class="todo" id="completed"> 
      <li>${data.value}
            <div class="buttons">
              <button class="remove">Y</button>
              <button class="complete">N</button>
            </div>
          </li>
           </ul>
      `;
  } 

}toDo();