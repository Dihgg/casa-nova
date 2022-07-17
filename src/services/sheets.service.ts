import {AxiosStatic} from "axios";

class SheetsService {
	constructor(
		private axios: AxiosStatic,
		private sheetID: string
	) {}
	
	public async getData({page}: { page: string }) {
		return (await this.axios
			.get<{values: string[][]}>(`https://sheets.googleapis.com/v4/spreadsheets/${this.sheetID}/values/${page}`, {
			params: {
				alt: "json",
				key: `${process.env.GOOGLE_API_KEY}`
			}
		})).data.values
	}
}

export default SheetsService;
