import './App.css';
import React,{useRef,useState,useEffect} from "react";

import "@tensorflow/tfjs"

import * as cocossd from "@tensorflow-models/coco-ssd";

import Webcam from "react-webcam";

//2.to do- import drawing utility here
import {drawRect} from "./utilities";


function App() {
  const webcamRef=useRef(null);
  const canvasRef=useRef(null);

  const runCoco=async ()=>{
    const net=await cocossd.load();

    setInterval(()=>{
      detect(net);
    },10);
  }

  const detect = async (net)=>{

    if(typeof webcamRef.current !=="undefined" && webcamRef.current!==null && webcamRef.current.video.readyState===4){

      //video properties
      const video=webcamRef.current.video;
      const videoWidth=webcamRef.current.video.videoWidth;
      const videoHeight=webcamRef.current.video.videoHeight;

      //set video width
      webcamRef.current.video.width=videoWidth;
      webcamRef.current.video.height=videoHeight;

      //set canvas height and width
      canvasRef.current.width=videoWidth;
      canvasRef.current.height=videoHeight;

      //make Detection
      const obj=await net.detect(video);
      console.log(obj)

      //Draw mesh
      const ctx=canvasRef.current.getContext("2d");

      //update drawing utility
      drawRect(obj,ctx)
    }

  };

  useEffect(()=>{runCoco()},[])

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
