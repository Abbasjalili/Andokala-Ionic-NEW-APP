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
import { WoocommerceService } from "./../../services/woocommerce/woocommerce.service";
import { StorageService } from "./../../services/storage/storage.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-products-by-category",
	templateUrl: "products-by-category.page.html",
	styleUrls: ["products-by-category.page.scss"],
})

export class ProductsByCategoryPage {

	//url parameter
	public dataId : string;


	// search query
	filterQuery: string = "";

	
	pageName:string = `products-by-category` ;
	
	/**
	* ProductsByCategoryPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
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
	
	
		this.dataId = this.activatedRoute.snapshot.paramMap.get("data_id");
		//badge for wishlist and cart
		this.createBadge();
		

		console.log(`ProductsByCategoryPage`,`pageName`,this.pageName);
	}


	/**
	* ProductsByCategoryPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* ProductsByCategoryPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	products: Observable<any>;
	dataProducts: any = [];
	
	pageNumber: number = 1;
	defaultDataId: string = "0" ;
	query = {};
	
	/**
	* ProductsByCategoryPage.getProducts()
	**/
	getProducts(start: boolean){
		this.updateQuery();
		this.products = this.woocommerceService.getProducts(this.query);
		this.products.subscribe(data => {
			if(start == true){
				this.dataProducts = data ;
			}else{
				this.dataProducts = this.dataProducts.concat(data);
			}
		});
	}
	
	
	/**
	* ProductsByCategoryPage.updateQuery()
	**/
	public updateQuery(){
		this.query["page"] = this.pageNumber;
		this.query["_embed"] = "true";
		this.query["per_page"] = 10 ;
		this.query["search"] = this.filterQuery;
		if((this.dataId == "") || (this.dataId == null)){
			this.dataId = this.defaultDataId ;
		}
		if(this.dataId != "0"){
			this.query["category"] = this.dataId;
		}
		console.log("parameter",this.query);
	}
	
	
	
	/**
	* ProductsByCategoryPage.filterItems($event)
	* @param any $event
	**/
	public filterItems(evt: any){
		let filterVal = evt.target.value;
		if (filterVal && filterVal.trim() !== "") {
			this.filterQuery = filterVal;
		}else{
			this.filterQuery = "";
		}
		if((this.filterQuery.length == 0 ) || (this.filterQuery.length >= 3 )){
			this.dataProducts = [];
			this.pageNumber = 1;
			this.getProducts(true);
		}
	}
	
	/**
	* ProductsByCategoryPage.loadMore(infiniteScroll)
	* @param event $infiniteScroll
	**/
	public loadMore(infiniteScroll){
		let pageNumber = this.pageNumber;
		this.pageNumber++;
		this.getProducts(false);
		setTimeout(() => {
			infiniteScroll.target.complete();
			//infiniteScroll.target.enable = false;
		}, 500);
	}
	
	
	/**
	* ProductsByCategoryPage.doRefresh()
	**/
	public doRefresh(refresher){
		this.dataProducts = [];
		this.getProducts(false);
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	
	/**
	* ProductsByCategoryPage.ratingRendered()
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
	* ProductsByCategoryPage.ngOnInit()
	**/
	public ngOnInit(){
		this.dataProducts = [];
		this.pageNumber = 1;
		this.getProducts(true);
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
	* ProductsByCategoryPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* ProductsByCategoryPage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	*  ProductsByCategoryPage.getWishlist()
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
	*  ProductsByCategoryPage.getCart()
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
	* ProductsByCategoryPage.pushWishlist(item)
	**/
	private pushWishlist(item){
		this.temp_count_whishlist++;
		this.item_wishlist.push(item);
	}
	
	
	/**
	* ProductsByCategoryPage.pushCart(item)
	**/
	private pushCart(item){
		this.temp_count_cart = this.temp_count_cart + parseInt(item.qty);
		this.item_cart.push(item);
	}
	
	
	/**
	* ProductsByCategoryPage:getBadges()
	**/
	getBadges(){
		this.getWishlist();
		this.getCart();
	}
	
	
	// -------------------------------------------------------------------




}
