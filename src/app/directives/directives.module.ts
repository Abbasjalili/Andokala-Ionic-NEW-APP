/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { NgModule } from "@angular/core";

import { AppBrowserDirective } from "./app-browser/app-browser.directive";
import { AppStoreDirective } from "./app-store/app-store.directive";
import { AppWebviewDirective } from "./app-webview/app-webview.directive";
import { CallAppDirective } from "./call-app/call-app.directive";
import { ContactUsDirective } from "./contact-us/contact-us.directive";
import { CordovaWebviewDirective } from "./cordova-webview/cordova-webview.directive";
import { FacebookAppDirective } from "./facebook-app/facebook-app.directive";
import { GeoAppDirective } from "./geo-app/geo-app.directive";
import { GooglePlayAppDirective } from "./google-play-app/google-play-app.directive";
import { ImageZoomDirective } from "./image-zoom/image-zoom.directive";
import { LineAppDirective } from "./line-app/line-app.directive";
import { MailAppDirective } from "./mail-app/mail-app.directive";
import { SmsAppDirective } from "./sms-app/sms-app.directive";
import { SocialSharingDirective } from "./social-sharing/social-sharing.directive";
import { SystemBrowserDirective } from "./system-browser/system-browser.directive";
import { TwitterAppDirective } from "./twitter-app/twitter-app.directive";
import { WhatsappAppDirective } from "./whatsapp-app/whatsapp-app.directive";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";

@NgModule({
	declarations: [
		AppBrowserDirective,
		AppStoreDirective,
		AppWebviewDirective,
		CallAppDirective,
		ContactUsDirective,
		CordovaWebviewDirective,
		FacebookAppDirective,
		GeoAppDirective,
		GooglePlayAppDirective,
		ImageZoomDirective,
		LineAppDirective,
		MailAppDirective,
		SmsAppDirective,
		SocialSharingDirective,
		SystemBrowserDirective,
		TwitterAppDirective,
		WhatsappAppDirective
	],
	imports: [],
	exports: [
		AppBrowserDirective,
		AppStoreDirective,
		AppWebviewDirective,
		CallAppDirective,
		ContactUsDirective,
		CordovaWebviewDirective,
		FacebookAppDirective,
		GeoAppDirective,
		GooglePlayAppDirective,
		ImageZoomDirective,
		LineAppDirective,
		MailAppDirective,
		SmsAppDirective,
		SocialSharingDirective,
		SystemBrowserDirective,
		TwitterAppDirective,
		WhatsappAppDirective
	],
	providers: [
		InAppBrowser
	]
})

export class DirectivesModule {}
