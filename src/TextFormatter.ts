// -----------------------------------------------------------------------------------
// Copyright 2023, Gilles Zunino
// -----------------------------------------------------------------------------------

import UIConstants from "./UIConstants";
import HarPrettyPrinter from "./HarPrettyPrinter";

export default class TextFormatter {
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
			const plainText: string = this.harPrettyPrinter.toText(request.name, har, "plaintext.njk");

            const textMIME: string = "text/plain";
            const blob: Blob = new Blob([ plainText ], { type: textMIME });
            const clipboardItem: ClipboardItem = new ClipboardItem(
                { [ textMIME ]: blob },
                { presentationStyle: "inline" }
            );

            await navigator.clipboard.write([ clipboardItem ]);
		}
    }
}