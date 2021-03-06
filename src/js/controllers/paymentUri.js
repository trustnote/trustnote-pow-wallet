'use strict';
angular.module('trustnoteApp.controllers').controller('paymentUriController',
  function($rootScope, $stateParams, $location, $timeout, profileService, configService, lodash, bitcore, go) {

    function strip(number) {
      return (parseFloat(number.toPrecision(12)));
    };

    // Build bitcoinURI with querystring
    this.checkBitcoinUri = function() {
      var query = [];
      angular.forEach($location.search(), function(value, key) {
        query.push(key + "=" + value);
      });
      var queryString = query ? query.join("&") : null;
      this.bitcoinURI = $stateParams.data + (queryString ? '?' + queryString : '');

      var URI = bitcore.URI;
      var isUriValid = URI.isValid(this.bitcoinURI);
      if (!URI.isValid(this.bitcoinURI)) {
        this.error = true;
        return;
      }
      var uri = new URI(this.bitcoinURI);

      if (uri && uri.address) {
        var config = configService.getSync().wallet.settings;
        var unitValue = config.unitValue;
        var unitName = config.unitName;

        if (uri.amount) {
          uri.amount = strip(uri.amount / unitValue) + ' ' + unitName;
        }
        uri.network = uri.address.network.name;
        this.uri = uri;
      }
    };

    this.getWallets = function(network) {
      return profileService.getWallets(network);
    };

    this.selectWallet = function(wid) {
      var self = this;
      if (wid != profileService.focusedClient.credentials.walletId) {
        profileService.setAndStoreFocus(wid, true, function() {});
      }
      go.send();
      $timeout(function() {
        $rootScope.$emit('paymentUri', self.bitcoinURI);
      }, 100);
    };
  });
