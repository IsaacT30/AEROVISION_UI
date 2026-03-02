import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Alert,
  Stack,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { servicesService } from '@/api/services/services.service';
import { bookingsService } from '@/api/services/bookings.service';
import { authService } from '@/api/services/auth.service';
import type { Service } from '@/types/service.types';

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Formulario
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [clienteTelefono, setClienteTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setError('Servicio no encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Cargar servicio y usuario en paralelo
        const [servicesData, userData] = await Promise.all([
          servicesService.getAll(),
          authService.getCurrentUser().catch(() => null), // No fallar si no está logueado
        ]);
        
        const foundService = servicesData.results.find((s: Service) => s.id === Number(id));
        
        if (foundService) {
          setService(foundService);
        } else {
          setError('Servicio no encontrado');
        }

        // Pre-llenar datos del usuario si está logueado
        if (userData) {
          setClienteNombre(`${userData.first_name || ''} ${userData.last_name || ''}`.trim() || userData.username);
          setClienteEmail(userData.email);
          // El teléfono no está en el modelo User por defecto, lo dejaremos vacío
        }
      } catch (err) {
        setError('Error cargando el servicio');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const calcularPrecioTotal = () => {
    if (!service) return '0';
    // El precio base ya incluye las horas mínimas
    // Solo se cobra precio_por_hora para horas adicionales
    return service.precio_base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!service) return;

    setSubmitting(true);
    setError('');

    try {
      await bookingsService.create({
        servicio: service.id,
        cliente_nombre: clienteNombre,
        cliente_email: clienteEmail,
        cliente_telefono: clienteTelefono,
        fecha,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
        ciudad,
        mensaje,
      });

      setSuccess(true);
      
      // Redirigir después de 3 segundos
      setTimeout(() => {
        navigate('/servicios');
      }, 3000);
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error?.response?.data?.detail || 'Error al crear la reserva. Por favor intenta nuevamente.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#00A7E1' }} />
      </Container>
    );
  }

  if (error && !service) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
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

  if (success) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Paper sx={{ p: 5, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ color: '#0A1929', fontWeight: 700 }}>
            ¡Reserva Enviada!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Tu solicitud de reserva ha sido recibida. Te contactaremos pronto para confirmar los detalles.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Redirigiendo a servicios...
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/servicios')}
            sx={{ bgcolor: '#00A7E1' }}
          >
            Volver a Servicios
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      {/* Botón volver */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: '#00A7E1' }}
      >
        Volver
      </Button>

      <Typography variant="h3" gutterBottom sx={{ color: '#0A1929', fontWeight: 700, mb: 4 }}>
        Reservar Servicio
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Resumen del servicio */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#0A1929', fontWeight: 600 }}>
              Resumen del Servicio
            </Typography>
            
            {service?.imagen_url && (
              <Box
                component="img"
                src={service.imagen_url}
                alt={service.nombre}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  borderRadius: 2,
                  mb: 2,
                }}
              />
            )}

            <Chip
              label={service?.categoria}
              color="primary"
              sx={{ mb: 2, bgcolor: '#00A7E1' }}
            />

            <Typography variant="h6" gutterBottom sx={{ color: '#0A1929' }}>
              {service?.nombre}
            </Typography>

            <Typography variant="body2" color="text.secondary" paragraph>
              {service?.descripcion.substring(0, 150)}...
            </Typography>

            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Precio base: <strong>${service?.precio_base}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Por hora: <strong>${service?.precio_por_hora}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Horas mínimas: <strong>{service?.horas_minimas || 1} hora{(service?.horas_minimas || 1) > 1 ? 's' : ''}</strong>
              </Typography>
            </Box>

            <Box sx={{ bgcolor: '#00A7E1', p: 2, borderRadius: 1 }}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                Total: ${calcularPrecioTotal()}
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Formulario */}
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#0A1929', fontWeight: 600, mb: 3 }}>
              Datos de Contacto
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Nombre Completo"
                  value={clienteNombre}
                  onChange={(e) => setClienteNombre(e.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Email"
                  type="email"
                  value={clienteEmail}
                  onChange={(e) => setClienteEmail(e.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Teléfono"
                  value={clienteTelefono}
                  onChange={(e) => setClienteTelefono(e.target.value)}
                  required
                  fullWidth
                />

                <TextField
                  label="Fecha del Servicio"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0],
                  }}
                />

                <TextField
                  label="Hora de Inicio"
                  type="time"
                  value={horaInicio}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  label="Hora de Fin"
                  type="time"
                  value={horaFin}
                  onChange={(e) => setHoraFin(e.target.value)}
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  helperText={`Mínimo ${service?.horas_minimas || 1} hora${(service?.horas_minimas || 1) > 1 ? 's' : ''} de servicio`}
                />

                <TextField
                  label="Ciudad"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  fullWidth
                  placeholder="¿En qué ciudad requieres el servicio?"
                />

                <TextField
                  label="Mensaje adicional (opcional)"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Cuéntanos más sobre lo que necesitas..."
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={submitting}
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
                  {submitting ? <CircularProgress size={24} sx={{ color: '#0A1929' }} /> : 'Enviar Solicitud de Reserva'}
                </Button>

                <Typography variant="caption" color="text.secondary" textAlign="center">
                  Al enviar esta solicitud, recibirás una confirmación por email. 
                  Nos pondremos en contacto contigo para coordinar los detalles finales.
                </Typography>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
