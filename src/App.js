import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 12, packed: false },
  
]; 

export default function App(){

  const [items , setItems] = useState(initialItems);
  // const [numItems , setNumItems] = useState(0); 
  //use derived state



  function handleAddItems(item){
    setItems((items) => [...items, item ]); 
   }

   function handleDeleteItem(id){
    setItems(items => items.filter(item => item.id !== id));
   }


  function handleToggleItem(id){
   
    setItems((items) =>
    items.map((item) => 
      item.id === id ? {...item, packed:  !item.packed}  :item
    ));
  } 

return(
   <div className="app"> 
   <Logo/>
   <Form onAddItems={handleAddItems}/>
   <PackingList items={items}  onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}/>
   <Stats items={items}/> 
</div>
 );
}



function Logo(){
  return <h1> 🏝 Far Away 🧳 </h1>
}


function Form({onAddItems}){

  const [description , setDescription] = useState("");
  const [quantity , setQuantity] = useState(1);


 

  function handleSubmit(e){
   e.preventDefault();

   if(!description)  return;
    //  console.log(e);
   const newItem = { description , quantity , packed: false , id:Date.now()};
   console.log(newItem);

   onAddItems(newItem);


  //  we set it when page refereshes it the gets back to original form the input area(textfield)..
   setDescription("");
   setQuantity(1); 
   }
  //
 return ( 
 <form className="add-form"  onSubmit={handleSubmit}>
  <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
   {Array.from({length:20} , (_ , i) =>  i+1).map((num) => (<option value={num} key={num}>{num}</option>))}
  </select>
  <input type="text" 
   placeholder="Item.."
   value={description}  
   onChange={(e) => setDescription(e.target.value)}/>
  <button>Add</button>
 </form> 
 ); 
} 


function PackingList({items}){
 return(  
 <div className="list"><ul className="list">
  {items.map(item => <Item item={item} key={item.id}/>)} 
  </ul> 
  </div>
  ); 
  
}


function Item({item ,  onDeleteItem , onToggleItem}){
  return (
  <li>
    <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}></input>
  <span style={item.packed ? {textDecoration:'line-through'} : {}} >{item.quantity} {item.description}</span> 
  <button onClick={() => onDeleteItem(item.id)} >❌&times;</button> 
  </li>
  );
}


function Stats({items}){

  if(!items.length) return <p className="footer">
 <em> Start adding some items to your packing list</em>
  </p>

  const numItems = items.length;
  const numPacked  = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);


  return(
   <footer className="stats">
    <em>
    { 
    percentage === 100 ? 'You got everything! Ready to go ':
    `🧳 You have ${numItems} items on your list, and you already 
    packed ${numPacked} (${percentage}%)`
    }
    </em>
     
   </footer> 
  );
}
