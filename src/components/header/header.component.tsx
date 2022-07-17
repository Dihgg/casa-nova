import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box"
import img from "../../images/barbara-diego.png";

export const HeaderComponent = (props: BoxProps) => {
	return (
		<>
			<Box sx={{width: 300}} marginX="auto" marginY="1rem">
				<img src={img} style={{width: "100%", rotate: "-5deg"}} alt="Bárbara & Diego" title="Bárbara & Diego"/>
			</Box>
			<Box {...props} textAlign="center">
				<Typography component="h1" variant="h2" fontWeight="bold" textTransform="uppercase">Casa Nova</Typography>
				<Typography component="p" marginY="1rem" variant="body1">Venha celebrar conosco e conhecer nossa nova casa!</Typography>
				<Typography component="p" >🏠</Typography>
				<Typography component="p" variant="caption" marginTop="1rem" marginBottom="2rem">Por favor, confirme sua presença no RSVP!</Typography>
			</Box>
		</>
	);
}
export default HeaderComponent;
