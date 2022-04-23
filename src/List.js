import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({itemList,deleteItem,editItem}) => {
  if(itemList.length===0) return null;
  return  <div className='grocery-list'> 
        {
          itemList.map(({id,item})=>{
            return <article className='grocery-item' key={id}>
              <p className='title'>{item}</p>
              <div className='btn-container'>
                <button type="button" className='edit-btn' onClick={()=>editItem(id)}>
                  <FaEdit />
                </button>
                <button type="button" className='delete-btn' onClick={()=>deleteItem(id)}>
                  <FaTrash />
                </button>
              </div>
            </article>
          })
        }
      </div>
      
}

export default List
