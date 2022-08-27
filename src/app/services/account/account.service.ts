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
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";


@Injectable({
	providedIn: "root"
})

export class AccountService {
	
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


	
	wpUrl: string = "https://www.andokala.com/my-account";
	loading: any ;
	/**
	* getUsers()
	**/
	getUsers(): Observable<any>{
		this.presentLoading();
		return this.httpClient.get(this.wpUrl + `/wp-json/wp/v2/users`)
			.pipe(
				map(results => {
					//console.log("RAW:",results);
					this.dismissLoading();
					this.showToast();
					return results;
				}),
				catchError(err => {
					//console.log("Handling error:", err);
					this.showAlert(err.statusText,err.name,err.message);
					return throwError(err);
				}),
				catchError(err => {
					//console.log("caught rethrown:", err);
					return of([]);
				})
			);
	}
	
	/**
	* presentLoading()
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
	* dismissLoading()
	**/
	async dismissLoading() {
		if(this.loading){
			await this.loading.dismiss();
		}
	}
	
	/**
	* showToast()
	**/
	async showToast(){
		const toast = await this.toastController.create({
			message: "Successfully",
			position: "bottom",
			color: "dark",
			duration: 500
		});
		await toast.present();
	}
	
	
	/**
	* showAlert()
	**/
	async showAlert(header:string, subheader: string, message: string){
		const alert = await this.alertController.create({
			header: header,
			subHeader: subheader,
			//message: message,
			buttons: ["OK"]
		});
		await alert.present();
	}
	



}

