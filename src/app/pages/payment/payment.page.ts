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
	selector: "app-payment",
	templateUrl: "payment.page.html",
	styleUrls: ["payment.page.scss"],
})

export class PaymentPage {
	
	pageName:string = `payment` ;
	
	/**
	* PaymentPage:constructor()
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
	
	

		console.log(`PaymentPage`,`pageName`,this.pageName);
	}


	/**
	* PaymentPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* PaymentPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	paymentGateways : Observable<any>;
	dataPaymentGateways : any = [];
	formPayment : FormGroup;
	dataPayment : any = {id:`bacs`};
	paymentSelected:any = {};
	nextButton:boolean = true;
	
	
	/**
	* PaymentPage.getPaymentGateways()
	**/
	public getPaymentGateways(){
		this.paymentGateways = this.woocommerceService.getPaymentGateways();
		this.paymentGateways.subscribe(data => {
			this.dataPaymentGateways = data ;
		});
	}
	
	
	/**
	* PaymentPage.formInstance()
	**/
	public formInstance(){
		
		this.formPayment = this.formBuilder.group({
			payment_method : [this.dataPayment.id, Validators.required]
		});
		
		this.onChangesPayment();
		
	}
	
	
	/**
	* PaymentPage.onChangesPayment()
	**/
	public onChangesPayment(){
		this.formPayment.valueChanges.subscribe(payment => {
			this.paymentInfo(payment.payment_method);
		});
	}
	
	
	/**
	* PaymentPage.paymentInfo()
	**/
	private paymentInfo(selected:string){
		this.dataPaymentGateways.forEach((iVal, iKey, iIndex) => {
			if(iVal.id == selected){
				this.paymentSelected = iVal;
			}
		});
	}
	
	
	/**
	* PaymentPage.goToReview()
	**/
	public goToReview(){
		this.storageService.setItem(`order`,`payment_method`,this.paymentSelected).then((data)=>{
			this.showToast(`The data has been successfully saved!`);
			this.router.navigate(["/review"]);
		});
	}
	
	
	/**
	* PaymentPage.savePayment()
	**/
	public savePayment(){
		this.storageService.setItem(`order`,`payment_method`,this.paymentSelected).then((data)=>{
			this.showToast(`The data has been successfully saved!`);
		});
	}
	
	
	/**
	* PaymentPage.showToast($message)
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
	* PaymentPage.ngOnInit()
	**/
	public ngOnInit(){
		this.dataPaymentGateways = []
		this.getPaymentGateways();
		this.formInstance();
		this.storageService.getItem(`order`,`payment_method`).then((payment)=>{
			if(payment){
				this.dataPayment = payment; 
				this.formInstance();
				setTimeout(() => {
					this.paymentInfo(payment.id);
				}, 3000);
			}
		});
	}
	
	
	/**
	* PaymentPage.doRefresh()
	**/
	public doRefresh(refresher){
		this.dataPaymentGateways = []
		this.getPaymentGateways();
		this.formInstance();
		this.storageService.getItem(`order`,`payment_method`).then((payment)=>{
			if(payment){
				this.dataPayment = payment; 
				this.formInstance();
				setTimeout(() => {
					this.paymentInfo(payment.id);
				}, 3000);
			}
		});
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
	}
	
	




}
