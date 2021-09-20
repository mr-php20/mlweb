import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState();
  const [outimage, setImage] = useState();
  
  // let image;
	const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', input);
    //console.log(formData)
    const Upload = async() => {
      await fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(response => response.blob())
      .then(images => {
          setImage(URL.createObjectURL(images))
      }).catch(error => {
        console.error(error);
      });
    }
    Upload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload Lung Image</h1>
        <input type="file" id="image" name="file" accept="image/*" onChange={(event) => {
          setInput(event.target.files[0]);
          console.log(input)
          setImage(null)
        }}/>
        <button type="submit" onClick={handleSubmit}>Upload</button>
        <div>
          {
          input?
          <img src={URL.createObjectURL(input)} height="300px"/>
          :null
          }
          { outimage?
          <>
          <img src={outimage} height="300px"/>
          <a href={outimage} download>
            <button>
            Download
            </button>
          </a>
          </>
          :null
          }
        </div>
      </header>
    </div>
  );
}

export default App;
