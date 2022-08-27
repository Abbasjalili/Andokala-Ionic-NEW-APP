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
import { InAppBrowserOptions } from "@awesome-cordova-plugins/in-app-browser/ngx";

@Directive({
	selector: "[googlePlayApp]"
})

export class GooglePlayAppDirective {

	@Input() appId: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runGooglePlayApp(this.appId);
	}


	
	/**
	* runGooglePlayApp($appId)
	* @param string $appId = "com.imabuilder.myapp"
	**/
	
	private runGooglePlayApp(app_id: string){
		let myAppID = app_id || "com.imabuilder.alphabetasigma.andokala";
		if(myAppID == ""){
			myAppID = "com.imabuilder.alphabetasigma.andokala";
		}
		let urlSchema = "market://details?id=" + myAppID;
		this.inAppBrowser.create(urlSchema,"_system");
	}
	


}
