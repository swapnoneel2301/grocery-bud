import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = ()=>{
  const list = localStorage.getItem('itemList');
  if(list!=null) return JSON.parse(list);
  return [];
}

function App() {
  
  const [item,setItem] = useState('');
  const [itemList,setItemList] = useState(getLocalStorage());
  const [isEditing,setIsEditing] = useState(false);
  const [editId,setEditId] = useState('');
  const [alert,setAlert] = useState({show:false,msg:'',type:''});

  const handleSubmit = (event)=>{
      event.preventDefault();
      if(item){
        const id = new Date().getTime().toString();
        setItemList([...itemList,{id,item}]);
        setItem('');
        setAlert({show:true,msg:'Item Added To The List',type:'success'});
      }else{
        setAlert({show:true,msg:'please enter value',type:'danger'});
      }
  }

  const handleEdit = (event)=>{
      event.preventDefault();
      if(item){
        const newItemList = itemList.map((objItem)=>{
            if(objItem.id===editId) return {id:editId,item};
            return objItem;
        })
        setItemList(newItemList);
        setItem('');
        setEditId('');
        setIsEditing(false);
        setAlert({show:true,msg:'value changed',type:'success'});
      }else{
        setAlert({show:true,msg:'please enter value',type:'danger'});
      }
  }

  const clearAllItems = ()=>{
    setItemList([]);
    setAlert({show:true,msg:'empty list',type:'danger'});
  }

  const deleteItem = (id)=>{
        const newItemList = itemList.filter((item)=> item.id!==id);
        setItemList(newItemList);
        setAlert({show:true,msg:'item removed',type:'danger'});
  }

  const editItem = (id)=>{
       setEditId(id);
       setIsEditing(true);
      const newItem = itemList.find((item)=>item.id===id);
      setItem(newItem.item);

  }

  useEffect(()=>{
     localStorage.setItem('itemList',JSON.stringify(itemList));
  },[itemList]);


  // alert clear
  useEffect(()=>{
    
    const timeGap=3000;
    const timer = setTimeout(()=>{
       setAlert({show:false,msg:'',type:''});
    },3000);

     return ()=>clearTimeout(timer);
  },[alert]);

  

  return <section className='section-center'>
    <form className='grocery-form' onSubmit={isEditing ? handleEdit : handleSubmit}>
      {alert.show && <Alert {...alert}/>}
      <h3>grocery bud</h3>
      <div className='form-control'>
         <input type="text" 
                className='grocery' 
                placeholder="e.g. eggs" 
                name="item" 
                id="item"
                value={item}
                onChange={(e)=>setItem(e.target.value)}
          ></input>
         <button type="submit" className='submit-btn'>
           {isEditing ? 'Edit' : 'Submit'}
         </button>
      </div>
    </form>
    {
      itemList.length>0
      && 
      <div className='grocery-container'>
          <List {...{itemList,deleteItem,editItem}}/>
          <button className='clear-btn' onClick={clearAllItems}>clear items</button>
      </div>
    }
    
  </section>
}

export default App;
