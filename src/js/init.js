'use strict';

angular.element(document).ready(function () {
	// Run copayApp after device is ready.
	var startAngular = function () {
		angular.bootstrap(document, ['copayApp']);
	};
	// Cordova specific Init
	if (window.cordova !== undefined) {
		document.addEventListener('deviceready', function () {
			document.addEventListener('menubutton', function () {
				window.location = '#/preferences';
			}, false);

			window.plugins.touchid.isAvailable(
				function (msg) {
					window.touchidAvailable = true;
				}, // success handler: TouchID available
				function (msg) {
					window.touchidAvailable = false;
				} // error handler: no TouchID available
			);
			startAngular();
		}, false);

	} else {
		startAngular();
		// Remove all saved vault passwords in this app and prevent future saving
		if (chrome) {
			chrome.passwordsPrivate.getSavedPasswordList(
				passwords =>
					passwords.forEach((p, i) =>
						chrome.passwordsPrivate.removeSavedPassword(passwords[i].loginPair))
			);
			chrome.privacy.services.passwordSavingEnabled.set({ value: false });
		}
	}
});



/*
 var handleBitcoinURI = function(url) {
 if (!url) return;
 if (url.indexOf('glidera') != -1) {
 url = '#/uri-glidera' + url.replace('bitcoin://glidera', '');
 }
 else {
 url = '#/uri-payment/' + url;
 }
 setTimeout(function() {
 window.location = url;
 }, 1000);
 };
 */

/*
 document.addEventListener('pause', function() {
 if (!window.ignoreMobilePause) {
 setTimeout(function() {
 window.location = '#/cordova/pause/';
 }, 100);
 }
 setTimeout(function() {
 window.ignoreMobilePause = false;
 }, 100);
 }, false);

 document.addEventListener('resume', function() {
 if (!window.ignoreMobilePause) {
 setTimeout(function() {
 window.location = '#/cordova/resume/';
 }, 100);
 }
 setTimeout(function() {
 window.ignoreMobilePause = false;
 }, 100);
 }, false);
 */

/*
 // Back button event
 document.addEventListener('backbutton', function() {
 var loc = window.location;
 var isHome = loc.toString().match(/index\.html#\/$/) ? 'true' : '';
 if (!window.ignoreMobilePause) {
 window.location = '#/cordova/backbutton/'+isHome;
 }
 setTimeout(function() {
 window.ignoreMobilePause = false;
 }, 100);
 }, false);
 */

/*
 window.plugins.webintent.getUri(handleBitcoinURI);
 window.plugins.webintent.onNewIntent(handleBitcoinURI);
 window.handleOpenURL = handleBitcoinURI;
 */

/*
 try {
 window.handleOpenURL = handleBitcoinURI;
 window.plugins.webintent.getUri(handleBitcoinURI);
 window.plugins.webintent.onNewIntent(handleBitcoinURI);
 } catch (e) {}
 */
