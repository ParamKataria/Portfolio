import { lazy, Suspense } from "react";
import "./App.css";
const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

function Loader() {
  return <div className="app-loader">Loading…</div>; // or your spinner
}

export default function App() {
  return (
    <LoadingProvider>
      <Suspense fallback={<Loader />}>
        <MainContainer>
          <Suspense fallback={<Loader />}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
}
