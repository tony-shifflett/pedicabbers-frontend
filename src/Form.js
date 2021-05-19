import React from "react";

const Form = (props) => {
  //STATE FOR THE FORM
  const [formData, setFormData] = React.useState(props.pedicabber);

  //FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="string"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="homeMarket"
        placeholder="Home Market"
        value={formData.homeMarket}
        onChange={handleChange}
      />
      <input type="submit" value={props.label} />
    </form>
  );
};

export default Form;
