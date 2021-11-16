import React, {useState,  Fragment, useContext } from 'react';
import './Create.css';
import {db} from '../../firebase/firebase'
import { collection, addDoc } from "firebase/firestore"; 
import Header from '../Header/Header';
import { authContext } from '../../store/context';
import { getDownloadURL, getStorage , ref , uploadBytes } from '@firebase/storage';
import { useHistory } from 'react-router';
const Create = () => {
  const[name,setName] = useState('')
  const[category,setCategory] = useState('')
  const[price,setPrice] = useState('')
  const[img ,setImg] = useState('')
  const {user} = useContext(authContext)
  const history = useHistory()
  const handleSubmit = (e)=>{
    e.preventDefault();
    const date = new Date()
    uploadBytes(ref(getStorage(),`images/${img.name}`),img).then((res)=>{
      getDownloadURL(ref(getStorage(),`images/${img.name}`)).then((url)=>{
        addDoc(collection(db, "products"), {
          name,
          category,
          price,
          url,
          userId : user.uid,
          createdAt: date.toDateString()
        }).then(()=>{
          console.log("Document uploaded");
          history.push('/')
        })
      
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit= {(e)=>{
              handleSubmit(e);
            }} >
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              onChange={(e)=>{
                setName(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" 
            onChange={(e)=>{
              setPrice(e.target.value)
            }}/>
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={img ? URL.createObjectURL(img) : " "}></img>
          
            <br />
            <input type="file" onChange={
              (e)=>{
                setImg(e.target.files[0])
              } } />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
