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
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { StorageService } from "./../../services/storage/storage.service";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-product-detail",
	templateUrl: "product-detail.page.html",
	styleUrls: ["product-detail.page.scss"],
})

export class ProductDetailPage {

	//url parameter
	public productId : string;

	
	pageName:string = `product-detail` ;
	
	/**
	* ProductDetailPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public woocommerceService: WoocommerceService,
		public loadingController: LoadingController,
		public toastController: ToastController,
		public alertController: AlertController,
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
	
	
		this.productId = this.activatedRoute.snapshot.paramMap.get("product_id");
		this.isWishlist();
		//badge for wishlist and cart
		this.createBadge();
		

		console.log(`ProductDetailPage`,`pageName`,this.pageName);
	}


	/**
	* ProductDetailPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* ProductDetailPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	//init
	product: Observable<any>;
	dataProduct: any = {};
	wishlist:any = [];
	currency:string = "USD";
	
	
	// categories
	categories: Observable<any>;
	dataCategories: any = [];
	
	
	/**
	* ProductDetailPage.getProduct(productId)
	**/
	public getProduct(){
		this.product = this.woocommerceService.getProduct(this.productId);
		this.product.subscribe(data => {
				this.dataProduct = data ;
		});
	}
	
	
	/**
	* ProductDetailPage.doRefresh()
	**/
	public doRefresh(refresher){
		this.dataProduct = {};
		this.getProduct();
	
		// categories
		this.dataCategories = [];
		this.getCategories();
	
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	
	/**
	* ProductDetailPage.showDialog()
	**/
	async showDialog(){
		const alert = await this.alertController.create({
			header: `Ordering Information`,
			subHeader: this.dataProduct.name,
			message: this.dataProduct.price_html,
			inputs:[
				{
					name: "qty",
					id: "qty",
					type: "number",
					min: "1",
					value: "1",
					placeholder: "Quantity"
				},
				{
					name: "note",
					id: "note",
					type: "textarea",
					value: "",
					placeholder: "Optional, eg: XXL"
				}
			],
			buttons:[
				{
					text: `Cancel`,
					role: "cancel",
					cssClass: "secondary",
					handler: () => {
						console.log("Confirm Cancel");
					}
				},
				{
					text: `OK`,
					handler: (form_input) => {
						
						let product_id : string = this.dataProduct.id ;
						let product_name : string = this.dataProduct.name ;
						let product_price : string = this.dataProduct.price ;
						let product_price_html : string = this.dataProduct.price_html ;
						let product_image : string = this.dataProduct.images[0].src;
						let product_qty : string = form_input.qty ;
						let product_note : string = form_input.note ;
						
						let val = {
							id : product_id,
							name : product_name,
							image : product_image,
							qty : product_qty,
							price_html : product_price_html,
							note : product_note,
							price : product_price
						};
						
						let key = product_id ;
						this.setItem(`cart`,key,val);
						console.log("Confirm Ok",val);
						this.showToast(`Item has been added to your cart`);
						
					}
				}
			]
		});
		await alert.present();
	}
	
	
	/**
	* ProductDetailPage.getItem(table:string,key:string)
	**/
	public async getItem(table:string,key:string){
		this.storage.get(`${table}:${key}`).then((val) => {
			this.wishlist = val;
		});
	}
	
	
	/**
	* ProductDetailPage.setItem(table:string,key:string,val:any)
	**/
	public async setItem(table:string,key:string,value:any){
		return await this.storage.set(`${table}:${key}`,value);
	}
	
	
	/**
	* ProductDetailPage.removeItem(table:string,key:string)
	**/
	public async removeItem(table:string,key:string){
		return await this.storage.remove(`${table}:${key}`);
	}
	
	
	/**
	* ProductDetailPage.addToCart()
	**/
	addToCart(){
		this.showDialog();
	}
	
	
	/**
	* ProductDetailPage.buyNow()
	**/
	buyNow(){
		
		let val = {
			id : this.dataProduct.id,
			name : this.dataProduct.name,
			image : this.dataProduct.images[0].src,
			price : this.dataProduct.price,
			price_html : this.dataProduct.price_html,
			qty : 1,
			note : ``,
		};
		
		let key = this.dataProduct.id ;
		this.setItem(`cart`,key,val);
		console.log("buyNow",val);
		this.router.navigate(["/cart"]);
	}
	
	
	/**
	* ProductDetailPage.addToWishlist()
	**/
	addToWishlist(){
		let key = this.dataProduct.id ;
		let val = this.dataProduct;
		this.setItem(`wishlist`,key,val);
		
	}
	
	
	/**
	* ProductDetailPage.removeWishlist()
	**/
	removeWishlist(){
		let key = this.dataProduct.id ;
		this.removeItem(`wishlist`,key);
		
	}
	
	
	/**
	* ProductDetailPage.isWishlist()
	**/
	runWishlist:any;
	isWishlist(){
		this.runWishlist = setInterval(() => {
			if(this.dataProduct.id){
				let key = this.dataProduct.id ;
				this.getItem(`wishlist`,key);
				//console.log("is_wishlist",this.wishlist);
			}
		},1000);
		
	}
	
	
	/**
	* ProductDetailPage.ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runWishlist);
		clearInterval(this.runBadge);
	}
	
	
	/**
	* ProductDetailPage.showToast($message)
	**/
	async showToast(message: string){
		const toast = await this.toastController.create({
			message: message,
			position: "bottom",
			color: "primary",
			duration: 500
		});
		await toast.present();
	}
	
	
	/**
	* ProductDetailPage.ratingRendered()
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
	* ProductDetailPage.ngOnInit()
	**/
	public ngOnInit(){
		this.dataProduct = {};
		this.getProduct();
	
		// categories
		this.dataCategories = [];
		this.getCategories();
	}
	
	
	/**
	* ProductDetailPage.getCategories()
	**/
	getCategories(){
		this.categories = this.woocommerceService.getCategories({per_page:100});
		this.categories.subscribe(data => {
			this.dataCategories = data ;
		});
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
	* ProductDetailPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	*  ProductDetailPage.getWishlist()
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
	*  ProductDetailPage.getCart()
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
	* ProductDetailPage.pushWishlist(item)
	**/
	private pushWishlist(item){
		this.temp_count_whishlist++;
		this.item_wishlist.push(item);
	}
	
	
	/**
	* ProductDetailPage.pushCart(item)
	**/
	private pushCart(item){
		this.temp_count_cart = this.temp_count_cart + parseInt(item.qty);
		this.item_cart.push(item);
	}
	
	
	/**
	* ProductDetailPage:getBadges()
	**/
	getBadges(){
		this.getWishlist();
		this.getCart();
	}
	
	
	// -------------------------------------------------------------------




}
