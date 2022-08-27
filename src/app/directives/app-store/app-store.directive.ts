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
	selector: "[appStore]"
})

export class AppStoreDirective {

	@Input() appURL: string;

	constructor( 
		private elementRef: ElementRef,
		private inAppBrowser: InAppBrowser
	 ){


	}






	@HostListener("click", ["$event"]) onClick(e){
		this.runAppStore(this.appURL);
	}


	
	/**
	* runAppStore(appURL)
	* @param string appURL = "https://apps.apple.com/us/app/xxxx/id123456"
	**/
	
	private runAppStore(appURL: string){
		this.inAppBrowser.create(appURL,"_system");
	}
	


}
