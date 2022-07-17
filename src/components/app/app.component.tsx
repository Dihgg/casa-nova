import React, {lazy, Suspense} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import { ptBR } from '@mui/material/locale';
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import GiftIcon from '@mui/icons-material/CardGiftcard';
import SendIcon from '@mui/icons-material/Send'
import FullPageComponent from "../fullpage/fullpage.component";


const LoadingComponent = () => (
	<FullPageComponent>
		<CircularProgress />
	</FullPageComponent>
);

const HeaderComponent = lazy(() => import('../header/header.component'));
const ActionsComponent = lazy(() => import('../actions/actions.component'));
const ListaPresentesComponent = lazy(() => import('../lista-presentes/lista-presentes.component'));
const FooterComponent = lazy(() => import('../footer/footer.component'));

const AppComponent  = () => {
	const theme = createTheme({}, ptBR);
	return (
		<ThemeProvider theme={theme}>
			<Box
				id="main-wrapper"
				sx={{
					display:"flex",
					minHeight:"100vh",
					height:"100%",
					alignContent:"center",
					background: "#bfdfd9"
				}}
			>
				<Container id="main-container" sx={{margin: "auto"}}>
					<Suspense fallback={<LoadingComponent />}>
						<FullPageComponent>
							<HeaderComponent marginY="1rem"/>
							<ActionsComponent marginBottom="3rem" actions={[
								{
									icon: <SendIcon />,
									href: "https://forms.gle/ef8fnKNA7MYmdUzQA",
									title: "RSVP"
								},
								{
									icon: <GiftIcon />,
									href: "#presentes",
									title: "Lista de Presentes",
									onClick: (e) => {
										e.preventDefault();
										document.getElementById('presentes')?.scrollIntoView({
											behavior: 'smooth'
										});
									}
								}
							]}/>
						</FullPageComponent>
						<FullPageComponent>
							<ListaPresentesComponent id="presentes" marginY="2rem"/>
						</FullPageComponent>
						<FooterComponent/>
					</Suspense>
				</Container>
			</Box>
		</ThemeProvider>
	)
}
export default AppComponent;
