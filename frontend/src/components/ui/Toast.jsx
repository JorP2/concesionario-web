import React, { useEffect } from "react";

function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { bg: "#e8f5e9", border: "#4caf50", text: "#2e7d32" },
    error: { bg: "#ffebee", border: "#ef5350", text: "#c62828" },
  };

  const { bg, border, text } = config[type] || config.error;

  return (
    <div className="toast-notification">
      <div
        style={{
          backgroundColor: bg,
          borderLeft: `4px solid ${border}`,
          borderRadius: "8px",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minWidth: "260px",
        }}
      >
        <span style={{ color: text, flex: 1, fontSize: "13px" }}>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            color: text,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;