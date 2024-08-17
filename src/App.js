import './App.css';
import { useRef, useCallback, useEffect, useState } from 'react';

function Square({content}){
  let className;
  if(content == 1){
    className = "snake-square";
  }
  else if(content == 0){
    className = "empty-square";
  }
  else{
    className = "food";
  }
  return(
    <button className = {className}></button>
  );
}

function Row({mt}){
  return(
    <div className = "row">
      <Square content = {mt[0]}/>
      <Square content = {mt[1]}/>
      <Square content = {mt[2]}/>
      <Square content = {mt[3]}/>
      <Square content = {mt[4]}/>
      <Square content = {mt[5]}/>
      <Square content = {mt[6]}/>
      <Square content = {mt[7]}/>
      <Square content = {mt[8]}/>
      <Square content = {mt[9]}/>
      <Square content = {mt[10]}/>
      <Square content = {mt[11]}/>
      <Square content = {mt[12]}/>
      <Square content = {mt[13]}/>
      <Square content = {mt[14]}/>
    </div>
  );
}

function Board({mt}){
  return(
    <>
      <Row mt = {mt[0]}/>
      <Row mt = {mt[1]}/>
      <Row mt = {mt[2]}/>
      <Row mt = {mt[3]}/>
      <Row mt = {mt[4]}/>
      <Row mt = {mt[5]}/>
      <Row mt = {mt[6]}/>
    </>
  );
}

  var mt = new Array(7);
  var di = new Array(7);
  var dj = new Array(7);
  for(let i = 0; i < 7; i++){
    mt[i] = [];
    di[i] = [];
    dj[i] = [];
  }
  for(let i = 0; i < 7; i++){
    for(let j = 0; j < 15; j++){
      mt[i][j] = 0;
      di[i][j] = 0;
      dj[i][j] = 0;
    }
  }
  di[6][7] = 5;
  dj[6][7] = 7;
  mt[6][7] = 1;
  mt[5][7] = 1;
  var diri = -1;
  var dirj = 0;
  var counter = 2;

function GenerateFood(){
  function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min) + min);
  }
  let foodi = randomNumber(0, 6);
  let foodj = randomNumber(0, 14);
  if(mt[foodi][foodj] == 1)
    GenerateFood();
  else{
    mt[foodi][foodj] = 2;
  }
}

GenerateFood();

function Info(){
  return(
    <div className = "information">
      <h1>Press r to restart.</h1>
      <h1>Press Tab to start.</h1>
    </div>
  );
}

function Count(){
  return(
    <div className = "counter">
      <h1>Your score is: {counter}</h1>
    </div>
  );
}

function App() {
  let [headi, setHeadi] = useState(5);
  let [headj, setHeadj] = useState(7);
  let [taili, setTaili] = useState(6);
  let [tailj, setTailj] = useState(7);
  let [start, setStart] = useState(0);
  useEffect(() => {
    document.addEventListener('keydown', detectKeyDown, true);
  });
  const detectKeyDown = function(event){
    switch(event.key){
      case 'ArrowUp':
        diri = -1;
        dirj = 0;
        break;
      case 'ArrowDown':
        diri = 1;
        dirj = 0;
        break;
      case 'ArrowLeft':
        diri = 0;
        dirj = -1;
        break;
      case 'ArrowRight':
        diri = 0;
        dirj = 1;
        break;
      case 'r':
        window.location.reload();
        break;
      case 'Tab':
        setStart(1);
        break;
    }
  }
  useEffect(() => {
    setTimeout(() => {
      if(start == 1){
        setHeadi(headi + diri);
        setHeadj(headj + dirj);
        di[headi][headj] = headi + diri;
        dj[headi][headj] = headj + dirj;
        if(headi + diri < 0 || headj + dirj < 0 || headi + diri > 6 || headj + dirj > 14 || (mt[headi + diri][headj + dirj] == 1 && (headi + diri != 5 || headj + dirj != 7))){
          alert("You lost!");
          window.location.reload();
        }
        else if(mt[headi + diri][headj + dirj] == 0){
          mt[taili][tailj] = 0;
          let ttaili = taili;
          let ttailj = tailj;
          setTaili(di[taili][tailj]);
          setTailj(dj[taili][tailj]);
          di[ttaili][ttailj] = 0;
          dj[ttaili][ttailj] = 0;
        }
        else{
          GenerateFood();
          ++counter;
        }
      }
    }, 1000);
  });
  if(headi >= 0 && headi <= 6 && headj >= 0 && headj <= 14)
    mt[headi][headj] = 1;
  return (
    <>
      <Board mt = {mt}/>
      <Info />
      <Count />
    </>
  );
}

export default App;
