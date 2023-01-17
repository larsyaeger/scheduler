import React, {useState} from 'react';
export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace = false) => {
    // setMode(newMode);
    // console.log('state', newMode)
    // console.log('transition', history);
    
    // if(replace === true) {
    //   setHistory(prev => [...prev.slice(0, prev.length - 1), mode])
      
    // } else {
    //   setHistory(prev => ([...prev, newMode]))
    // }

    
    
    
      if(replace){
        setHistory(prev => prev.slice(0, -1));
        setHistory(prev => [...prev, newMode]);
        }else{
          setHistory(prev => [...prev, newMode]); 
        }
        setMode(newMode);
    }
  
    //back function
    function back() {
      if(history.length > 1) {
        setHistory(history.slice(0, -1));
        setMode(history[history.length-2]);
      }
    }
    
    
    
    
    // const newHistory = [...history];
    // if (replace !== false) {
    //   newHistory.pop();
    //   newHistory.push(newMode);
    // } else {
    // newHistory.push(newMode);
    // }
    // console.log('newHistory', newHistory)
    // console.log('splice', history.splice(history.length, 1, newMode))
    // setHistory(newHistory);
  //  }
  // const back = function(){
  //   if (history.length < 2) {
  //     //setHistory('Cant go back more')
  //     return;
  //   }
  //   console.log('before ', history.length)
  //   setMode(history[history.length - 2]);
  //   setHistory(prev => [...prev.slice(0, history.length - 1)]);
  //   console.log('after', history.length)
  //   console.log('abc',history)
    
    // const newHistory = [...history];
    // console.log('before', newHistory)
    // newHistory.pop();
    // console.log('after', newHistory);
    // setHistory(newHistory);
    return { mode, transition, back }; 
  }