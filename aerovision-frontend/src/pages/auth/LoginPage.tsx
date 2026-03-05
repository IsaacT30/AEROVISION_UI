import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { authService } from '@/api/services/auth.service';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mostrar mensaje si viene desde registro
    const state = location.state as { message?: string } | null;
    if (state?.message) {
      setMsg({ type: 'success', text: state.message });
    }
  }, [location]);

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMsg(null);
      const data = await authService.login({ username, password });
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      // Guardar información del usuario
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Disparar evento para que el Header se actualice
      window.dispatchEvent(new Event('auth-change'));
      
      setMsg({ type: 'success', text: 'Login exitoso. Redirigiendo...' });
      
      // Redirigir según el tipo de usuario
      setTimeout(() => {
        if (data.user?.is_staff) {
          navigate('/admin');
        } else {
          navigate('/reservas'); // Panel de usuario normal
        }
      }, 500);
    } catch {
      setMsg({ type: 'error', text: 'Login falló. Verifica tus credenciales.' });
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
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: { sm: 'translateY(-4px)' },
          },
        }}
      >
        {/* Logo de la empresa */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 3, sm: 4 } }}>
          <Box
            component="img"
            src="/images/logo_T1.jpeg"
            alt="AeroVisión"
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              mb: { xs: 1.5, sm: 2 },
              borderRadius: '50%',
              objectFit: 'cover',
              filter: 'drop-shadow(0 4px 12px rgba(0,167,225,0.4))',
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          />
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ 
              color: '#0A1929', 
              fontWeight: 700,
              mb: 1,
            }}
          >
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bienvenido a AeroVisión
          </Typography>
        </Box>

        <form onSubmit={doLogin}>
          <Stack spacing={3}>
            {msg && <Alert severity={msg.type}>{msg.text}</Alert>}

            <TextField
              label="Usuario"
              required
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#00A7E1' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#00A7E1',
                  },
                },
              }}
            />

            <TextField
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#00A7E1' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#00A7E1',
                  },
                },
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
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>

            <Box sx={{ textAlign: 'center', pt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                ¿No tienes cuenta?{' '}
                <Box
                  component={RouterLink}
                  to="/registro"
                  sx={{
                    color: '#00A7E1',
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Regístrate aquí
                </Box>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
