import React, { useEffect } from 'react'

const Alert = ({msg,type}) => {
   return <p className={`alert alert-${type}`}>{msg}</p>
  // if(addAlert)
  //    return <p className='alert alert-success'>Item Added To The List</p>
  // if(emptyAlert)
  //    return <p className='alert alert-danger'>please enter value</p>
  // if(editAlert)
  //    return <p className='alert alert-success'>value changed</p>
  // if(deleteAlert)
  //    return <p className='alert alert-danger'>item removed</p>
  // if(clearAlert)
  //   return <p className='alert alert-danger'>empty list</p>
  // return null;
}

export default Alert
