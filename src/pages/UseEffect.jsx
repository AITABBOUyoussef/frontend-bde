import { useEffect, useState } from "react";

export default function UseEffect(){

   const [count , setCount] = useState(0);
   const [color , setColor] = useState("#008000"); 

useEffect(()=>{
setColor(count <0 ? "#FF2D00" : "#008000");
},[count]);
    return (
        <div>
            <h1>Use Effect</h1>
            <div>
                <div style={{color : color}}>{count}</div>
                <button onClick={()=>setCount(count+1)}>+</button>
                <button onClick={()=>setCount(count-1)}>-</button>
            </div>
        </div>
    )
}