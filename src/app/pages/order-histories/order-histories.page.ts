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
import { StorageService } from "./../../services/storage/storage.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-order-histories",
	templateUrl: "order-histories.page.html",
	styleUrls: ["order-histories.page.scss"],
})

export class OrderHistoriesPage {
	
	pageName:string = `order-histories` ;
	
	/**
	* OrderHistoriesPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public storageService: StorageService,
		public popoverController: PopoverController,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#1f67e6");
		this.storageInit();
	
	
		//badge for wishlist and cart
		this.createBadge();
		

		console.log(`OrderHistoriesPage`,`pageName`,this.pageName);
	}


	/**
	* OrderHistoriesPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* OrderHistoriesPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		dataHistories:any = [];
	
	
	/**
	* OrderHistoryPage:getHistories()
	**/
	getHistories(){
		this.dataHistories = [];
		this.storageService.getItems(`order-received`).then((histories:any)=>{
			this.dataHistories = histories;
			console.log(`histories`,histories);
		});
	}
	
	
	/**
	* OrderHistoryPage:doRefresh()
	**/
	public doRefresh(refresher){
		this.getHistories();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	
	/**
	* OrderHistoryPage:ngOnInit()
	**/
	ngOnInit(){
		this.getHistories();
	}
	// -------------------------------------------------------------------
	// Badge
	count_wishlist:number = 0;
	temp_count_whishlist:number = 0 ;
	item_wishlist : any = [];
	
	count_cart:number = 0;
	temp_count_cart:number = 0;
	item_cart : any = [];
	
	runBadge: any;
	
	
	/**
	* AccountPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* AccountPage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	*  AccountPage.getWishlist()
	**/
	public async getWishlist(){
		this.count_wishlist = this.temp_count_whishlist;
		this.temp_count_whishlist = 0;
		this.item_wishlist = []; 
		this.storage.forEach((iValue, iKey, iIndex) => {
			if(iKey.substring(0,9) ==  `wishlist:`){
				this.pushWishlist(iValue);
			}
		});
	}
	
	
	/**
	*  AccountPage.getCart()
	**/
	public async getCart(){
		this.count_cart = this.temp_count_cart;
		this.temp_count_cart = 0;
		this.item_cart = []; 
		this.storage.forEach((iValue, iKey, iIndex) => {
			if(iKey.substring(0,5) ==  `cart:`){
				this.pushCart(iValue);
			}
		});
	}
	
	
	/**
	* AccountPage.pushWishlist(item)
	**/
	private pushWishlist(item){
		this.temp_count_whishlist++;
		this.item_wishlist.push(item);
	}
	
	
	/**
	* AccountPage.pushCart(item)
	**/
	private pushCart(item){
		this.temp_count_cart = this.temp_count_cart + parseInt(item.qty);
		this.item_cart.push(item);
	}
	
	
	/**
	* AccountPage:getBadges()
	**/
	getBadges(){
		this.getWishlist();
		this.getCart();
	}
	
	
	// -------------------------------------------------------------------




}
