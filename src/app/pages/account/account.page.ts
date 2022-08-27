/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Component , OnInit } from "@angular/core";
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from "@angular/router";
import { StatusBar } from "@awesome-cordova-plugins/status-bar/ngx";
import { environment } from "./../../../../src/environments/environment";
import { Storage } from "@ionic/storage-angular";
import { Globals } from "../../class/globals/globals";
import { Observable } from "rxjs";
import { AccountService } from "./../../services/account/account.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-account",
	templateUrl: "account.page.html",
	styleUrls: ["account.page.scss"],
})

export class AccountPage {
	
	pageName:string = `account` ;
	
	/**
	* AccountPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public accountService: AccountService,
		public popoverController: PopoverController,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#1f67e6");
		this.storageInit();
	
	

		console.log(`AccountPage`,`pageName`,this.pageName);
	}


	/**
	* AccountPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* AccountPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		users: Observable<any>;
	dataUsers: any = [];
	
	/**
	* showUsers()
	**/
	showUsers(){
		this.users = this.accountService.getUsers();
		this.users.subscribe(data => {
			this.dataUsers = data ;
		});
	}
	
	
	/**
	* doRefresh()
	**/
	doRefresh(refresher){
		setTimeout(() => {
			refresher.target.complete();
		}, 100);
		this.showUsers();
	}
	
	
	/**
	* ngOnInit()
	**/
	public ngOnInit(){
		this.showUsers();
	}
	




}
