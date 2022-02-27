import { useQuery } from "react-query";
import { useToast } from "../../../app/hooks/useToast";
import { axiosInstance, getJWTHeader } from "../../../axiosInstance";
// import { useUser } from "../../user/hooks/useUser";
import { queryKeys } from "../../../react-query/constants";

async function getRecordings(user) {
  const { data } = await axiosInstance.get(`/recordings`, {
    // headers: getJWTHeader(user),
  });
  return data;
}

export default function useRecordings() {
  // const { user } = useUser();
  const { present } = useToast();

  const {
    data: recordings,
    isLoading: isLoadingRecordings,
    isSuccess: isSuccessRecordings,
  } = useQuery(queryKeys.recordings, () => getRecordings(), {
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
    recordings,
    isLoadingRecordings,
    isSuccessRecordings,
  };
}
