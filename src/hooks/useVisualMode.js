import React, {useState} from 'react';
export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {

    setMode(newMode);
    const newHistory = [...history];
    if (replace !== false) {
      newHistory.pop();
      newHistory.push(newMode);
    } else {
    newHistory.push(newMode);
    }
    setHistory(newHistory);
  }
  const back = () => {
    if (history.length < 2) {
      setHistory('Cant go back more')
      return
    }
    setMode(history[history.length - 2]);
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);

  }
  return { mode, transition, back }; // same as {mode: mode}
}
