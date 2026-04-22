import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const usePkgDownloads = () => {
  return useQuery({
    queryKey: ["blockbot-pkg-downloads"],
    queryFn: async () => {
      const start = "2025-01-01";
      const end = new Date().toISOString().split("T")[0]; // now
      const url = `https://api.npmjs.org/downloads/point/${start}:${end}/blockbot`;
      const res = await axios.get(url);

      return res.data;
    },
  });
};
