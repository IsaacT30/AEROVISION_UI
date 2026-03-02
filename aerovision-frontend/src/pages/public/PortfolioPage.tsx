import { useEffect, useState, useCallback } from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
} from '@mui/material';
import { portfolioService } from '@/api/services/portfolio.service';
import type { PortfolioItem } from '@/types/portfolio.types';

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [categoria, setCategoria] = useState<string>('');
  const [tipoMedio, setTipoMedio] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params: Record<string, string> = {};
      if (categoria) params.categoria = categoria;
      if (tipoMedio) params.tipo_medio = tipoMedio;

      const data = await portfolioService.getAll(params);
      setItems(data.results);
    } catch {
      setError('No se pudo cargar el portafolio. Verifica que el backend esté en ejecución.');
    } finally {
      setLoading(false);
    }
  }, [categoria, tipoMedio]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Container maxWidth="lg" sx={{ my: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Nuestro Portafolio
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
        Descubre nuestros trabajos más destacados
      </Typography>

      {/* Filtros */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Categoría</InputLabel>
          <Select value={categoria} label="Categoría" onChange={(e) => setCategoria(e.target.value)}>
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="EVENTOS">Eventos</MenuItem>
            <MenuItem value="INMOBILIARIO">Inmobiliario</MenuItem>
            <MenuItem value="TURISMO">Turismo</MenuItem>
            <MenuItem value="INSPECCION">Inspección</MenuItem>
            <MenuItem value="PRODUCCION">Producción</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Tipo</InputLabel>
          <Select value={tipoMedio} label="Tipo" onChange={(e) => setTipoMedio(e.target.value)}>
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="FOTO">Fotos</MenuItem>
            <MenuItem value="VIDEO">Videos</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {loading ? (
        <Typography>Cargando portafolio...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {items.map((item) => (
            <Box key={item.id} sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  }
                }}
              >
                {item.tipo_medio === 'FOTO' ? (
                  <CardMedia
                    component="img"
                    height="250"
                    image={item.url_medio}
                    alt={item.titulo}
                    sx={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                      src={item.url_medio}
                      title={item.titulo}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Box>
                )}
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.titulo}
                  </Typography>
                  <Chip label={item.categoria} size="small" sx={{ mr: 1 }} />
                  <Chip label={item.tipo_medio} size="small" color="secondary" />
                  {item.descripcion && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {item.descripcion}
                    </Typography>
                  )}
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {!loading && items.length === 0 && (
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
          No hay items en el portafolio con estos filtros
        </Typography>
      )}
    </Container>
  );
}
