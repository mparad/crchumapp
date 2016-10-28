(function () {
	_modules.ref(['html', 'tree', 'req', 'sepdoc'], 
		function (html, tree, req, sepdoc) {

			function init(session){
				
				// var alzhApp = new tree.node({
					// label: 'Alzheimer',
					// coll: []
				// });
				
				// function newFilter(root){
					// var closeButton = new html.element({
						// tag: 'button', 
						// value: 'x',
						// onclick: function (){
							// root.remove(filter);
						// }
					// });
					// var filter = new tree.node({
						// line: [
							// closeButton,
							// new html.element({
								// tag: 'select', 
								// choices: ['ET', 'OU', '!']
								
							// }), 
							// new html.element({
								// tag: 'button', 
								// onclick: function(){
									// filter.coll.add(newFilter(filter.coll));
									// filter.unfold();
								// },
								// value: '*'
							// }),
							// new html.element({
								// tag: 'button', 
								// onclick: function(){
									// filter.coll.add(newFilterLeaf(filter.coll));
									// filter.unfold();
								// },
								// value: '='
							// })
						
						// ]
						
						
					// });
					// return filter; 
					
				// }
				
				// function newFilterLeaf(root){
					// var closeButton = new html.element({
						// tag: 'button', 
						// value: 'x',
						// onclick: function (){
							// root.remove(filter);
						// }
					// });
					// var filter = new tree.node({
						// line: [
							// closeButton,
							
							// new html.element({
								// tag: 'select', 
								// choices: ['ID Patient', 'ID Échantillon', 'Date de naissance', 'Medication']
								
							// }), 
							// new html.element({
								// tag: 'select', 
								// choices: ['<', '=', '>']
								
							// }), 
							// new html.element({
								// tag: 'input'
								
							// })
						
						// ]
						
						
					// });
					// return filter; 
					
				// }
				
				// var addFilterButton = new html.element({
					// tag: 'button', 
					// onclick: function(){
						// msFilters.coll.add(newFilter(msFilters.coll));
						// msFilters.unfold();
					// },
					// value: '+'
				// });
				
				// var addFilterLeafButton = new html.element({
					// tag: 'button', 
					// onclick: function(){
						// msFilters.coll.add(newFilterLeaf(msFilters.coll));
						// msFilters.unfold();
					// },
					// value: '='
				// });
				
				// var msFilters = new tree.node({
					// label: 'Filtres',
					// line: [addFilterButton, addFilterLeafButton]
				// });
				
				// function newSort(root){
					// var closeButton = new html.element({
						// tag: 'button', 
						// value: 'x',
						// onclick: function (){
							// root.remove(sample);
						// }
					// });
					// var sortChoice = new html.element({
						// tag: 'select', 
						// choices: ['ID Patient', 'ID Échantillon', 'Date de naissance', 'Medication']
					// });
					// var sample = new html.element({
						// tag: 'hdiv',
						// children: [closeButton, sortChoice]
					// });
					// return sample;
				// }
				
				// var addSortButton = new html.element({
					// tag: 'button', 
					// onclick: function(){
						// msSorts.coll.add(newSort(msSorts.coll));
						// msSorts.unfold();
					// },
					// value: '+'
				// });
				
				// var msSorts = new tree.node({
					// label: 'Tris',
					// line: [addSortButton]
				// });
				
				// function newField(name, fieldControl){
					// var fieldName = new html.element({
						// tag: 'textDiv', 
						// value: name
					// });
					// return new html.element({
						// tag: 'hdiv',
						// style: {
							// 'justify-content': 'space-between'
						// },
						// children: [fieldName, fieldControl]
						
					// });
					
				// }
				
				// function newSample(root){
					// var closeButton = new html.element({
						// tag: 'button', 
						// value: 'x',
						// onclick: function (){
							// root.remove(sample);
						// }
					// });
					// var sample = new tree.node({
						// line: [
							// //closeButton,
							// new html.element({
								// tag: 'textDiv', 
								// value: 'X2345XXXS'
							// }), 
							// new html.element({
								// tag: 'textDiv', 
								// value: '2001/02/23'
							// }), 
							// new html.element({
								// tag: 'textDiv', 
								// value: 'Prednisone'
							// }), 
						
						// ], 
						// coll: [
							// newField('ID Patient', new html.element({tag: 'input'})),
							// newField('ID Échantillon', new html.element({tag: 'input'})),
							// newField('Date de naissance',  new html.element({tag: 'input', type: 'date'})),
							// newField('Sexe', new html.element({tag: 'select', 'choices': ['M', 'F']})),
							// newField('Histoire familiale', new html.element({tag: 'select', 'choices': ['Oui', 'Non']})),
							// newField('Date du prélèvement',  new html.element({tag: 'input', type: 'date'})),
							// newField('Âge au prélèvement',  new html.element({tag: 'textDiv', value: ''})),
							// newField('Ethnicité',  new html.element({tag: 'select', 'choices': [
								// 'Caucasien', 'Noir', 'Asiatique', 'Autochtone', 'Inconnu'
							// ]})),
							// newField('Poids',  new html.element({tag: 'input'})),
							// newField('Taille',  new html.element({tag: 'input'})),
							// newField('IMC',  new html.element({tag: 'textDiv', value: ''})),
							// newField('Fumeur', new html.element({tag: 'select', 'choices': ['Oui', 'Non']})),
							// newField('Vitamines', new html.element({tag: 'select', 'choices': ['D1', 'Non']})),
							// newField('Suppléments', new html.element({tag: 'textarea'})),
							// newField('Grossesses antérieures', new html.element({tag: 'select', 'choices': [
								// '1', '2', '3', '4', '5 ou +'
							// ]})),
							// newField('Diagnostic', new html.element({tag: 'select', 'choices': [
								// 'MS possible',
								// 'RIS',
								// 'CIS',
								// 'RRMS',
								// 'SPMS',
								// 'PPMS',
								// 'NMO',
								// 'NMOSD',
								// 'OND non-inflammatoire',
								// 'OND inflammatoire',
								// 'HC',
							// ]})),
							
						// ]
					// });
					
					// return sample;
					
				// }
				
				var addSampleButton = new html.element({
					tag: 'button', 
					onclick: function(){
						msSamples.coll.add(new sepdoc.sample(msSamples.coll, 100000 + msSamples.coll.length));
						msSamples.unfold();
					},
					value: 'Nouveau'
				});
				
				var msSamples = new tree.node({
					label: 'Échantillons',
					line: [addSampleButton]
				});
				
				var msApp = new tree.node({
					label: 'Sclérose en plaques',
					//coll: [msFilters, msSorts, msSamples]				
					coll: [msSamples]				
				});
				
				// req({
					// method: 'GET',
					// url: 'db/sep',
					// next: function(res){
						// console.log(res);
						
					// },
					// err: function(err){
						// console.log(err);
						
					// }
				// })
				
				return msApp;
				
			}
		
		
		_modules.add('sep', init);
		}
	);
})();