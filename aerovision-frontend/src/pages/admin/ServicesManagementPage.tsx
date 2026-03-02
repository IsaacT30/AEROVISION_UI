import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
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
  Switch,
  FormControlLabel,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { servicesService } from '@/api/services/services.service';
import type { Service, ServiceCategory, ServiceCreateDTO } from '@/types/service.types';

export default function ServicesManagementPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState<ServiceCategory>('EVENTOS');
  const [descripcion, setDescripcion] = useState('');
  const [precioBase, setPrecioBase] = useState(0);
  const [precioPorHora, setPrecioPorHora] = useState(0);
  const [horasMinimas, setHorasMinimas] = useState(2);
  const [activo, setActivo] = useState(true);
  const [imagenUrl, setImagenUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const load = useCallback(async () => {
    try {
      setError('');
      const data = await servicesService.getAll();
      setItems(data.results);
    } catch {
      setError('No se pudieron cargar los servicios. ¿Token admin válido?');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Crear preview inmediato
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      
      // Convertir a base64 para poder guardarlo sin backend
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagenUrl(base64String); // Guardar base64 directamente
      };
      reader.readAsDataURL(file);
    }
  };

  const save = async () => {
    try {
      setError('');
      setSuccess('');
      if (!nombre.trim() || !descripcion.trim()) {
        return setError('Completa todos los campos requeridos');
      }

      const payload: ServiceCreateDTO & { imagen_base64?: string } = {
        nombre: nombre.trim(),
        categoria,
        descripcion: descripcion.trim(),
        precio_base: precioBase,
        precio_por_hora: precioPorHora,
        horas_minimas: horasMinimas,
        activo,
      };

      // Si hay imagen base64, enviarla con el campo correcto
      if (imagenUrl && imagenUrl.startsWith('data:image/')) {
        payload.imagen_base64 = imagenUrl;
      }

      if (editId) {
        await servicesService.update(editId, payload);
        setSuccess('Servicio actualizado exitosamente con imagen');
      } else {
        await servicesService.create(payload);
        setSuccess('Servicio creado exitosamente con imagen');
      }

      clearForm();
      await load();
    } catch (err) {
      console.error('Error completo:', err);
      const error = err as { response?: { data?: { detail?: string; imagen_base64?: string[]; error?: string } }; message?: string };
      const errorMsg = error?.response?.data?.detail 
        || error?.response?.data?.imagen_base64?.[0]
        || error?.response?.data?.error
        || error?.message 
        || 'No se pudo guardar el servicio.';
      setError(errorMsg);
    }
  };

  const startEdit = (s: Service) => {
    setEditId(s.id);
    setNombre(s.nombre);
    setCategoria(s.categoria);
    setDescripcion(s.descripcion);
    setPrecioBase(parseFloat(s.precio_base));
    setPrecioPorHora(parseFloat(s.precio_por_hora));
    setHorasMinimas(s.horas_minimas);
    setActivo(s.activo);
    setImagenUrl(s.imagen_url || '');
    setPreviewUrl(s.imagen_url || '');
  };

  const remove = async (id: number) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    try {
      setError('');
      setSuccess('');
      await servicesService.delete(id);
      setSuccess('Servicio eliminado exitosamente');
      await load();
    } catch {
      setError('No se pudo eliminar el servicio.');
    }
  };

  const clearForm = () => {
    setEditId(null);
    setNombre('');
    setCategoria('EVENTOS');
    setDescripcion('');
    setPrecioBase(0);
    setPrecioPorHora(0);
    setHorasMinimas(2);
    setActivo(true);
    setImagenUrl('');
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#0A1929' }}>
        Gestión de Servicios
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {editId ? 'Editar Servicio' : 'Crear Servicio'}
        </Typography>

        <Stack spacing={3}>
          <TextField label="Nombre" required fullWidth value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <FormControl fullWidth required>
            <InputLabel>Categoría</InputLabel>
            <Select label="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value as ServiceCategory)}>
              <MenuItem value="EVENTOS">Eventos</MenuItem>
              <MenuItem value="INMOBILIARIO">Inmobiliario</MenuItem>
              <MenuItem value="TURISMO">Turismo</MenuItem>
              <MenuItem value="INSPECCION">Inspección</MenuItem>
              <MenuItem value="PRODUCCION">Producción</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Descripción"
            required
            multiline
            rows={3}
            fullWidth
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          {/* Subida de imagen */}
          <Box sx={{ border: '2px dashed #00A7E1', borderRadius: 2, p: 3, textAlign: 'center' }}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="service-image-upload"
            />
            <label htmlFor="service-image-upload">
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
                Seleccionar Imagen del Servicio
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1, color: '#0A1929' }}>
                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </Typography>
            )}
          </Box>

          <TextField
            label="URL de imagen (opcional si subiste archivo)"
            fullWidth
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen-servicio.jpg"
          />

          {/* Preview */}
          {previewUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom sx={{ color: '#0A1929' }}>
                Vista previa:
              </Typography>
              <Box
                component="img"
                src={previewUrl}
                alt="Preview"
                sx={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'contain',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                }}
              />
            </Box>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Precio Base"
              type="number"
              fullWidth
              value={precioBase}
              onChange={(e) => setPrecioBase(Number(e.target.value))}
            />
            <TextField
              label="Precio por Hora"
              type="number"
              fullWidth
              value={precioPorHora}
              onChange={(e) => setPrecioPorHora(Number(e.target.value))}
            />
            <TextField
              label="Horas Mínimas"
              type="number"
              fullWidth
              value={horasMinimas}
              onChange={(e) => setHorasMinimas(Number(e.target.value))}
            />
          </Stack>

          <FormControlLabel
            control={
              <Switch 
                checked={activo} 
                onChange={(e) => setActivo(e.target.checked)}
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
            label={activo ? 'Activo' : 'Inactivo'}
          />

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
            <Button variant="outlined" onClick={load}>
              Refrescar
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#0A1929' }}>
          Lista de Servicios ({items.length})
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Imagen</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Precio Base</TableCell>
              <TableCell>$/Hora</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((s) => (
              <TableRow key={s.id} sx={{ '&:hover': { bgcolor: 'rgba(0,167,225,0.05)' } }}>
                <TableCell>
                  {s.imagen_url ? (
                    <Box
                      component="img"
                      src={s.imagen_url}
                      alt={s.nombre}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 1,
                        border: '1px solid #e0e0e0',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: '#f5f5f5',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        Sin imagen
                      </Typography>
                    </Box>
                  )}
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{s.nombre}</TableCell>
                <TableCell>{s.categoria}</TableCell>
                <TableCell>${s.precio_base}</TableCell>
                <TableCell>${s.precio_por_hora}</TableCell>
                <TableCell>{s.activo ? '✅ Activo' : '❌ Inactivo'}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={() => startEdit(s)}
                    sx={{ 
                      color: '#00A7E1',
                      '&:hover': { backgroundColor: 'rgba(0,167,225,0.1)' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => remove(s.id)}
                    sx={{ 
                      color: '#FF9800',
                      '&:hover': { backgroundColor: 'rgba(255,152,0,0.1)' }
                    }}
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
              No hay servicios creados. ¡Crea el primero!
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
