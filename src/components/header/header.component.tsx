import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/system/Box"
import Paper from "@mui/material/Paper";
import TodayIcon from "@mui/icons-material/Today";
import Button from "@mui/material/Button";
import {CalendarEvent, ics} from 'calendar-link';
import img from "../../images/barbara-diego.png";
import {meta} from '../../../package.json';


export const HeaderComponent = (props: BoxProps) => {
	const {title, description, url} = meta;
	const date = new Date(`${process.env.EVENT_START}`);
	console.log('data', process.env.EVENT_START);
	console.log('data', date);
	const event: CalendarEvent = {
		title: `${process.env.EVENT_TITLE}`,
		description: `
		${description}\n
		${process.env.EVENT_LOCATION}\n
		${process.env.EVENT_DETAIL}\n
		`,
		location: `${process.env.EVENT_LOCATION}`,
		start: date,
		duration: [Number(process.env.EVENT_DURATION), 'hours'],
		organizer: {
			name: `${process.env.ORGANIZER_NAME}`,
			email: `${process.env.ORGANIZER_EMAIL}`
		},
		busy: true,
		url
	};
	return (
		<>
			<Box sx={{width: 300}} marginX="auto" marginY="1rem">
				<img src={img} style={{width: "100%", rotate: "-5deg"}} alt="Bárbara & Diego" title="Bárbara & Diego"/>
			</Box>
			<Box {...props} textAlign="center">
				<Typography component="h1" variant="h2" fontWeight="bold" textTransform="uppercase">{title}</Typography>
				<Typography component="p" marginY="1rem" variant="body1">{description}</Typography>
				<Typography component="p">🏠</Typography>
				<Paper
					variant="outlined"
					sx={{
						background: '#f3e5f5',
						marginY: '1rem'
					}}
				>
					<Box marginY="1rem">
						<Typography component="p" variant="body2" marginBottom="0.5rem">
							Dia&nbsp;
							<time dateTime={`${date}`}>
								{new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short'}).format(date)}
								&nbsp;às&nbsp;
								{new Intl.DateTimeFormat('pt-BR', {timeStyle:'short'}).format(date)}
							</time>
						</Typography>
						<Button
							href={ics(event)}
							endIcon={<TodayIcon/>}
							variant="contained"
						>
							Salve na Agenda
						</Button>
					</Box>
				</Paper>
				<Typography component="p" variant="caption" marginTop="1rem" marginBottom="2rem">Por favor, confirme sua presença no RSVP!</Typography>
			</Box>
		</>
	);
}
export default HeaderComponent;
