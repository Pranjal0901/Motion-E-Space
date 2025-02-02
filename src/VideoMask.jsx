import React, { useEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import front from "../src/assets/front.mp4";

gsap.registerPlugin(ScrollTrigger);

const VideoMask = () => {
  useEffect(() => {
    console.clear();

const svg = document.querySelector("#svg");
const img = document.querySelector("#vid");
const circle = document.querySelector("#circle");
const pad = 4;

let radius = +circle.getAttribute("r");
let imgWidth, imgHeight;

gsap.set(img, {
  scale: 2,
  xPercent: -50,
  yPercent: -50
});

var tl = gsap.timeline({
    scrollTrigger: {    
      start: "top top",
      end: "bottom bottom",
      scrub: 0.2,
    },
    defaults: {
      duration: 1
    }
  })
  .to(circle, {
    attr: {
      r: () => radius
    }
  }, 0)
  .to(img, {
    scale: 1,
  }, 0)
  .to("#whiteLayer", {
    alpha: 0,
    ease: "power1.in",
    duration: 1 - 0.25
  }, 0.25);
  
window.addEventListener("load", init);
window.addEventListener("resize", resize);

function init() {
      
  imgWidth = img.naturalWidth;
  imgHeight = img.naturalHeight;
    
  resize();  
}

function resize() {
    
  tl.progress(0);
  
  const r = svg.getBoundingClientRect();
  const rectWidth = r.width + pad;
  const rectHeight = r.height + pad;
  
  const rx = rectWidth / imgWidth;
  const ry = rectHeight / imgHeight;
  
  const ratio = Math.max(rx, ry);
  
  const width = imgWidth * ratio;
  const height = imgHeight * ratio;
    
  const dx = rectWidth / 2;
  const dy = rectHeight / 2;
  radius = Math.sqrt(dx * dx + dy * dy);
            
  gsap.set(img, { width, height });
    
  tl.invalidate();
  
  ScrollTrigger.refresh();
}

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("load", init);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div>
      
      <video
        autoPlay
        muted
        loop
        id="vid"
        className="fixed top-1/2 left-1/2 w-screen h-screen object-cover -translate-x-1/2 -translate-y-1/2"
      >
        <source src={front} type="video/mp4" />
      </video>

      <svg id="svg" className="fixed top-0 left-0 w-full h-screen">
        <defs>
          <mask id="mask">
            <rect width="100%" height="100%" fill="white"></rect>
            <circle id="circle" cx="50%" cy="50%" r="60" fill="black"></circle>
          </mask>
        </defs>
        <rect id="whiteLayer" width="100%" height="100%" fill="transparent"></rect>
        <rect width="100%" height="100%" fill="black" mask="url(#mask)"></rect>
      </svg>
      <div id="content" class="h-[2500px]"></div>
    </div>
  );
};

export default VideoMask;
