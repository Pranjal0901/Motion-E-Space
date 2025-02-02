import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VideoMask from './VideoMask.jsx'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoMask/>
  </StrictMode>,
)
