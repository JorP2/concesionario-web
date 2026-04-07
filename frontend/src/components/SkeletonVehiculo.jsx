import React from "react";
import "../styles/vehiculos.css";

function SkeletonVehiculo() {
  return (
    <div className="vehiculos-grid" style={{ padding: "16px" }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="vehiculo-card" style={{ cursor: "default" }}>
          {/* Imagen */}
          <div
            className="placeholder-glow"
            style={{ height: "200px", overflow: "hidden" }}
          >
            <span
              className="placeholder"
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>

          {/* Info */}
          <div className="vehiculo-info">
            <div className="vehiculo-header">
              <div style={{ flex: 1 }}>
                <div className="placeholder-glow mb-1">
                  <span
                    className="placeholder col-8"
                    style={{ height: "18px", borderRadius: "4px" }}
                  />
                </div>
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-5"
                    style={{ height: "12px", borderRadius: "4px" }}
                  />
                </div>
              </div>
              <div className="placeholder-glow" style={{ width: "80px" }}>
                <span
                  className="placeholder col-12"
                  style={{ height: "24px", borderRadius: "4px" }}
                />
              </div>
            </div>

            {/* Specs */}
            <div className="vehiculo-specs">
              {[60, 50, 70, 55].map((w, j) => (
                <div key={j} className="placeholder-glow">
                  <span
                    className="placeholder"
                    style={{
                      display: "block",
                      width: `${w}px`,
                      height: "28px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Año */}
            <div className="placeholder-glow mb-3">
              <span
                className="placeholder col-3"
                style={{ height: "12px", borderRadius: "4px" }}
              />
            </div>

            {/* Botón */}
            <div className="placeholder-glow">
              <span
                className="placeholder col-12"
                style={{ height: "40px", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonVehiculo;
