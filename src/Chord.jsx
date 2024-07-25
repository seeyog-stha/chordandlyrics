import React, { useEffect, useRef, useState } from "react";
import ChordSheetJS from "chordsheetjs";
import { ChordSheetSerializer } from "chordsheetjs";
import "./App.css";

export default function Chord() {
  const container = useRef(null);
  console.log("container", container);
  useEffect(() => {
    if (container.current) {
      const elements = container.current.getElementsByClassName("chord");
      for (let element of elements) {
        if (element.textContent.trim() !== "") {
          element.classList.add("chord1");
        }
      }
    }
  }, []);

  const handleClick = (event) => {
    console.log("working", event.target.textContent);
    // Check if the clicked element has a specific class
    if (
      event.target.classList.contains("chord") &&
      event.target.textContent !== ""
    ) {
      alert("Element clicked!" + event.target.textContent);
    }
  };

  const chordSheet = `
    {title: Let it be}
    {subtitle: ChordSheetJS example version}
    
    {start_of_chorus: Chorus}
    Let it [Am]be, let it [C/G]be, let it [F]be, let it [C]be
    [C]Whisper words of [G]wisdom, let it [F]be [C/E] [Dm] [C]
    {end_of_chorus}`.substring(1);
  const parser = new ChordSheetJS.ChordProParser();
  const song = parser.parse(chordSheet);
  const formatter = new ChordSheetJS.HtmlTableFormatter();
  const disp = formatter.format(song);
  const serializedSong = new ChordSheetSerializer().serialize(song);
  const deserialized = new ChordSheetSerializer().deserialize(serializedSong);
  console.log("parser", parser);
  console.log("song", song);
  console.log("formatter", formatter);
  console.log("serializedSong", serializedSong);
  console.log("deserialized", deserialized);
  const [test,setTest]=useState()
  const handleTranspose = () => {
    const chord2 = song.transposeUp();
    const formatter = new ChordSheetJS.HtmlTableFormatter();
    const disp = formatter.format(chord2);
    setTest(disp)
  };
  const handleTransposeDown = () => {
    const chord2 = song.transposeDown();
    const formatter = new ChordSheetJS.HtmlTableFormatter();
    const disp = formatter.format(chord2);
    setTest(disp)
  };
  return (
    <>
      <div
        ref={container}
        onClick={(e) => handleClick(e)}
        dangerouslySetInnerHTML={{ __html: disp }}
      />
      <button onClick={handleTranspose}>transpose up </button>
      <button onClick={handleTransposeDown}>transpose down </button>
      <div
      
        dangerouslySetInnerHTML={{ __html: test }}
      />
    </>
  );
}
