import {useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box, {BoxProps} from '@mui/material/Box';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit'
import LaunchIcon from '@mui/icons-material/Launch'
import SheetsService from "../../services/sheets.service";
import presentesImg from '../../images/presentes.png';
import {useMediaQuery, useTheme} from "@mui/material";
import Link from "@mui/material/Link";

type Presente = { id: number, comprado: boolean, nome: string, url: string, comodo: string };

const ListaPresentesComponent = (props: BoxProps) => {
	const [data, setData] = useState<Presente[]>([]);
	
	const sheetService = new SheetsService(axios, `${process.env.GOOGLE_SHEET_ID}`);
	
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
	
	const columns: GridColDef[] = [
		{
			field: "comprado",
			headerName: "Comprado",
			minWidth: 50,
			flex: (0.75 / 5),
			renderCell: ({row}) => <Checkbox disabled checked={row.comprado}/>
		},
		{
			field: "nome",
			headerName: "Item",
			minWidth: 100,
			flex: isDesktop ? (3 / 5) : (4.25 / 5),
		},
		{
			field: "comodo",
			headerName: "Cômodo",
			flex: (1.25 / 5),
			minWidth: 100,
			hide: !isDesktop
		},
		{
			field: "url",
			headerName: "Sugestão",
			minWidth: 100,
			flex: (0.75 / 5),
			align: isDesktop ? "left" : "right",
			renderCell: ({row}) =>
				row.url &&
          <>
						{
							isDesktop ?
								<Button
									href={row.url}
									target="_blank"
									variant="contained"
									startIcon={<LaunchIcon/>}
								>
									URL
								</Button>
								:
								<Link
									href={row.url}
									target="_blank"
								>
									🔗 URL
								</Link>
						}
          </>
		}
	];
	
	const [pageSize, setPageSize] = useState(60);
	
	useEffect(() => {
		sheetService.getData({page: `${process.env.GOOGLE_SHEET_PAGE}`}).then(res => {
			let comodo = "";
			const presentes = [...res].splice(1).map<Presente | null>((row, index) => {
				if (row.length === 1) {
					const [_comodo] = row;
					comodo = _comodo;
					return null;
				} else {
					const [comprado, nome, url] = row;
					return {
						id: index,
						comprado: comprado === "TRUE",
						nome,
						url,
						comodo
					}
				}
			}).filter(row => row);
			setData(presentes as Presente[]);
		});
	}, []);
	
	
	return (
		<>
			<Box id={props.id} {...props}>
				<Grid container spacing={2} direction={{xs: "column-reverse", md: "row"}}>
					<Grid item xs={12} md={8} lg={9}>
						<Box
							marginBottom="1rem"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "right"
							}}
						>
							<Typography variant="body2" marginY="auto" marginRight="1rem">Escolheu alguma coisa?</Typography>
							<Button
								href={`https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`}
								target="_blank"
								variant="contained"
								endIcon={<EditIcon/>}
							>
								Anote aqui
							</Button>
						</Box>
						<DataGrid
							sx={{
								border: 1,
								borderColor: '#a8a8a8',
								boxShadow: 1,
								height: 500
							}}
							columns={columns}
							rows={data}
							loading={!data.length}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							rowsPerPageOptions={Array.from({length: 5}, (_v, k) => k * 20 + 20)}
							pagination
						/>
					</Grid>
					<Grid item xs={12} md={4} lg={3}>
						<Typography component="h3" variant="h4" textAlign={{xs: "center", md: "right"}}>
							Obrigada por visitar a nossa lista!
						</Typography>
						<Box textAlign={{xs: "left", md: "right"}}>
							<Typography marginY="2rem">
								Essas sao algumas sugestões, mas se preferir, você também pode nos ajudar com
								qualquer valor para contribuir com a nossa geladeira!
							</Typography>
							<Typography marginBottom="1rem">
								Qualquer dúvida pode nos procurar no whatsapp em&nbsp;
								<Link href="https://wa.me/5511984908722" target="_blank">11984908722</Link>.
							</Typography>
							<Typography variant="caption">Esse também é nosso pix! 😉</Typography>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box marginX="auto" maxWidth={800}>
				<img src={presentesImg} style={{width: "100%"}} aria-disabled alt="Presentes"/>
			</Box>
		</>
	);
};

export default ListaPresentesComponent;
