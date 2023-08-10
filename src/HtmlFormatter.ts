// -----------------------------------------------------------------------------------
// Copyright 2023, Gilles Zunino
// -----------------------------------------------------------------------------------

import UIConstants from "./UIConstants";
import HarPrettyPrinter from "./HarPrettyPrinter";

export default class HtmlFormatter {
    private harPrettyPrinter: HarPrettyPrinter = new HarPrettyPrinter();

    public constructor() {
        this.harPrettyPrinter = new HarPrettyPrinter();
    }

    public async formatAsync(context: any, data: any): Promise<void> {
        const { request, requestGroup } = data;
		let har: string = "";

		try {
			har = await context.data.export.har({ includePrivate: false});
		}
		catch (e) {
			const message: string = "Requests could not be exported as HAR: \n" + (<Error>e).message;
			await context.app.alert(UIConstants.DialogTitle, message);
		}

        if (har !== "") {
			const html: string = this.harPrettyPrinter.toHtml(request.name, har, "fiddler.njk");

            const htmlMIME: string = "text/html";
            const blob: Blob = new Blob([ html ], { type: htmlMIME });
            const clipboardItem: ClipboardItem = new ClipboardItem(
                { [ htmlMIME ]: blob },
                { presentationStyle: "inline" }
            );

            await navigator.clipboard.write([ clipboardItem ]);
        }
    }
}