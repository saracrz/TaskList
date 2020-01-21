function toDo(){
  //LocalStorage
  let data = localStorage.getItem("todoList") ? JSON.parse(
    localStorage.getItem("todoList")) : {items: []};
  function updateLocalStorage(){
      localStorage.setItem("todoList", JSON.stringify(data));
  }
  
  let todo = document.querySelector('#todo');
  let completed = document.querySelector('#completed');
  let item = document.querySelector('#item');
    document.querySelector("#add").addEventListener("click", add_item);//button add task
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
      todo.addEventListener("click", btnClick);
      completed.addEventListener("click", btnClick);
    }

  //Have ID Element and Buttons remove and complete
  function btnClick(event){
    let target = event.target;
    if(target.tagName!=="BUTTON")return;
      console.log('clicked on button');
    let li = target.parentNode.parentNode;
    let data_id = parseInt(li.getAttribute('data-id'));
    if(target.className == "remove" ){
      removeItem(data_id);
      alert("Are you sure you want to delete Task?");
      console.log("removing");
      
    }
    if(target.className == "completed" ){
      updateItem(data_id);
      console.log("removing");
    }
    updateLocalStorage();//save changes in LS also
    li.parentNode.removeChild(li);
  }
  
  function removeItem(search){
    data.items = data.items.filter(function(el){
      return el.id !== search;
      
    });
  }
  function updateItem(search){
    for(let j = 0; j= data.items.length; j++){
      if(data.items[j].id == search){
        data.items[j].completed =! data.items[j].completed;
        attachToDom(data.items[j]);
        break;
      }
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
  //Add Tasks to the list and print it
  function attachToDom(data){
    let placeholder = data.completed ? completed : todo;
    placeholder.innerHTML += render(data);
  }
  function render(data){
    return `
      <li data-id="${data.id}">${data.value}
            <div class="buttons">
              <button class="complete">Y
              </button>
              <button class="remove">X</button>
            </div>
          </li>
      `;
  } 

  

}toDo();