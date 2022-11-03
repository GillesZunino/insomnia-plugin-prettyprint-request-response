// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

import HarPrettyPrinter from "./HarPrettyPrinter";

const DialogTitle: string = "Copy last response as HTML";

const harPrettyPrinter: HarPrettyPrinter = new HarPrettyPrinter();

const requestActions = [{
	label: "Copy last response as HTML",
	icon: "fa-file-text-o",
	action: async (context: any, data: any): Promise<void> => {
		const { request, requestGroup } = data;

		try {
			const har: string = await context.data.export.har({ includePrivate: false});

			let html: string = harPrettyPrinter.toHtml(request.name, har, "fiddler.njk");
			const plainText: string = harPrettyPrinter.toText(request.name, har, "plaintext.njk");
	
			if (context.app.clipboard) {
				context.app.clipboard.writeText(plainText);
			} else {
				await context.app.alert(DialogTitle, "This version of Insomnia does not support clipboard access");
			}
		}
		catch (e) {
			const message: string = "Requests could not be exported as HAR: \n" + (<Error>e).message;
			await context.app.alert(DialogTitle, message);
		}
	}
}];


export { requestActions }
