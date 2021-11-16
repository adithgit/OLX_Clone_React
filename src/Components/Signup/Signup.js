import React , {useState ,useContext ,} from 'react';
import { getAuth, createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import { getFirestore, doc, collection ,addDoc} from "firebase/firestore"; 
import Logo from '../../olx-logo.png';
import { firebaseContext } from '../../store/context';
import './Signup.css';
import { useHistory } from "react-router-dom";


export default function Signup() {
  const db = getFirestore();
  const [userName ,setName] = useState("")
  const [userEmail ,setEmail] = useState("")
  const [userPass ,setPass] = useState("")
  const [userPhone ,setPhone] = useState("")
  const {firebase} = useContext(firebaseContext)
  const history = useHistory();
  const handleSubmit = (e)=>{
    e.preventDefault();
    const auth = getAuth();
createUserWithEmailAndPassword(auth, userEmail, userPass)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(auth.currentUser, {displayName: userName }).then(()=>{
      addDoc(collection(db, "users"), {
      id:user.uid,
      name: userName,
      phone:userPhone
    }).then(()=>{
      console.log("data added");
      history.push('/login')
    }).catch(()=>{
      console.log("failed");
    })
    })
    
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit = {(e)=>{
          handleSubmit(e)
        }}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            onChange = {
              (e)=>{
                setName(e.target.value)
              }
            }
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            onChange = {
              (e)=>{
                setEmail(e.target.value)
              }
            }
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            onChange = {
              (e)=>{
                setPhone(e.target.value)
              }
            }
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            onChange = {
              (e)=>{
                setPass(e.target.value)
              }
            }
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
