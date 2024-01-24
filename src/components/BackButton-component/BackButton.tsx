import { Button } from "../Button-component/Button.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
