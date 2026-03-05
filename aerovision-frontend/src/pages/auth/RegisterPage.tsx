import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { authService } from '@/api/services/auth.service';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    if (formData.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres');
    }

    try {
      setLoading(true);
      setError('');
      
      await authService.register({
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        password: formData.password,
      });
      
      // Registrado exitosamente, redirigir al login
      navigate('/login', { state: { message: 'Registro exitoso. Por favor inicia sesión.' } });
    } catch (err) {
      const error = err as { response?: { data?: { detail?: string; email?: string[]; password?: string[] } } };
      const errorMsg = error?.response?.data?.detail 
        || error?.response?.data?.email?.[0]
        || error?.response?.data?.password?.[0]
        || 'Error al registrarse. Por favor intenta nuevamente.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 4, sm: 6, md: 8 }, mb: { xs: 4, sm: 6, md: 8 }, px: { xs: 2, sm: 3 } }}>
      <Paper 
        elevation={8}
        sx={{ 
          p: { xs: 3, sm: 4, md: 5 },
          borderRadius: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
          <Box
            component="img"
            src="/images/logo_T1.jpeg"
            alt="AeroVisión"
            sx={{
              width: { xs: 70, sm: 80 },
              height: { xs: 70, sm: 80 },
              mb: { xs: 1.5, sm: 2 },
              borderRadius: '50%',
              objectFit: 'cover',
              filter: 'drop-shadow(0 4px 8px rgba(0,167,225,0.3))',
            }}
          />
          <Typography variant="h4" sx={{ color: '#0A1929', fontWeight: 700, mb: 1 }}>
            Crear Cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Únete a AeroVisión para solicitar tus servicios
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Nombre Completo"
              value={formData.nombre}
              onChange={handleChange('nombre')}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#00A7E1' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#00A7E1' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Teléfono"
              value={formData.telefono}
              onChange={handleChange('telefono')}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ color: '#00A7E1' }} />
                  </InputAdornment>
                ),
              }}
              helperText="Ejemplo: +593 99 123 4567"
            />

            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#00A7E1' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Mínimo 6 caracteres"
            />

            <TextField
              label="Confirmar Contraseña"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#00A7E1' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: '#00A7E1',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#0A1929',
                },
              }}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>

            <Box sx={{ textAlign: 'center', pt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ¿Ya tienes cuenta?{' '}
                <Box
                  component={RouterLink}
                  to="/login"
                  sx={{
                    color: '#00A7E1',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Iniciar Sesión
                </Box>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
