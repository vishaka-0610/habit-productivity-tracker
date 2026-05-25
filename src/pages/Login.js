import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const loginUser = async () => {

try{

await signInWithEmailAndPassword(
auth,
email,
password
);

alert("Login Successful");

}

catch(error){

alert(error.message);

}

};

return(

<div>

<h2>Login</h2>

<input
type="email"
placeholder="Email"
onChange={(e)=>
setEmail(e.target.value)
}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>
setPassword(e.target.value)
}
/>

<br/><br/>

<button onClick={loginUser}>
Login
</button>

</div>

);

}

export default Login;
