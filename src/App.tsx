import { Provider as ReduxProvider } from "react-redux";

import { store } from "./redux-store";
import { Player } from "./pages/player/player";

function App() {
  return (
    <ReduxProvider store={store}>
      <Player />
    </ReduxProvider>
  );
}

export default App;
