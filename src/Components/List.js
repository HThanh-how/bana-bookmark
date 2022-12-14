import React from "react";
import "./List.css";
import { AiFillSound } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { IconContext } from "react-icons";
import axios from "axios";

function List({ word, pos, BinhDinh, GiaLai, KonTum }) {
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

  return (
    <div className="card2">
      <div className="flex-vertical content">
        <h4>{word}</h4>
        <b>{pos}</b>
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
          <div className="bookmark">
            <FaRegBookmark />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default List;
