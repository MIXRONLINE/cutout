import React, { useEffect, useState } from 'react';
import { Rnd } from "react-rnd";
import './App.css'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f044",
  color: 'white'
};

function App() {

  const [img, setImg] = useState('');
  const [num, setNum] = useState(1);
  const [boxes, setBoxes] = useState(
    [{
      width: 40,
      height: 30,
      x: 10,
      y: 10
    }]
  );
  const [item, setItem] = useState('');
  const [caption, setCaption] = useState('');

  useEffect(() => {

    // url: "https://i.imgur.com/A3piGqW.png",
    // facePos: [
    //     '17 / 19 / 34 / 35',
    //     '7 / 30 / 24 / 48',
    //     '8 / 45 / 28 / 62',
    //     '8 / 61 / 26 / 77',
    //     '13 / 73 / 37 / 94',
    //     '59 / 45 / 85 / 73'
    // ],
    // caption: "You were the chosen one!"

    let text = '{';
    let url = "url:'" + img + "', ";
    text = text.concat(url);
    let cap = "caption:\"" + caption + "\", ";
    text = text.concat(cap);

    let facePos = "facePos:[";
    text = text.concat(facePos);

    boxes.forEach((b)=>{
      let s = "'"+ b.x + ' / ' + b.y + ' / '+ (parseInt(b.x) + parseInt(b.width.toString().split('px')[0])).toString() +' / ' + (parseInt(b.y) + parseInt(b.height.toString().split('px')[0])).toString() +"',"
      text = text.concat(s);
    })

    text = text.concat(']');
    text = text.concat('},')
    setItem(text);

  }, [boxes, img, caption])

  useEffect(() => {
    let b = [];
    let startX = 10;
    for (let i = 0; i < num; i++) {
      b.push({
        width: 40,
        height: 30,
        x: startX,
        y: 10
      })
      startX = startX + 50;
    }
    setBoxes(b);
  }, [num])

  console.log(boxes)

  return (
    <div>
      <div
        className='container'
        style={{
          backgroundImage: 'url(' + img + ')'
        }}
      >
        {boxes.length > 0 ?
          <>
            {boxes.map((box, key) => {
              console.log(box);
              return (
                <Rnd
                  key={key}
                  lockAspectRatio={1.333333333333333333}
                  bounds='parent'
                  style={style}
                  size={{ width: box.width, height: box.height }}
                  position={{ x: box.x, y: box.y }}
                  onDragStop={(e, d) => {
                    let b = [...boxes];
                    b[key].x = d.x;
                    b[key].y = d.y;
                    console.log(b);
                    setBoxes(b);
                  }}
                  onResizeStop={(e, direction, ref, delta, position) => {
                    let b = [...boxes]
                    b[key].width = ref.style.width;
                    b[key].height = ref.style.height;
                    setBoxes(b);
                  }}
                >
                  {key + 1}
                </Rnd>
              )
            })}
          </>
          : null}

      </div>
      <div className='controls'>
        <p>Img:</p>
        <input onChange={(e) => {
          setImg(e.target.value)
        }} />
        <p>Number of faces:</p>
        <input type='number' onChange={(e) => {
          setNum(e.target.value)
        }} />
        <p>Caption:</p>
        <input onChange={(e) => {
          setCaption(e.target.value)
        }} />
        <br />
        <br />
        <p>{item}</p>
      </div>
    </div>
  );

}

export default App;