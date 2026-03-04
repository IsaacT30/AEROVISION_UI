import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, IconButton, Box, useScrollTrigger, Slide, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import type { ReactNode } from 'react';

interface HeaderProps {
  isAdmin?: boolean;
  onLogout?: () => void;
}

interface HideOnScrollProps {
  children: ReactNode;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children as React.ReactElement}
    </Slide>
  );
}

export default function Header({ isAdmin = false, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Detectar si hay un usuario logueado
  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setCurrentUser(user);
        } catch (e) {
          console.error('Error parsing user data:', e);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    // Verificar al cargar
    checkUser();

    // Escuchar cambios en localStorage (para cuando se haga login/logout)
    const handleStorageChange = () => {
      checkUser();
    };

    window.addEventListener('storage', handleStorageChange);
    // También escuchar un evento personalizado para cambios en la misma pestaña
    window.addEventListener('auth-change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    handleMenuClose();
    
    // Disparar evento para que otros componentes se actualicen
    window.dispatchEvent(new Event('auth-change'));
    
    if (onLogout) {
      onLogout();
    } else {
      navigate('/');
    }
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        sx={{ 
          top: 0, 
          zIndex: 1100,
          borderRadius: 0,
          background: trigger 
            ? 'linear-gradient(135deg, #0A1929 0%, #0D47A1 100%)'
            : 'linear-gradient(135deg, #0A1929 0%, #00537A 100%)',
          boxShadow: trigger 
            ? '0 4px 20px rgba(0,167,225,0.5)' 
            : '0 2px 10px rgba(10,25,41,0.6)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              flex: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
          >
            <Box
              component="img"
              src="/images/logo_T1.jpeg"
              alt="AeroVisión Logo"
              sx={{
                height: { xs: 40, sm: 50 },
                width: { xs: 40, sm: 50 },
                borderRadius: '50%',
                objectFit: 'cover',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                  '50%': { transform: 'translateY(-5px) rotate(3deg)' },
                },
              }}
            />
            
            {/* Slogan animado */}
            {!isAdmin && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  gap: 1,
                  ml: 2,
                  pl: 2,
                  borderLeft: '2px solid rgba(255,215,0,0.3)',
                }}
              >
                <Box
                  component={motion.div}
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  }}
                >
                  <FlightTakeoffIcon 
                    sx={{ 
                      fontSize: 24,
                      color: '#FFD700',
                      filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.6))',
                    }} 
                  />
                </Box>
                <Typography
                  component={motion.span}
                  animate={{
                    backgroundPosition: ['0% center', '200% center'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                  }}
                  sx={{
                    fontSize: { md: '1rem', lg: '1.1rem' },
                    fontWeight: 600,
                    fontStyle: 'italic',
                    background: 'linear-gradient(90deg, #FFD700 0%, #FFF 25%, #FFD700 50%, #FFF 75%, #FFD700 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    whiteSpace: 'nowrap',
                  }}
                >
                  "Haz que tus ideas vuelen"
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }} />

          {!isAdmin ? (
            <Stack 
              direction="row" 
              spacing={0} 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {[
                { to: '/', label: 'Hogar' },
                { to: '/servicios', label: 'Servicios' },
                { to: '/portafolio', label: 'Portafolio' },
                { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
                { to: '/contacto', label: 'Contacto' },
              ].map((item) => (
                <Button
                  key={item.to}
                  color="inherit"
                  component={Link}
                  to={item.to}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 2.5,
                    borderRadius: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    '&:last-child': {
                      borderRight: 'none',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '0%',
                      height: '3px',
                      backgroundColor: '#FFD700',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::before': {
                      width: '100%',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              {/* Mostrar "Hola, Usuario" si está logueado, sino mostrar "Acceso" */}
              {currentUser ? (
                <>
                  <Button
                    color="inherit"
                    onClick={handleMenuOpen}
                    startIcon={<AccountCircleIcon />}
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      px: 2.5,
                      ml: 1,
                      borderRadius: '4px',
                      border: '1px solid rgba(255,255,255,0.3)',
                      '&:hover': {
                        borderColor: '#FFD700',
                        backgroundColor: 'rgba(255,215,0,0.1)',
                      },
                    }}
                  >
                    Hola, {currentUser.first_name || currentUser.username}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    sx={{
                      mt: 1,
                      '& .MuiPaper-root': {
                        borderRadius: '8px',
                        minWidth: 180,
                      },
                    }}
                  >
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                      Cerrar sesión
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    px: 2.5,
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    ml: 1,
                    borderRadius: '4px',
                    '&:hover': {
                      borderColor: '#FFD700',
                      backgroundColor: 'rgba(255,215,0,0.1)',
                    },
                  }}
                >
                  Acceso
                </Button>
              )}
            </Stack>
          ) : (
            <Stack 
              direction="row" 
              spacing={1} 
              alignItems="center"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              {[
                { to: '/admin', label: 'Dashboard' },
                { to: '/admin/servicios', label: 'Servicios' },
                { to: '/admin/reservas', label: 'Reservas' },
                { to: '/admin/consultas', label: 'Consultas' },
                { to: '/admin/portafolio', label: 'Portafolio' },
              ].map((item) => (
                <Button
                  key={item.to}
                  color="inherit"
                  component={Link}
                  to={item.to}
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    px: 2,
                    borderRadius: '20px',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      width: '0%',
                      height: '2px',
                      backgroundColor: 'white',
                      transform: 'translateX(-50%)',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::before': {
                      width: '80%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              {onLogout && (
                <IconButton 
                  color="inherit" 
                  onClick={onLogout}
                  sx={{
                    ml: 2,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'rotate(15deg) scale(1.1)',
                    },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              )}
            </Stack>
          )}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
