/* The app entry point */

 (function() {
	 
	var root = this;
	 
	root.onload = function() {
		
		_modules.ref([
		'form', 
		'graphics',
		'sampleForm'], 
		function (form, graphics, sampleForm) {
			
			graphics.addCSSRules(graphics.formCSSRules);
			
			var appObject = graphics.createElement('div', {className: 'app'}, document.body);
			
			var menuSection = graphics.createElement('div', {
				id: 'menuSection'
			}, appObject);
			
			var titleObject = graphics.createElement('div', {
				id: 'titleObject',
				textChild: 'Biobanque'
			}, menuSection);
			
			var userSection = graphics.createElement('div', {
				id: 'userSection',
			}, menuSection);
			
			var loginSection = graphics.createElement('div', {
				id: 'userInfo',
				childrenElements: [
					graphics.createElement('button',  {
						className: 'userButton',
						textChild: 'Connexion',
						onclick: () => {login(
							document.getElementById('user').value, 
							document.getElementById('pwd').value
						); }
					}),
					graphics.createElement('div',  {
						className: 'userCreds',
						childrenElements: [
							graphics.createElement('label', {className: 'menuLabel', textChild: 'Usager'}),
							graphics.createElement('input', {id: 'user'})
						]
					}), 
					graphics.createElement('div',  {
						className: 'userCreds',
						childrenElements: [
							graphics.createElement('label', {className: 'menuLabel', textChild: 'Mot de passe'}),
							graphics.createElement('input', {id: 'pwd', type: 'password'})
						]
					}),
					
				],
			}, userSection);
			
			var userName = '';
			
			var logoutSection = graphics.createElement('div', {
				id: 'userInfo',
				childrenElements: [
					graphics.createElement('button',  {
						className: 'userButton',
						textChild: 'Déconnexion',
						onclick: () => {logout(); }
					}),
					graphics.createElement('div',  {
						id: 'userName',
						className: 'userCreds',
						textChild: userName
					}),
				],
			});
			
			var guiSection = graphics.createElement('div', {className: 'formSection'}, appObject);
			var tableSection = graphics.createElement('div', {id: 'tableSection'}, guiSection);
			
			var tableData = [
				['tableHeader', 'headerButton', 'ID Patient', 'Date de naissance', 'ID Prélèvement', 'Sexe'], 
				['tableRow', 'rowButton', 'AWREW45', '1954-02-02', 'AWREW4520160522', 'M'], 
				['tableRow', 'rowButton', '43FDDFD', '1954-02-02', 'AWREW4520160522', 'F'], 
				['tableRow', 'rowButton', '23WWWWW', '1954-02-02', 'AWREW4520160522', 'F'], 
				['invalidTableRow', 'invalidRowButton', 'AWREW45', '1954-02-02', 'AWREW4520160522', 'F'], 
				['tableRow', 'rowButton', '43FDDFD', '1954-02-02', 'AWREW4520160522', 'M'], 
				['tableRow', 'rowButton', '23WWWWW', '1954-02-02', 'AWREW4520160522', 'F'], 
				['invalidTableRow', 'invalidRowButton', 'AWREW45', '1954-02-02', 'AWREW4520160522', 'M'], 
				['tableRow', 'rowButton', '43FDDFD', '1954-02-02', 'AWREW4520160522', 'M'], 
				['tableRow', 'rowButton', '23WWWWW', '1954-02-02', 'AWREW4520160522', 'F'], 
			];
			
			function buildTableObject(table) {
				var tableRows = table.map(function (row) {
					var cellStyle = row[0];
					var buttonStyle = row[1];
					return graphics.createElement('tr', {
						childrenElements: row.slice(2).map(function(col) {
							return graphics.createElement('td', {
								className: cellStyle,
								childrenElements: [
									graphics.createElement('button',  {
										className: buttonStyle,
										textChild: col,
										onclick: showForm
									}),
								]
							});
						})
					});
				});
				return graphics.createElement('table', {
					childrenElements: tableRows
				});
			}
			
			var tableObject = buildTableObject(tableData);
			
			var formControls = graphics.createElement('div', {
				childrenElements: [
					graphics.createElement('button',  {
						className: 'formButton',
						textChild: 'Enregistrer',
						onclick: () => {}
					}), 
					graphics.createElement('button',  {
						className: 'formButton',
						textChild: 'Fermer',
						onclick: hideForm
					}), 
					graphics.createElement('button',  {
						className: 'formButton',
						textChild: 'Réinitialiser',
						onclick: () => {}
					}), 
				], 
				
			});
			
			var tableControls = graphics.createElement('div', {
				childrenElements: [
					graphics.createElement('button',  {
						className: 'formButton',
						textChild: 'Nouveau',
						onclick: showForm
					}), 
					graphics.createElement('button',  {
						className: 'formButton',
						textChild: 'Export CSV',
						onclick: () => {}
					})
				], 
			});
			
			var formSection = graphics.createElement('div', {id: 'formSection'}, guiSection);
			//var spacer = graphics.createElement('div', {id: 'spacer'}, formSection);
			var formObject = new form.form(sampleForm);
			
			function login(user, pwd) {
				//if (user === 'mpa'){
					userSection.replaceChild(logoutSection, loginSection);
					userName = user;
					document.getElementById('userName').innerHTML = userName;
					showTable();
				//}
			}
			
			function logout() {
				userSection.replaceChild(loginSection, logoutSection);
				document.getElementById('user').value = '', 
				hideForm();
				hideTable();
			}
			
			var formVisible = false;
			var tableVisible = false;
			
			function showForm() {
				if (!formVisible) {
					formSection.appendChild(formObject.graphicObject);
					formSection.appendChild(formControls);
					formVisible = true;
				}
			}
			
			function hideForm() {
				if (formVisible) {
					formSection.removeChild(formObject.graphicObject);
					formSection.removeChild(formControls);
					formVisible = false;
				}
			}
			
			function showTable() {
				if (!tableVisible) {
					tableSection.appendChild(tableObject);
					tableSection.appendChild(tableControls);
					tableVisible = true;
				}
			}
			
			function hideTable() {
				if (tableVisible) {
					tableSection.removeChild(tableObject);
					tableSection.removeChild(tableControls);
					tableVisible = false;
				}
			}
			
			
		});
	};
 }.call(this));
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 