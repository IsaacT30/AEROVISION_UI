import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { servicesService } from '@/api/services/services.service';
import type { Service } from '@/types/service.types';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadService = async () => {
      if (!slug) {
        setError('Servicio no encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { results } = await servicesService.getAll();
        const foundService = results.find((s: Service) => s.slug === slug);
        
        if (foundService) {
          setService(foundService);
        } else {
          setError('Servicio no encontrado');
        }
      } catch (err) {
        setError('Error cargando el servicio');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [slug]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#00A7E1' }} />
      </Container>
    );
  }

  if (error || !service) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Servicio no encontrado'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/servicios')}
          sx={{ color: '#00A7E1' }}
        >
          Volver a Servicios
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      {/* Botón volver */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/servicios')}
        sx={{ mb: 3, color: '#00A7E1' }}
      >
        Volver a Servicios
      </Button>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Imagen del servicio */}
        <Box sx={{ flex: 1 }}>
          <Box
            component="img"
            src={service.imagen_url || '/images/info.jpeg'}
            alt={service.nombre}
            sx={{
              width: '100%',
              height: { xs: 300, md: 500 },
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Box>

        {/* Información del servicio */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 4 }}>
            <Chip
              label={service.categoria}
              color="primary"
              sx={{ mb: 2, bgcolor: '#00A7E1', fontWeight: 600 }}
            />
            
            <Typography variant="h3" gutterBottom sx={{ color: '#0A1929', fontWeight: 700 }}>
              {service.nombre}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {service.descripcion}
            </Typography>

            {/* Duración */}
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Horas mínimas:</strong> {service.horas_minimas} hora{service.horas_minimas > 1 ? 's' : ''}
              </Typography>
            </Box>

            {/* Precios */}
            <Box sx={{ mb: 4, p: 3, bgcolor: '#00A7E1', borderRadius: 2 }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                Desde ${service.precio_base}
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
                + ${service.precio_por_hora}/hora adicional
              </Typography>
            </Box>

            {/* Botón de reserva */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate(`/reservar/${service.id}`)}
              sx={{
                bgcolor: '#FFD700',
                color: '#0A1929',
                fontWeight: 700,
                fontSize: '1.1rem',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#FF9800',
                },
              }}
            >
              Reservar Ahora
            </Button>

            {/* Estado */}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Chip
                label={service.activo ? 'Disponible' : 'No disponible'}
                color={service.activo ? 'success' : 'error'}
                size="small"
              />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
