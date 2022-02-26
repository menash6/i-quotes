import { IonApp } from "@ionic/react";
import { useEffect } from "react";
import { fetchAsyncQuotes, selectStatus } from "./features/quotesPlayer/quotesPlayerSlice";
import { selectStatusMusic, fetchAsyncMusic } from "./features/musicPlayer/musicPlayerSlice";

import { LoadingTimer } from "./components/LoadingTimer";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";

import MusicPlayerProvider from "./providers/musicPlayer/musicPlayer.provider";
import QuotesPlayerProvider from "./providers/quotesPlayer/quotesPlayer.provider";

const App: React.FC = () => {
  const status = useSelector(selectStatus);
  const statusMusic = useSelector(selectStatusMusic);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncQuotes());
    dispatch(fetchAsyncMusic());
  }, [dispatch]);

  // if (statusMusic !== "loaded") return <h1>Loading</h1>;
  if (status !== "loaded") return <LoadingTimer />;
  // if (status !== "loaded" || statusMusic !== "loaded") return <LoadingTimer />;
  // return <LoadingTimer />;

  return (
    <>
      <MusicPlayerProvider>
        <QuotesPlayerProvider>
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
