import { useState } from "react";

// step --2  make a square function for change the value of square in the board
function Square() {

  // step 6-- remove the prop and add a usestate for store the value
  
  const [value,setValue]=useState(null);
  
  // step--5
  function handleClick(){
    setValue('x');
  }
  return (

    // step--4 paases a prop value
    <button 
    onClick={handleClick}
    className="text-3xl w-20 h-20 border-2 border-gray-500">{value}</button>
  );
}

// step --1
export default function Board() {
  return (
    <>
      <div className="m-20 w-fit border-4 border-gray-600 rounded-lg p-4 shadow-lg">
        <div className="flex">
           {/* <button className="text-3xl w-20 h-20 border-2 border-gray-500">1</button> */}
         
              
              {/* step--3 reusable of Square code */}
          <Square  />
          <Square />
          <Square />
        </div>
        <div className="flex">
          <Square />
          <Square />
          <Square />
        </div>
        <div className="flex">
          <Square/>
          <Square />
          <Square />
        </div>
      </div>
    </>
  );
}

// step 7-- remove all the props value from 9 squares