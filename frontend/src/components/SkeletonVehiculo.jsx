import React from "react";

function SkeletonVehiculo() {
  return (
    <>
      <div className="vehiculos-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-2">
            {/* Imagen */}
            <div className="placeholder-glow">
              <span
                className="placeholder col-12"
                style={{ height: "180px" }}
              ></span>
            </div>

            {/* Texto */}
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6"></span>
              </h5>

              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-5"></span>
              </p>

              <span className="placeholder col-4"></span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SkeletonVehiculo;
