import { IonApp } from "@ionic/react";
import { useEffect } from "react";
import { fetchAsyncQuotes, selectStatus } from "./features/quotesPlayer/quotesPlayerSlice";
import { selectStatusMusic, fetchAsyncMusic } from "./features/musicPlayer/musicPlayerSlice";

import { LoadingTimer } from "./components/LoadingTimer";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";

import MusicPlayerProvider from "./providers/musicPlayer/musicPlayer.provider";
import QuotesPlayerProvider from "./providers/quotesPlayer/quotesPlayer.provider";
import useMusicCategories from "./features/musicPlayer/hooks/useMusicCategories";
import useMusicFiles from "./features/musicPlayer/hooks/useMusicFiles";
import { musicUrl, recordingsUrl } from "./axiosInstance/constants";
import useRecordings from "./features/quotesPlayer/hooks/useRecordings";

const App = () => {
  const status = useSelector(selectStatus);
  // const statusMusic = useSelector(selectStatusMusic);
  // const dispatch = useDispatch();

  const { musicCategories, isLoadingCategories, isSuccessCategories } = useMusicCategories();
  const { musicFiles, isLoadingMusicFiles, isSuccessMusicFiles } = useMusicFiles();
  const { recordings, isLoadingRecordings, isSuccessRecordings } = useRecordings();
  console.log("~🔥🔥🔥🔥🔥🔥 recordings", recordings);

  // useEffect(() => {
  //   dispatch(fetchAsyncQuotes());
  //   // dispatch(fetchAsyncMusic());
  // }, [dispatch]);

  // if (statusMusic !== "loaded") return <h1>Loading</h1>;
  if (isLoadingMusicFiles || isLoadingRecordings) return <LoadingTimer />;
  // if (status !== "loaded" || statusMusic !== "loaded") return <LoadingTimer />;
  // return <LoadingTimer />;

  // let musicFilesParsed;
  // if (isSuccessMusicFiles) {
  //   //mediaUrl
  //   musicFilesParsed = musicFiles.data.map((e) => {
  //     return { title: e.title, url: `${musicUrl}/${e.url}`, categories: e.categories };
  //   });
  // }

  // console.log("~🐵🐵🐵 musicFilesParsed", musicFilesParsed);

  return (
    <>
      <MusicPlayerProvider filesList={musicFiles.data}>
        <QuotesPlayerProvider recordingsLists={recordings.data}>
          <IonApp>
            <Layout>
              {/* <QuotesPlayer /> */}
              {/* <Timers/> */}
            </Layout>
          </IonApp>
        </QuotesPlayerProvider>
      </MusicPlayerProvider>
    </>
  );
};

export default App;
