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
import { ToastController } from "@ionic/angular";
import { WoocommerceService } from "./../../services/woocommerce/woocommerce.service";
import { StorageService } from "./../../services/storage/storage.service";
import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-billing-address",
	templateUrl: "billing-address.page.html",
	styleUrls: ["billing-address.page.scss"],
})

export class BillingAddressPage {
	
	pageName:string = `billing-address` ;
	
	/**
	* BillingAddressPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public toastController: ToastController,
		public woocommerceService: WoocommerceService,
		public storageService: StorageService,
		public formBuilder: FormBuilder,
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
		

		console.log(`BillingAddressPage`,`pageName`,this.pageName);
	}


	/**
	* BillingAddressPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* BillingAddressPage:showPopover()
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
	* Variables
	**/
	countries: Observable<any>;
	dataCountries: any = [];
	formBilling: FormGroup;
	dataStates: any = [];
	
	dataBilling: any = {
		first_name: ``,
		last_name: ``,
		address_1: ``,
		address_2: ``,
		city: ``,
		state: ``,
		postcode: ``,
		country: ``,
		email: ``,
		phone: ``
	}
	
	
	/**
	* BillingPage.getCountries()
	**/
	public getCountries(){
		
		this.countries = this.woocommerceService.getCountries();
		this.countries.subscribe(data => {
			this.dataCountries = data ;
		});
	}
	
	
	/**
	* BillingPage.updateStates(selected:string)
	**/
	public updateStates(selected:string){
		this.dataCountries.forEach((iVal, iKey, iIndex) => {
			let code : string = iVal.code;
			if(code == selected){
				this.dataStates = iVal.states;
			}
		});
	}
	
	
	/**
	* BillingPage.formInstance()
	**/
	public formInstance(){
		
		this.formBilling = this.formBuilder.group({
			first_name: [this.dataBilling.first_name, Validators.required],
			last_name: [this.dataBilling.last_name, Validators.required],
			address_1: [this.dataBilling.address_1, Validators.required],
			address_2: [this.dataBilling.address_2, Validators.required],
			city: [this.dataBilling.city, Validators.required],
			state: [this.dataBilling.state, Validators.required],
			postcode: [this.dataBilling.postcode, Validators.required],
			country: [this.dataBilling.country, Validators.required],
			email: [this.dataBilling.email, Validators.required],
			phone: [this.dataBilling.phone, Validators.required]
		});
		this.onChangesBilling();
		
	}
	
	
	/**
	* BillingPage.onChangesBilling()
	**/
	private onChangesBilling():void{
		this.formBilling.valueChanges.subscribe(billing => {
		});
	}
	
	
	/**
	* BillingPage.saveBilling()
	**/
	public saveBilling(){
		let billing:any = this.formBilling.value;
		billing["state_html"] = this.getStateLabel(billing.state);
		billing["country_html"] = this.getCountryLabel(billing.country);
		console.log(`billing`,`save`,billing);
		this.storageService.setItem(`order`,`billing`,billing).then((data)=>{
			this.showToast(`The data has been successfully saved!`);
		});
	}
	
	
	/**
	* BillingPage.showToast($message)
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
	* BillingPage.getCountryLabel()
	**/
	public getCountryLabel(code:string){
		let label:string = "" ;
		this.dataCountries.forEach((data) => {
			if(code == data.code){
				label = data.name;
			}
		});
		return label;
	}
	
	
	/**
	* BillingPage.getStateLabel()
	**/
	public getStateLabel(code:string){
		let label:string = "" ;
		this.dataStates.forEach((data) => {
			if(code == data.code){
				label = data.name;
			}
		});
		return label;
	}
	
	
	/**
	* BillingPage.ngOnInit()
	**/
	public ngOnInit(){
		this.dataCountries = [];
		this.getCountries();
		this.formInstance();
		this.storageService.getItem(`order`,`billing`).then((billing)=>{
			if(billing){
				this.dataBilling = billing; 
				this.formInstance();
			}
		});
		setTimeout(() => {
			this.updateStates(this.dataBilling.country);
			this.formInstance();
		}, 2000);
	}
	
	
	/**
	* BillingPage.doRefresh()
	**/
	public doRefresh(refresher){
		this.dataCountries = [];
		this.getCountries();
		this.formInstance();
		this.storageService.getItem(`order`,`billing`).then((billing)=>{
			if(billing){
				this.dataBilling = billing; 
				this.formInstance();
			}
		});
		
		setTimeout(() => {
			this.updateStates(this.dataBilling.country);
			this.formInstance();
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
