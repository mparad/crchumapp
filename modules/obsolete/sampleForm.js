(function () {
	
	function pad(number) {
		if (number < 10) {
			return '0' + number;
		}
		return number;
	} 
	
	function round(n, ndigits) {
		var f = 10^ndigits;
		return (Math.round(n * f)) / f;
	}
	
	function getTodayString() {
		var now = new Date(Date.now());
		return now.getFullYear() + '-' +
		pad(now.getMonth() + 1) + '-' +
		pad(now.getDate());
	}
	
	function getYearsElapsed(yStrA, yStrB) {
		var yearA = Number(yStrA.slice(0, 4)); 
		var yearB = Number(yStrB.slice(0, 4)); 
		var restA = yStrA.slice(5, 10);
		var restB = yStrB.slice(5, 10);
		
		return yearA - yearB + (restA >= restB ? 0 : -1);
	}
	
	var fullAccess = {
		admin: {read: true, write: true},
		medusers: {read: true, write: true},
		users: {read: true, write: true}
	};
	
	var medAccess = {
		admin: {read: true, write: true},
		medusers: {read: true, write: true},
		users: {read: true, write: false}
	};
	
	var medRead = {
		admin: {read: true, write: true},
		medusers: {read: true, write: true},
		users: {read: false, write: false}
	};
	
	_modules.ref(['form'], 
		function (form) {
			
			var sampleForm = {
				patientID : new form.stringFormField({
					index: 0,
					label: 'ID Patient', 
					validate: (str) => {return str.length == 6;}, 
					acl: fullAccess, 
					targets: ['sampleID']
				}),
				sampleID: new form.autoStringFormField({
					index: 1,
					label: 'ID Prélèvement',
					calculateValue: function(sample){
						return sample.fields.patientID.getValue() + 
						sample.fields.sampleDate.getValue();
					},
					validate: (str) => {return str.length == 16;}, 
					acl: fullAccess
				}), 
				sex: new form.singleChoiceFormField({
					index: 2,
					label: 'Sexe',
					choices: ['', 'M', 'F'],
					validate: (str) => {return str !== ''},
					targets: ['previousPregnancies'],
					acl: fullAccess
				}),
				birthDate: new form.dateFormField({
					index: 3,
					label: 'Date de naissance',
					validate: function (date) {
						return date !== '' && date <= getTodayString();
					},
					targets: ['ageAtSampleDate'],
					acl: fullAccess
					
				}),
				msFamilyHistory: new form.singleChoiceFormField({
					index: 4,
					label: 'Histoire familiale MS',
					choices: ['', 'Oui', 'Non', 'Inconnu'],
					validate: (str) => {return str !== ''},
					acl: fullAccess
				}),
				sampleDate: new form.dateFormField({
					index: 5,
					label: 'Date du prélèvement',
					validate: function (date) {
						console.log(date.length);
						console.log(date.length == 10 && date <= getTodayString());
						return date.length == 10 && date <= getTodayString();
					},
					targets: ['sampleID', 'ageAtSampleDate'],
					acl: fullAccess
				}),			
				ageAtSampleDate: new form.autoStringFormField({
					index: 6,
					label: 'Âge au prélèvement',
					calculateValue: function(sample) {
						var fields = sample.fields;
						
						if (fields.sampleDate.validation && fields.birthDate.validation &&
							fields.sampleDate.getValue() > fields.birthDate.getValue()) {
							return getYearsElapsed(
							fields.sampleDate.getValue(),
							fields.birthDate.getValue());
						} else {
							return '';
						}
					}, 
					validate: (str) => {console.log('AA' + str); return str !== '';}, 
					acl: fullAccess,
				}),
				
				ethnicity: new form.singleChoiceFormField({
					index: 7,
					label: 'Ethnicité',
					choices: ['', 'Caucasien', 'Noir', 'Asiatique', 'Autochtone', 'Inconnu'],
					validate: (str) => {return str !== ''},
					acl: fullAccess
				}),
				weight: new form.stringFormField({
					index: 8,
					label: 'Poids (kg)',
					validate: function (n) {
						var n = Number(n);
						return n > 0 && n < 1000 && !isNaN(n);
					},
					targets: ['bmi'],
					acl: fullAccess
				}), 
				height: new form.stringFormField({
					index: 9,
					label: 'Taille (cm)',
					validate: function (n) {
						return n > 0 && n < 300;
					},
					targets: ['bmi'],
					acl: fullAccess
				}),
				bmi: new form.autoStringFormField({
					index: 10,
					label: 'Indice de masse corporelle',
					calculateValue: function (sample) {
						var h;
						if (sample.fields.weight.validation && sample.fields.height.validation) {
							h = sample.fields.height.getValue();
							return round(sample.fields.weight.getValue() / (h * h * 0.0001), 2);
						} else {
							return '';
						}
					},
					validate: (str) => {return str !== '';}, 
				}),
				smoking: new form.singleChoiceFormField({
					index: 11,
					label: 'Tabagisme',
					choices: ['', 'Oui', 'Non', 'Inconnu'],
					validate: (str) => {return str !== ''},
					acl: fullAccess
				}),
				vitamins: new form.singleChoiceFormField({
					index: 12,
					label: 'Vitamines',
					choices: ['', 'D1', 'Non', 'Inconnu'],
					validate: (str) => {return str !== ''},
					acl: fullAccess
				}),
				supplements: new form.textFormField({
					index: 13,
					label: 'Suppléments',
					acl: fullAccess
				}),
				previousPregnancies: new form.singleChoiceFormField({
					index: 14,
					label: 'Grossesses antérieures',
					type: 'singleChoice',
					calculateValue: function (sample) {
						var fields = sample.fields;
						if (fields.sex.getValue() === 'M') {
							fields.previousPregnancies.choiceField.disabled = true;
							return 'N/A';
						} else {
							fields.previousPregnancies.choiceField.disabled = false;
							return fields.previousPregnancies.getValue();
						}
					},
					choices: [ '', '0', '1', '2', '3', '4', '5 ou +', 'Inconnu', 'N/A'],
					validate: (str) => {return str !== ''},
					acl: fullAccess
				}),
		
				diagnosis: new form.singleChoiceFormField({
					index: 15,
					label: 'Diagnostic',
					choices: [
						'',
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
						'Inconnu'
					],
					validate: (str) => {return str !== ''},
					acl: medAccess
				})
		
			};
	
			_modules.add('sampleForm', sampleForm);
		});
	
})()