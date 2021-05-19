import React from "react";

const Display = (props) => {

  //destructure the dogs from props
  const { pedicabbers } = props
  
  const loaded = () =>(
    <div style={{textAlign: 'center'}}>
      {pedicabbers.map((pedicabber)=>(
        <article key={pedicabber.id}>
          {/* <img src={pedicabber.img}/> */}
          <h1>{pedicabber.name}</h1>
          <h3>{pedicabber.homeMarket}</h3>
          <button onClick={()=>{
            props.selectPedicabber(pedicabbers)
            props.history.push("/edit")}}>Edit</button>
          <button onClick={()=>{props.deletePedicabber(pedicabber)}}>Delete</button>
        </article>
      ))}
    </div>
  )

  //loading function in case of no dogs
  const loading = ()=><h1>Loading</h1>

  // return <h1>Display</h1>;
  return pedicabbers.length >0 ? loaded() : loading()
};

export default Display;
