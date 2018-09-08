import React from 'react';
import {
  PixelRatio,
} from 'react-native'
import Device, {isAndroid, isWeb, isIos} from 'utils/Device'
var pixelRatio = PixelRatio.get();

console.log('PIXEL RATIO: ', pixelRatio);

module.exports = (size) => {
	var n;
    if (pixelRatio == 1) {
        if (Device.isWeb) n = size * 1.3; 
        else n = size;
    } else if (pixelRatio == 1.5) {
        n =  size * 1.2;
    } else if (pixelRatio == 2) {
        // WAS:
        //n =  size * (isAndroid ? 1 : isIos ? 1.5 : 1.3);
        // Moto G (Android 6.0) requires 1.2: 
        n =  size * (isAndroid ? 1.3 : isIos ? 1.5 : 1.3);
    } else if (pixelRatio == 3) {
        n = size * 1.4;
    } else if (pixelRatio == 4) { // samsung galaxy 7
        n = size * 1.2;
    } else if (pixelRatio == 2.625) { // google nexus 5x
        n = size * 1.5;
    } else {
        n = size ;
    }

    

    n = Math.floor(n);
        /*
    if (isAndroid) {
        n = Math.ceil(n);
    } else { 
        n = parseFloat(n.toFixed(2));
    }
    */

    //  n =   PixelRatio.roundToNearestPixel(size);

    return n;
}