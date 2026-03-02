import { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Stack, Alert, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { leadsService } from '@/api/services/leads.service';

export default function ContactPage() {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !mensaje.trim()) {
      setMsg({ type: 'error', text: 'Completa los campos requeridos' });
      return;
    }

    try {
      setLoading(true);
      setMsg(null);
      await leadsService.create({
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        email: email.trim() || undefined,
        mensaje: mensaje.trim(),
      });
      setMsg({ type: 'success', text: '¡Mensaje enviado! Te contactaremos pronto.' });
      setNombre('');
      setTelefono('');
      setEmail('');
      setMensaje('');
    } catch {
      setMsg({ type: 'error', text: 'Error al enviar el mensaje. Intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4, px: { xs: 2, sm: 3 } }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Contáctanos
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
        Envíanos tu consulta y te responderemos a la brevedad
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {/* Formulario */}
        <Box sx={{ flex: '1 1 400px' }}>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {msg && <Alert severity={msg.type}>{msg.text}</Alert>}

                <TextField
                  label="Nombre completo"
                  required
                  fullWidth
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />

                <TextField
                  label="Teléfono"
                  required
                  fullWidth
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />

                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  label="Mensaje"
                  required
                  multiline
                  rows={5}
                  fullWidth
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />

                <Button type="submit" variant="contained" size="large" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>

        {/* Información de contacto */}
        <Box sx={{ flex: '1 1 300px' }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Información de Contacto
            </Typography>

            <Stack spacing={3} sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography>info@aerovision.com</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography>+593 983 556 645</Typography>
                  <Typography>+593 958 988 141</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationOnIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ubicación
                  </Typography>
                  <Typography>Quito, Ecuador</Typography>
                </Box>
              </Box>
            </Stack>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" gutterBottom>
                Horario de Atención
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lunes a Viernes: 10:00 AM - 4:00 PM
                <br />
                Sábados: Bajo reserva
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
