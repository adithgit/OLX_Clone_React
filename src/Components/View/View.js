import React from 'react';
import {db} from "../../firebase/firebase"
import { useContext,useState ,useEffect} from 'react'
import {PostContext} from '../../store/PostContext'
import { getDocs, collection , where , query } from "firebase/firestore";
import './View.css';
function View() {
  const {postDetails} = useContext(PostContext);
  const [userDetails , setUserDeatails] = useState()
  useEffect(() => {
    const {userId} = postDetails
    const citiesRef = collection(db, "users");
    getDocs(query(citiesRef, where("id", "==", userId))).then((res)=>{
      res.forEach((doc)=>{
        setUserDeatails(doc.data())
      });
      console.log(postDetails);
    })
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails &&<div className="contactDetails">
          <p>{userDetails.name}</p>
          <p>Contact</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
