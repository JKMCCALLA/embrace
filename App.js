import React from "react";
import "./styles.css";

function Desktop() {
    return (
        <div className="desktop">
            <div className="div">
                <div className="box-media" />
                <div className="poly-circle" />
                <img className="poly-circle-2" alt="Poly circle" src="poly-circle-2.svg" />
                <div className="poly-circle-3" />
                <div className="box" />
                <div className="box-2" />
                <div className="box-3" />
                <div className="box-4" />
                <div className="box-5" />
                <div className="box-6" />
                <div className="box-7" />
                <div className="text">
                    {"{"}Q1 - 202X
                    <br />
                    MULE{"}"}
                </div>
                <img className="btn-play" alt="Btn play" src="btn-play.svg" />
            </div>
        </div>
    );
};

export default function MyApp() {
  return (
   <Desktop/>
  );
}