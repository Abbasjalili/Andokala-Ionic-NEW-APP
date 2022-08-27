/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Component } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { AppSideMenus } from "./app.side-menus";

import { Platform, NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage-angular";
import { SplashScreen } from "@awesome-cordova-plugins/splash-screen/ngx";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { InAppBrowser,InAppBrowserOptions } from "@awesome-cordova-plugins/in-app-browser/ngx";
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { Device } from "@awesome-cordova-plugins/device/ngx";
import { Globals } from "./class/globals/globals";
import { environment } from "./../../src/environments/environment";



@Component({
	selector: "app-root",
	templateUrl: "app.component.html"
})
export class AppComponent {

	appTitle:string = "Andokala";
	appSubTitle:string = "Welcome to Andokala.";
	appMenus:any = [] ;



	/**
	* Andokala:constructor()
	**/

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private menuController: MenuController,
		private platform: Platform,
		private storage: Storage,
		private statusBar: StatusBar,
		private navController: NavController,
		private splashScreen: SplashScreen,
		private device: Device,
		private appSideMenus: AppSideMenus,
		private window: Window,
		private globals: Globals){
			//initialization items for static menu
			this.appMenus = this.appSideMenus.items;
			//initialization app
			this.initializeApp();
	}
	

	/**
	* Andokala:initializeApp()
	**/

	initializeApp() {
		this.platform.ready().then(() => {

			// set status bar
			this.statusBar.backgroundColorByHexString("#1f67e6");

			// hide splashscreen
			this.splashScreen.hide();

			// ionic storage
			this.storageInit();

		});


		this.handlerBackButton();
		
	}


	/**
	* Andokala:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}


	/**
	* Andokala:handlerBackButton();
	**/
	private handlerBackButton(){
		let pageName = `home`;
		this.router.events.subscribe((event: Event) =>{
			if(event instanceof NavigationStart){
				let getPage = event.url.toString().split("/");
				pageName = getPage[1];
				console.log(`pageName`,pageName);
			}
		});
		this.platform.backButton.subscribeWithPriority(666666,()=>{
			if(( pageName == "" ) || ( pageName == `home` )){
				console.log(`Hardware Exit`);
				if(window.confirm("Do you want to exit App?")){
					navigator["app"].exitApp(); 
				}
			}else{
				console.log(`Hardware Back`);
				this.navController.back();
			}
		})
	}



}
