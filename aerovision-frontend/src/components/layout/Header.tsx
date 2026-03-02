import { AppBar, Toolbar, Typography, Button, Stack, IconButton, Box, useScrollTrigger, Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LogoutIcon from '@mui/icons-material/Logout';
import type { ReactNode } from 'react';

interface HeaderProps {
  isAdmin?: boolean;
  onLogout?: () => void;
}

interface HideOnScrollProps {
  children: ReactNode;
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
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

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
                { to: '/login', label: 'Acceso', variant: 'outlined' as const },
              ].map((item) => (
                <Button
                  key={item.to}
                  color="inherit"
                  component={Link}
                  to={item.to}
                  variant={item.variant || 'text'}
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
                    ...(item.variant && {
                      borderColor: 'rgba(255,255,255,0.3)',
                      borderWidth: 1,
                      borderStyle: 'solid',
                      ml: 1,
                      borderRadius: '4px',
                      '&:hover': {
                        borderColor: '#FFD700',
                        backgroundColor: 'rgba(255,215,0,0.1)',
                      },
                    }),
                  }}
                >
                  {item.label}
                </Button>
              ))}
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
