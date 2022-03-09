import { IonApp, IonButton } from "@ionic/react";

import { LoadingTimer } from "../components/LoadingTimer";
import Layout from "../components/layout/Layout";

import MusicPlayerProvider from "../providers/musicPlayer/musicPlayer.provider";
import QuotesPlayerProvider from "../providers/quotesPlayer/quotesPlayer.provider";
import useMusicCategories from "../providers/musicPlayer/hooks/useMusicCategories";
import useMusicFiles from "../providers/musicPlayer/hooks/useMusicFiles";
import useRecordings from "../features/quotesPlayer/hooks/useRecordings";

import Menu from "../components/layout/Menu";
import SwiperCategories from "./../components/layout/SwiperCategories";
import PageLayout from "../components/layout/PageLayout";
import SwiperLayout from "./../components/layout/SwiperLayout";
import TimersProvider from "../providers/timers/timers.provider";
import { useRef, useState } from "react";

import { BackgroundMode } from "@awesome-cordova-plugins/background-mode";

document.addEventListener(
  "deviceready",
  function () {
    BackgroundMode.enable();

    BackgroundMode.setDefaults({
      title: "Title",
      text: "text",
      // icon: 'icon' // this will look for icon.png in platforms/android/res/drawable|mipmap
      color: "134567", // hex format like 'F14F4D'
      // resume: Boolean,
      hidden: false,
      bigText: true,
    });

    BackgroundMode.configure({
      bigText: true,
      hidden: false,
      text: "text",
      color: "1f1f1f",
      title: "TITLE",
    });
  },
  false
);

BackgroundMode.on("activate", function () {
  BackgroundMode.disableWebViewOptimizations();
  BackgroundMode.disableBatteryOptimizations();
});

const App = () => {
  // BackgroundMode.enable();

  const { musicCategories } = useMusicCategories();
  const { musicFiles, isLoadingMusicFiles } = useMusicFiles();
  const { recordings, isLoadingRecordings } = useRecordings();

  if (isLoadingMusicFiles || isLoadingRecordings) return <LoadingTimer />;

  return (
    <>
      <MusicPlayerProvider filesList={musicFiles.data} musicCategories={musicCategories.data}>
        <QuotesPlayerProvider recordingsLists={recordings.data}>
          <TimersProvider>
            <IonApp>
              <Menu />

              <PageLayout>
                {/* <PageLayout id="main"> */}
                <SwiperCategories />
              </PageLayout>
            </IonApp>
          </TimersProvider>
        </QuotesPlayerProvider>
      </MusicPlayerProvider>
    </>
  );
};

export default App;
