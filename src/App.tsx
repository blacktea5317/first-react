import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Bus from './pages/Bus';
import Game from './pages/Game';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '*',
          element: <NotFound />,
        },
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/Todo',
          element: <Todo />,
        },
        {
          path: '/Bus',
          element: <Bus />,
        },
        {
          path: '/Game',
          element: <Game />,
        },
      ],
    },
  ],
  { basename: '/first-react' }
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
