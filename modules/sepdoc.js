(function () {
	_modules.ref(['html', 'tree', 'req'], 
		function (html, tree, req) {

			function field(name, controlSpecs, validation){
				var obj = this;
									
				var fieldName = new html.element({
					tag: 'textDiv', 
					value: name
				});
				
				obj.control = new html.element(controlSpecs);
				
				//console.log(obj.control)
				
				html.element.call(obj, {
					tag: 'hdiv',
					style: {
						'justify-content': 'space-between'
					},
					children: [fieldName, obj.control]
					
				});
			}

			field.prototype = Object.create(html.element.prototype);
			
			field.prototype.value = function(arg) {
				if (arg || arg === '') {
					this.control.value(arg);
				} else {
					return this.control.value();
				}
			};
				
			function sample(root, sampleId) {
				var obj = this;
				var data;
				obj.data = {};
				data = obj.data;
				obj.root = root;
				
				var closeButton = new html.element({
					tag: 'button', 
					value: 'x',
					onclick: function (){
						root.remove(obj);
					}
				});
				
				data.sampleId = sampleId;
				data.patientId = new field('ID Patient', {tag: 'input'});
				
				data.birthDate = new field('Date de naissance', {tag: 'input', type: 'date'});
				data.birthPlace = new field('Lieu de naissance', {tag: 'input'});
				data.sex = new field('Sexe', {tag: 'select', 'choices': ['M', 'F']});
				data.msFamilialHistory = new field('Histoire familiale',{tag: 'select', 'choices': ['Oui', 'Non']});
				data.weight = new field('Poids (kg)', {tag: 'input'});
				data.height = new field('Taille (cm)', {tag: 'input'});
				data.ethnicity = new field('Ethnicité', {tag: 'select', 'choices': [
					'Caucasien', 'Noir', 'Asiatique', 'Autochtone', 'Inconnu'
				]});
				data.tobaccoUse = new field('Tabagisme', {tag: 'select', 'choices': ['Oui', 'Non']});
				data.previousPregnancies = new field('Grossesses antérieures', {tag: 'select', 'choices': [
					'1', '2', '3', '4', '5 ou +'
				]});
			
				data.dx = new field('Diagnostic', {tag: 'select', 'choices': [
					'MS possible',
					'RIS',
					'CIS',
					'RRMS',
					'SPMS',
					'PPMS',
					'NMO',
					'NMOSD',
					'OND non-inflammatoire',
					'OND inflammatoire',
					'HC',
				]});
				data.dxDate = new field('Date du diagnostic', {tag: 'input', type: 'date'});
				data.diseaseDuration = new field('Durée de la maladie', {tag: 'input'});
				//data.durationSinceDx = new field('Durée depuis diagnostic', );
				data.lastRelapseDate = new field('Date de la dernière poussée', {tag: 'input', type: 'date'});
				data.numberRelapsesSinceDx = new field('Nombre de poussées depuis diagnostic', {tag: 'input'});
				data.numberRelapses3Years = new field('Nombre de poussées depuis 3 ans', {tag: 'input'});
				data.numberRelapses1Year = new field('Nombre de poussées dernière année', {tag: 'input'});
				data.edssNow = new field('EDSS actuel', {tag: 'input'});
				data.edss5Years = new field('EDSS 5 dernières années', {tag: 'input'});
				data.edss10years = new field('EDSS 10 dernières années', {tag: 'input'});
				data.lastMRIDate = new field('Date de la dernière IRM', {tag: 'input', type: 'date'});
				data.lastMRIReport = new field('Rapport de la dernière IRM', {tag: 'textarea'});
				data.firstMRIDate = new field('Date de la première IRM', {tag: 'input', type: 'date'});
				data.firstMRIReport = new field('Rapport de la première IRM', {tag: 'textarea'});
				data.ocb = new field('BOC', {tag: 'select', 'choices': ['Positif', 'Négatif']});
				data.index = new field('Index', {tag: 'select', 'choices': ['Positif', 'Négatif']});
				data.wbcCrl = new field('Leucocytes LCR', {tag: 'input'});
				data.proteinsCrl = new field('Protéinurie LCR', {tag: 'input'});
				data.otherNonInflammatoryDiseases = new field('Autres maladies non-inflammatoires', {tag: 'input'});
				data.otherInflammatoryDiseases = new field('Autres maladies inflammatoires', {tag: 'input'});
				
				data.currentDmt = new field('Traitement actuel', {tag: 'select', choices: [
					'GA', 'IFNb', 'TF', 'DMF', 'FTY', 
					'NTZ', 'LMT', 'MITOX', 'Cyclophosphamide', 'Azathioprine', 
					'Anti-CD20', 'PLEX', 'IVIg', 'Corticostéroïdes', 'Protocole de recherche', 
					'Autre'] });
					
				data.currentDmtDate = new field('Date de début du traitement actuel', {tag: 'input', type: 'date'});
				
				data.previousGA = new field('GA', {tag: 'input', type: 'checkbox'});
				data.previousIFNb = new field('IFNb', {tag: 'input', type: 'checkbox'});
				data.previousTF = new field('TF', {tag: 'input', type: 'checkbox'});
				data.previousDMF = new field('DMF', {tag: 'input', type: 'checkbox'});
				data.previousFTY = new field('FTY', {tag: 'input', type: 'checkbox'});
				data.previousNTZ = new field('NTZ', {tag: 'input', type: 'checkbox'});
				data.previousLMT = new field('LMT', {tag: 'input', type: 'checkbox'});
				data.previousMitox = new field('Mitox', {tag: 'input', type: 'checkbox'});
				data.previousCyclophosphamide = new field('Cyclophosphamide', {tag: 'input', type: 'checkbox'});
				data.previousAzathioprine = new field('Azathioprine', {tag: 'input', type: 'checkbox'});
				data.previousAntiCD20 = new field('Anti-CD20', {tag: 'input', type: 'checkbox'});
				data.previousPLEX = new field('PLEX', {tag: 'input', type: 'checkbox'});
				data.previousIVIg = new field('IVIg', {tag: 'input', type: 'checkbox'});
				data.previousCorticosteroids = new field('Corticostéroïdes', {tag: 'input', type: 'checkbox'});
				data.previousResearchProtocol = new field('Protocole de recherche', {tag: 'input'});
				data.previousOther	 = new field('Autre(s)', {tag: 'textarea'});
					
				data.firstDmtDate = new field('Date du premier traitement', {tag: 'input', type: 'date'});
				data.otherMedication = new field('Autre médication', {tag: 'textarea'});
				data.lastCorticoDmt = new field('Date du dernier traitement aux corticostéroïdes', {tag: 'input', type: 'date'});
				data.vitamins = new field('Vitamines', {tag: 'select', 'choices': ['D1', 'Non']});
				data.supplements = new field('Suppléments', {tag: 'textarea'});
				
				data.sampleDate = new field('Date du prélèvement', {tag: 'input', type: 'date'});
				data.yellowTubes = new field('Nombre de tubes lavande prélevés', {tag: 'input'});
				data.goldenTubes = new field('Nombre de tubes dorés prélevés', {tag: 'input'});
				data.pbmc = new field('Nombre de PBMC congelés(x 10E6)', {tag: 'input'});
				data.pbmcLocation = new field('Localisation des PBMC ', {tag: 'input'});
				data.serumTubes = new field('Nombre de tubes de sérum congelés', {tag: 'input'});
				data.serumTubesLocation = new field('Localisationi des tubes de sérum', {tag: 'input'});
				data.dryCulots = new field('Nombre de culots secs congelés', {tag: 'input'});
				data.dryCulotsLocation = new field('Localisation des culots secs', {tag: 'input'});
				
				tree.node.call(obj, {
					line: [
						//closeButton,
						new html.element({
							tag: 'textDiv', 
							value: 'X2345XXXS'
						})
					
					], 
					coll: [
						new tree.node({
							label: 'Patient',
							coll: [
								data.patientId,
								data.birthDate,
								data.birthPlace,
								data.sex,
								data.msFamilialHistory,
								data.weight,
								data.height,
								data.ethnicity,
								data.tobaccoUse,			
								data.previousPregnancies,
							]
						}),
						new tree.node({
							label: 'Maladie',
							coll: [
								data.dx,
								data.dxDate,
								data.diseaseDuration,
								data.lastRelapseDate,
								data.numberRelapsesSinceDx,
								data.numberRelapses3Years,
								data.numberRelapses1Year,
								data.edssNow,
								data.edss5Years,
								data.edss10years,
								data.lastMRIDate,
								data.lastMRIReport,
								data.firstMRIDate,
								data.firstMRIReport,
								data.ocb,
								data.index,
								data.wbcCrl,
								data.proteinsCrl,
								data.otherNonInflammatoryDiseases,
								data.otherInflammatoryDiseases,
							]
						}),
						new tree.node({
							label: 'Médication',
							coll: [
								data.currentDmt,
								data.currentDmtDate,
								new tree.node({
									label: 'Traitements antérieurs',
									coll: [
										data.previousGA,
										data.previousIFNb,
										data.previousTF,
										data.previousDMF,
										data.previousFTY,
										data.previousNTZ,
										data.previousLMT,
										data.previousMitox,
										data.previousCyclophosphamide,
										data.previousAzathioprine,
										data.previousAntiCD20,
										data.previousPLEX,
										data.previousIVIg,
										data.previousCorticosteroids,
										data.previousResearchProtocol,
										data.previousOther
									]
								}),
								data.firstDmtDate,
								data.otherMedication,
								data.lastCorticoDmt,
								data.vitamins,
								data.supplements
							]
						}),
						new tree.node({
							label: 'Échantillons',
							coll: [
								data.sampleDate,
								data.yellowTubes,
								data.goldenTubes,
								data.pbmc,
								data.pbmcLocation,
								data.serumTubes,
								data.serumTubesLocation,
								data.dryCulots,
								data.dryCulotsLocation
							]
						}),
						new html.element({
							tag: 'button', 
							value: 'Sauver', 
							onclick: function (evt) {
								obj.put();								
							}
						})
					]
				});
			}
				
			sample.prototype = Object.create(tree.node.prototype);
			
			sample.prototype.load = function(dataObj) {
				var obj = this;
				Object.keys(obj).forEach(function(prop){
					obj.data[prop].value(dataObj[prop]);
				});
			}
			
			sample.prototype.save = function() {
				var outputObj = {}
				Object.keys(obj.data).forEach(function(prop) {
					if (obj.data.hasOwnProperty(prop)) {
						outputObj[prop] = obj.data[prop].value();
					}
				});
				console.log(outputObj)
			}
			
			sample.prototype.get = function(sampleId) {
				var obj = this;
				req({
					method: 'GET',
					url: 'db/sep/' + obj.sampleId,
					next: function(response){
						obj.load(response.data);
					},
					err: function(errMsg) {
						console.log(errMsg);
					}
				})
			}
			
			sample.prototype.put = function() {
				var obj = this;
				req({
					method: 'PUT',
					url: 'db/sep/' + obj.sampleId,
					data: obj.save(),
					next: function(response){
						
					},
					err: function(errMsg) {
						console.log(errMsg);
					}
					
				})
				
			}
		
		_modules.add('sepdoc', {
			field: field,
			sample: sample
			
		});
		}
	);
})();





