// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

import { clipboard } from "electron";
import HarPrettyPrinter from "./HarPrettyPrinter";


const requestActions = [{
	label: "Copy last response as HTML",
	icon: "fa-file-text-o",
	action: async (context: any, data: any): Promise<void> => {
		const { request, requestGroup } = data;

		try {
			const har: string = await context.data.export.har( { includePrivate: true } );

			const harPrettyPrinter: HarPrettyPrinter = new HarPrettyPrinter();
			let html: string = harPrettyPrinter.toHtml(request.name, har, "fiddler.njk");
			const plainText: string = harPrettyPrinter.toText(request.name, har, "plaintext.njk");
	
			clipboard.write({
				text: plainText,
				html: html
			});
		}
		catch (e) {
			await context.app.alert("Requests could not be exported as HAR", e.message);
		}
	}
}];


export { requestActions }
