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
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";
import { WoocommerceService } from "./../../services/woocommerce/woocommerce.service";
import { StorageService } from "./../../services/storage/storage.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-order-received",
	templateUrl: "order-received.page.html",
	styleUrls: ["order-received.page.scss"],
})

export class OrderReceivedPage {

	//url parameter
	public orderId : string;

	
	pageName:string = `order-received` ;
	
	/**
	* OrderReceivedPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public toastController: ToastController,
		public woocommerceService: WoocommerceService,
		public storageService: StorageService,
		public popoverController: PopoverController,
		public activatedRoute: ActivatedRoute,
		private storage: Storage,
		private globals: Globals
	){
	
		// statusbar
		this.statusBar.styleLightContent();
		this.statusBar.overlaysWebView(false);
		this.statusBar.backgroundColorByHexString("#1f67e6");
		this.storageInit();
	
	
		this.orderId = this.activatedRoute.snapshot.paramMap.get("order_id");
		//badge for wishlist and cart
		this.createBadge();
		

		console.log(`OrderReceivedPage`,`pageName`,this.pageName);
	}


	/**
	* OrderReceivedPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* OrderReceivedPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	/**
	* OrderReceivedPage:Variable
	**/
	orderRecieved: Observable<any>;
	dataOrderRecieved:any = {};
	
	
	/**
	* OrderReceivedPage:getOrderReceived()
	**/
	getOrderReceived(){
		this.orderRecieved = this.woocommerceService.getOrder(this.orderId);
		this.orderRecieved.subscribe(data => {
			this.dataOrderRecieved = data ;
			if(data.number){
				this.storageService.setItem(`order-received`,data.number,data).then(()=>{
					
				});
			}
		});
	}
	
	
	/**
	* OrderReceivedPage:doRefresh()
	**/
	public doRefresh(refresher){
		this.getOrderReceived();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	
	/**
	* OrderReceivedPage:ngOnInit()
	**/
	ngOnInit(){
		this.getOrderReceived();
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
	* OrderReceivedPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* OrderReceivedPage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	*  OrderReceivedPage.getWishlist()
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
	*  OrderReceivedPage.getCart()
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
	* OrderReceivedPage.pushWishlist(item)
	**/
	private pushWishlist(item){
		this.temp_count_whishlist++;
		this.item_wishlist.push(item);
	}
	
	
	/**
	* OrderReceivedPage.pushCart(item)
	**/
	private pushCart(item){
		this.temp_count_cart = this.temp_count_cart + parseInt(item.qty);
		this.item_cart.push(item);
	}
	
	
	/**
	* OrderReceivedPage:getBadges()
	**/
	getBadges(){
		this.getWishlist();
		this.getCart();
	}
	
	
	// -------------------------------------------------------------------
	
	




}
