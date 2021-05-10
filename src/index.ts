// -----------------------------------------------------------------------------------
// Copyright 2021, Gilles Zunino
// -----------------------------------------------------------------------------------

const requestActions = [{
	label: "Pretty print last request/response",
	icon: "fa-file-text-o",
	action: async (context: any, data: any): Promise<void> =>{
		const { request, requestGroup } = data;
		      const har:string = await context.data.export.har( { includePrivate: true } );

			  const body: HTMLDivElement = document.createElement("div");
			  body.innerHTML = `<code>${har}</code>`;

			  context.app.dialog(`Pretty Print - "${request.name}"`, body, { tall: true, wide: false, skinny: false });
			}
}];


export { requestActions }