"use client";
import { useRef, useState } from "react";
import Button from "./Button";

export default function Home() {
  const [divcount, setDivcount] = useState(0);
  // Reference to the container where divs will be added
  const divzoneRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    createDiv();
  };

  const createDiv = () => {
    const div = document.createElement("div");

    div.className =
      "bg-black text-white w-[150px] h-[150px] rounded-[6px] flex items-center justify-center cursor-pointer";
    div.innerText = "I'm a div";

    // Enable smooth transformation for rotation
    div.style.transition = "transform 0.2s";

    // Add mousedown event to initiate rotation
    div.onmousedown = (e) => startRotate(e, div);

    // Append the new div to the container

    divzoneRef.current?.appendChild(div);

    // Increment the count of divs created
    setDivcount(divcount + 1);
  };

  const startRotate = (event: Event, div: HTMLDivElement) => {
    event.preventDefault();

    // Calculate the center of the div to rotate on the div's center axis
    const centerX = div.offsetLeft + div.offsetWidth / 2;
    const centerY = div.offsetTop + div.offsetHeight / 2;

    // Update the rotation based on mouse movement
    const moveHandler = (e: any) => {
      const angle =
        (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI;
      div.style.transform = `rotate(${angle}deg)`;
    };

    // Cleanup function to remove event listeners and update UI after rotation
    const upHandler = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
      div.style.border = ""; // Remove border when mouse is released
    };

    // Attach move and up event listeners to document
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);
    div.style.border = "2px dashed #fff"; // Add dashed border on mousedown
  };

  return (
    <main className="mt-[30px] sm:container h-fit flex flex-col justify-center items-center mx-auto">
      <div className="flex flex-col items-center">
        <Button title="Click Me" onClick={handleClick} />
        <p className="mt-[20px] text-lg text-center">
          Click the button to create a div. Click and drag on the div to rotate
          it.
        </p>
        <p className="mt-[20px] text-lg text-center">
          Total divs created: {divcount}
        </p>
      </div>
      <div
        className="mt-[30px] grid grid-cols-4 gap-[10px]"
        ref={divzoneRef}
      ></div>
    </main>
  );
}
