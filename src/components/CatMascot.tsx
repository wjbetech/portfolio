import React from "react";
import { Player } from "lottie-react";

// Example Lottie JSON animation (replace with your own cat animation JSON)
import catAnimation from "../assets/lottie/cat.json";

const CatMascot: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ width: 120, height: 120, ...style }}>
    <Player
      autoplay
      loop
      src={catAnimation}
      style={{ width: "100%", height: "100%" }}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
    />
  </div>
);

export default CatMascot;
