// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

import TextFormatter from "./TextFormatter";
import HtmlFormatter from "./HtmlFormatter";


const htmlFormatter: HtmlFormatter = new HtmlFormatter();
const textFormatter: TextFormatter = new TextFormatter();


const requestActions = [
	{
		label: "Copy last response as text",
		icon: "fa-file",
		action: async (context: any, data: any): Promise<void> => textFormatter.formatAsync(context, data)
	},
	{
		label: "Copy last response as HTML",
		icon: "fa-file-code",
		action: async (context: any, data: any): Promise<void> => htmlFormatter.formatAsync(context, data)
	}
];


export { requestActions }
