import React from "react";

const Log = ({ log, logRef, resetGame }) => (
  <div style={{ width: "100%", textAlign: "center", margin: "10px 0" }}>
    <h2>ゲームログ</h2>
    <div style={{ maxHeight: "150px", overflowY: "auto", backgroundColor: "#f9f9f9", padding: "5px", border: "1px solid #ccc", borderRadius: "10px", width: "50%", margin: "5px auto" }} ref={logRef}>
      {log.map((entry, index) => (
        <p key={index} className="log-entry" style={{ margin: "5px 0" }}>
          {entry}
        </p>
      ))}
    </div>
    <button onClick={resetGame} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "50px", cursor: "pointer", fontSize: "18px", marginTop: "10px" }}>
      リセット
    </button>
  </div>
);

export default Log;
