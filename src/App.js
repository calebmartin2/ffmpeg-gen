import "./App.css";
import React, { useRef, useState } from "react";

function App() {
  const [inputFilename, setinputFilename] = useState("input_filename");
  const [outputFilename, setOutputFilename] = useState("output_filename");
  const [inputFormat, setInputFormat] = useState("mp4");
  const [outputFormat, setOutputFormat] = useState("avi");

  // Copy to clipboard
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return (
    <div className="App">
      <h1>FFmpeg Generator</h1>

      <form>
        <label>
          Input Filename:
          <input
            type="text"
            value={inputFilename}
            onChange={(e) => setinputFilename(e.target.value)}
          />
        </label>
        <br />
        <label>
          Output Filename:
          <input
            type="text"
            value={outputFilename}
            onChange={(e) => setOutputFilename(e.target.value)}
          />
        </label>
        <br />

        <label for="inputFormat">Input Format:</label>
        <select
          value={inputFormat}
          onChange={(e) => setInputFormat(e.target.value)}
        >
          <option value="mp4">mp4</option>
          <option value="avi">avi</option>
          <option value="opus">opus</option>
          <option value="mp3">mp3</option>
        </select>
        <br />
        <label for="outputFormat">Output Format:</label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
        >
          <option value="mp4">mp4</option>
          <option value="avi">avi</option>
          <option value="opus">opus</option>
          <option value="mp3">mp3</option>
        </select>
      </form>

      <p className="output-text">Output:</p>
      <form>
        <textarea
          className="output"
          spellcheck="false"
          ref={textAreaRef}
          value={
            "ffmpeg -i " +
            inputFilename +
            "." +
            inputFormat +
            " " +
            outputFilename +
            "." +
            outputFormat
          }
        />
        <div>
        {
          document.queryCommandSupported("copy") && (
            <div>
              <button onClick={copyToClipboard}>Copy (buggy)</button>
              {copySuccess}
            </div>
          )
        }
      </div>
      </form>
    </div>
  );
}

export default App;
