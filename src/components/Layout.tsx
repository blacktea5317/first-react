import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <h1>上</h1>
      <Outlet />
      <h1>下</h1>
    </div>
  );
}
