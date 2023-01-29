import "./App.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import React, { useEffect } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';

function App() {
  const {speak} = useSpeechSynthesis();

  const dospeak = (value) => {
    speak({ text:value});
  }

  useEffect(() => {
    
    alanBtn({
      key: "b8bd8ab891cce7c43cbb48a7f7162e6d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "navigate") {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const locationD = {
              to: commandData.location,
              from: { lat, lng },
            };
            (async () => {
              const rawResponse = await fetch('https://ineuronbackend-production.up.railway.app/get_route', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(locationD)
              });
             
              const content = await rawResponse.json();
              console.log(content[0].instruction)
              dospeak(content[0].instruction);
            })();
  
          });
        }
        // if (commandData.command === "go") {
        //  console.log(locationData)
        // }
      },
    });
  }, []);

  return (
    <div className="App">
   ninad sonawne
    </div>
  );
}

export default App;
