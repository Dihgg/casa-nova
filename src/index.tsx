import {createRoot} from "react-dom/client";
import "./style.scss";

const root = document.getElementById("root");
if (!root) {
	throw new Error('Failed to find the root element');
}
createRoot(root).render(<h1>teste 3</h1>);
