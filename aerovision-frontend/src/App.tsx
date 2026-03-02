import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Public pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import ServiceDetailPage from './pages/public/ServiceDetailPage';
import BookingPage from './pages/public/BookingPage';
import PortfolioPage from './pages/public/PortfolioPage';
import ContactPage from './pages/public/ContactPage';
import AboutPage from './pages/public/AboutPage';

// Auth
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RequireAuth from './components/RequireAuth';

// Admin pages
import DashboardPage from './pages/admin/DashboardPage';
import ServicesManagementPage from './pages/admin/ServicesManagementPage';
import BookingsManagementPage from './pages/admin/BookingsManagementPage';
import LeadsManagementPage from './pages/admin/LeadsManagementPage';
import PortfolioManagementPage from './pages/admin/PortfolioManagementPage';

// Layout para páginas públicas
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

// Layout para admin
function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Header isAdmin onLogout={handleLogout} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          bgcolor: 'grey.100',
          width: '100%',
          overflowX: 'hidden',
          overflowY: 'auto'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/servicios"
          element={
            <PublicLayout>
              <ServicesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/servicios/:slug"
          element={
            <PublicLayout>
              <ServiceDetailPage />
            </PublicLayout>
          }
        />
        <Route
          path="/reservar/:id"
          element={
            <RequireAuth>
              <PublicLayout>
                <BookingPage />
              </PublicLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/portafolio"
          element={
            <PublicLayout>
              <PortfolioPage />
            </PublicLayout>
          }
        />
        <Route
          path="/sobre-nosotros"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contacto"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <PublicLayout>
              <LoginPage />
            </PublicLayout>
          }
        />
        <Route
          path="/registro"
          element={
            <PublicLayout>
              <RegisterPage />
            </PublicLayout>
          }
        />

        {/* Rutas admin protegidas */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout>
                <DashboardPage />
              </AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/servicios"
          element={
            <RequireAuth>
              <AdminLayout>
                <ServicesManagementPage />
              </AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/reservas"
          element={
            <RequireAuth>
              <AdminLayout>
                <BookingsManagementPage />
              </AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/consultas"
          element={
            <RequireAuth>
              <AdminLayout>
                <LeadsManagementPage />
              </AdminLayout>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/portafolio"
          element={
            <RequireAuth>
              <AdminLayout>
                <PortfolioManagementPage />
              </AdminLayout>
            </RequireAuth>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
