import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

const [todo, setTodo] = useState('')
const [todos,setTodos] = useState([]);


useEffect(()=>{
  let todoString = localStorage.getItem("todos");
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"));
  setTodos(todos);
  }

},[]);

const saveToLocalStorage = ()=>{
  localStorage.setItem("todos",JSON.stringify(todos));
}

  const handleAdd= ()=>{
     setTodos([...todos,{id: uuidv4(),todo,isCompleted:false}]);
     setTodo("");

     saveToLocalStorage();
  }

  const handleChange = (e)=>{
    setTodo(e.target.value);
  }

  const handleEdit = (e,id)=>{
      let t = todos.filter(i=>i.id === id)
      setTodo(t[0].todo);


      let newTodos = todos.filter(items=>{
        return items.id!==id;
      });
      setTodos(newTodos);

      saveToLocalStorage();
  }

  const handleDelete = (e,id)=>{
      let newTodos = todos.filter(items=>{
        return items.id!==id;
      });
      setTodos(newTodos);

      saveToLocalStorage();
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

    saveToLocalStorage();
  }



  return (
    <>
  <Navbar/>
   <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">

      <div className="add-todo my-5">
        <h2 className='text-lg font-bold'>Add a Task</h2>
        <input type="text" className='w-1/5 px-2' onChange={handleChange} value={todo}/>
        <button className='bg-violet-800 text-white hover:bg-white hover:text-violet-800 transition-all duration-75 rounded-md m-2 py-1 p-3 font-bold mx-6' onClick={handleAdd}>Add</button>
      </div>
      <h2 className="text-xl font-bold">My Tasks</h2>
      <div className="todos">
       
      {todos.length===0 &&  <div className='m-5'>No Tasks to display.</div>}

        {todos.map(items=>{
        return<div key={items.id} className="todo flex w-1/2 justify-between my-3">
          <div className="flex gap-5">
          <input name={items.id} type="checkbox" value={items.isCompleted} onChange={handleCheckbox}/>
          <div className={items.isCompleted?"line-through my-3":"my-3"}>{items.todo}</div>

          </div>
            <div className="buttons flex h-full">
              <button className='bg-violet-800 text-white hover:bg-white hover:text-violet-800 transition-all duration-75 rounded-md m-2 py-1 p-3 font-bold mx-2' onClick={(e)=>{handleEdit(e,items.id)}}>Edit</button>
              <button className='bg-violet-800 text-white hover:bg-white hover:text-violet-800 transition-all duration-75 rounded-md m-2 py-1 p-3 font-bold mx-2' onClick={(e)=>{handleDelete(e,items.id)}}>Delete</button>
            </div>
        </div>
          })}
      </div>
   </div>
    </>
  )
}

export default App
