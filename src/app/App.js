import { IonApp } from "@ionic/react";

import { LoadingTimer } from "../components/LoadingTimer";
import Layout from "../components/layout/Layout";

import MusicPlayerProvider from "../providers/musicPlayer/musicPlayer.provider";
import QuotesPlayerProvider from "../providers/quotesPlayer/quotesPlayer.provider";
import useMusicCategories from "../providers/musicPlayer/hooks/useMusicCategories";
import useMusicFiles from "../providers/musicPlayer/hooks/useMusicFiles";
import useRecordings from "../features/quotesPlayer/hooks/useRecordings";

import Menu from "../components/layout/Menu";
import { useState } from "react";

const App = () => {
  const { musicCategories } = useMusicCategories();
  const { musicFiles, isLoadingMusicFiles } = useMusicFiles();
  const { recordings, isLoadingRecordings } = useRecordings();

  if (isLoadingMusicFiles || isLoadingRecordings) return <LoadingTimer />;

  return (
    <>
      <MusicPlayerProvider filesList={musicFiles.data} musicCategories={musicCategories.data}>
        <QuotesPlayerProvider recordingsLists={recordings.data}>
          <IonApp>
            <Menu />
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
