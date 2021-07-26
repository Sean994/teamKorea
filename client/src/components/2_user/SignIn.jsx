import { Link } from 'react-router-dom';
const axios = require('axios').default;

const SignIn = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/user/signin', {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(event.target.username.value);
    console.log(event.target.password.value);
  
};

  return (
    <div>
      <h1>User Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password" />
        <br />
        <input type="submit" value="Sign In" />
        <br />
        <br />
        <span>New User? </span>
        <Link to="/user/signup">
          <button>Sign Up</button>
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
