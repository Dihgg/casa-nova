import {createRoot} from "react-dom/client";
import "@fontsource/roboto";
import "./style.scss";
import AppComponent from "./components/app/app.component";

const root = document.getElementById("root");
if (!root) {
	throw new Error('Failed to find the root element');
}
createRoot(root).render(<AppComponent/>);
