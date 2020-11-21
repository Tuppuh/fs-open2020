import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const styles = {
    success: {
      color: 'green',
      background: 'lightgreen',
      fontSize: 20,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    },
    error: {
      color: 'red',
      background: 'pink',
      fontSize: 20,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }

  if (notification === null){
    return null
  }

  return (
    <div style={styles[notification.status]} className='notification'>
      {notification.message}
    </div>
  )
}

export default Notification
