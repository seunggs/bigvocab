"use strict";function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}!function(){angular.module("bigvocab",["ngAria","ngAnimate","ngMessages","ui.router","720kb.tooltips","ngAudio","angular-momentjs","home","auth","mainApp","common"])}(),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/test-words.tpl.html",'<div class="container">\n	<div class="clearfix center">\n\n		<h1 class="mt1 mb3">Test Time!</h1>\n\n		<div class="mb2 bold"><span class="gray">Today\'s Quota:</span> 78 <span class="gray">/ 123 words left</span></div>\n\n		<div class="md-col-4 sm-col-6 mx-auto px2">\n			<div class="h2 px2 py4 bg-white rounded">Hello</div>\n		</div>\n\n		<div class="md-col-4 sm-col-6 mx-auto px2">\n			<div class="clearfix mxn1">\n				<div class="col col-6 px1">\n					<a class="btn mt2 bg-red block white">Not sure<span class="ti-close ml1"></span></a>\n				</div>\n				<div class="col col-6 px1">\n					<a class="btn mt2 bg-green block white">Easy<span class="ti-check ml1"></span></a>\n				</div>\n			</div>\n		</div>\n\n	</div>\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/sidebar.tpl.html",'<!--/////////// DESKTOP ONLY ///////////-->\n<div class="sm-show" style="margin-right: 63px;">\n\n	<div class="bg-navy fixed white z1" style="height: 100vh;">\n		<div class="flex flex-column flex-center py3">\n			\n			<a ui-sref="mainApp.collections"><img class="mb2" src="../images/logo/bigvocab-logo-color.svg" width="56px"></a>\n			<a ui-sref="{{ navItem.link }}" tooltips title="{{ navItem.title }}" tooltip-placement="right" class="btn btn-icon h2 center p2" ng-repeat="navItem in sidebar.navItems | orderBy:\'id\'" tabindex="-1">\n				<span class="{{ navItem.icon }}"></span>\n			</a>\n\n		</div>\n	</div>\n\n</div>\n<!--/////////// end: DESKTOP ONLY ///////////-->\n\n<!--/////////// MOBILE ONLY ///////////-->\n<div class="sm-hide">\n\n	<!-- toggle button -->\n	<div class="fixed z2">\n		<a ng-click="sidebar.toggleSidebar()" class="btn btn-icon p3 h3" ng-class="{\'black\': sidebar.toggle === false, \'white\': sidebar.toggle === true}"><span class="ti-menu"></span></a>\n	</div>\n	<!-- end: toggle button -->\n\n	<!-- menu items -->\n	<div class="bg-navy fixed white z1 translateX-n-100 transition-all-300" ng-class="{\'translateX-n-100\': sidebar.toggle === false, \'translateX-0\': sidebar.toggle === true }" style="height: 100vh;">\n		<div class="flex flex-column py2 mt4">\n			\n			<div style="margin-left:20px"><img class="mb2" src="../images/logo/bigvocab-logo-color.svg" width="56px"></div>\n			<a ui-sref="{{ navItem.link }}" ng-click="sidebar.toggleSidebar();" class="btn btn-icon py2 px3 flex flex-center" ng-repeat="navItem in sidebar.navItems | orderBy:\'id\'" tabindex="-1">\n				<div class="{{ navItem.icon }} h3 mr2"></div>\n				<div class="h5">{{ navItem.title }}</div>\n			</a>\n\n		</div>\n	</div>\n	<!-- end: menu items -->\n\n</div>\n<!--/////////// end: MOBILE ONLY ///////////-->\n')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/review-words.tpl.html",'<div class="container">\n	<div class="clearfix center">\n\n		<h1 class="mt1 mb3">Study Time!</h1>\n\n		<div class="mb2 bold"><span class="gray">Today\'s Quota:</span> {{ reviewWords.totalWordsCount - reviewWords.wordCounter }} <span class="gray">/ {{ reviewWords.totalWordsCount }} words left</span></div>\n\n		<div class="sm-col-6 mx-auto px2">\n			<div class="p3 bg-white rounded flex flex-column flex-center-justified" style="min-height: 184px">\n				<div class="h2 mb1">{{ reviewWords.currentWord.word }}</div>\n				<div ng-if="reviewWords.showAnswer" class="h4 dark-gray">{{ reviewWords.currentWord.definition }}</div>\n\n				<!-- pronunciation -->\n				<button ng-if="reviewWords.pronunciation !== null && reviewWords.showAnswer" \n								ng-click="reviewWords.playPronunciation()" \n								class="btn btn-blue-outline btn-sm mt2 mx-auto center" style="width: 48px; height: 48px; border-radius: 50%;">\n					<span class="ti-control-play" style="margin-left:4px"></span>\n				</button>\n				<!-- end: pronunciation -->\n\n			</div>\n		</div>\n\n		<!-- show answer button -->\n		<div ng-if="!reviewWords.showAnswer" class="sm-col-6 mx-auto px2">\n			<button ng-click="reviewWords.toggleAnswer()" \n							class="btn btn-primary mt2 col-12">Show Answer</button>\n		</div>\n		<!-- end: show answer button -->\n\n		<!-- review response buttons -->\n		<div ng-if="reviewWords.showAnswer" class="sm-col-6 mx-auto px2">\n			<div class="clearfix mxn1">\n				<div class="col col-3 px1 red">\n					<button ng-click="reviewWords.submitRes(reviewWords.currentWord, \'again\')" \n									class="btn btn-red mt2 col-12">Again</button>\n				</div>\n				<div class="col col-3 px1 green">\n					<button ng-click="reviewWords.submitRes(reviewWords.currentWord, \'hard\')" \n									class="btn btn-yellow-green mt2 col-12">Hard</button>\n				</div>\n				<div class="col col-3 px1 green">\n					<button ng-click="reviewWords.submitRes(reviewWords.currentWord, \'good\')" \n									class="btn btn-green mt2 col-12">Good</button>\n				</div>\n				<div class="col col-3 px1 green">\n					<button ng-click="reviewWords.submitRes(reviewWords.currentWord, \'easy\')" \n									class="btn btn-green mt2 col-12">Easy</button>\n				</div>\n			</div>\n		</div>\n		<!-- end: review response buttons -->\n\n	</div>\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/main-app.tpl.html",'<div class="flex">\n	<div ui-view="sidebar"></div>\n	<div ui-view class="flex-auto bg-darken-1 py4" style="min-height: 100vh"></div>\n</div>\n')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/logout.tpl.html",'<div class="container">\n	<div class="clearfix">\n\n		<div class="sm-col-10 md-col-6 mx-auto center px2">\n	\n			<h1 class="mt1 mb2">Log Out</h1>\n\n			<div class="mb3 h4">Are you sure you want to sign out from Big Vocab?</div>\n\n			<button class="btn btn-blue-outline" ng-click="logout.logout()">Yes, log me out</button>&nbsp;&nbsp;\n			<button class="btn btn-primary" ng-click="logout.goBack()">No, send me back</button>\n\n		</div>\n\n	</div>\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/list-words.tpl.html",'<div class="container">\n	<div class="clearfix">\n\n		<h1 class="mt1 mb3 center">List of All Words in <span class="italic">{{ listWords.collectionTitle }}</span></h1>\n\n		<!-- search words form -->\n		<div class="sm-col-6 mx-auto px2">\n			\n			<form name="listWordsForm" class="center">\n				<input name="searchWords" type="text" ng-model="listWords.searchWords" class="field col-12 mb3" placeholder="Search any word or definition">\n			</form>\n\n		</div>\n		<!-- end: search words form -->\n\n		<!-- list of words -->\n		<div class="sm-col-10 mx-auto px2">\n			\n			<div ng-repeat="word in listWords.words | filter: listWords.searchWords" class="clearfix mb2">\n				<div class="sm-col sm-col-3">{{ word.word }}</div>\n				<div class="sm-col sm-col-9 gray">{{ word.definition }}</div>\n			</div>\n			\n		</div>\n		<!-- end: list of words -->\n\n	</div>\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/import.tpl.html",'<div class="container">\n	<div class="clearfix">\n\n		<div class="sm-col-10 md-col-6 mx-auto center px2">\n	\n			<h1 class="mt1 mb2">Import from Anki</h1>\n\n			<div class="mb3">If you upload multiple files, it will merge them and input it into a single collection. If you want each text file to have its own collection, upload one file at a time.</div>\n\n			<form name="import.importForm" \n						ng-submit="import.importTextfile(import.importForm.$valid, import.formData)"\n						novalidate>\n\n				<div class="mb1 bold">Title of the collection to be imported</div>\n				<input name="collectionTitle" type="text" ng-model="import.formData.collectionTitle" class="field col-12" placeholder="{{ import.placeholder.collectionTitle }}" autofocus required>\n\n				<!-- error handling -->\n				<div ng-messages="import.importForm.collectionTitle.$error" \n						 ng-if="import.importForm.$submitted && import.importForm.collectionTitle.$touched" \n						 class="red bold h6 mt1">\n					<div ng-message="required"><span class="ti-alert mr1"></span>This field is required</div>\n				</div>\n				<!-- end: error handling -->\n\n				<div class="mt3 mb1 bold">Anki text file (i.e. anki-collection-2015.txt)</div>\n				<div class="file-input">\n					Click here to upload your files<span class="ti-folder ml1">\n					<input name="files" type="file" multiple="multiple" accept=".txt" fileread="import.formData.files" class="field col-12" style="cursor: pointer; margin-bottom: none" placeholder="{{ import.placeholder.files }}" required>\n				</div>\n\n				<!-- file names -->\n				<div class="mt1">\n					<div ng-repeat="file in import.formData.files" track by $index>{{ file.name }}</div>\n				</div>\n				<!-- end: file names -->\n\n				<!-- error handling -->\n				<div ng-messages="import.importForm.files.$error" \n						 ng-if="import.importForm.$submitted" \n						 class="red bold h6 mt1">\n					<div ng-message="required"><span class="ti-alert mr1"></span>This field is required</div>\n				</div>\n				<!-- end: error handling -->\n\n				<!-- submit button -->\n				<button type="submit" class="btn btn-primary mt3 mb2" ng-disabled="import.btnState.success || import.btnState.loading">\n					<span ng-if="!import.btnState.loading && !import.btnState.success">Import Anki Text File<span class="ti-import ml1"></span></span>\n					<span ng-if="import.btnState.loading"><spinner width="16px"></spinner>Please wait...</span>\n					<span ng-if="import.btnState.success"><span class="ti-check mr1"></span>Success!</span>\n				</button>\n				<!-- end: submit button -->\n\n			</form>\n\n		</div>\n\n	</div>\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/collections.tpl.html",'<div class="clearfix">\n\n	<h1 class="mt1 center">My Collections</h1>\n\n	<div class="md-col-10 lg-col-8 mx-auto px2 mt3">\n\n		<!-- collection list -->\n		<div class="clearfix bg-white rounded p1 mb2 ng-animation-fadeInUp" ng-repeat="collection in collections.collectionList | orderBy: \'id\'">\n\n			<div class="sm-col sm-col-7">\n				<div class="btn btn-md bold m1" style="cursor: text">{{ collection.title }} <span class="gray">(due: {{ collection.dueWordCount }}, new: {{ collection.newWordCount }} )</span></div>\n			</div>\n\n			<div class="sm-col sm-col-5 flex flex-wrap">\n				<a ui-sref="mainApp.review-words({ collectionId: collection.id })" class="btn btn-md btn-primary flex-auto center m1 h5">Study<span class="ti-arrow-right ml1"></span></a>\n				<a ui-sref="mainApp.add-words({ collectionId: collection.id })" class="btn btn-md btn-blue-outline center dark-gray m1 h5" tooltips title="Add Words" tooltip-placement="top"><span class="ti-plus"></span></a>\n				<a ui-sref="mainApp.list-words({ collectionId: collection.id, collectionTitle: collection.title })" class="btn btn-md btn-blue-outline center dark-gray m1 h5" tooltips title="View All Words" tooltip-placement="top"><span class="ti-folder"></span></a>\n			</div>\n\n		</div>\n		<!-- end: collection list -->\n\n		<!-- add collection -->\n		<div class="clearfix bg-light-green px2 py2 mt3 rounded">\n\n			<div class="center">\n				<div class="caps bold m1">Add Collection</div>\n			</div>\n\n			<form name="collections.addCollectionForm" \n						ng-submit="collections.createCollection(collections.addCollectionForm.$valid, { \n							userId: collections.user.id,\n							title: collections.formData.collectionTitle \n						})"\n						novalidate>\n\n				<div class="sm-col sm-col-8 p1">\n					<input name="collectionTitle" type="text" ng-model="collections.formData.collectionTitle" class="field col-12" placeholder="{{ collections.placeholder.collectionTitle }}" required>\n\n					<!-- error handling -->\n					<div ng-messages="collections.addCollectionForm.collectionTitle.$error" \n							 ng-if="collections.addCollectionForm.$submitted && collections.addCollectionForm.collectionTitle.$touched" \n							 class="red bold h6 mt1">\n						<div ng-message="required"><span class="ti-alert mr1"></span>This field is required</div>\n					</div>\n					<!-- end: error handling -->\n				</div>\n\n				<!-- submit button -->\n				<div class="sm-col sm-col-4 p1">\n					<button type="submit" class="btn btn-form btn-green col-12" ng-disabled="collections.btnState.success || collections.btnState.loading">\n						<span ng-if="!collections.btnState.loading && !collections.btnState.success">Add Collection</span>\n						<span ng-if="collections.btnState.loading"><spinner width="16px"></spinner>Please wait...</span>\n						<span ng-if="collections.btnState.success"><span class="ti-check mr1"></span>Success!</span>\n					</button>\n				</div>\n				<!-- end: submit button -->\n\n			</form>\n		</div>\n		<!-- end: add collection -->\n\n	</div>\n\n</div>\n')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("main-app/add-words.tpl.html",'<div class="container">\n	<div class="clearfix">\n\n		<h1 class="mt1 mb3 center">Add New Words</h1>\n\n		<!-- add words form -->\n		<div class="md-col md-col-6 px2">\n\n			<form name="addWords.addWordForm" \n						ng-submit="addWords.addWord(addWords.addWordForm.$valid, addWords.formData)"\n						novalidate>\n\n				<div class="mb1 bold">WORD</div>\n				<input name="word" type="text" ng-model="addWords.formData.word" ng-blur="addWords.getDefinition(addWords.formData.word)" class="field col-12" placeholder="{{ addWords.placeholder.word }}" autofocus required>\n\n				<!-- error handling -->\n				<div ng-messages="addWords.addWordForm.word.$error" \n						 ng-if="addWords.addWordForm.$submitted && addWords.addWordForm.word.$touched" \n						 class="red bold h6 mt1">\n					<div ng-message="required"><span class="ti-alert mr1"></span>This field is required</div>\n				</div>\n				<!-- end: error handling -->\n\n				<div class="mb1 mt2 bold">MEANING</div>\n				<textarea name="definition" ng-model="addWords.formData.definition" class="field col-12" style="height: 160px;" placeholder="{{ addWords.placeholder.definition }}" required></textarea>\n\n				<!-- error handling -->\n				<div ng-messages="addWords.addWordForm.definition.$error" \n						 ng-if="addWords.addWordForm.$submitted && addWords.addWordForm.definition.$touched" \n						 class="red bold h6">\n					<div ng-message="required"><span class="ti-alert mr1"></span>This field is required</div>\n				</div>\n				<!-- end: error handling -->\n\n				<div class="flex flex-justify">\n					<button ng-click="addWords.resetForm()" class="btn btn-outline mt2 mb2">Reset Form</button>\n					\n					<!-- submit button -->\n					<button type="submit" class="btn btn-primary mt2 mb2" ng-disabled="addWords.btnState.success || addWords.btnState.loading">\n						<span ng-if="!addWords.btnState.loading && !addWords.btnState.success"><span class="ti-plus mr1"></span>Add Word</span>\n						<span ng-if="addWords.btnState.loading"><spinner width="16px"></spinner>Please wait...</span>\n						<span ng-if="addWords.btnState.success"><span class="ti-check mr1"></span>Success!</span>\n					</button>\n					<!-- end: submit button -->\n				</div>\n\n			</form>\n\n		</div>\n		<!-- end: add words form -->\n\n		<!-- definitions from dictionary API -->\n		<div class="md-col md-col-6 px2">\n\n			<div class="bold gray mb2">Word definitions from <span class="italic">The American Heritage® Dictionary of the English Language, 4th Edition</span></div>\n\n			<div class="bg-light-green rounded p2 mb2 near-black ng-animation-fadeInUp" ng-repeat="definition in addWords.definitions">\n				<div class="flex flex-center">\n					<div class="flex-none" style="width: 52px">\n						<a ng-click="addWords.copyDefinition(definition.text)" class="btn btn-sm btn-green-outline" tabindex="-1"><span class="ti-check"></span></a>\n					</div>\n					<div class="h5">{{ definition.text }}</div>\n				</div>\n			</div>\n\n		</div>\n		<!-- definitions from dictionary API -->\n\n	</div>\n</div>\n')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("home/root.tpl.html",'<div ui-view="nav-home"></div>\n<div ui-view></div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("home/nav-home.tpl.html",'<div class="fixed white border-bottom border-lighten-2" style="width: 100%">\n	<div class="container">\n		<div class="flex flex-center">\n			<a class="btn btn-sm" ui-sref="root.home">\n				<img src="../images/logo/bigvocab-logo-white.svg" width="50px" />\n			</a>\n\n			<div class="flex-auto"></div>\n\n			<div>\n\n				<!-- nav items -->\n				<a ui-sref="root.home" ng-click="navHome.setActive(\'home\')" class="btn btn-narrow btn-text py2 h6" ng-class="{\'bold muted-0\': navHome.active === \'home\'}">Home</a>\n				<a ui-sref="root.features" ng-click="navHome.setActive(\'features\')" class="btn btn-narrow btn-text py2 h6" ng-class="{\'bold muted-0\': navHome.active === \'features\'}">How it works</a>\n				<a ui-sref="root.about" ng-click="navHome.setActive(\'about\')" class="btn btn-narrow btn-text py2 h6" ng-class="{\'bold muted-0\': navHome.active === \'about\'}">About</a>\n				<!-- end: nav items -->\n\n				<!-- login button -->\n				<a href="/auth/google" ng-if="!navHome.user" class="btn btn-outline btn-sm ml2 mr2 py2 h6">Login&nbsp;&rarr;</a>\n				<!-- end: login button -->\n\n			</div>\n		</div>\n	</div>\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("home/home.tpl.html",'<div class="bg-cover bg-gradient-home">\n\n	<div class="flex flex-center" style="min-height: 100vh;">\n		<div class="container flex-auto">\n			<div class="clearfix">\n\n				<div class="sm-col-6 p2 mx-auto white center">\n					<div class="h1 light">Big Vocab</div>\n					<p>Big Vocab uses a method called Spaced Repetition to improve word recall. Think of it as a virtual flash card that\'s optimized to help you remember more words.</p>\n					<a ui-sref="root.auth.register" class="btn btn-red">Sign Up</a>&nbsp;&nbsp;\n					<a href="/auth/google" class="btn btn-outline">Login</a>\n				</div>\n\n			</div>\n		</div>\n	</div>\n\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("common/spinner-directive.tpl.html",'<img src="../images/spinner/oval-sm.svg" class="mr1" width="{{ width }}">')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("common/modal-directive.tpl.html",'<!-- overlay -->\n<div class="fixed z2 top-0 right-0 bottom-0 left-0 bg-darken-1">\n</div>\n<!-- end: overlay -->\n\n<div class="relative z3 flex flex-center">\n	<div class="sm-col-10 md-col-6 mx-auto {{ modalBg }}">\n		\n		<!-- close button -->\n		<div>\n			<span class="ti-close h4 right white mb2"></span>	\n		</div>\n		<!-- end: close button -->\n\n		<!-- content -->\n		<div ng-transclude></div>\n		<!-- end: content -->\n\n	</div>\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("auth/register.tpl.html",'<div class="bg-cover bg-gradient-navy">\n\n	<div class="flex flex-center" style="min-height: 100vh">\n		<div class="container-sm flex-auto">\n			<div class="clearfix white">\n\n				<div class="sm-col sm-col-8 px2 mb3">\n					<div class="h2 light mb2">Sign Up</div>\n					<a href="/auth/google" class="btn btn-primary">Sign up with Your Google Account</a>\n				</div>\n\n				<div class="sm-col sm-col-4 px2">\n					<div class="border border-lighten-3 p2">\n						<p>Already have an account?</p>\n						<a href="/auth/google" class="btn btn-outline block">Login with Google</a>\n					</div>\n				</div>\n\n			</div>\n		</div>\n	</div>\n\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("auth/login.tpl.html",'<div class="bg-cover bg-gradient-navy">\n\n	<div class="flex flex-center" style="min-height: 100vh;">\n		<div class="container flex-auto">\n			<div class="clearfix">\n\n				<div class="sm-col-6 p2 mx-auto white center">\n					<div class="h1 light mb2">Login to Big Vocab</div>\n					<a href="/auth/google" class="btn btn-red">Login with Google</a>\n				</div>\n\n			</div>\n		</div>\n	</div>\n\n</div>')}]),angular.module("bigvocab").run(["$templateCache",function(n){n.put("auth/auth.tpl.html",'<div ui-view="root.nav-home"></div>\n<div ui-view></div>')}]),function(){angular.module("mainApp",["ui.router"])}(),function(){function n(n){var t={};return t.getAll=function(t){return n.get("/api/words/"+t)},t.create=function(t){return n.post("/api/words",t)},t.get=function(t){return n.get("/api/words/"+t)},t.getDue=function(t){return n.get("/api/words/"+t+"/?filter=dueToday")},t.update=function(t,e){return n.put("/api/words/"+t,e)},t["delete"]=function(t){return n["delete"]("/api/words/"+t)},t}angular.module("mainApp").factory("WordsService",n),n.$inject=["$http"]}(),function(){var n=function t(){_classCallCheck(this,t);var n=this;n.ctrlName="TestWordsCtrl"};angular.module("mainApp").controller("TestWordsCtrl",n)}(),function(){var n=function t(){_classCallCheck(this,t);var n=this;n.toggle=!1,n.toggleSidebar=function(){n.toggle=!n.toggle},n.navItems=[{id:1,title:"Collections",icon:"ti-layers-alt",link:"mainApp.collections"},{id:2,title:"Test",icon:"ti-check-box",link:"mainApp.test-words"},{id:3,title:"Import",icon:"ti-import",link:"mainApp.import"},{id:4,title:"Log Out",icon:"ti-arrow-left",link:"mainApp.logout"}]};angular.module("mainApp").controller("SidebarCtrl",n)}(),function(){var n=function t(n,e,o,i,a,l,r,s){function c(n){void 0!==n&&l.getPronunciation(a.forvoKey,n).then(function(n){console.log(n);var t=angular.fromJson(n).data;d.pronunciation=0!==t.attributes.total?s.load(t.items[0].pathmp3):null})["catch"](function(n){console.log("Something went wrong; ",n)})}_classCallCheck(this,t);var d=this,u=e.collectionId;d.wordCounter=0,d.showAnswer=!1,n.getDue(u).then(function(n){d.words=angular.fromJson(n).data,d.totalWordsCount=d.words.length,d.currentWord=d.words[d.wordCounter],c(d.currentWord.word)})["catch"](function(n){console.log("Something went wrong: ",n)}),d.toggleAnswer=function(){d.showAnswer=!d.showAnswer},d.playPronunciation=function(){d.pronunciation.play()},d.submitRes=function(t,e){var a=i.calcEaseFactor(t.easeFactor,e),l=i.calcPhase(t.phase,t.interval,e),r=i.calcInterval(t.phase,t.interval,t.easeFactor,e),s=o(),u=s.unix(),m=i.calcNextReview(r),p=m.unix(),g=angular.copy(t.reviewRes);g[e]++;var v={reviewRes:g,lastReviewedEpochTime:u,easeFactor:a,phase:l,interval:r,nextReviewEpochTime:p};n.update(t.id,v).then(function(){d.wordCounter++,d.currentWord=d.words[d.wordCounter],d.toggleAnswer(),c(d.currentWord.word)})["catch"](function(n){console.log("Something went wrong: ",n),d.toggleAnswer()})}};n.$inject=["WordsService","$stateParams","$moment","Sm2Service","ConfigService","DictionaryService","$sce","ngAudio"],angular.module("mainApp").controller("ReviewWordsCtrl",n)}(),function(){function n(n){n.state("mainApp",{"abstract":!0,url:"/main-app",views:{"":{templateUrl:"main-app/main-app.tpl.html"},"sidebar@mainApp":{templateUrl:"main-app/sidebar.tpl.html",controller:"SidebarCtrl",controllerAs:"sidebar"}},resolve:{user:["AuthService",function(n){return n.checkLoggedIn()}]}}).state("mainApp.collections",{url:"/collections",templateUrl:"main-app/collections.tpl.html",controller:"CollectionsCtrl",controllerAs:"collections"}).state("mainApp.add-words",{url:"/collections/:collectionId/add-words",templateUrl:"main-app/add-words.tpl.html",controller:"AddWordsCtrl",controllerAs:"addWords"}).state("mainApp.review-words",{url:"/collections/:collectionId/review-words",templateUrl:"main-app/review-words.tpl.html",controller:"ReviewWordsCtrl",controllerAs:"reviewWords"}).state("mainApp.list-words",{url:"/collections/:collectionId/list-words",templateUrl:"main-app/list-words.tpl.html",controller:"ListWordsCtrl",controllerAs:"listWords",params:{collectionTitle:null}}).state("mainApp.test-words",{url:"/test-words",templateUrl:"main-app/test-words.tpl.html",controller:"TestWordsCtrl",controllerAs:"testWords"}).state("mainApp.logout",{url:"/logout",templateUrl:"main-app/logout.tpl.html",controller:"LogoutCtrl",controllerAs:"logout"}).state("mainApp.import",{url:"/import",templateUrl:"main-app/import.tpl.html",controller:"ImportCtrl",controllerAs:"import"})}angular.module("mainApp").config(n),n.$inject=["$stateProvider"]}(),function(){var n=function t(n,e){_classCallCheck(this,t);var o=this;o.logout=function(){n.logout().then(function(){console.log("User logged out successfully"),e.location="/#/home"})["catch"](function(n){console.log("Something went wrong: ",n)})},o.goBack=function(){e.history.go(-1)}};n.$inject=["AuthService","$window"],angular.module("mainApp").controller("LogoutCtrl",n)}(),function(){var n=function t(n,e){_classCallCheck(this,t);var o=this;o.collectionTitle=n.collectionTitle;var i=n.collectionId;e.getAll(i).then(function(n){console.log(angular.fromJson(n).data),o.words=angular.fromJson(n).data})["catch"](function(n){console.log("Something went wrong: ",n)})};n.$inject=["$stateParams","WordsService"],angular.module("mainApp").controller("ListWordsCtrl",n)}(),function(){var n=function t(n,e,o,i){function a(t,e){l.btnState.loading=!0,n.anki(t,e).then(function(n){l.btnState.loading=!1,l.btnState.success=!0;angular.fromJson(n).data;o(function(){l.btnState.success=!1,i.location.href="/#/main-app/collections"},1500)})["catch"](function(n){l.btnState.loading=!1,console.log("Something went wrong: ",n)})}_classCallCheck(this,t);var l=this;l.formData={},l.btnState={loading:!1,success:!1},l.placeholder={files:"Click to upload anki text files",collectionTitle:"Add collection title here"},l.importTextfile=function(n,t){n&&a(e.id,t)}};n.$inject=["ImportService","user","$timeout","$window"],angular.module("mainApp").controller("ImportCtrl",n)}(),function(){function n(n){var t={};return t.getAll=function(t){return n.get("/api/collections/"+t)},t.create=function(t){return n.post("/api/collections",t)},t.get=function(t){return n.get("/api/collections/"+t)},t.update=function(t,e){return n.put("/api/collections/"+t,e)},t["delete"]=function(t){return n["delete"]("/api/collections/"+t)},t}angular.module("mainApp").factory("CollectionsService",n),n.$inject=["$http"]}(),function(){var n=function t(n,e,o,i){function a(){n.getAll(i.id).then(function(n){l.collectionList=angular.fromJson(n).data})["catch"](function(n){console.log("Something went wrong: ",n)})}_classCallCheck(this,t);var l=this;l.formData={},l.placeholder={collectionTitle:"Enter Collection name here"},l.btnState={loading:!1,success:!1},l.user=i,a(),l.createCollection=function(t,e){t&&(l.btnState.loading=!0,n.create(e).then(function(n){l.btnState.loading=!1,l.btnState.success=!0,a(),o(function(){l.btnState.success=!1},1500)})["catch"](function(n){l.btnState.loading=!1,console.log("Something went wrong: ",n)}))}};n.$inject=["CollectionsService","WordsService","$timeout","user"],angular.module("mainApp").controller("CollectionsCtrl",n)}(),function(){var n=function t(n,e,o,i,a,l){function r(n){c.btnState.loading=!0,c.definitions=[],o.create(n).then(function(n){c.btnState.loading=!1,c.btnState.success=!0,a(function(){c.btnState.success=!1},1500)})["catch"](function(n){c.btnState.loading=!1,console.log("Something went wrong: ",n)})}function s(){c.addWordForm.word.$touched=!1,c.addWordForm.definition.$touched=!1,c.addWordForm.$submitted=!1,c.formData={}}_classCallCheck(this,t);var c=this;c.formData={},c.placeholder={word:"i.e. audacious",definition:"i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave."},c.btnState={loading:!1,success:!1};var d=i.collectionId;c.getDefinition=function(t){void 0!==t&&e.getDefinition(n.mashapeKey,t).then(function(n){c.definitions=n.data.definitions})["catch"](function(n){console.log("Something went wrong; ",n)})},c.addWord=function(n,t){if(n){var e=l(),o=e.unix(),i=l().add(1,"minutes"),a=i.unix(),c={word:t.word,definition:t.definition,collectionId:d,lastReviewedEpochTime:o,interval:1,nextReviewEpochTime:a,phase:"learning",reviewRes:{again:0,hard:0,good:0,easy:0},easeFactor:2.5};r(c),s()}},c.copyDefinition=function(n){c.formData.definition=n},c.resetForm=function(){s()}};n.$inject=["ConfigService","DictionaryService","WordsService","$stateParams","$timeout","$moment"],angular.module("mainApp").controller("AddWordsCtrl",n)}(),function(){angular.module("home",["ui.router"])}(),function(){var n=function t(n,e){_classCallCheck(this,t);var o=this;o.user=!1,o.setActive=function(n){o.active=n},n.isLoggedIn().then(function(n){n.data!==!1&&(o.user=!0,e.location="/#/main-app/collections"),console.log("Logged in?",o.user)})["catch"](function(n){console.log("Something went wrong: ",n)})};n.$inject=["AuthService","$window"],angular.module("home").controller("NavHomeCtrl",n)}(),function(){function n(n){n.state("root",{"abstract":!0,views:{"":{templateUrl:"home/root.tpl.html"},"nav-home@root":{templateUrl:"home/nav-home.tpl.html",controller:"NavHomeCtrl",controllerAs:"navHome"}}}).state("root.home",{url:"/home",templateUrl:"home/home.tpl.html",controller:"HomeCtrl",controllerAs:"home"})}angular.module("home").config(n),n.$inject=["$stateProvider"]}(),function(){var n=function t(){_classCallCheck(this,t);var n=this;n.ctrlName="HomeCtrl"};angular.module("home").controller("HomeCtrl",n)}(),function(){angular.module("common",[])}(),function(){function n(){return{restrict:"EA",scope:{},templateUrl:"common/spinner-directive.tpl.html",replace:!0,link:function(n,t,e){n.width=e.width}}}angular.module("common").directive("spinner",n)}(),function(){function n(n){var t={};return t.calcEaseFactor=function(n,t){var e=n,o=void 0,i=1.3;switch(t){case"again":o=e-.2,o=i>o?i:o;break;case"hard":o=e-.15,o=i>o?i:o;break;case"good":o=e;break;case"easy":o=e+.15}return o},t.calcPhase=function(n,t,e){if("again"===e)return"learning";if("learning"===n){if(1===t)return"learning";if(10===t)return"review"}return"review"===n?"review":void 0},t.calcInterval=function(n,t,e,o){if("again"===o)return 1;if("learning"===n)switch(t){case 1:return 10;case 10:return 5760}else if("review"===n)return t*e},t.calcNextReview=function(t){return n().add(t,"minutes")},t}angular.module("common").factory("Sm2Service",n),n.$inject=["$moment"]}(),function(){function n(){return{restrict:"EA",scope:{yesCb:"&",noCb:"&"},templateUrl:"common/modal-directive.tpl.html",replace:!1,transclude:!0,link:function(n,t,e){n.modalBg=e.modalBg||"",void 0===n.yesCb&&void 0===n.noCb}}}angular.module("common").directive("modal",n)}(),function(){function n(n){var t={};return t.anki=function(t,e){return n.post("/api/import/anki/"+t,e)},t}angular.module("common").factory("ImportService",n),n.$inject=["$http"]}(),function(){function n(){return{restrict:"A",
scope:{fileread:"="},replace:!1,link:function(n,t,e){t.bind("change",function(t){n.fileread=[];for(var e=t.target.files,o=0,i=void 0;i=e[o];o++){var a=new FileReader;a.onload=function(t){return function(e){n.$apply(function(){n.fileread.push({name:t.name,content:e.target.result})})}}(i),a.readAsText(i)}})}}}angular.module("common").directive("fileread",n)}(),function(){function n(n){var t={};return t.getDefinition=function(t,e){return n.get("https://montanaflynn-dictionary.p.mashape.com/define?word="+e,{headers:{"X-Mashape-Key":t}})},t.getPronunciation=function(t,e){return n.jsonp("http://apifree.forvo.com/action/word-pronunciations/format/json/word/"+e+"/language/en/order/rate-desc/limit/1/key/"+t+"?callback=JSON_CALLBACK")},t}angular.module("common").factory("DictionaryService",n),n.$inject=["$http"]}(),function(){function n(){var n={};return n.mashapeKey="S4DvXSr43Cmsh5Kww0kOuX9QxNbXp1hjhkYjsn84TFraf8SlG3",n.forvoKey="f850390038cd293954cb5bdf7dc36d8a",n}angular.module("common").factory("ConfigService",n)}(),function(){angular.module("auth",["ui.router"])}(),function(){var n=function t(){_classCallCheck(this,t);var n=this;n.ctrlName="RegisterCtrl"};angular.module("auth").controller("RegisterCtrl",n)}(),function(){var n=function t(){_classCallCheck(this,t);var n=this;n.ctrlName="LoginCtrl"};angular.module("auth").controller("LoginCtrl",n)}(),function(){function n(n,t,e,o){var i={};return i.isLoggedIn=function(){return t.get("/auth/loggedin")},i.checkLoggedIn=function(){var n=e.defer();return t.get("/auth/loggedin").then(function(t){var t=angular.fromJson(t).data;t!==!1?n.resolve(t):(n.reject(),o.location="/#/login")})["catch"](function(t){n.reject(),o.location="/#/",console.log("Something went wrong: ",t)}),n.promise},i.logout=function(){return t.get("/auth/logout")},i}angular.module("auth").factory("AuthService",n),n.$inject=["ConfigService","$http","$q","$window"]}(),function(){function n(n){n.state("root.auth",{"abstract":!0,views:{"":{templateUrl:"auth/auth.tpl.html"}}}).state("root.auth.login",{url:"/login",templateUrl:"auth/login.tpl.html",controller:"LoginCtrl",controllerAs:"login"}).state("root.auth.register",{url:"/register",templateUrl:"auth/register.tpl.html",controller:"RegisterCtrl",controllerAs:"register"}).state("root.auth.logout",{url:"/logout",templateUrl:"auth/logout.tpl.html",controller:"LogoutCtrl",controllerAs:"logout"})}angular.module("auth").config(n),n.$inject=["$stateProvider"]}(),function(){function n(n){n.otherwise("/home")}angular.module("bigvocab").config(n),n.$inject=["$urlRouterProvider"]}();
//# sourceMappingURL=app-b5f4ab6b.js.map