// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

export default class HarPrettyPrinter {
    private htmlTemplate = require("../templates/html/fiddler.njk");
    private textTemplate = require("../templates/text/plaintext.njk");

    public toHtml(requestName: string, rawhar: string, templateName: string): string {
        const har: any = JSON.parse(rawhar);
        const entry: any = this.cleanupHarEntryHeaders(har.log.entries.find((entry: any) => entry.comment === requestName));
        if (entry) {
            return this.htmlTemplate({ request: entry.request, response: entry.response });
        }

        throw new Error("The request cannot be found in the workspace");
    }

    public toText(requestName: string, rawhar: string, templateName: string): string {
        const har: any = JSON.parse(rawhar);
        const entry: any = this.cleanupHarEntryHeaders(har.log.entries.find((entry: any) => entry.comment === requestName));
        if (entry) {
            return this.textTemplate({ request: entry.request, response: entry.response });
        }
        
        throw new Error("The request cannot be found in the workspace");
    }

    private cleanupHarEntryHeaders(harEntry: any): any {
        // Insomnia sometimes exports response headers incorrectly. For instance, "Referrer-Policy: " gets exported as follows:
        // {
        //     "name": "Referrer-Policy: ",
        //     "value": ""
        // }
        // We traverse all headers, trim whitespaces and remove the trailing ':' from the header name
        for (let responseHeaderIndex: number = 0; responseHeaderIndex < harEntry.response.headers.length; responseHeaderIndex++) {
            let currentHeader: any = harEntry.response.headers[responseHeaderIndex];
            let trimmedHeaderName: string = currentHeader.name.trimEnd();
            if (trimmedHeaderName[trimmedHeaderName.length - 1] === ':') { trimmedHeaderName = trimmedHeaderName.slice(0, -1); }
            currentHeader.name = trimmedHeaderName;
        }

        return harEntry;
    }
}