import { useMutation } from "@tanstack/react-query";
import { getAuthorizationCode } from "../api/auth";
import { useNavigate } from "react-router-dom";

export function useAuthMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: getAuthorizationCode,

    onSuccess: (authorizationCode, part) => {
      localStorage.setItem("authorizationCode", authorizationCode);
      localStorage.setItem('part', part);
      navigate("/posts");
    },
  });
}
