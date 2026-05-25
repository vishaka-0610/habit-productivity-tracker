import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Registration Successful");
    }
    catch(error){
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e)=>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={registerUser}>
        Register
      </button>
    </div>
  );
}

export default Register;