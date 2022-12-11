import React from "react";
import "./Card.css";
import { AiFillSound } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { BsFillBookmarkFill} from "react-icons/bs";
import { IconContext } from "react-icons";
import axios from "axios";
import { useState, useEffect } from "react";






function Card({ word, pos, BinhDinh, GiaLai, KonTum, id }) {
  

  
  
  const[isMarked, setIsMark]=useState(false);



  const setMark = (d) =>{
    let token=JSON.parse(localStorage.getItem("user")).access_token;
    console.log({id})
    console.log(id)
    console.log(token)
    axios.post("http://localhost:5000/api/update_bookmark", {id}, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
  }

  


  const playSound = (e) => {
    axios
      .post("https://www.ura.hcmut.edu.vn/tts/speak", {
        text: word,
        gender: "male",
      })
      .then((res) => {
        let audio;
        audio = new Audio(`data:audio/wav;base64,${res.data.speech}`);
        audio.play();
      });
  };
  fetch('http://127.0.0.1:5000/api/dict')
  .then(response => response.bookmark())
  
  return (
    <div className="card">
      <div className="flex-vertical content">
        <h3>{word}</h3>
        <p>{pos}</p>
      </div>
      <div className="flex-horizontal">
        <div className="sound">
          <button disabled={BinhDinh === "-"} onClick={(e) => playSound(e)}>
            <AiFillSound />
            <span>BinhDinh</span>
          </button>
          <button disabled={GiaLai === "-"} onClick={(e) => playSound(e)}>
            <AiFillSound />
            <span>Gia Lai</span>
          </button>
          <button disabled={KonTum === "-"} onClick={(e) => playSound(e)}>
            <AiFillSound />
            <span>KonTum</span>
          </button>
          
        </div>
        <IconContext.Provider value={{ size: "45px" }}>
          <div className="bookmark" onClick={(d) => {setIsMark(!isMarked);setMark(d)}}>
            {isMarked? 
            <BsFillBookmarkFill />:<FaRegBookmark />}
                      </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Card;
