import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  CircularProgress,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PortfolioIcon from '@mui/icons-material/Collections';
import BuildIcon from '@mui/icons-material/Build';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { bookingsService } from '@/api/services/bookings.service';
import { leadsService } from '@/api/services/leads.service';
import { portfolioService } from '@/api/services/portfolio.service';
import { servicesService } from '@/api/services/services.service';
import type { Booking } from '@/types/booking.types';
import type { Lead } from '@/types/lead.types';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    reservasPendientes: 0,
    reservasConfirmadas: 0,
    consultasNuevas: 0,
    itemsPortafolio: 0,
    totalServicios: 0,
  });
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      
      // Cargar todas las estadísticas en paralelo
      const [bookings, leads, portfolio, services] = await Promise.all([
        bookingsService.getAll().catch(() => ({ results: [] })),
        leadsService.getAll().catch(() => ({ results: [] })),
        portfolioService.getAll().catch(() => ({ results: [] })),
        servicesService.getAll().catch(() => ({ results: [] })),
      ]);

      // Calcular estadísticas
      const reservasPendientes = bookings.results.filter((b: Booking) => b.estado === 'PENDIENTE').length;
      const reservasConfirmadas = bookings.results.filter((b: Booking) => b.estado === 'CONFIRMADO').length;
      const consultasNuevas = leads.results.filter((l: Lead) => l.estado === 'NUEVO').length;

      setStats({
        reservasPendientes,
        reservasConfirmadas,
        consultasNuevas,
        itemsPortafolio: portfolio.results.length,
        totalServicios: services.results.length,
      });

      // Últimas 5 reservas
      setRecentBookings(bookings.results.slice(0, 5));
      
      // Últimas 5 consultas
      setRecentLeads(leads.results.slice(0, 5));

    } catch (error) {
      console.error('Error cargando dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress sx={{ color: '#00A7E1' }} />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#0A1929', fontWeight: 600 }}>
          Panel Administrativo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido al sistema de gestión de AeroVisión - Vista en tiempo real
        </Typography>
      </Box>

      {/* Tarjetas de métricas */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 250px' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #FFD700 0%, #FF9800 100%)',
            color: 'white',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(255,215,0,0.3)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Reservas Pendientes
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {stats.reservasPendientes}
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/admin/reservas')}
                    sx={{ mt: 1, color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    variant="outlined"
                  >
                    Ver todas
                  </Button>
                </Box>
                <PendingIcon sx={{ fontSize: 64, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 250px' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
            color: 'white',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(76,175,80,0.3)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Reservas Confirmadas
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {stats.reservasConfirmadas}
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/admin/reservas')}
                    sx={{ mt: 1, color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    variant="outlined"
                  >
                    Ver todas
                  </Button>
                </Box>
                <CheckCircleIcon sx={{ fontSize: 64, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 250px' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #00A7E1 0%, #0A1929 100%)',
            color: 'white',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,167,225,0.3)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Consultas Nuevas
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {stats.consultasNuevas}
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/admin/consultas')}
                    sx={{ mt: 1, color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    variant="outlined"
                  >
                    Ver todas
                  </Button>
                </Box>
                <ContactMailIcon sx={{ fontSize: 64, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 250px' }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #0A1929 0%, #00537A 100%)',
            color: 'white',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(10,25,41,0.3)' }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                    Items Portafolio
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>
                    {stats.itemsPortafolio}
                  </Typography>
                  <Button 
                    size="small" 
                    onClick={() => navigate('/admin/portafolio')}
                    sx={{ mt: 1, color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                    variant="outlined"
                  >
                    Ver todos
                  </Button>
                </Box>
                <PortfolioIcon sx={{ fontSize: 64, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Estadísticas adicionales */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flex: '1 1 300px' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <BuildIcon sx={{ color: '#00A7E1' }} />
                <Typography variant="h6" sx={{ color: '#0A1929' }}>
                  Servicios Activos
                </Typography>
              </Box>
              <Typography variant="h2" sx={{ color: '#0A1929', fontWeight: 700 }}>
                {stats.totalServicios}
              </Typography>
              <Button 
                size="small" 
                onClick={() => navigate('/admin/servicios')}
                sx={{ mt: 2, color: '#00A7E1' }}
              >
                Gestionar servicios
              </Button>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: '1 1 300px' }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <TrendingUpIcon sx={{ color: '#4caf50' }} />
                <Typography variant="h6" sx={{ color: '#0A1929' }}>
                  Total Reservas
                </Typography>
              </Box>
              <Typography variant="h2" sx={{ color: '#0A1929', fontWeight: 700 }}>
                {stats.reservasPendientes + stats.reservasConfirmadas}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {stats.reservasPendientes} pendientes • {stats.reservasConfirmadas} confirmadas
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Actividad reciente */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
        {/* Últimas reservas */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#0A1929', mb: 3 }}>
              Últimas Reservas
            </Typography>
            {recentBookings.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentBookings.map((booking) => (
                    <TableRow key={booking.id} sx={{ '&:hover': { bgcolor: 'rgba(0,167,225,0.05)' } }}>
                      <TableCell>{booking.cliente_nombre}</TableCell>
                      <TableCell>{booking.fecha}</TableCell>
                      <TableCell>
                        <Chip 
                          label={booking.estado} 
                          size="small"
                          color={booking.estado === 'CONFIRMADO' ? 'success' : booking.estado === 'PENDIENTE' ? 'warning' : 'error'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
                No hay reservas recientes
              </Typography>
            )}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={() => navigate('/admin/reservas')} sx={{ color: '#00A7E1' }}>
                Ver todas las reservas
              </Button>
            </Box>
          </Paper>
        </Box>

        {/* Últimas consultas */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#0A1929', mb: 3 }}>
              Últimas Consultas
            </Typography>
            {recentLeads.length > 0 ? (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentLeads.map((lead) => (
                    <TableRow key={lead.id} sx={{ '&:hover': { bgcolor: 'rgba(0,167,225,0.05)' } }}>
                      <TableCell>{lead.nombre}</TableCell>
                      <TableCell>{lead.telefono}</TableCell>
                      <TableCell>
                        <Chip 
                          label={lead.estado} 
                          size="small"
                          color={lead.estado === 'NUEVO' ? 'info' : lead.estado === 'CONTACTADO' ? 'warning' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 3 }}>
                No hay consultas recientes
              </Typography>
            )}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button onClick={() => navigate('/admin/consultas')} sx={{ color: '#00A7E1' }}>
                Ver todas las consultas
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Acciones Rápidas */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#0A1929' }}>
          Acciones Rápidas
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Usa el menú superior para navegar entre las diferentes secciones del panel administrativo:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<BuildIcon />}
            onClick={() => navigate('/admin/servicios')}
            sx={{ borderColor: '#00A7E1', color: '#00A7E1' }}
          >
            Gestionar Servicios
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<PendingIcon />}
            onClick={() => navigate('/admin/reservas')}
            sx={{ borderColor: '#FFD700', color: '#FFD700' }}
          >
            Ver Reservas
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<ContactMailIcon />}
            onClick={() => navigate('/admin/consultas')}
            sx={{ borderColor: '#00A7E1', color: '#00A7E1' }}
          >
            Ver Consultas
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<PortfolioIcon />}
            onClick={() => navigate('/admin/portafolio')}
            sx={{ borderColor: '#0A1929', color: '#0A1929' }}
          >
            Gestionar Portafolio
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
