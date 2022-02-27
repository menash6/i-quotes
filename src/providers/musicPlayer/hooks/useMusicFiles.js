import { useQuery } from "react-query";
import { useToast } from "../../../app/hooks/useToast";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
// import { useUser } from "../../user/hooks/useUser";
import { queryKeys } from "../../../react-query/constants";

async function getMusicFiles(user) {
  const { data } = await axiosInstance.get(`/music/files`, {
    // headers: getJWTHeader(user),
  });
  return data;
}

export default function useMusicFiles() {
  // const { user } = useUser();
  const { present } = useToast();

  const {
    data: musicFiles,
    isLoading: isLoadingMusicFiles,
    isSuccess: isSuccessMusicFiles,
  } = useQuery(queryKeys.musicFiles, () => getMusicFiles(), {
    staleTime: Infinity,
    onError: (error) => {
      const title =
        error instanceof Error
          ? error.toString().replace(/^Error:\s*/, "")
          : "Error connecting to the server";
      present({ message: title, color: "danger" });
    },
  });

  return {
    musicFiles,
    isLoadingMusicFiles,
    isSuccessMusicFiles,
  };
}
