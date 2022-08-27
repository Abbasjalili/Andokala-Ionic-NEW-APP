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
import { AlertController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "../../components/popover/popover.component";



@Component({
	selector: "app-review",
	templateUrl: "review.page.html",
	styleUrls: ["review.page.scss"],
})

export class ReviewPage {
	
	pageName:string = `review` ;
	
	/**
	* ReviewPage:constructor()
	**/
	constructor(
		private router: Router,
		public statusBar: StatusBar,
		public woocommerceService: WoocommerceService,
		public storageService: StorageService,
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
	
	

		console.log(`ReviewPage`,`pageName`,this.pageName);
	}


	/**
	* ReviewPage:storageInit();
	**/
	async storageInit(){
		await this.storage.create();
	}
	
	/**
	* ReviewPage:showPopover()
	**/
	async showPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			event: ev,
			translucent: true
		});
		return await popover.present();
	}
	
	


		
	order:any = {};
	newOrder: Observable<any>;
	dataNewOrder: any = [];
	
	/**
	* ReviewPage.placeOrder()
	**/
	public placeOrder(){
		this.newOrder = this.woocommerceService.newOrder(this.order);
		this.newOrder.subscribe(data => {
			this.dataNewOrder = data;
			if(data.number){
				this.storageService.clearItems(`cart`).then(()=>{
				});
				this.storageService.removeItem(`order`,`line_items`).then(()=>{
				});
				this.showDialog(data.number);
			}
		});
	}
	
	
	/**
	* ReviewPage.showDialog()
	**/
	async showDialog(number:string){
		const alert = await this.alertController.create({
			header: `Place Order`,
			subHeader: `Order Number: ${number}`,
			message: `Your order has been received`,
			buttons:[
			{
				text: `OK`,
					handler: (form_input) => {
						this.router.navigate([`/order-received`,number]);
					}
				}
			]
		});
		await alert.present();
	}
	
	
	/**
	* ReviewPage.getBilling()
	**/
	public getBilling(){
		this.storageService.getItem(`order`,`billing`).then((billing:any)=>{
			if(billing){
				this.order["billing"] = billing; 
			}
		});
	}
	
	
	/**
	* ReviewPage.getShipping()
	**/
	public getShipping(){
		this.storageService.getItem(`order`,`shipping`).then((shipping:any)=>{
			if(shipping){
				this.order["shipping"] = shipping; 
			}
		});
	}
	
	
	/**
	* ReviewPage.getLineItems()
	**/
	public getLineItems(){
		this.storageService.getItem(`order`,`line_items`).then((line_items:any)=>{
			if(line_items){
				this.order["line_items"] = line_items; 
			}
		});
	}
	
	
	/**
	* ReviewPage.getCouponLines()
	**/
	public getCouponLines(){
		this.storageService.getItem(`order`,`coupon_lines`).then((coupon_lines:any)=>{
			if(coupon_lines && coupon_lines[0] && coupon_lines[0].code){
				if(coupon_lines[0].code != ""){
					this.order["coupon_lines"] = coupon_lines; 
				}
			}
		});
	}
	
	
	/**
	* ReviewPage.getPaymentGateways()
	**/
	public getPaymentGateways(){
		this.storageService.getItem(`order`,`payment_method`).then((payment:any)=>{
			if(payment && payment.id){
				this.order["payment_method"] = payment.id; 
				this.order["payment_method_title"] = payment.title; 
				switch(payment.id){
					case "paypal":
						this.order["status"] = "pending"; 
						break;
					case "cod":
						this.order["status"] = "processing"; 
						break;
					case "bacs":
						this.order["status"] = "on-hold"; 
						break;
					case "cheque":
						this.order["status"] = "on-hold"; 
						break;
				}
			}
		});
	}
	
	
	/**
	* ReviewPage.doRefresh()
	**/
	public doRefresh(refresher){
		
		this.getBilling();
		this.getShipping();
		this.getLineItems();
		this.getCouponLines();
		this.getPaymentGateways();
		
		setTimeout(() => {
			refresher.target.complete();
		}, 2000);
		
	}
	
	
	/**
	* ReviewPage.ngOnInit()
	**/
	public ngOnInit(){
		
		this.getBilling();
		this.getShipping();
		this.getLineItems();
		this.getCouponLines();
		this.getPaymentGateways();
		
	}
	
	




}
