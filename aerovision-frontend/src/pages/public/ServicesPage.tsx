import { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { servicesService } from '@/api/services/services.service';
import type { Service } from '@/types/service.types';
import ServiceCard from '@/components/features/services/ServiceCard';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = categoria ? { categoria } : undefined;
      const data = await servicesService.getAll(params);
      setServices(data.results);
    } catch {
      setError('No se pudieron cargar los servicios. Verifica que el backend esté en ejecución.');
    } finally {
      setLoading(false);
    }
  }, [categoria]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container maxWidth="lg" sx={{ my: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Nuestros Servicios
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
        Selecciona el servicio que mejor se adapte a tus necesidades
      </Typography>

      {/* Filtros */}
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoria}
            label="Categoría"
            onChange={(e) => setCategoria(e.target.value)}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="EVENTOS">Eventos</MenuItem>
            <MenuItem value="INMOBILIARIO">Inmobiliario</MenuItem>
            <MenuItem value="TURISMO">Turismo</MenuItem>
            <MenuItem value="INSPECCION">Inspección</MenuItem>
            <MenuItem value="PRODUCCION">Producción</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Typography>Cargando servicios...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {services.map((service) => (
            <Box key={service.id} sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <ServiceCard service={service} />
            </Box>
          ))}
        </Box>
      )}

      {!loading && services.length === 0 && (
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No hay servicios disponibles en esta categoría
        </Typography>
      )}
    </Container>
  );
}
