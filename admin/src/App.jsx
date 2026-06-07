import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PremiumMembers from './pages/PremiumMembers';
import Subscribers from './pages/Subscribers';
import Recipes from './pages/Recipes';
import Pages from './pages/Pages';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import Magazine from './pages/Magazine';

function RequireAuth({ children }) {
  const token = localStorage.getItem('admin_token');
  const location = useLocation();
  if (!token) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function AdminLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <RequireAuth>
            <AdminLayout><Dashboard /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/premium" element={
          <RequireAuth>
            <AdminLayout><PremiumMembers /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/subscribers" element={
          <RequireAuth>
            <AdminLayout><Subscribers /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/recipes" element={
          <RequireAuth>
            <AdminLayout><Recipes /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/pages" element={
          <RequireAuth>
            <AdminLayout><Pages /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/categories" element={
          <RequireAuth>
            <AdminLayout><Categories /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/magazine" element={
          <RequireAuth>
            <AdminLayout><Magazine /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="/settings" element={
          <RequireAuth>
            <AdminLayout><Settings /></AdminLayout>
          </RequireAuth>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
