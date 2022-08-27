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
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-cart",
	templateUrl: "cart.page.html",
	styleUrls: ["cart.page.scss"],
})

export class CartPage {
	
	pageName:string = `cart` ;
	
	/**
	* CartPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public woocommerceService: WoocommerceService,
		public storageService: StorageService,
		public loadingController: LoadingController,
		public toastController: ToastController,
		public alertController: AlertController,
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
		

		console.log(`CartPage`,`pageName`,this.pageName);
	}


	/**
	* CartPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* CartPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	
	dataProductsInCart : any = [];
	runEstimatedPrice:any;
	loading:any;
	priceTotal:number = 0;
	currencySymbol:string = `USD`;
	
	currentCurrencies: Observable<any>;
	dataCurrentCurrencies: any = [];
	dataOrder:any = {};
	
	
	/**
	* CartPage.getCurrencies()
	**/
	public getCurrencies(){
		this.currentCurrencies = this.woocommerceService.getCurrencies();
		this.currentCurrencies.subscribe(data => {
			this.dataCurrentCurrencies = data ;
			this.currencySymbol = data.code ;
		});
	}
	
	
	/**
	* CartPage.ngOnInit()
	**/
	public ngOnInit(){
		
		this.presentLoading();
		this.storageService.getItems(`cart`).then((items)=>{
			this.dataProductsInCart = items;
			this.dismissLoading();
		});
		
		this.getCurrencies();
		
		this.runEstimatedPrice = setInterval(() => {
			this.estimatedPrice();
		}, 1000);
		
			
	}
	
	
	/**
	* CartPage.presentLoading()
	**/
	async presentLoading() {
		this.loading = await this.loadingController.create({
			message: "Please wait...",
			spinner: "crescent",
			duration: 1000
		});
		await this.loading.present();
	}
	
	
	/**
	* CartPage.dismissLoading()
	**/
	async dismissLoading() {
		if(this.loading){
			await this.loading.dismiss();
		}
	}
	
	
	/**
	* CartPage.showToast($message)
	**/
	async showToast(message: string){
		const toast = await this.toastController.create({
			message: message,
			position: "bottom",
			color: "dark",
			duration: 500
		});
		await toast.present();
	}
	
	
	/**
	* CartPage.estimatedPrice()
	**/
	public estimatedPrice(){
		let itemPrices:number = 0;
		for (let item of this.dataProductsInCart){
			let itemPrice:number = item.price * item.qty;
			itemPrices += itemPrice;
		}
		this.priceTotal = itemPrices;
	}
	
	
	/**
	* CartPage.removeProductInCart(productId)
	**/
	public removeProductInCart(productId:string){
		this.storageService.removeItem(`cart`,productId).then((items)=>{
			this.presentLoading();
		});
		setTimeout(() => {
			this.storageService.getItems(`cart`).then((items)=>{
				this.dataProductsInCart = items;
				this.dismissLoading();
			});
		}, 1000);
	}
	
	
	/**
	* CartPage.editProductInCart(productId:string)
	**/
	public editProductInCart(productId:string){
		
		this.storageService.getItem(`cart`,productId).then((dataCart)=>{
			this.editProductInCartDialog(dataCart);
		});
	
	}
	
	
	/**
	* CartPage.editProductInCartDialog(dataCart:any)
	**/
	async editProductInCartDialog(dataCart:any){
		const alert = await this.alertController.create({
			header: `Ordering Information`,
			subHeader: dataCart.name,
			message: dataCart.price_html,
			inputs:[
				{
					name: "qty",
					id: "qty",
					type: "number",
					min: "1",
					value: dataCart.qty,
					placeholder: "Quantity"
				},
				{
					name: "note",
					id: "note",
					type: "textarea",
					value: dataCart.note,
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
					handler: (formInput) => {
						
						let val = {
							id : dataCart.id,
							name : dataCart.name,
							image : dataCart.image,
							qty : formInput.qty,
							price_html : dataCart.price_html,
							note : formInput.note,
							price : dataCart.price
						};
						
						let key = dataCart.id ;
						this.storageService.setItem(`cart`,key,val).then(()=>{
							this.presentLoading();
						});
						setTimeout(() => {
							this.storageService.getItems(`cart`).then((items)=>{
								this.dataProductsInCart = items;
								this.dismissLoading();
							});
						}, 1000);
						
					}
				}
			]
		});
		await alert.present();
	}
	
	
	
	newOrder: Observable<any>;
	dataNewOrder: any = [];
	order:any = {};
	
	/**
	* CartPage.saveOrder()
	**/
	public saveOrder(){
		
		let line_items:any = []; 
		
		this.dataProductsInCart.forEach((val, key, index) => {
			line_items.push({
				product_id : val.id,
				name : val.name,
				price : val.price,
				image : val.image,
				price_html : val.price_html,
				quantity : val.qty,
				meta_data : [
					{
						key : `Note`,
						value : val.note
					}
				]
			});
		});
		
		
		this.storageService.setItem(`order`,`line_items`,line_items).then(()=>{
			console.log(`newOrder`,line_items);
			this.router.navigate([`/billing`]);
		});
	}
	
	
	/**
	* CartPage.applyCoupon()
	**/
	
	coupon:any = "";
	coupons: Observable<any>;
	
	public applyCoupon(){
		let currentCoupon = this.coupon.toLowerCase();
		this.coupon = "";
		this.presentLoading();
		this.coupons = this.woocommerceService.getCoupons();
		let isValid:boolean = false;
		this.coupons.subscribe(data => {
			for (let item of data){
				let codeCoupon = item.code ;
				console.log(`is_coupon?`, `${codeCoupon}=${currentCoupon}`);
				if(codeCoupon == currentCoupon){
					isValid = true;
				}
			}
			if(isValid==true){
				this.storageService.setItem(`order`,`coupon_lines`,[{"code":currentCoupon}]).then(()=>{
					this.coupon = currentCoupon;
					this.dismissLoading();
					this.showToast(`Coupon code saved successfully!`);
				});
			}else{
				this.storageService.removeItem(`order`,`coupon_lines`).then(()=>{
					this.coupon = "";
					this.dismissLoading();
					this.showToast(`The coupon is invalid!`);
				});
			}
		});
	}
	
	
	/**
	* ProductsByCategoriesPage.doRefresh()
	**/
	public doRefresh(refresher){
		
		this.presentLoading();
		this.storageService.getItems(`cart`).then((items)=>{
			this.dataProductsInCart = items;
			this.dismissLoading();
		});
		
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	
	/**
	* ProductsByCategoriesPage.clearCart()
	**/
	public clearCart(){
		this.storageService.clearItems(`cart`).then((items)=>{
			this.presentLoading();
		});
		setTimeout(() => {
			this.storageService.getItems(`cart`).then((items)=>{
				this.dataProductsInCart = items;
				this.dismissLoading();
			});
		}, 500);
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
	* CartPage:createBadge()
	**/
	createBadge(){
		this.runBadge = setInterval(()=>{
			this.getBadges();
		},1000)
	}
	
	
	/**
	* CartPage:ionViewDidLeave()
	**/
	ionViewDidLeave(){
		clearInterval(this.runBadge);
	}
	
	
	/**
	*  CartPage.getWishlist()
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
	*  CartPage.getCart()
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
	* CartPage.pushWishlist(item)
	**/
	private pushWishlist(item){
		this.temp_count_whishlist++;
		this.item_wishlist.push(item);
	}
	
	
	/**
	* CartPage.pushCart(item)
	**/
	private pushCart(item){
		this.temp_count_cart = this.temp_count_cart + parseInt(item.qty);
		this.item_cart.push(item);
	}
	
	
	/**
	* CartPage:getBadges()
	**/
	getBadges(){
		this.getWishlist();
		this.getCart();
	}
	
	
	// -------------------------------------------------------------------




}
