import { Container, Box, Typography, Button, Stack, Card, CardContent, Chip, Fab, Zoom } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function HomePage() {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFab(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 15 },
          px: 2,
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,167,225,0.3)), url(/images/fondo_T2.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(0,167,225,0.2) 0%, transparent 60%)',
            animation: 'pulse 4s ease-in-out infinite',
          },
          '@keyframes pulse': {
            '0%, 100%': { opacity: 0.5 },
            '50%': { opacity: 1 },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                fontWeight: 900,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
                background: 'linear-gradient(45deg, #FFFFFF 30%, #FFD700 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'fadeInUp 1s ease-out',
                '@keyframes fadeInUp': {
                  from: { opacity: 0, transform: 'translateY(30px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              Haz que tus ideas vuelen
            </Typography>
            
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2,
                maxWidth: 800,
                fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2rem' },
                fontWeight: 500,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                animation: 'fadeInUp 1s ease-out 0.3s both',
              }}
            >
              Servicios profesionales de fotografía y video aéreo
            </Typography>

            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 700,
                opacity: 0.95,
                fontSize: { xs: '1rem', sm: '1.25rem' },
                animation: 'fadeInUp 1s ease-out 0.5s both',
              }}
            >
              Eventos • Bienes Raíces • Turismo • Producción Audiovisual • Inspecciones Aéreas
            </Typography>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3}
              sx={{
                mt: 4,
                animation: 'fadeInUp 1s ease-out 0.7s both',
              }}
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/servicios"
                endIcon={<FlightTakeoffIcon />}
                sx={{
                  bgcolor: '#FFD700',
                  color: '#000',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  boxShadow: '0 8px 24px rgba(255,215,0,0.4)',
                  '&:hover': {
                    bgcolor: '#FFC107',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 12px 32px rgba(255,215,0,0.6)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Ver Servicios
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/contacto"
                sx={{
                  borderColor: 'white',
                  borderWidth: 2,
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  px: 4,
                  py: 2,
                  borderRadius: '50px',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: '#FFD700',
                    bgcolor: 'rgba(255,215,0,0.1)',
                    transform: 'translateY(-4px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Cotiza Ahora
              </Button>
            </Stack>
          </Stack>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(180deg, transparent 0%, #F5F7FA 100%)',
          }}
        />
      </Box>

      {/* Imagen promocional */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#F5F7FA' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Box 
              sx={{ 
                flex: 1,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,167,225,0.3)',
                transition: 'all 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.02) rotate(1deg)',
                  boxShadow: '0 30px 80px rgba(0,167,225,0.4)',
                },
              }}
            >
              <Box
                component="img"
                src="/images/info.jpeg"
                alt="Servicios AeroVisión"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Chip 
                label="¿Por qué elegirnos?" 
                color="primary" 
                sx={{ mb: 2, fontWeight: 600 }} 
              />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#0A1929' }}>
                Calidad y profesionalismo
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', mb: 3 }}>
                En AeroVisión combinamos tecnología de punta con años de experiencia para ofrecerte 
                los mejores resultados en cada proyecto.
              </Typography>
              
              <Stack spacing={2}>
                {[
                  'Piloto profesional certificado',
                  'Equipamiento última generación',
                  'Edición profesional incluida',
                  'Cobertura en todo Ecuador',
                ].map((item, index) => (
                  <Stack key={index} direction="row" spacing={1} alignItems="center">
                    <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 28 }} />
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/portafolio"
                sx={{
                  mt: 4,
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #00A7E1 0%, #0A1929 100%)',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0A1929 0%, #00537A 100%)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Ver Portafolio
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Servicios Destacados */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            label="Nuestros Servicios" 
            color="primary" 
            sx={{ mb: 2, fontWeight: 600, fontSize: '0.95rem' }} 
          />
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: '#0A1929',
              mb: 2,
            }}
          >
            Lo que hacemos por ti
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Servicios profesionales de fotografía y video aéreo adaptados a tus necesidades
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {[
            {
              icon: <CameraAltIcon sx={{ fontSize: 56 }} />,
              title: 'Eventos',
              description: 'Bodas, cumpleaños, celebraciones corporativas y eventos especiales',
              color: '#00A7E1',
            },
            {
              icon: <HomeIcon sx={{ fontSize: 56 }} />,
              title: 'Inmobiliario',
              description: 'Tours virtuales, fotografía aérea de propiedades y desarrollos',
              color: '#00A7E1',
            },
            {
              icon: <TravelExploreIcon sx={{ fontSize: 56 }} />,
              title: 'Turismo',
              description: 'Promoción de hoteles, destinos turísticos y playas paradisíacas',
              color: '#00A7E1',
            },
            {
              icon: <FlightTakeoffIcon sx={{ fontSize: 56 }} />,
              title: 'Inspección',
              description: 'Inspecciones técnicas de infraestructuras, torres y edificaciones',
              color: '#00A7E1',
            },
          ].map((service, index) => (
            <Card
              key={index}
              sx={{
                flex: '1 1 250px',
                maxWidth: '300px',
                position: 'relative',
                overflow: 'visible',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-16px) scale(1.02)',
                  boxShadow: `0 16px 40px ${service.color}40`,
                  '& .icon-wrapper': {
                    transform: 'rotate(360deg) scale(1.1)',
                    bgcolor: service.color,
                  },
                },
              }}
            >
              <CardContent sx={{ pt: 8, pb: 3, textAlign: 'center', position: 'relative' }}>
                <Box
                  className="icon-wrapper"
                  sx={{
                    position: 'absolute',
                    top: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 80,
                    height: 80,
                    borderRadius: '20px',
                    bgcolor: `${service.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: service.color,
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 8px 24px ${service.color}30`,
                  }}
                >
                  {service.icon}
                </Box>
                
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#0A1929', mt: 2 }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
                <Button
                  size="small"
                  component={Link}
                  to="/servicios"
                  sx={{
                    color: service.color,
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: `${service.color}10`,
                    },
                  }}
                >
                  Conocer más →
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box textAlign="center" sx={{ mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/servicios"
            sx={{
              px: 5,
              py: 2,
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00A7E1 0%, #0A1929 100%)',
              boxShadow: '0 8px 24px rgba(0,167,225,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #0A1929 0%, #00537A 100%)',
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 32px rgba(0,167,225,0.5)',
              },
            }}
          >
            Ver Todos los Servicios
          </Button>
        </Box>
      </Container>

      {/* Segunda imagen promocional */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row-reverse' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Box 
              sx={{ 
                flex: 1,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,167,225,0.3)',
                transition: 'all 0.5s ease',
                '&:hover': {
                  transform: 'scale(1.02) rotate(-1deg)',
                  boxShadow: '0 30px 80px rgba(0,167,225,0.4)',
                },
              }}
            >
              <Box
                component="img"
                src="/images/info_2.jpeg"
                alt="Portafolio AeroVisión"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Chip 
                label="Nuestro Trabajo" 
                color="secondary" 
                sx={{ mb: 2, fontWeight: 600 }} 
              />
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: '#0A1929' }}>
                Resultados que hablan por sí solos
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', mb: 3 }}>
                Cada proyecto es único. Descubre cómo hemos capturado momentos inolvidables 
                y creado contenido impactante para nuestros clientes.
              </Typography>
              
              <Stack spacing={2.5}>
                {[
                  { number: '500+', label: 'Proyectos realizados' },
                  { number: '98%', label: 'Clientes satisfechos' },
                  { number: '50+', label: 'Horas de vuelo' },
                ].map((stat, index) => (
                  <Box key={index}>
                    <Typography variant="h3" sx={{ fontWeight: 800, color: '#00A7E1', mb: 0.5 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #0A1929 0%, #00537A 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'float 6s ease-in-out infinite',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Card 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              textAlign: 'center',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 800,
                background: 'linear-gradient(135deg, #0A1929 0%, #00A7E1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ¿Listo para despegar?
            </Typography>
            <Typography variant="h6" paragraph color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Contáctanos ahora y recibe una cotización personalizada. 
              ¡Transformemos tu visión en realidad desde el cielo!
            </Typography>
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={3} 
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                to="/contacto"
                startIcon={<WhatsAppIcon />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  background: '#25D366',
                  boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
                  '&:hover': {
                    background: '#20BA5A',
                    transform: 'translateY(-4px) scale(1.05)',
                    boxShadow: '0 12px 32px rgba(37, 211, 102, 0.5)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Cotiza por WhatsApp
              </Button>
              
              <Button 
                variant="outlined" 
                size="large" 
                component={Link} 
                to="/servicios"
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  borderWidth: 2,
                  borderColor: '#0A1929',
                  color: '#0A1929',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: '#00A7E1',
                    bgcolor: 'rgba(0,167,225,0.1)',
                    transform: 'translateY(-4px)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Ver Servicios
              </Button>
            </Stack>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              📞 +593 983 556 645 • +593 958 988 141
            </Typography>
          </Card>
        </Container>
      </Box>

      {/* WhatsApp Floating Button */}
      <Zoom in={showFab}>
        <Fab
          color="success"
          aria-label="WhatsApp"
          href="https://wa.me/593983556645?text=Hola,%20me%20interesa%20cotizar%20un%20servicio"
          target="_blank"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 64,
            height: 64,
            bgcolor: '#25D366',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
            animation: 'pulse 2s ease-in-out infinite',
            '&:hover': {
              bgcolor: '#20BA5A',
              transform: 'scale(1.1)',
              boxShadow: '0 12px 32px rgba(37, 211, 102, 0.6)',
            },
            '@keyframes pulse': {
              '0%, 100%': {
                boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
              },
              '50%': {
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.7)',
              },
            },
            zIndex: 1000,
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 32 }} />
        </Fab>
      </Zoom>
    </Box>
  );
}
