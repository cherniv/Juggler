import {
	Platform,
	Dimensions,
} from 'react-native';

var {width, height} = Dimensions.get('window');
if (window.location && location.href.indexOf('localhost') >= 0 && Platform.OS == 'web') width = 1024;
var OS = Platform.OS;
var device = Platform.OS;
var version = Platform.Version;
var isIos = OS == 'ios';
var isAndroid = OS == 'android';
var isWeb = OS == 'web';
var isSmall = width < 768;
var isMedium = width >= 768 && width < 1024;
var isBig = !isSmall;// && !isMedium;
var isMobileApp = isAndroid || isIos;
var isMobileWeb = (isWeb && isSmall);
var isMobile = isMobileApp || isMobileWeb;
var mobileOrWeb = isMobile ? 'mobile' : 'web' ;
var isDesktop = isBig && isWeb;
var select = (obj) => ( isMobileWeb && obj.mobileWeb || isMobileApp && obj.mobile || isSmall && obj.mobile || isDesktop && obj.desktop) || obj[OS];
var Device = {
	OS,
	isAndroid,
	isIos,
	select,
	isMobileApp,
	isMobile,
	isWeb,
	width,
	height,
	device,
	mobileOrWeb,
	isSmall,
	isMedium,
	isBig,
	isDesktop,
	version,
}
console.log('Device', Device)
module.exports = Device;