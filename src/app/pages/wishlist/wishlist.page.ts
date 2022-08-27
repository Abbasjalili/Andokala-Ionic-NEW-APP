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
import { LoadingController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-wishlist",
	templateUrl: "wishlist.page.html",
	styleUrls: ["wishlist.page.scss"],
})

export class WishlistPage {
	
	pageName:string = `wishlist` ;
	
	/**
	* WishlistPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public storageService: StorageService,
		public loadingController: LoadingController,
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
		

		console.log(`WishlistPage`,`pageName`,this.pageName);
	}


	/**
	* WishlistPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* WishlistPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	dataWishLists : any = [];
	loading:any;
	
	/**
	* WishlistPage.ngOnInit()
	**/
	public ngOnInit(){
		this.presentLoading();
		this.storageService.getItems(`wishlist`).then((items)=>{
			this.dataWishLists = items;
			this.dismissLoading();
		});
	}
	
	
	/**
	* WishlistPage.presentLoading()
	**/
	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: "Please wait...",
			spinner: "crescent",
			duration: 2000
		});
		await this.loading.present();
	}
	
	
	/**
	* WishlistPage.dismissLoading()
	**/
	async dismissLoading() {
		if(this.loading){
			await this.loading.dismiss();
		}
	}
	
	
	/**
	* WishlistPage.removeWishlist()
	**/
	public removeWishlist(id:string){
		this.storageService.removeItem(`wishlist`,id).then((items)=>{
			this.presentLoading();
		});
		setTimeout(() => {
			this.storageService.getItems(`wishlist`).then((items)=>{
				this.dataWishLists = items;
				this.dismissLoading();
			});
		}, 1000);
	}
	
	
	/**
	* WishlistPage.clearWishlist()
	**/
	public clearWishlist(){
		this.storageService.clearItems(`wishlist`).then((items)=>{
			this.presentLoading();
		});
		setTimeout(() => {
			this.storageService.getItems(`wishlist`).then((items)=>{
				this.dataWishLists = items;
				this.dismissLoading();
			});
		}, 1000);
	}
	
	
	
	
	/**
	* WishlistPage.ratingRendered()
	**/
	ratingRendered(rate:string){
		let rate_dec =   (parseFloat(rate) * 2) ;
		let rate_number = Math.round(rate_dec);
		let star = `<ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
		switch(rate_number){
			case 0: {
				star = `<ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			}
			case 1: {
				star = `<ion-icon name="star-half-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			}
			case 2: {
					star = `<ion-icon name="star"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			}
			case 3: {
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star-half-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			}
			case 4: {
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			}
			case 5: {
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star-half-outline"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			}
			case 6: {
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			}
			case 7: { 
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star-half-outline"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			} 
			case 8: { 
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star-outline"></ion-icon>`;
				break;
			} 
			case 9: { 
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star-half-outline"></ion-icon>`;
				break;
			} 
			case 10: { 
				star = `<ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon>`;
				break;
			} 
			default: { 
				break; 
				} 
			} 
		return star;
	}
	
	
	/**
	* WishlistPage.doRefresh()
	**/
	public doRefresh(refresher){
		this.storageService.getItems(`wishlist`).then((items)=>{
			this.dataWishLists = items;
		});
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
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
	* WishlistPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* WishlistPage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	*  WishlistPage.getWishlist()
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
	*  WishlistPage.getCart()
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
	* WishlistPage.pushWishlist(item)
	**/
	private pushWishlist(item){
		this.temp_count_whishlist++;
		this.item_wishlist.push(item);
	}
	
	
	/**
	* WishlistPage.pushCart(item)
	**/
	private pushCart(item){
		this.temp_count_cart = this.temp_count_cart + parseInt(item.qty);
		this.item_cart.push(item);
	}
	
	
	/**
	* WishlistPage:getBadges()
	**/
	getBadges(){
		this.getWishlist();
		this.getCart();
	}
	
	
	// -------------------------------------------------------------------




}
