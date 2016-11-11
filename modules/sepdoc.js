(function () {
	_modules.ref(['html', 'tree', 'req'], 
		function (html, tree, req) {

			var meds = {
				ga: 'GA (glatiramer acetate)', 
				ifn1aavonex:	'IFNb-1a (Avonex)',
				ifn1aplegridy:	'IFNb-1a (Plegridy)',
				ifn1arebif:	'IFNb-1a (Rebif)',
				ifn1bbetaseron:	'IFNb-1b (Betaseron)',
				ifn1bextavia:	'IFNb-1b (Extavia)',
				tf:	'TF (teriflunomide)', 
				dmf:	'DMF (dimethyl fumarate)', 
				fty:	'FTY (fingolimod)',
				ntz:	'NTZ (natalizumab)', 
				lmt:	'LMT (alemtuzumab)', 
				mitox:	'Mitoxantrone', 
				mtx:	'Méthotrexate',
				cyclo:	'Cyclophosphamide', 
				imuran:	'Azathioprine', 
				anticd20:	'Anti-CD20', 
				plex:	'PLEX', 
				ivig:	'IVIg', 
				cortico:	'Corticostéroïdes', 
			};
		
		
			function field(name, controlSpecs, validation){
				var obj = this;
									
				obj.fieldName = new html.element({
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
					children: [obj.fieldName, obj.control]
					
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
				
			field.prototype.name = function(){
				var obj = this;
				return obj.fieldName.value();
			};
				
			function sample(root, id, sampleDateArg) {
				var obj = this;
				var data;
				obj.data = {};
				var dataLine = new html.element({
					tag: 'textDiv', 
					value: ''
				});
				data = obj.data;
				obj.root = root;
				
				var patientId, sampleDate;
				
				if (sampleDateArg) {
					patientId = id;
					sampleDate = sampleDateArg;
					data.sampleDate = new field('Date du prélèvement', {
						tag: 'input', 
						type: 'date',
						value: sampleDate,
						listener: updateDataLine
					});
					data.patientId = new field('ID Patient', {
						tag: 'textDiv', 
						value: patientId
					});
					data.sampleId = new field('', {tag: 'textDiv', value: patientId + sampleDate});				
				} else {
					data.sampleDate = new field('Date du prélèvement', {
						tag: 'input', 
						type: 'date',
						listener: updateDataLine
					});
					data.patientId = new field('ID Patient', {
						tag: 'textDiv'
					});
					data.sampleId = new field('', {tag: 'textDiv', value: id});
				}
				
				var closeButton = new html.element({
					tag: 'button', 
					value: 'x',
					onclick: function (){
						root.remove(obj);
					}
				});
				
				function format(str, maxl) {
					var strout;
					if (str.length > maxl) {
						return str.substr(0, maxl - 3) + '...'
					} else if (str.length === maxl) {
						return str;
					} else {
						return str + (new Array(maxl - str.length).fill(' ').join(''));
					}
				}
				
				function updateDataLine() {
					// console.log([
						// format(data.patientId.value(), 16),
						// format(data.sampleDate.value(), 10),
						// format(data.birthDate.value(), 10),
						// format(data.sex.value(), 2) 
					// ].join('  '))
					
					data.sampleId.value(data.patientId.value() + data.sampleDate.value());
					dataLine.value([
						format(data.patientId.value(), 14),
						format(data.sampleDate.value(), 10),
						format(data.birthDate.value(), 10),
						format(data.sex.value(), 2),
						format(data.dx.value(), 10) 
					].join('  '));
				}
				
				
				
				data.birthDate = new field('Date de naissance', {
					tag: 'input', 
					type: 'date',
					listener: updateDataLine
					});
				data.birthPlace = new field('Lieu de naissance', {tag: 'input'});
				data.sex = new field('Sexe', {tag: 'select', 'choices': [' ', 'M', 'F'], 
					listener: updateDataLine});
				data.msFamilialHistory = new field('Histoire familiale',{tag: 'select', 'choices': [' ', 'Oui', 'Non']});
				data.weight = new field('Poids (kg)', {tag: 'input'});
				data.height = new field('Taille (cm)', {tag: 'input'});
				data.ethnicity = new field('Ethnicité', {tag: 'select', 'choices': [' ', 
					'Caucasien', 'Noir', 'Asiatique', 'Autochtone', 'Inconnu'
				]});
				data.tobaccoUse = new field('Tabagisme', {tag: 'select', 'choices': [' ', 'Oui', 'Non']});
				data.previousPregnancies = new field('Grossesses antérieures', {
					tag: 'select', 
					'choices': [
					' ', 'Non', '1', '2', '3', '4', '5 ou +'
				]});
			
				data.dx = new field('Diagnostic', {
					tag: 'select', 
					listener: updateDataLine,
					'choices': [
					' ',
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
				data.ocb = new field('BOC', {tag: 'select', 'choices': [' ', 'Positif', 'Négatif']});
				data.index = new field('Index', {tag: 'select', 'choices': [' ', 'Positif', 'Négatif']});
				data.wbcCrl = new field('Leucocytes LCR', {tag: 'input'});
				data.proteinsCrl = new field('Protéinurie LCR', {tag: 'input'});
				data.otherNonInflammatoryDiseases = new field('Autres maladies non-inflammatoires', {tag: 'input'});
				data.otherInflammatoryDiseases = new field('Autres maladies inflammatoires', {tag: 'input'});
				
				data.currentDmt = new field('Traitement actuel', {tag: 'select', choices: [
					' ',
					meds.ga,
					meds.ifn1aavonex,
					meds.ifn1aplegridy,
					meds.ifn1arebif,
					meds.ifn1bbetaseron,
					meds.ifn1bextavia,
					meds.tf,
					meds.dmf,
					meds.fty,
					meds.ntz,
					meds.lmt,
					meds.mitox,
					meds.mtx,
					meds.cyclo,
					meds.imuran,
					meds.anticd20,
					meds.plex,
					meds.ivig,
					meds.cortico,
					'Protocole de recherche', 
					'Autre'] });
					
				data.currentDmtDate = new field('Date de début du traitement actuel', {tag: 'input', type: 'date'});
				
				data.previousGa = new field(meds.ga, {tag: 'input', type: 'checkbox'});
				data.previousIfn1aavonex = new field(meds.ifn1aavonex, {tag: 'input', type: 'checkbox'});
				data.previousIfn1aplegridy = new field(meds.ifn1aplegridy, {tag: 'input', type: 'checkbox'});
				data.previousIfn1arebif = new field(meds.ifn1arebif, {tag: 'input', type: 'checkbox'});
				data.previousIfn1bbetaseron = new field(meds.ifn1bbetaseron, {tag: 'input', type: 'checkbox'});
				data.previousIfn1bextavia = new field(meds.ifn1bextavia, {tag: 'input', type: 'checkbox'});
				
				data.previousTf = new field(meds.tf, {tag: 'input', type: 'checkbox'});
				data.previousDmf = new field(meds.dmf, {tag: 'input', type: 'checkbox'});
				data.previousFty = new field(meds.fty, {tag: 'input', type: 'checkbox'});
				data.previousNtz = new field(meds.ntz, {tag: 'input', type: 'checkbox'});
				data.previousLmt = new field(meds.lmt, {tag: 'input', type: 'checkbox'});
				data.previousMitox = new field(meds.mitox, {tag: 'input', type: 'checkbox'});
				data.previousMtx = new field(meds.mtx, {tag: 'input', type: 'checkbox'});
				
				data.previousCyclo = new field(meds.cyclo, {tag: 'input', type: 'checkbox'});
				data.previousImuran = new field(meds.imuran, {tag: 'input', type: 'checkbox'});
				data.previousAnticd20 = new field(meds.anticd20, {tag: 'input', type: 'checkbox'});
				data.previousPlex = new field(meds.plex, {tag: 'input', type: 'checkbox'});
				data.previousIvig = new field(meds.ivig, {tag: 'input', type: 'checkbox'});
				data.previousCortico = new field(meds.cortico, {tag: 'input', type: 'checkbox'});
				data.previousResearchProtocol = new field('Protocole de recherche', {tag: 'input'});
				data.previousOther	 = new field('Autre(s)', {tag: 'textarea'});
					
				data.firstDmtDate = new field('Date du premier traitement', {tag: 'input', type: 'date'});
				data.otherMedication = new field('Autre médication', {tag: 'textarea'});
				data.lastCorticoDmt = new field('Date du dernier tx corticos.', {tag: 'input', type: 'date'});
				data.vitamins = new field('Vitamines', {tag: 'select', 'choices': [' ', 'D1', 'Non']});
				data.supplements = new field('Suppléments', {tag: 'textarea'});
							
				data.yellowTubes = new field('Nombre de tubes lavande prélevés', {tag: 'input'});
				data.goldenTubes = new field('Nombre de tubes dorés prélevés', {tag: 'input'});
				data.pbmc = new field('Nombre de PBMC congelés(x 10E6)', {tag: 'input'});
				data.pbmcLocation = new field('Localisation des PBMC ', {tag: 'input'});
				data.serumTubes = new field('Nombre de tubes de sérum congelés', {tag: 'input'});
				data.serumTubesLocation = new field('Localisation des tubes de sérum', {tag: 'input'});
				data.dryCulots = new field('Nombre de culots secs congelés', {tag: 'input'});
				data.dryCulotsLocation = new field('Localisation des culots secs', {tag: 'input'});
				
				tree.node.call(obj, {
					menu: 100,
					line: [dataLine],
					
					coll: [
						new tree.node({
							label: 'Personnel',
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
							label: 'Pathologie',
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
									menu: true,
									label: 'Traitements antérieurs',
									coll: [
										data.previousGa,
										data.previousIfn1aavonex,
										data.previousIfn1aplegridy,
										data.previousIfn1arebif,
										data.previousIfn1bbetaseron,
										data.previousIfn1bextavia,
										data.previousTf,
										data.previousDmf,
										data.previousFty,
										data.previousNtz,
										data.previousLmt,
										data.previousMitox,
										data.previousMtx,
										data.previousCyclo,
										data.previousImuran,
										data.previousAnticd20,
										data.previousPlex,
										data.previousIvig,
										data.previousCortico,
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
				Object.keys(dataObj).forEach(function(prop){
					obj.data[prop].value(dataObj[prop]);
				});
			}
			
			sample.prototype.save = function() {
				var obj = this;
				var outputObj = {}
				Object.keys(obj.data).forEach(function(prop) {
					if (obj.data.hasOwnProperty(prop)) {
						outputObj[prop] = obj.data[prop].value();
					}
				});
				return outputObj;
			}
			
			sample.prototype.get = function(sampleIdArg) {
				var obj = this;
				req({
					method: 'GET',
					url: 'db/sep/' + (sampleIdArg ? sampleIdArg : obj.data.sampleId.value()),
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
					url: 'db/sep/' + obj.data.sampleId.value(),
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





