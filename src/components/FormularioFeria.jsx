import { useState } from 'react';
import {
  Box, Typography, TextField, FormControl,
  Select, MenuItem, Button, IconButton, Slide, Paper
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material';
import { supabase } from '../supabase';

export default function FormularioFeria({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [fotoFile, setFotoFile] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    diasFuncionamiento: '',
    ciudad: '',
    pais: 'Bolivia',
    descripcion: '',
    lat: '',
    lng: ''
  });

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const toggleForm = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  const handleSubmit = async () => {
    try {
      const { data: contribuyente, error: errContrib } = await supabase
        .from('contribuyentes')
        .upsert({
          nombre: formData.nombre || 'Anónimo',
          email: `anon_${Date.now()}@feriainfinita.cl`,
          pais: formData.pais,
          autorizo_cc: true,
          autorizo_publicacion: true
        }, { onConflict: 'email' })
        .select()
        .single();

      if (errContrib) throw errContrib;

      const { data: feria, error: errFeria } = await supabase
        .from('ferias')
        .insert({
          nombre: formData.nombre,
          escala: 'municipal',
          ciudad: formData.ciudad,
          pais: formData.pais,
          lat: parseFloat(formData.lat) || 0,
          lng: parseFloat(formData.lng) || 0,
          descripcion: formData.descripcion,
          estado: 'pendiente'
        })
        .select()
        .single();

      if (errFeria) throw errFeria;

      const { data: registro, error: errReg } = await supabase
        .from('registros')
        .insert({
          feria_id: feria.id,
          contribuyente_id: contribuyente.id,
          descripcion: formData.descripcion,
          estado: 'pendiente'
        })
        .select()
        .single();

      if (errReg) throw errReg;

      if (audioFile) {
        const audioExt = audioFile.name.split('.').pop();
        const audioPath = `${feria.id}/${Date.now()}.${audioExt}`;
        const { error: errAudio } = await supabase.storage
          .from('audios').upload(audioPath, audioFile);
        if (!errAudio) {
          const { data: audioUrl } = supabase.storage
            .from('audios').getPublicUrl(audioPath);
          await supabase.from('archivos').insert({
            registro_id: registro.id,
            tipo: 'audio',
            url_storage: audioUrl.publicUrl,
            bucket: 'audios',
            path_storage: audioPath,
            nombre_original: audioFile.name,
            tamano_bytes: audioFile.size,
            formato: audioExt
          });
        }
      }

      if (fotoFile) {
        const fotoExt = fotoFile.name.split('.').pop();
        const fotoPath = `${feria.id}/${Date.now()}.${fotoExt}`;
        const { error: errFoto } = await supabase.storage
          .from('fotos').upload(fotoPath, fotoFile);
        if (!errFoto) {
          const { data: fotoUrl } = supabase.storage
            .from('fotos').getPublicUrl(fotoPath);
          await supabase.from('archivos').insert({
            registro_id: registro.id,
            tipo: 'fotografia',
            url_storage: fotoUrl.publicUrl,
            bucket: 'fotos',
            path_storage: fotoPath,
            nombre_original: fotoFile.name,
            tamano_bytes: fotoFile.size,
            formato: fotoExt
          });
        }
      }

      alert('¡Feria enviada! Quedará visible después de moderación.');
      setFormData({ nombre: '', diasFuncionamiento: '', ciudad: '',
        pais: 'Bolivia', descripcion: '', lat: '', lng: '' });
      setAudioFile(null);
      setFotoFile(null);

    } catch (err) {
      console.error('Error al enviar:', err.message);
      alert('Error al enviar: ' + err.message);
    }

    setIsOpen(false);
    if (onToggle) onToggle(false);
  };

  return (
    <>
      <IconButton
        onClick={toggleForm}
        sx={{
   position: 'fixed',
  left: { xs: '20px', md: isOpen ? '420px' : '20px' },
  top: { xs: 'unset', md: '50%' },
  bottom: { xs: '20px', md: 'unset' },
  transform: { xs: 'none', md: 'translateY(-50%)' },
  zIndex: 1001,
  backgroundColor: 'var(--acento)',
  color: 'var(--fondo)',
  '&:hover': { backgroundColor: '#a8d420' },
  width: { xs: 48, md: 56 },
  height: { xs: 48, md: 56 }
}}
      >
        {isOpen ? <CloseIcon /> : <AddIcon />}
      </IconButton>

      <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
        <Paper sx={{
          position: 'fixed', left: 0, top: 0,
  height: '100vh', width: { xs: '100%', md: '400px' },
  zIndex: 1000, overflowY: 'auto', display: 'flex', flexDirection: 'column',
  background: 'var(--panel)',
  borderRight: '1px solid var(--borde-hover)',
  borderRadius: 0,
        }}>
          <Box sx={{ padding: 3, flexGrow: 1 }}>
            <Typography variant="h6" sx={{ marginBottom: 3, color: '#512876', fontWeight: 'bold' }}>
              Ingresa datos de la feria
            </Typography>

            {['nombre', 'ciudad'].map(field => (
              <Box key={field} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle2" sx={{ marginBottom: 0.5, textTransform: 'capitalize' }}>
                  {field}
                </Typography>
                <TextField fullWidth size="small"
                  value={formData[field]}
                  onChange={handleInputChange(field)}
                />
              </Box>
            ))}

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>País</Typography>
              <FormControl fullWidth size="small">
                <Select value={formData.pais} onChange={handleInputChange('pais')}>
                  {['Bolivia','Chile','Perú','Argentina','Colombia','Ecuador',
                    'México','Brasil','Uruguay','Paraguay','Venezuela'].map(p => (
                    <MenuItem key={p} value={p}>{p}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>Latitud</Typography>
                <TextField fullWidth size="small" placeholder="-16.498"
                  value={formData.lat} onChange={handleInputChange('lat')} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>Longitud</Typography>
                <TextField fullWidth size="small" placeholder="-68.164"
                  value={formData.lng} onChange={handleInputChange('lng')} />
              </Box>
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>Descripción</Typography>
              <TextField fullWidth multiline rows={3}
                value={formData.descripcion}
                onChange={handleInputChange('descripcion')}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>
                Audio (WAV o MP3)
              </Typography>
              <input type="file" accept="audio/*"
                onChange={(e) => setAudioFile(e.target.files[0])}
                style={{ width: '100%' }}
              />
              {audioFile && (
                <Typography variant="caption" color="success.main">
                  {audioFile.name}
                </Typography>
              )}
            </Box>

            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="subtitle2" sx={{ marginBottom: 0.5 }}>
                Fotografía (JPG o PNG)
              </Typography>
              <input type="file" accept="image/*"
                onChange={(e) => setFotoFile(e.target.files[0])}
                style={{ width: '100%' }}
              />
              {fotoFile && (
                <Typography variant="caption" color="success.main">
                  {fotoFile.name}
                </Typography>
              )}
            </Box>

            <Button fullWidth onClick={handleSubmit}
              sx={{
                backgroundColor: 'var(--acento)',
  color: 'var(--fondo)',
  py: 1.5, fontWeight: 'bold',
  fontFamily: 'Space Mono, monospace',
  fontSize: '11px', letterSpacing: '0.15em',
  borderRadius: '2px',
  '&:hover': { backgroundColor: '#a8d420' }
              }}
            >
              Agregar al mapa →
            </Button>
          </Box>
        </Paper>
      </Slide>
    </>
  );
}