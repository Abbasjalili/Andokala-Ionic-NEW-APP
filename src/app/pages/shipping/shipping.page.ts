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
	selector: "app-shipping",
	templateUrl: "shipping.page.html",
	styleUrls: ["shipping.page.scss"],
})

export class ShippingPage {
	
	pageName:string = `shipping` ;
	
	/**
	* ShippingPage:constructor()
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
	
	

		console.log(`ShippingPage`,`pageName`,this.pageName);
	}


	/**
	* ShippingPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* ShippingPage:showPopover()
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
	formShipping: FormGroup;
	dataStates: any = [];
	nextButton:boolean = true;
	same_billing:any = false;
	dataShipping: any = {
		first_name: ``,
		last_name: ``,
		address_1: ``,
		address_2: ``,
		city: ``,
		state: ``,
		postcode: ``,
		country: ``,
	}
	
	
	/**
	* ShippingPage.getCountries()
	**/
	public getCountries(){
		this.countries = this.woocommerceService.getCountries();
		this.countries.subscribe(data => {
			this.dataCountries = data ;
		});
	}
	
	
	/**
	* ShippingPage.updateStates(selected:string)
	**/
	public updateStates(selected:string){
		this.dataCountries.forEach((iVal, iKey, iIndex) => {
			let code : string = iVal.code;
			if(code == selected){
				this.dataStates = iVal.states;
				console.log(`updateStates`,selected,iVal.states);
			}
		});
	}
	
	
	/**
	* ShippingPage.formInstance()
	**/
	public formInstance(){
		
		this.formShipping = this.formBuilder.group({
			first_name: [this.dataShipping.first_name, Validators.required],
			last_name: [this.dataShipping.last_name, Validators.required],
			address_1: [this.dataShipping.address_1, Validators.required],
			address_2: [this.dataShipping.address_2, Validators.required],
			city: [this.dataShipping.city, Validators.required],
			state: [this.dataShipping.state, Validators.required],
			postcode: [this.dataShipping.postcode, Validators.required],
			country: [this.dataShipping.country, Validators.required]
		});
		this.onChangesShipping();
		
	}
	
	
	/**
	* ShippingPage.onChangesShipping()
	**/
	private onChangesShipping():void{
		this.formShipping.valueChanges.subscribe(shipping => {
			this.same_billing = false;
			if((shipping.first_name != "") && (shipping.address_1 != "") && (shipping.city != "") && (shipping.postcode != "") && (shipping.country != "")){
				this.nextButton = true;
			}else{
				this.nextButton = false;
			}
		});
	}
	
	
	/**
	* ShippingPage.saveShipping()
	**/
	public saveShipping(){
		let shipping:any = this.formShipping.value;
		shipping["state_html"] = this.getStateLabel(shipping.state);
		shipping["country_html"] = this.getCountryLabel(shipping.country);
		this.storageService.setItem(`order`,`shipping`,shipping).then((data)=>{
			this.showToast(`The data has been successfully saved!`);
		});
	}
	
	
	/**
	* ShippingPage.goToPayment()
	**/
	public goToPayment(){
		let shipping:any = this.formShipping.value;
		shipping["state_html"] = this.getStateLabel(shipping.state);
		shipping["country_html"] = this.getCountryLabel(shipping.country);
		if((shipping.first_name != "") && (shipping.address_1 != "") && (shipping.city != "") && (shipping.postcode != "") && (shipping.country != "")){
			this.storageService.setItem(`order`,`shipping`,this.formShipping.value).then((data)=>{
				this.showToast(`The data has been successfully saved!`);
				this.router.navigate([`/payment`]);
			});
		}else{
			this.showToast(`The requested data is incomplete!`);
		}
	}
	
	
	/**
	* ShippingPage.showToast($message)
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
	* ShippingPage.asBilling()
	**/
	public asBilling(event){
		let checked:boolean = event.detail.checked ;
		if(checked==true){
			this.storageService.getItem(`order`,`billing`).then((billing)=>{
				if(billing){
					this.nextButton = true;
					this.dataShipping.first_name = billing.first_name ;
					this.dataShipping.last_name = billing.last_name ;
					this.dataShipping.address_1 = billing.address_1 ;
					this.dataShipping.address_2 = billing.address_2 ;
					this.dataShipping.city = billing.city ;
					this.dataShipping.state = billing.state ;
					this.dataShipping.postcode = billing.postcode ;
					this.dataShipping.country = billing.country ;
					this.formInstance();
				}
			});
		}
	}
	
	
	/**
	* ShippingPage.getCountryLabel()
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
	* ShippingPage.getStateLabel()
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
	* ShippingPage.ngOnInit()
	**/
	public ngOnInit(){
		this.dataCountries = [];
		this.getCountries();
		this.formInstance();
		this.storageService.getItem(`order`,`shipping`).then((shipping)=>{
			if(shipping){
				console.log(`storage`,shipping);
				this.dataShipping = shipping; 
				this.formInstance();
			}
		});
		setTimeout(() => {
			this.updateStates(this.dataShipping.country);
			this.formInstance();
		}, 2000);
	}
	
	
	/**
	* ShippingPage.doRefresh()
	**/
	public doRefresh(refresher){
		this.dataCountries = [];
		this.getCountries();
		this.formInstance();
		this.storageService.getItem(`order`,`shipping`).then((shipping)=>{
			if(shipping){
				console.log(`storage`,shipping);
				this.dataShipping = shipping; 
				this.formInstance();
			}
		});
		setTimeout(() => {
			this.updateStates(this.dataShipping.country);
			this.formInstance();
			refresher.target.complete();
		}, 2000);
	}
	
	




}
