import { useQuery } from "@tanstack/react-query";
import { fetchUserCountry } from "../lib/country";

export const useUserCountry = async () => {
  return true;
  //   return useQuery<string, Error>(['userCountry'], fetchUserCountry);
};
