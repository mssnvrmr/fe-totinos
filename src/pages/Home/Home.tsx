import { Main } from '../../components/Templates/Main/Main';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ImHome3 } from "react-icons/im";
import { Typography, Stack, Card } from '@mui/material';

export const Home = () => {
  return (
    <Main>
      <PageHeader title="Home" icon={<ImHome3 />} />
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Stack sx={{ gap: 2, width: '25%' }}>
          <Typography variant="h5">Probá la app con diferentes roles de usuario:</Typography>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Como Admin</span> iniciá sesión con las siguientes credenciales:</Typography>
            <Card sx={{ p: 2, mx: 2 }}>
              <Typography variant="body1"><b>Email:</b> admin@gmail.com</Typography>
              <Typography variant="body1"><b>Contraseña:</b> 12345678</Typography>
            </Card>
          </Stack>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Como Usuario</span> con pedidos ya realizados, iniciá sesión con las siguientes credenciales:</Typography>
            <Card sx={{ p: 2, mx: 2 }}>
              <Typography variant="body1"><b>Email:</b> jan.doe@gmail.com</Typography>
              <Typography variant="body1"><b>Contraseña:</b> 12345678</Typography>
            </Card>
          </Stack>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Como Invitado</span> podés ver el Menú, pero no vas a poder realizar un pedido.</Typography>
          </Stack>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1">O podés registrarte con una cuenta nueva para probar la experiencia <span style={{ fontWeight: 'bold', color: '#FFB300' }}>como un Usuario nuevo</span>.</Typography>
          </Stack>
        </Stack>
        <Stack sx={{ gap: 2, width: '25%' }}>
          <Typography variant="h5">Búsqueda por criterios:</Typography>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Buscar por Id</span> solo funciona para <span style={{ fontWeight: 'bold', color: '#FFB300' }}>Ingredientes</span>. El ID está expuesto a propósito para facilitar las pruebas de la funcionalidad.</Typography>
            <Card sx={{ p: 2, mx: 2 }}>
              <Typography variant="body1"><b>ID de Olives:</b> 8fade6dc-6bd1-4f6d-be1b-08ba8de55828</Typography>
            </Card>
          </Stack>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Buscar por E-mail</span> solo funciona para <span style={{ fontWeight: 'bold', color: '#FFB300' }}>Usuarios</span>.</Typography>
          </Stack>
        </Stack>
        <Stack sx={{ gap: 2, width: '25%' }}>
          <Typography variant="h5">Pedir una pizza:</Typography>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1">Al <span style={{ fontWeight: 'bold', color: '#FFB300' }}>agregar una pizza nueva</span>, se calcula si hay stock suficiente de cada ingrediente para asegurar que se pueda preparar.</Typography>
            <Typography variant="body1">Al <span style={{ fontWeight: 'bold', color: '#FFB300' }}>crear una orden de pizza</span>, se actualiza el stock de los ingredientes utilizados.</Typography>
            <Typography variant="body1">El calculo es quemado, siendo 100g por cada ingrediente y/o extra.</Typography> 
            <Typography variant="body1"><span style={{ fontWeight: 'bold', color: '#FFB300' }}>Basil y Magic</span> tienen intencionalmente poco stock para activar esta validación. Podés actualizar los stocks como Admin si querés probar su uso.</Typography>
          </Stack>
          <Typography variant="h5">Consideraciones:</Typography>
          <Stack sx={{ gap: 1 }}>
            <Typography variant="body1">El sitio no es responsive. Debería visualizarse desde una pantalla de escritorio.</Typography>
            <Typography variant="body1">Se tomaron varias malas decisiones de diseño porque fue un prototipo rápido.</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Main>
  );
};
