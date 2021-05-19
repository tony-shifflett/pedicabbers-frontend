import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

// URL in a variable
const url ="https://pedicabbers.herokuapp.com"

//State to hold dogs
const [pedicabbers, setPedicabbers] = React.useState([])

//Empty Dog - For the Create Form 
const emptyPedicabber = {
  name: "",
  email: "", 
  emergencyContact: "",
  homeMarket: ""
}

//new state to track selected pedicabber for edit form 
const [selectedPedicabber, setSelectedPedicabber] = React.useState(emptyPedicabber)

///Function to get list of pedicabber
const getPedicabbers = ()=>{
  //make a get request
  fetch(url +'/pedicabber/')
  //use .then to take action when the response comes in
  //convert data into js object
  .then((response)=>response.json())
  //use the data from the response
  .then((data)=>{
    setPedicabbers(data)
  })
}

// useEffect, to get the data right away
React.useEffect(()=>{
  getPedicabbers()
},[])

//handleCreate - function for when ceate form is submitted
const handleCreate = (newPedicabber)=>{
  //object parameter allows you to modify fetch 
  fetch(url + '/pedicabber/', {
    method: 'POST',
    //headers provides more information to the middleware
    headers: {
      "Content-Type": "application/json"
    },
    //takes javascript object and turns it into json
    body: JSON.stringify(newPedicabber)
  })
  .then (()=>getPedicabbers())
}


  const handleUpdate = (pedicabber) => {
    fetch(url + "/pedicabber/" + pedicabber._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(pedicabber)
    })
    .then(() => getPedicabbers())
  }

//function to specify dog to update
const selectPedicabber=(pedicabber)=>{
  setSelectedPedicabber(pedicabber)
}

//function to delete dog
const deletePedicabber=(pedicabber)=>{
  fetch(url + "/pedicabber/"+pedicabber._id, {
    method: "delete"
  })
  .then(()=>{
    getPedicabbers()
  })
}
  return (
    <div className="App">
      <h1>Pedicabbers</h1>
      <hr />
      <Link to="/create">
        <button>Add Pedicabber</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => (<Display 
          {...rp} 
          pedicabbers={pedicabbers}
          selectPedicabber={selectPedicabber}
          deletePedicabber = {deletePedicabber}
          />)} 
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" pedicabber={{emptyPedicabber}} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" 
              pedicabber={selectedPedicabber} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
