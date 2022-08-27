/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Component, OnInit } from "@angular/core";

import { Storage } from "@ionic/storage-angular";

import { PopoverController } from "@ionic/angular";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
		

		
@Component({
	selector: "app-popover",
	templateUrl: "./popover.component.html",
	styleUrls: ["./popover.component.scss"],
})
		
		
export class PopoverComponent implements OnInit {
		
	/**
	* PopoverComponent:constructor()
	**/
	constructor(
		public popoverController: PopoverController,
		public router: Router,
		public alertController: AlertController,
		private storage: Storage
	){
		
		this.storageInit();
		
		// constructor
		
	}


	/**
	* Andokala:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	
		
	/**
	* PopoverComponent:dismissPopover()
	**/
	dismissPopover(){
		this.popoverController.dismiss();
	}
		
		
	/**
	* PopoverComponent:clearStorage()
	**/
	clearStorage(){
		this.dismissPopover();
		this.storage.clear();
		this.router.navigate(["/"]);
	}
		
		
	/**
	* PopoverComponent:exitApp()
	**/
	async exitApp(){
		this.dismissPopover();
		const alert = await this.alertController.create({
			header: `Do you want to exit App?`,
			buttons: [
				{
					text: `Cancel`,
					role: `cancel`,
					handler: () => {
						//console.log("Exit Cancel");
					}
				},
				{
					text: `Ok`,
					handler: (data) => {
						navigator["app"].exitApp();
					}
				},
			],
		});
		await alert.present();
	}
		
		
	/**
	* PopoverComponent:darkMode(event)
	**/
	isDarkMode:boolean = false;
	darkMode(event){
		if(event.detail.checked){
			document.body.setAttribute("data-theme", "dark");
		}else{
			document.body.setAttribute("data-theme", "light");
		}
	}
	
	
	/**
	* PopoverComponent:ngOnInit()
	**/
	ngOnInit(){
		let getDarkMode = document.body.getAttribute("data-theme");
		if(getDarkMode==`dark`){
			this.isDarkMode = true;
		}else{
			this.isDarkMode = false;
		}
	}

		
		
}
