exports.checkNanoAddress = function (address) {
    return /^(xrb_|nano_)[13][13-9a-km-uw-z]{59}$/.test(address)
}

exports.checkHash = function(hash){
    if (/^([0-9A-F]){64}$/i.test(hash)) {
        return true
      } else {
        return false
      }
}