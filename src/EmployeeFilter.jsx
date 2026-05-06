import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeFilter() {
  const navigate = useNavigate();
  return (
    <div>
      Currently Employed:
      {' '}
      <select onChange={(e) => navigate(e.target.value ? `/employees?employed=${e.target.value}` : `/employees`)}>
        <option value="">All</option>
        <option value="true">Employed</option>
        <option value="false">Not Employed</option>
      </select>
    </div>
  );
}