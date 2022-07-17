import React from "react";
import {Box, BoxProps, Button, ButtonGroup} from "@mui/material";

type ButtonActions = { href: string, icon: React.ReactNode, title: string, target?: React.HTMLAttributeAnchorTarget, onClick?: React.MouseEventHandler<HTMLAnchorElement> };
export const ActionsComponent = ({children, actions, ...props}: BoxProps & { actions: ButtonActions[] }) => {
	return (
		<Box {...props} sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		}}>
			<ButtonGroup variant="outlined" aria-label="outlined button group">
				{actions.map(({href, icon, title, target = '_blank', onClick}, index) => (
					<Button key={`btn-action-${index}`} href={href} target={target} startIcon={icon} onClick={onClick}>
						{title}
					</Button>
				))}
				{children}
			</ButtonGroup>
		</Box>
	);
}

export default ActionsComponent;
