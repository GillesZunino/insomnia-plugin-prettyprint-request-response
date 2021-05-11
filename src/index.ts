// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

import { clipboard } from "electron";
import HarPrettyPrinter from "./HarPrettyPrinter";


const requestActions = [{
	label: "Pretty print last request/response",
	icon: "fa-file-text-o",
	action: async (context: any, data: any): Promise<void> => {
		const { request, requestGroup } = data;
		const har: string = await context.data.export.har( { includePrivate: true } );

		const harPrettyPrinter: HarPrettyPrinter = new HarPrettyPrinter();
		let html: string = harPrettyPrinter.toHtml(har, "fiddler.njk");
		const plainText: string = harPrettyPrinter.toText(har, "plaintext.njk");

		clipboard.write({
			text: plainText,
			html: html
		});
	}
}];


export { requestActions }
