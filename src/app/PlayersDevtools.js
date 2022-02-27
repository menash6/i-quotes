import { IonCard, IonCardHeader } from "@ionic/react";

import { useContext } from "react";
import { MusicPlayerContext } from "./../providers/musicPlayer/musicPlayer.provider";
import { QuotesPlayerContext } from "../providers/quotesPlayer/quotesPlayer.provider";
import PlaylistPlayer from "./../components/PlaylistPlayer";

const PlayersDevtools = () => {
  const MusicControls = useContext(MusicPlayerContext);
  const quotesControls = useContext(QuotesPlayerContext);
  return (
    <>
      <IonCard color="medium">
        <IonCardHeader>Music Playlist</IonCardHeader>

        <PlaylistPlayer playlistControls={MusicControls} color={"medium"} />
      </IonCard>
      <IonCard color="dark">
        <IonCardHeader>Quotes Playlists</IonCardHeader>
        <PlaylistPlayer playlistControls={quotesControls.amControls} color={"success"} />
        <PlaylistPlayer playlistControls={quotesControls.slControls} color={"primary"} />
        <PlaylistPlayer playlistControls={quotesControls.ldControls} color={"danger"} />
      </IonCard>
    </>
  );
};

export default PlayersDevtools;
