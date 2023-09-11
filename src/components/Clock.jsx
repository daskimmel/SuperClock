"use client";

import styles from './page.css'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Clock() {
  const { push } = useRouter();
  const [isSolved, setIsSolved] = useState(false);
  const minuteHandRef = useRef(null);
  const hourHandRef = useRef(null);

  const theTime = { hour: 12, min: 0 };
  let movingElem = null;

  const correctMin = 42;
  const correctHour = 9;

  function mouseDown(e) {	movingElem = e.target; }

  function mouseUp(e) {
    e.preventDefault();
    movingElem = null;

    if (theTime.hour === correctHour && theTime.min === correctMin) {
      setIsSolved(true);
    }
  }

  function mouseMove(e) {
    e.preventDefault();
    if (movingElem) {
      const vwp = movingElem.nearestViewportElement;
      const ctm = vwp.getScreenCTM();
      const pnt = vwp.createSVGPoint();
      pnt.x = e.clientX || e.touches[0].clientX;
      pnt.y = e.clientY || e.touches[0].clientY;
      let loc = pnt.matrixTransform(ctm.inverse());
      let deg = 90 - Math.atan2(50 - loc.y, loc.x - 50) * 180 / Math.PI;
      deg = deg + 15 - (deg + 15 + 360) % 2;
      let val = (12 + (deg / 30)) % 12;
      const roundVal = Math.round(val);
      theTime[movingElem.id] = movingElem.id === 'min' ? Math.round(val * 5) : (roundVal === 0 ? 12 : roundVal);
      movingElem.setAttribute('transform', 'rotate(' + deg + ' 50 50)');
    }
  }

  useEffect(() => {
    minuteHandRef.current.setAttribute('transform', 'rotate(60 50 50)');
    minuteHandRef.current.addEventListener('mousedown', mouseDown, false);
    hourHandRef.current.addEventListener('mousedown', mouseDown, false);
    document.addEventListener('mouseup', mouseUp, false);
    document.addEventListener('mousemove', mouseMove, false);

    minuteHandRef.current.addEventListener('touchstart', mouseDown, false);
    hourHandRef.current.addEventListener('touchstart', mouseDown, false);
    document.addEventListener('touchend', mouseUp, false);
    document.addEventListener('touchmove', mouseMove, false);

    return () => {
      document.removeEventListener('mouseup', mouseUp)
      document.removeEventListener('mousemove', mouseMove)
      document.removeEventListener('touchend', mouseUp)
      document.removeEventListener('touchmove', mouseMove)
    }
  }, []);

  useEffect(() => {
    if (isSolved) {
      setTimeout(() => {
        push("/solved")
      }, 4000)
    }
  }, [isSolved]);

  return (
    <div className="container">
      <div className={`clock ${isSolved && "spin"}`}>
        <svg id="clock" viewBox="0 0 100 100">
          <g id="hands">
            <rect
              ref={hourHandRef}
              className={"hand"}
              id="hour"
              x="48.5"
              y="22.5"
              width="3"
              height="30"
              rx="2.5"
              ry="2.55"
            />
            <rect
              ref={minuteHandRef}
              className={"hand"}
              id="min"
              x="48"
              y="12.5"
              width="2"
              height="40"
              rx="2"
              ry="2"
            />
            <circle cx="50" cy="49" r="6" fill="#8ae4db"/>
          </g>
        </svg>
      </div>
    </div>
  )
}
