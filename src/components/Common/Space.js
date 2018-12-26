import React from 'react'

const Space = (props) => {
  return (
    <div style={{
        height: props.height || 10,
        width: "100%",
        margin: 0
      }}>
    </div>
  )
}

export default Space;
