import Box, {BoxProps} from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import dihggIcon from '../../images/dihgg.svg';

const FooterComponent = (props: BoxProps) => {
	return (
		<Box
			{...props}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "right",
				marginTop: "2rem"
			}}
		>
			<Typography variant="caption" marginY="auto" marginRight="0.5rem">Desenvolvido por: </Typography>
			<Box sx={{
				background: "#989fce",
				padding: "0.25rem"
			}}>
				<Link
					href="https://dihgg.com/?utm_source=gamefoss&amp;utm_medium=footer&amp;utm_campaign=credits&amp;utm_content=casa-nova"
					target="_blank"
				>
					<img src={dihggIcon} alt="dihgg.com"/>
				</Link>
			</Box>
		</Box>
	);
};

export default FooterComponent;
