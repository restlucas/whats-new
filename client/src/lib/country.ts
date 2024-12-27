import axios from "axios";

export const fetchUserCountry = async (): Promise<string> => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    return response.data.country_name;
  } catch (error) {
    throw new Error("Error fetching user country: " + error);
  }
};
