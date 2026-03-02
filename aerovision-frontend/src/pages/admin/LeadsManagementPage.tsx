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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { leadsService } from '@/api/services/leads.service';
import type { Lead, LeadStatus } from '@/types/lead.types';

export default function LeadsManagementPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');

  const load = useCallback(async () => {
    try {
      setError('');
      const params = filtroEstado ? { estado: filtroEstado } : undefined;
      const data = await leadsService.getAll(params);
      setItems(data.results);
    } catch {
      setError('No se pudieron cargar las consultas. ¿Token admin válido?');
    }
  }, [filtroEstado]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (id: number, estado: LeadStatus) => {
    try {
      setError('');
      setSuccess('');
      await leadsService.updateStatus(id, estado);
      setSuccess('Estado actualizado exitosamente');
      await load();
    } catch {
      setError('No se pudo cambiar el estado de la consulta.');
    }
  };

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar esta consulta?')) return;
    try {
      setError('');
      setSuccess('');
      await leadsService.delete(id);
      setSuccess('Consulta eliminada exitosamente');
      await load();
    } catch {
      setError('No se pudo eliminar la consulta.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#0A1929' }}>
        Gestión de Consultas
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Estado</InputLabel>
            <Select label="Filtrar por Estado" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="NUEVO">Nuevos</MenuItem>
              <MenuItem value="CONTACTADO">Contactados</MenuItem>
              <MenuItem value="CERRADO">Cerrados</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" onClick={load}>
            Refrescar
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#0A1929' }}>
          Lista de Consultas ({items.length})
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Contacto</TableCell>
              <TableCell>Mensaje</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((lead) => (
              <TableRow key={lead.id} sx={{ '&:hover': { bgcolor: 'rgba(0,167,225,0.05)' } }}>
                <TableCell>{lead.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{lead.nombre}</TableCell>
                <TableCell>
                  <div>{lead.telefono}</div>
                  {lead.email && (
                    <Typography variant="caption" color="text.secondary">
                      {lead.email}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" noWrap>
                    {lead.mensaje}
                  </Typography>
                </TableCell>
                <TableCell>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={lead.estado}
                      onChange={(e) => changeStatus(lead.id, e.target.value as LeadStatus)}
                      sx={{ fontSize: '0.875rem' }}
                    >
                      <MenuItem value="NUEVO">Nuevo</MenuItem>
                      <MenuItem value="CONTACTADO">Contactado</MenuItem>
                      <MenuItem value="CERRADO">Cerrado</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{new Date(lead.created_at).toLocaleDateString()}</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={() => remove(lead.id)}
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
              No hay consultas con estos filtros
            </Typography>
          </Box>
        )}

        {items.length === 0 && (
          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
            No hay consultas con estos filtros
          </Typography>
        )}
      </Paper>
    </Container>
  );
}
