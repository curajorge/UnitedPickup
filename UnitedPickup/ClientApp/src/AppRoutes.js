import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { CreateGame } from "./components/CreateGame";
import {AllGames} from "./components/AllGames";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/create-game',
    element: <CreateGame />
  },
  {
    path: '/all-games',
    element: <AllGames />
  }
];

export default AppRoutes;
