import React from "react";
import loading from './loading.gif'
import './index.css'

export default function Loading() {
  return (
    <div className="loading-container">
      <img src={loading} alt="loading..." />
    </div>
  )
}