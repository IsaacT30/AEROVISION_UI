import { Box, Container, Typography, IconButton, Stack, Divider, Link as MuiLink } from '@mui/material';
import { motion } from 'framer-motion';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0A1929 0%, #0D47A1 50%, #00537A 100%)',
        color: 'white',
        py: { xs: 4, sm: 5, md: 6 },
        mt: 'auto',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #00A7E1, #FFD700, #00A7E1)',
          animation: 'shimmer 2s infinite',
        },
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Stack spacing={{ xs: 3, sm: 3.5, md: 4 }}>
          {/* Logo y descripción */}
          <Box sx={{ textAlign: 'center' }}>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1.5} sx={{ mb: { xs: 1, sm: 1.5 } }}>
              <Box
                component="img"
                src="/images/logo_T1.jpeg"
                alt="AeroVisión Logo"
                sx={{
                  height: { xs: 38, sm: 42 },
                  width: { xs: 38, sm: 42 },
                  borderRadius: '50%',
                  objectFit: 'cover',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                }}
              />
            </Stack>
            <Typography variant="body2" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.95, fontSize: { xs: '0.8rem', sm: '0.85rem' }, px: { xs: 2, sm: 0 } }}>
              Servicios profesionales de fotografía y video aéreo con drones. 
              Piloto certificado con años de experiencia capturando momentos únicos desde el cielo.
            </Typography>
            
            {/* Slogan animado */}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              sx={{
                mt: 2.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
              }}
            >
              <Box
                component={motion.div}
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                }}
              >
                <FlightTakeoffIcon 
                  sx={{ 
                    fontSize: { xs: 28, sm: 32 }, 
                    color: '#FFD700',
                    filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.5))',
                  }} 
                />
              </Box>
              <Typography
                component={motion.span}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                sx={{
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '1.3rem' },
                  fontWeight: 700,
                  fontStyle: 'italic',
                  background: 'linear-gradient(90deg, #FFD700 0%, #FFC107 50%, #FFD700 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmerText 3s linear infinite',
                  '@keyframes shimmerText': {
                    '0%': { backgroundPosition: '0% center' },
                    '100%': { backgroundPosition: '200% center' },
                  },
                }}
              >
                "Haz que tus ideas vuelen"
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

          {/* Información de contacto */}
          <Box>
            <Typography variant="h6" align="center" sx={{ fontWeight: 600, mb: { xs: 2, sm: 2.5 }, fontSize: { xs: '0.95rem', sm: '1rem' } }}>
              Contáctanos
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={{ xs: 2.5, sm: 2 }} 
              justifyContent="center" 
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ flexWrap: 'wrap', px: { xs: 2, sm: 0 } }}
            >
              <Stack direction="row" spacing={0.8} alignItems="center">
                <WhatsAppIcon sx={{ fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    WhatsApp
                  </Typography>
                  <MuiLink 
                    href="https://wa.me/593983556645" 
                    target="_blank"
                    color="inherit" 
                    underline="hover"
                    sx={{ 
                      display: 'block',
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease',
                      '&:hover': { color: '#00A7E1', transform: 'translateX(5px)' }
                    }}
                  >
                    +593 983 556 645
                  </MuiLink>
                  <MuiLink 
                    href="https://wa.me/593958988141" 
                    target="_blank"
                    color="inherit" 
                    underline="hover"
                    sx={{ 
                      display: 'block',
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease',
                      '&:hover': { color: '#00A7E1', transform: 'translateX(5px)' }
                    }}
                  >
                    +593 958 988 141
                  </MuiLink>
                </Box>
              </Stack>

              <Stack direction="row" spacing={0.8} alignItems="center">
                <EmailIcon sx={{ fontSize: 20 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Email
                  </Typography>
                  <MuiLink 
                    href="mailto:info@aerovision.com" 
                    color="inherit" 
                    underline="hover"
                    sx={{ 
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease',
                      '&:hover': { color: '#00A7E1' }
                    }}
                  >
                    info@aerovision.com
                  </MuiLink>
                </Box>
              </Stack>

              <Stack direction="row" spacing={0.8} alignItems="center">
                <Box sx={{ 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  borderRadius: '50%', 
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography sx={{ fontSize: '1.1rem' }}>📍</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Ubicación
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    Quito, Ecuador
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={0.8} alignItems="center">
                <Box sx={{ 
                  bgcolor: 'rgba(255,255,255,0.15)', 
                  borderRadius: '50%', 
                  p: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography sx={{ fontSize: '1.1rem' }}>🕒</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    Horario de Atención
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    Lunes a Viernes: 10:00 AM - 4:00 PM
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
                    Sábados: Bajo reserva
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

          {/* Redes sociales */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="body2" align="center" sx={{ mb: 1, fontWeight: 600, fontSize: '0.85rem' }}>
              Síguenos en nuestras redes sociales
            </Typography>
            <Stack direction="row" spacing={1.2} justifyContent="center">
              {[
                { icon: <InstagramIcon />, href: 'https://instagram.com/aerovision', label: 'Instagram' },
                { icon: <FacebookIcon />, href: 'https://facebook.com/aerovision', label: 'Facebook' },
                { icon: <EmailIcon />, href: 'mailto:info@aerovision.com', label: 'Email' },
              ].map((social, index) => (
                <IconButton
                  key={social.label}
                  component={motion.a}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  size="small"
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0,167,225,0.3)',
                      boxShadow: '0 6px 16px rgba(0,167,225,0.5)',
                    },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

          {/* Copyright */}
          <Box>
            <Typography variant="body2" align="center" sx={{ opacity: 0.8, fontSize: '0.8rem' }}>
              © {currentYear} AeroVisión - Todos los derechos reservados
            </Typography>
            <Typography variant="caption" align="center" display="block" sx={{ opacity: 0.7, mt: 0.3, fontSize: '0.75rem' }}>
              Piloto profesional certificado | Quito, Ecuador
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
