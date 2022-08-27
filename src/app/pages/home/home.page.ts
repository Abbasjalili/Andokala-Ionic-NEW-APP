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
import { WoocommerceService } from "./../../services/woocommerce/woocommerce.service";
import { StorageService } from "./../../services/storage/storage.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";
import { Platform } from "@ionic/angular";



@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})

export class HomePage {
	
	pageName:string = `home` ;
	
	/**
	* HomePage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public woocommerceService: WoocommerceService,
		public storageService: StorageService,
		public popoverController: PopoverController,
		public platform: Platform,
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
		

		console.log(`HomePage`,`pageName`,this.pageName);
	}


	/**
	* HomePage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* HomePage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	// banners
	banners: Observable<any>;
	dataBanners: any = [];
	
	// featured
	featuredProducts: Observable<any>;
	dataFeaturedProducts: any = [];
	
	// latest products
	latestProducts: Observable<any>;
	dataLatestProducts: any = [];
	
	// categories
	categories: Observable<any>;
	dataCategories: any = [];
	
	// tags
	tags: Observable<any>;
	dataTags: any = [];
	
	
	/**
	* HomePage.getFeaturedProducts()
	**/
	getFeaturedProducts(){
		let query = {"_embed":true,"per_page":10,"featured":true};
		this.featuredProducts = this.woocommerceService.getProducts(query);
		this.featuredProducts.subscribe(data => {
			this.dataFeaturedProducts = data ;
		});
	}
	
	
	/**
	* HomePage.getLatestProducts()
	**/
	getLatestProducts(){
		let query = {"_embed":true,"per_page":10};
		this.latestProducts = this.woocommerceService.getProducts(query);
		this.latestProducts.subscribe(data => {
			this.dataLatestProducts = data ;
		});
	}
	
	
	/**
	* HomePage.getCategories()
	**/
	getCategories(){
		this.categories = this.woocommerceService.getCategories({per_page:100,parent:0});
		this.categories.subscribe(data => {
			this.dataCategories = data ;
		});
	}
	
	
	/**
	* HomePage.getBanners()
	**/
	getBanners(){
		this.banners = this.woocommerceService.getBanners();
		this.banners.subscribe(data => {
			this.dataBanners = data ;
		});
	}
	
	
	/**
	* HomePage.getTags()
	**/
	getTags(){
		this.tags = this.woocommerceService.getTags();
		this.tags.subscribe(data => {
			this.dataTags = data ;
		});
	}
	
	
	/**
	* HomePage.doRefresh()
	**/
	public doRefresh(refresher){
		// banners
		this.dataBanners = [];
		this.getBanners();
	
		// featured
		this.dataFeaturedProducts = [];
		this.getFeaturedProducts();
		// latest products
		this.dataLatestProducts = [];
		this.getLatestProducts();
		// categories
		this.dataCategories = [];
		this.getCategories();
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	
	/**
	* HomePage.ratingRendered()
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
	* HomePage.ngOnInit()
	**/
	public ngOnInit(){
	
		// banners
		this.dataBanners = [];
		this.getBanners();
		// featured
		this.dataFeaturedProducts = [];
		this.getFeaturedProducts();
		// latest products
		this.dataLatestProducts = [];
		this.getLatestProducts();
	
		// categories
		this.dataCategories = [];
		this.getCategories();
	
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
	* HomePage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* HomePage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	*  HomePage.getWishlist()
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
	*  HomePage.getCart()
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
	* HomePage.pushWishlist(item)
	**/
	private pushWishlist(item){
		this.temp_count_whishlist++;
		this.item_wishlist.push(item);
	}
	
	
	/**
	* HomePage.pushCart(item)
	**/
	private pushCart(item){
		this.temp_count_cart = this.temp_count_cart + parseInt(item.qty);
		this.item_cart.push(item);
	}
	
	
	/**
	* HomePage:getBadges()
	**/
	getBadges(){
		this.getWishlist();
		this.getCart();
	}
	
	
	// -------------------------------------------------------------------




}
