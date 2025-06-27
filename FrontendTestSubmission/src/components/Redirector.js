import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getShortUrls, addClick } from "../services/urlService";
import { logEvent } from "../logger";

export default function Redirector() {
  const { shortcode } = useParams();
  const clickedOnce = useRef(false); 

  useEffect(() => {
    if (clickedOnce.current) return;
    clickedOnce.current = true;

    const u = getShortUrls().find(x => x.shortCode === shortcode);

    if (u && Date.now() < u.expiresAt) {
      addClick(shortcode, document.referrer, "India");
      logEvent("frontend", "info", "component", `Redirecting: ${shortcode}`);
      setTimeout(() => {
        window.location.href = u.longUrl;
      }, 50); 
    } else {
      logEvent("frontend", "warn", "component", `Invalid/expired link: ${shortcode}`);
      alert("Link invalid or expired");
    }
  }, [shortcode]);

  return null;
}
