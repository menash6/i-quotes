import { IonApp } from "@ionic/react";

import { LoadingTimer } from "./components/LoadingTimer";
import Layout from "./components/layout/Layout";

import MusicPlayerProvider from "./providers/musicPlayer/musicPlayer.provider";
import QuotesPlayerProvider from "./providers/quotesPlayer/quotesPlayer.provider";
import useMusicCategories from "./features/musicPlayer/hooks/useMusicCategories";
import useMusicFiles from "./features/musicPlayer/hooks/useMusicFiles";
import useRecordings from "./features/quotesPlayer/hooks/useRecordings";

const App = () => {
  const { musicCategories, isLoadingCategories, isSuccessCategories } = useMusicCategories();
  const { musicFiles, isLoadingMusicFiles, isSuccessMusicFiles } = useMusicFiles();
  const { recordings, isLoadingRecordings, isSuccessRecordings } = useRecordings();

  if (isLoadingMusicFiles || isLoadingRecordings) return <LoadingTimer />;

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
