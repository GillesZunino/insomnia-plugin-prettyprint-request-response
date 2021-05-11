// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

import * as path from "path";
import { fileURLToPath } from "url";

import * as nunjucks from "nunjucks";


export default class HarPrettyPrinter {
    private htmlTemplatingEnvironment: nunjucks.Environment;
    private textTemplatingEnvironment: nunjucks.Environment;

    public constructor() {
        const templatesBasePath: string = path.dirname(fileURLToPath(import.meta.url));
        this.htmlTemplatingEnvironment = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.resolve(templatesBasePath, "../templates/html")), { autoescape: true });
        this.textTemplatingEnvironment = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.resolve(templatesBasePath, "../templates/text")), { autoescape: false });
    }

    public toHtml(requestName: string, rawhar: string, templateName: string): string {
        const har: any = JSON.parse(rawhar);
        const entry: any = this.cleanupHarEntryHeaders(har.log.entries.find((entry: any) => entry.comment === requestName));
        return this.htmlTemplatingEnvironment.render(templateName, { request: entry.request, response: entry.response });
    }

    public toText(requestName: string, rawhar: string, templateName: string): string {
        const har: any = JSON.parse(rawhar);
        const entry: any = this.cleanupHarEntryHeaders(har.log.entries.find((entry: any) => entry.comment === requestName));
        return this.textTemplatingEnvironment.render(templateName, { request: entry.request, response: entry.response });
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