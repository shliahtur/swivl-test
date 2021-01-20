import React from "react";

export default function Field({ children, label, loading }) {
  return (
    <div className="field">
      {label && <div className="field_key">{label}: </div>}
      <div className="field_value">
        {children ? (
          children
        ) : loading ? (
          <div className="field_skeleton"></div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
