import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { portfolioService } from '@/api/services/portfolio.service';
import type { PortfolioItem, PortfolioCategory, MediaType } from '@/types/portfolio.types';

export default function PortfolioManagementPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState<PortfolioCategory>('EVENTOS');
  const [tipoMedio, setTipoMedio] = useState<MediaType>('FOTO');
  const [urlMedio, setUrlMedio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [destacado, setDestacado] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const load = useCallback(async () => {
    try {
      setError('');
      const data = await portfolioService.getAll();
      setItems(data.results.sort((a, b) => a.orden - b.orden));
    } catch {
      setError('No se pudieron cargar los items del portafolio. ¿Token admin válido?');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      // Auto-detectar tipo de medio
      if (file.type.startsWith('image/')) {
        setTipoMedio('FOTO');
      } else if (file.type.startsWith('video/')) {
        setTipoMedio('VIDEO');
      }
    }
  };

  const save = async () => {
    try {
      setError('');
      setSuccess('');
      
      if (!titulo.trim()) {
        return setError('El título es requerido');
      }

      let finalUrlMedio = urlMedio;

      // Si hay archivo seleccionado, subirlo
      if (selectedFile) {
        setSuccess('Subiendo archivo...');
        finalUrlMedio = await portfolioService.uploadFile(selectedFile);
      }

      if (!finalUrlMedio) {
        return setError('Debes seleccionar un archivo o proporcionar una URL');
      }

      const payload = {
        titulo: titulo.trim(),
        categoria,
        tipo_medio: tipoMedio,
        url_medio: finalUrlMedio,
        descripcion: descripcion.trim() || undefined,
        destacado,
      };

      if (editId) {
        await portfolioService.update(editId, payload);
        setSuccess('Item actualizado exitosamente');
      } else {
        await portfolioService.create(payload);
        setSuccess('Item creado exitosamente');
      }

      clearForm();
      await load();
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string } } };
      setError(error?.response?.data?.detail || 'No se pudo guardar el item. Verifica los datos.');
    }
  };

  const startEdit = (item: PortfolioItem) => {
    setEditId(item.id);
    setTitulo(item.titulo);
    setCategoria(item.categoria);
    setTipoMedio(item.tipo_medio);
    setUrlMedio(item.url_medio);
    setDescripcion(item.descripcion || '');
    setDestacado(item.destacado);
    setPreviewUrl(item.url_medio);
  };

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar este item del portafolio?')) return;
    try {
      setError('');
      setSuccess('');
      await portfolioService.delete(id);
      setSuccess('Item eliminado exitosamente');
      await load();
    } catch {
      setError('No se pudo eliminar el item.');
    }
  };

  const toggleDestacado = async (item: PortfolioItem) => {
    try {
      setError('');
      await portfolioService.update(item.id, { destacado: !item.destacado });
      await load();
    } catch {
      setError('No se pudo actualizar el estado destacado.');
    }
  };

  const clearForm = () => {
    setEditId(null);
    setTitulo('');
    setCategoria('EVENTOS');
    setTipoMedio('FOTO');
    setUrlMedio('');
    setDescripcion('');
    setDestacado(false);
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#0A1929' }}>
        Gestión de Portafolio
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#0A1929' }}>
          {editId ? 'Editar Item' : 'Agregar Nuevo Item'}
        </Typography>

        <Stack spacing={3}>
          <TextField 
            label="Título" 
            required 
            fullWidth 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: Boda en la playa 2024"
          />

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <FormControl fullWidth required>
              <InputLabel>Categoría</InputLabel>
              <Select 
                label="Categoría" 
                value={categoria} 
                onChange={(e) => setCategoria(e.target.value as PortfolioCategory)}
              >
                <MenuItem value="EVENTOS">Eventos</MenuItem>
                <MenuItem value="INMOBILIARIO">Inmobiliario</MenuItem>
                <MenuItem value="TURISMO">Turismo</MenuItem>
                <MenuItem value="INSPECCION">Inspección</MenuItem>
                <MenuItem value="PRODUCCION">Producción</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Tipo de Medio</InputLabel>
              <Select 
                label="Tipo de Medio" 
                value={tipoMedio} 
                onChange={(e) => setTipoMedio(e.target.value as MediaType)}
              >
                <MenuItem value="FOTO">Foto</MenuItem>
                <MenuItem value="VIDEO">Video</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch 
                  checked={destacado} 
                  onChange={(e) => setDestacado(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#FFD700',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#FFD700',
                    },
                  }}
                />
              }
              label="Destacado en portada"
            />
          </Stack>


          <TextField
            label="Descripción (opcional)"
            multiline
            rows={2}
            fullWidth
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Breve descripción del trabajo realizado"
          />

          {/* Subida de archivos */}
          <Box sx={{ border: '2px dashed #00A7E1', borderRadius: 2, p: 3, textAlign: 'center' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                sx={{ 
                  borderColor: '#00A7E1', 
                  color: '#00A7E1',
                  '&:hover': {
                    borderColor: '#0A1929',
                    backgroundColor: 'rgba(0,167,225,0.1)',
                  }
                }}
              >
                Seleccionar Archivo
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1, color: '#0A1929' }}>
                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </Typography>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            O proporciona una URL directa:
          </Typography>

          <TextField
            label="URL del medio (opcional si subiste archivo)"
            fullWidth
            value={urlMedio}
            onChange={(e) => setUrlMedio(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />

          {/* Preview */}
          {previewUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom sx={{ color: '#0A1929' }}>
                Vista previa:
              </Typography>
              {tipoMedio === 'FOTO' ? (
                <Box
                  component="img"
                  src={previewUrl}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                  }}
                />
              ) : (
                <Box
                  component="video"
                  controls
                  sx={{
                    width: '100%',
                    maxHeight: 300,
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#000',
                  }}
                >
                  <source src={previewUrl} type="video/mp4" />
                  Tu navegador no soporta la reproducción de videos.
                </Box>
              )}
            </Box>
          )}

          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              onClick={save}
              sx={{
                background: 'linear-gradient(135deg, #00A7E1 0%, #0A1929 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0A1929 0%, #00A7E1 100%)',
                }
              }}
            >
              {editId ? 'Actualizar' : 'Crear'}
            </Button>
            {editId && (
              <Button variant="outlined" onClick={clearForm}>
                Cancelar
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>

      <Typography variant="h6" gutterBottom sx={{ color: '#0A1929' }}>
        Items del Portafolio ({items.length})
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {items.map((item) => (
          <Box key={item.id} sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)', lg: 'calc(25% - 18px)' } }}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,167,225,0.3)',
                transform: 'translateY(-4px)',
              },
              transition: 'all 0.3s ease',
            }}>
              {item.destacado && (
                <Chip
                  icon={<StarIcon />}
                  label="Destacado"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    backgroundColor: '#FFD700',
                    color: '#0A1929',
                    fontWeight: 'bold',
                  }}
                />
              )}
              
              {item.tipo_medio === 'FOTO' ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.url_medio}
                  alt={item.titulo}
                  sx={{ objectFit: 'cover' }}
                />
              ) : (
                <Box
                  component="video"
                  controls
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    backgroundColor: '#000',
                    display: 'block',
                  }}
                >
                  <source src={item.url_medio} type="video/mp4" />
                  Tu navegador no soporta la reproducción de videos.
                </Box>
              )}
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#0A1929', fontSize: '1rem' }}>
                  {item.titulo}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                  <Chip label={item.categoria} size="small" sx={{ backgroundColor: '#00A7E1', color: 'white' }} />
                  <Chip label={item.tipo_medio} size="small" sx={{ backgroundColor: '#0A1929', color: 'white' }} />
                </Stack>
                {item.descripcion && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    {item.descripcion.substring(0, 80)}{item.descripcion.length > 80 ? '...' : ''}
                  </Typography>
                )}
              </CardContent>
              
              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Stack direction="row" spacing={1}>
                  <IconButton 
                    size="small" 
                    onClick={() => startEdit(item)}
                    sx={{ 
                      color: '#00A7E1',
                      '&:hover': { backgroundColor: 'rgba(0,167,225,0.1)' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => remove(item.id)}
                    sx={{ 
                      color: '#FF9800',
                      '&:hover': { backgroundColor: 'rgba(255,152,0,0.1)' }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
                <IconButton 
                  size="small" 
                  onClick={() => toggleDestacado(item)}
                  sx={{ 
                    color: item.destacado ? '#FFD700' : 'grey.400',
                    '&:hover': { backgroundColor: 'rgba(255,215,0,0.1)' }
                  }}
                >
                  {item.destacado ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      {items.length === 0 && !error && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No hay items en el portafolio. ¡Agrega el primero!
          </Typography>
        </Paper>
      )}
    </Container>
  );
}
