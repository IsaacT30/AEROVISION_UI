import { Container, Box, Typography, Card, CardContent, Stack, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: React.ReactElement;
  image: string;
  credentials?: string[];
}

export default function AboutPage() {
  const team: TeamMember[] = [
    {
      name: 'Isaac Alejandro Torres',
      role: 'Piloto Profesional Certificado',
      description: 'Piloto certificado por la Dirección General de Aviación Civil del Ecuador (DGAC) con licencia profesional para operación de aeronaves pilotadas remotamente (RPA). Con más de 5 años de experiencia en fotografía y video aéreo profesional, Isaac ha trabajado en proyectos para empresas inmobiliarias, eventos corporativos, producciones audiovisuales y campañas publicitarias. Su pasión por la aviación y la fotografía se combina para capturar imágenes únicas desde perspectivas extraordinarias.',
      icon: <FlightTakeoffIcon sx={{ fontSize: 40, color: '#00A7E1' }} />,
      image: '/images/piloto.jpeg',
      credentials: ['Licencia DGAC - Drones Profesionales', 'Especialización en Fotografía Aérea 4K', 'Certificado en Seguridad Operacional'],
    },
    {
      name: 'Juan Carlos Torres',
      role: 'Coordinador de Proyectos y Edición',
      description: 'Con formación en comunicación audiovisual y gestión de proyectos, Juan Carlos se especializa en la coordinación logística de cada operación aérea y en la post-producción profesional de fotografía y video. Su atención meticulosa a los detalles asegura que cada proyecto se entregue a tiempo y supere las expectativas del cliente. Maneja la edición en Adobe Premiere Pro, After Effects y Lightroom, garantizando resultados de nivel cinematográfico.',
      icon: <ManageAccountsIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
      image: '/images/coordinador.jpeg',
      credentials: ['Experto en Adobe Creative Suite', 'Gestión de Proyectos Audiovisuales', 'Edición y Color Grading Profesional'],
    },
  ];

  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0A1929 0%, #00537A 100%)',
          color: 'white',
          py: { xs: 8, md: 10 },
          px: 2,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Sobre Nosotros
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 700, mx: 'auto', opacity: 0.95 }}>
            Conoce al equipo detrás de AeroVisión
          </Typography>
        </Container>
      </Box>

      {/* Equipo Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip 
            label="Nuestro Equipo" 
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
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
            }}
          >
            Profesionales Dedicados
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, mx: 'auto', color: 'text.secondary', fontSize: '1.1rem' }}>
            Un equipo comprometido con la excelencia y la innovación en cada proyecto
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4, 
            justifyContent: 'center',
            mb: 8,
          }}
        >
          {team.map((member, index) => (
            <Card
              key={index}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 32px)', md: '0 1 400px' },
                maxWidth: 450,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,167,225,0.15)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-12px)',
                  boxShadow: '0 16px 48px rgba(0,167,225,0.25)',
                },
              }}
            >
              {/* Imagen de perfil tipo carnet */}
              <Box
                sx={{
                  height: 300,
                  background: 'linear-gradient(135deg, #00A7E1 0%, #0A1929 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={member.image}
                  alt={member.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    display: 'block',
                  }}
                />
              </Box>

              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 700,
                      color: '#0A1929',
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Chip 
                    label={member.role}
                    color={index === 0 ? 'primary' : 'secondary'}
                    sx={{ 
                      fontWeight: 600,
                      alignSelf: 'flex-start',
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, textAlign: 'justify' }}
                  >
                    {member.description}
                  </Typography>
                  
                  {member.credentials && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0A1929', display: 'block', mb: 1 }}>
                        CERTIFICACIONES Y ESPECIALIDADES:
                      </Typography>
                      <Stack spacing={0.5}>
                        {member.credentials.map((cred, credIndex) => (
                          <Typography 
                            key={credIndex}
                            variant="caption" 
                            sx={{ 
                              color: 'text.secondary',
                              display: 'flex',
                              alignItems: 'center',
                              '&::before': {
                                content: '"✓"',
                                color: index === 0 ? '#00A7E1' : '#FF9800',
                                fontWeight: 700,
                                mr: 0.5,
                              }
                            }}
                          >
                            {cred}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Historia Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Box 
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Chip 
              label="Nuestra Historia" 
              color="secondary" 
              sx={{ mb: 2, fontWeight: 600, fontSize: '0.95rem' }} 
            />
            <Typography 
              variant="h3" 
              component="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                color: '#0A1929',
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
              }}
            >
              Cómo Nació AeroVisión
            </Typography>
          </Box>

          <Stack spacing={4} sx={{ maxWidth: 900, mx: 'auto' }}>
            <Card 
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#00A7E1', mb: 2 }}>
                El Comienzo
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                AeroVisión nació de la pasión por capturar el mundo desde una perspectiva única. 
                Todo comenzó cuando nuestro piloto profesional, certificado y con años de experiencia 
                en aviación, descubrió el potencial de los drones para revolucionar la fotografía y 
                el video aéreo en Ecuador.
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                Con la visión de ofrecer servicios profesionales de calidad internacional, decidimos 
                formar un equipo especializado que combina experiencia técnica, creatividad y compromiso 
                con la excelencia.
              </Typography>
            </Card>

            <Card 
              component={motion.div}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#FFD700', mb: 2 }}>
                Nuestra Misión
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                Transformar ideas en realidad a través de la innovación tecnológica y el arte de la 
                fotografía aérea. Nos especializamos en capturar momentos únicos desde el cielo, 
                ofreciendo servicios profesionales para eventos, bienes raíces, turismo, producción 
                audiovisual e inspecciones técnicas.
              </Typography>
            </Card>

            <Card 
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              sx={{ 
                p: { xs: 3, md: 4 }, 
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#0A1929', mb: 2 }}>
                Por Qué Elegirnos
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#00A7E1', mb: 0.5 }}>
                    ✈️ Piloto Certificado
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Operamos con todas las certificaciones y permisos requeridos para garantizar 
                    seguridad y profesionalismo en cada vuelo.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#00A7E1', mb: 0.5 }}>
                    🎥 Equipamiento Profesional
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Utilizamos drones de última generación con cámaras 4K y sistemas de estabilización 
                    avanzados para resultados impecables.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: '#00A7E1', mb: 0.5 }}>
                    🇪🇨 Cobertura Nacional
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    Ofrecemos nuestros servicios en todo Ecuador, llevando tu visión a donde sea 
                    que la necesites.
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
