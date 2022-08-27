/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { catchError } from "rxjs/operators";
import { retry } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";


@Injectable({
	providedIn: "root"
})

export class WoocommerceService {
	
	constructor(
		public httpClient: HttpClient,
		public loadingController: LoadingController,
		public toastController: ToastController,
		public alertController: AlertController,
		private storage: Storage
	){

		// storage
		this.storageInit();


	}


	async storageInit(){
		await this.storage.create();
	}


	
	
	wpUrl: string = "https://www.andokala.com";
	consumerKey: string = "ck_a467bcf2083ad9caa691c2a16f02eb145cc47ca0";
	consumerSecret: string = "cs_0fad29e8ae91ff575b835f7f7735a42df1512f0f";
	connectionLost: string = `Connection lost, please check your connection!`;
	catPosts: string = `1`; //for banners
	
	
	loading: any ;
	
	
	/**
	* WoocommerceService.getBanners()
	**/
	getBanners(): Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wp/v2/posts/?_embed&categories=${this.catPosts}`,httpOptions)
			.pipe(
				map(results => {
					console.log(`WordPress`,`getBanners`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`WordPress`,`getBanners`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,``,this.connectionLost);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`WordPress`,`getBanners`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getCoupons()
	**/
	getCoupons(): Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/coupons/`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getCoupons`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getCoupons`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,``,this.connectionLost);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getCoupons`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getOrder(orderId)
	**/
	getOrder(orderId:string): Observable<any>{
		this.presentLoading();
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/orders/${orderId}/?_embed=true`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getOrder`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getOrder`,`throwError`,err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`Product`,err.message);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getOrder`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.newOrder()
	**/
	newOrder(data): Observable<any>{
		this.presentLoading();
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/json"
			})
		}
		return this.httpClient.post(this.wpUrl + `/wp-json/wc/v3/orders/`,data,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`newOrder`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`newOrder`,`throwError`, err,data);
					if(err.error.message){
						this.showAlert(`Place Order`,null,err.error.message);
					}else{
						this.showAlert(`Place Order`,null,err.message);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`newOrder`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.deleteOrder()
	**/
	deleteOrder(itemId): Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/json"
			})
		}
		return this.httpClient.delete(this.wpUrl + `/wp-json/wc/v3/orders/${itemId}`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocommerce`,`deleteOrder`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					console.log(`Woocommerce`,`deleteOrder`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`currencies`,err.message);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocommerce`,`deleteOrder`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getCurrencies()
	**/
	getCurrencies(): Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/data/currencies/current`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocommerce`,`getCurrencies`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					console.log(`Woocommerce`,`getCurrencies`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`currencies`,this.connectionLost);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocommerce`,`getCurrencies`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getPaymentGateways()
	**/
	getPaymentGateways(): Observable<any>{
		this.presentLoading();
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/payment_gateways/`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocommerce`,`payment_gateways`,results);
					this.dismissLoading();
					//this.showToast("Successfully!");
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocommerce`,`payment_gateways`,`throwError`,err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`Payment Gateways`,err.message);
					}
					return throwError(err);
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocommerce`,`payment_gateways`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getCountries()
	**/
	getCountries(): Observable<any>{
		this.presentLoading();
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/data/countries/`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getCountries`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getCountries`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`countries`,err.message);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getCountries`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getContinents()
	**/
	getContinents(): Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/data/continents/`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getContinents`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getContinents`, `throwError`, err);
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getContinents`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getTags()
	**/
	getTags(): Observable<any>{
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/products/tags/?per_page=100`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getTags`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getTags`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`Tags`,this.connectionLost);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getTags`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getCategories(query)
	**/
	getCategories(query): Observable<any>{
		let param = this.httpBuildQuery(query);
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/products/categories/?${param}`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getCategories`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getCategories`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`Categories`,this.connectionLost);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getCategories`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getProducts()
	**/
	getProducts(query): Observable<any>{
		this.presentLoading();
		let param = this.httpBuildQuery(query);
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/products/?${param}`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getProducts`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getProducts`,`throwError`, err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`Products`,this.connectionLost);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getProducts`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.getProduct(productId)
	**/
	getProduct(productId:string): Observable<any>{
		this.presentLoading();
		const httpOptions = {
			headers: new HttpHeaders({
				"Authorization": "Basic " + btoa(this.consumerKey + ":" + this.consumerSecret),
				"Content-Type": "application/x-www-form-urlencoded"
			})
		}
		return this.httpClient.get(this.wpUrl + `/wp-json/wc/v3/products/${productId}/?_embed=true`,httpOptions)
			.pipe(
				map(results => {
					console.log(`Woocomerce`,`getProduct`,results);
					this.dismissLoading();
					return results;
				}),
				catchError(err => {
					this.dismissLoading();
					console.log(`Woocomerce`,`getProduct`,`throwError`,err);
					if(err.error.message){
						this.showToast(err.error.message);
					}else{
						this.showAlert(err.statusText,`Product`,this.connectionLost);
					}
					return throwError(err);
				}),
				catchError(err => {
					console.log(`Woocomerce`,`getProduct`,`reThrown`, err);
					return of([]);
				})
			);
	}
	
	
	/**
	* WoocommerceService.httpBuildQuery(obj)
	* @param object $obj
	**/
	private httpBuildQuery(obj) {
		let k, str;
		str = [];
		for (k in obj) {
			str.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
		}
		return str.join("&");
	}
	
	
	/**
	* WoocommerceService.presentLoading()
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
	* WoocommerceService.dismissLoading()
	**/
	async dismissLoading() {
		if(this.loading){
			await this.loading.dismiss();
		}
	}
	
	
	/**
	* WoocommerceService.showToast($message)
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
	* WoocommerceService.showAlert()
	**/
	async showAlert(header:string, subheader: string, message: string){
		const alert = await this.alertController.create({
			header: header,
			subHeader: subheader,
			message: message,
			buttons: ["OK"]
		});
		await alert.present();
	}
	



}

