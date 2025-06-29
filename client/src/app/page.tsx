"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    google?: any;
    initMap?: () => void;
  }
}

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJeJtv5V9DDtMcENdXnWNxBQL_8N9IULo&callback=initMap&libraries=maps,marker&v=beta";
    script.async = true;
    document.body.appendChild(script);

    // @ts-ignore
    window.initMap = function () {
      if (window.google && mapRef.current) {
        // @ts-ignore
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 51.481388092041016, lng: -0.18769454956054688 },
          zoom: 14,
          mapId: "DEMO_MAP_ID",
        });
        // @ts-ignore
        new window.google.maps.Marker({
          position: { lat: 51.481388092041016, lng: -0.18769454956054688 },
          map,
          title: "My location",
        });
      }
    };

    return () => {
      // Clean up
      // @ts-ignore
      delete window.initMap;
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
