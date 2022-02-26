import { useQuery } from "react-query";
import { useToast } from "../../../app/hooks/useToast";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
// import { useUser } from "../../user/hooks/useUser";
import { queryKeys } from "./../../../react-query/constants";

async function getMusicCategories(user) {
  const { data } = await axiosInstance.get(`/music/categories`, {
    // headers: getJWTHeader(user),
  });
  return data;
}

export default function useMusicCategories() {
  // const { user } = useUser();
  const { present } = useToast();

  const {
    data: musicCategories,
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
  } = useQuery(queryKeys.musicCategories, () => getMusicCategories(), {
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
    musicCategories,
    isLoadingCategories,
    isSuccessCategories,
  };
}
