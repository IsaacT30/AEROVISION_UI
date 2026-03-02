import { Card, CardContent, CardMedia, CardActions, Typography, Button, Chip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Service } from '@/types/service.types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        }
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: '56.25%', // 16:9 aspect ratio
          backgroundColor: 'grey.300',
          backgroundImage: service.imagen_url 
            ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${service.imagen_url})`
            : `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/images/info.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Chip label={service.categoria} size="small" color="primary" />
        </Box>
        <Typography gutterBottom variant="h5" component="h2">
          {service.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {service.descripcion.substring(0, 100)}...
        </Typography>
        <Typography variant="h6" color="primary">
          Desde ${service.precio_base}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          + ${service.precio_por_hora}/hora
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/servicios/${service.slug}`}>
          Ver detalles
        </Button>
        <Button size="small" variant="contained" component={Link} to={`/reservar/${service.id}`}>
          Reservar
        </Button>
      </CardActions>
    </Card>
  );
}
