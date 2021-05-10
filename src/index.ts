// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

const requestActions = [{
	label: "Pretty print last request/response",
	icon: "fa-file-text-o",
	action: async (context: any, data: any): Promise<void> =>{
		const { request, requestGroup } = data;
		      const har:string = await context.data.export.har( { includePrivate: true } );
			  const html: string = `<code>${har}</code>`;
		      context.app.showGenericModalDialog('Results', { html });
			}
}];


export { requestActions }