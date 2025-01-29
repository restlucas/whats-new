import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { getLocalStorage } from "../utils/storageUtils";
import { AxiosError } from "axios";

const useAuthCheck = () => {
  const { checkUser } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Adicionando estado de carregamento

  useEffect(() => {
    const verifyAuthentication = async () => {
      const user = getLocalStorage("@whats-new:user"); // Pegando o usuário apenas dentro do efeito

      if (!user) {
        setIsAuthenticated(false);
        setLoading(false); // Atualiza o estado de carregamento
        return;
      }

      try {
        const { status, message } = await checkUser();
        if (status === 201 && message === "Authenticated") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          setIsAuthenticated(false);
        } else {
          console.error("Erro ao verificar autenticação:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAuthentication();
  }, [checkUser]);

  return { isAuthenticated, loading };
};

export default useAuthCheck;
