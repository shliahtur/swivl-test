import React from "react";

export default function Avatar({ loading, src, small }) {
  const avatar = (
    <img src={src} className={`${small ? "avatar__small" : "avatar__big"}`} />
  );
  return src ? (
    avatar
  ) : loading ? (
    <div className="avatar_skeleton"></div>
  ) : (
    avatar
  );
}
