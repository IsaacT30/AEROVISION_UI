import { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { bookingsService } from '@/api/services/bookings.service';
import type { Booking, BookingStatus } from '@/types/booking.types';

export default function BookingsManagementPage() {
  const [items, setItems] = useState<Booking[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  const load = useCallback(async () => {
    try {
      setError('');
      const params = filtroEstado ? { estado: filtroEstado } : undefined;
      const data = await bookingsService.getAll(params);
      setItems(data.results);
    } catch {
      setError('No se pudieron cargar las reservas. ¿Token admin válido?');
    }
  }, [filtroEstado]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (id: number, estado: BookingStatus) => {
    try {
      setError('');
      setSuccess('');
      await bookingsService.updateStatus(id, estado);
      setSuccess(`Reserva ${estado.toLowerCase()} exitosamente`);
      await load();
    } catch {
      setError('No se pudo cambiar el estado de la reserva.');
    }
  };

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar esta reserva?')) return;
    try {
      setError('');
      setSuccess('');
      await bookingsService.delete(id);
      setSuccess('Reserva eliminada exitosamente');
      await load();
    } catch {
      setError('No se pudo eliminar la reserva.');
    }
  };

  const getStatusColor = (estado: BookingStatus) => {
    switch (estado) {
      case 'PENDIENTE':
        return 'warning';
      case 'CONFIRMADO':
        return 'success';
      case 'CANCELADO':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#0A1929' }}>
        Gestión de Reservas
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Estado</InputLabel>
            <Select label="Filtrar por Estado" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="PENDIENTE">Pendientes</MenuItem>
              <MenuItem value="CONFIRMADO">Confirmados</MenuItem>
              <MenuItem value="CANCELADO">Cancelados</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={load}>
            Refrescar
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#0A1929' }}>
          Lista de Reservas ({items.length})
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Servicio</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((b) => (
              <TableRow key={b.id} sx={{ '&:hover': { bgcolor: 'rgba(0,167,225,0.05)' } }}>
                <TableCell>{b.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{b.servicio_nombre || `#${b.servicio}`}</TableCell>
                <TableCell>
                  <div>{b.cliente_nombre}</div>
                  <Typography variant="caption" color="text.secondary">
                    {b.cliente_telefono}
                  </Typography>
                </TableCell>
                <TableCell>{b.fecha}</TableCell>
                <TableCell>
                  {b.hora_inicio} - {b.hora_fin}
                </TableCell>
                <TableCell>
                  <Chip label={b.estado} color={getStatusColor(b.estado)} size="small" />
                </TableCell>
                <TableCell align="right">
                  {b.estado === 'PENDIENTE' && (
                    <>
                      <IconButton 
                        size="small" 
                        onClick={() => changeStatus(b.id, 'CONFIRMADO')}
                        sx={{ color: '#4caf50', '&:hover': { backgroundColor: 'rgba(76,175,80,0.1)' } }}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => changeStatus(b.id, 'CANCELADO')}
                        sx={{ color: '#f44336', '&:hover': { backgroundColor: 'rgba(244,67,54,0.1)' } }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </>
                  )}
                  <IconButton 
                    size="small" 
                    onClick={() => remove(b.id)}
                    sx={{ color: '#FF9800', '&:hover': { backgroundColor: 'rgba(255,152,0,0.1)' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {items.length === 0 && !error && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No hay reservas con estos filtros
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
