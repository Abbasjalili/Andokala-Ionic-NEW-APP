/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Directive, HostListener, Input, ElementRef } from "@angular/core";
import { InAppBrowser } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { Platform } from "@ionic/angular";
import { ActionSheetController } from "@ionic/angular";
import { Component } from "@angular/core";

@Directive({
	selector: "[socialSharing]"
})

export class SocialSharingDirective {

	@Input() url: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser,
		private platform: Platform,
		private actionSheetController: ActionSheetController
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.share();
	}



	/**
	* share()
	**/
	
	async share(){
		let url = this.url || "";
		
		const actionSheet = await this.actionSheetController.create({
			header: "Social Sharing",
			buttons: [
				{
					text: "WhatsApp",
					icon: "logo-whatsapp",
					handler: ()=>{
						let urlSchema = "https://api.whatsapp.com/send?phone=&text=" + encodeURIComponent(url) ;
						this.inAppBrowser.create(urlSchema,"_system");
					}
				},
				{
					text: "Facebook",
					icon: "logo-facebook",
					handler: ()=>{
						let urlSchema = "https://facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
						if (this.platform.is("android")){
							urlSchema = "fb://faceweb/f?href=https://facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) ;
						}
						if (this.platform.is("ios")){
							urlSchema = "fbapi20130214://dialog/share?app_id=966242223397117&version=20130410&method_args=%7B%22name%22%3Anull%2C%22description%22%3Anull%2C%22link%22%3A%22" + encodeURIComponent(url) + "%22%7D" ;
						}
						this.inAppBrowser.create(urlSchema,"_system");
					}
				},
				{
					text: "Twitter",
					icon: "logo-twitter",
					handler: ()=>{
						let urlSchema = "twitter://post?message=" + encodeURIComponent(url) ;
						this.inAppBrowser.create(urlSchema,"_system");
					}
				},
				{
					text: "Telegram",
					icon: "paper-plane",
					handler: ()=>{
						let urlSchema = "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=";
						this.inAppBrowser.create(urlSchema,"_system");
					}
				},
				{
					text: "Line",
					icon: "chatbubbles",
					handler: ()=>{
						let urlSchema = "line://msg/text/" + encodeURIComponent(url) ;
						this.inAppBrowser.create(urlSchema,"_system");
					}
				},
				{
					text: "Email",
					icon: "mail",
					handler: ()=>{
						let urlSchema = "mailto:?subject=&body=" + url;
						this.inAppBrowser.create(urlSchema,"_system");
					}
				},
				{
					text: "SMS",
					icon: "send",
					handler: ()=>{
						let urlSchema;
						if (this.platform.is("ios")){
							urlSchema = "sms:;?&body=" + encodeURIComponent(url);
						}else{
							urlSchema = "sms:?body=" + encodeURIComponent(url);
						}
						this.inAppBrowser.create(urlSchema,"_system");
					}
				},
			]
		});
		await actionSheet.present();
	}



}
