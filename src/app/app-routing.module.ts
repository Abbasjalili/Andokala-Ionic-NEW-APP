/**
* @author Alexjai <a.jalili479@gmail.com>
* @copyright Andokala 2022
* @version 01.01.01
* @license licenses.txt
*
* @date 2022-08-26 11:57:39
**/

import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		redirectTo: "home",
		pathMatch: "full"
	},
	{
		path: "about-us",
		loadChildren: () => import("./pages/about-us/about-us.module").then(m => m.AboutUsPageModule)
	},
	{
		path: "account",
		loadChildren: () => import("./pages/account/account.module").then(m => m.AccountPageModule)
	},
	{
		path: "billing-address",
		loadChildren: () => import("./pages/billing-address/billing-address.module").then(m => m.BillingAddressPageModule)
	},
	{
		path: "billing",
		loadChildren: () => import("./pages/billing/billing.module").then(m => m.BillingPageModule)
	},
	{
		path: "cart",
		loadChildren: () => import("./pages/cart/cart.module").then(m => m.CartPageModule)
	},
	{
		path: "faqs",
		loadChildren: () => import("./pages/faqs/faqs.module").then(m => m.FaqsPageModule)
	},
	{
		path: "home",
		loadChildren: () => import("./pages/home/home.module").then(m => m.HomePageModule)
	},
	{
		path: "order-histories",
		loadChildren: () => import("./pages/order-histories/order-histories.module").then(m => m.OrderHistoriesPageModule)
	},
	{
		path: "order-received",
		loadChildren: () => import("./pages/order-received/order-received.module").then(m => m.OrderReceivedPageModule)
	},
	{
		path: "order-received/:order_id",
		loadChildren: () => import("./pages/order-received/order-received.module").then(m => m.OrderReceivedPageModule)
	},
	{
		path: "payment",
		loadChildren: () => import("./pages/payment/payment.module").then(m => m.PaymentPageModule)
	},
	{
		path: "privacy-policy",
		loadChildren: () => import("./pages/privacy-policy/privacy-policy.module").then(m => m.PrivacyPolicyPageModule)
	},
	{
		path: "product-detail",
		loadChildren: () => import("./pages/product-detail/product-detail.module").then(m => m.ProductDetailPageModule)
	},
	{
		path: "product-detail/:product_id",
		loadChildren: () => import("./pages/product-detail/product-detail.module").then(m => m.ProductDetailPageModule)
	},
	{
		path: "products-by-category",
		loadChildren: () => import("./pages/products-by-category/products-by-category.module").then(m => m.ProductsByCategoryPageModule)
	},
	{
		path: "products-by-category/:data_id",
		loadChildren: () => import("./pages/products-by-category/products-by-category.module").then(m => m.ProductsByCategoryPageModule)
	},
	{
		path: "products-by-tag",
		loadChildren: () => import("./pages/products-by-tag/products-by-tag.module").then(m => m.ProductsByTagPageModule)
	},
	{
		path: "products-by-tag/:data_id",
		loadChildren: () => import("./pages/products-by-tag/products-by-tag.module").then(m => m.ProductsByTagPageModule)
	},
	{
		path: "review",
		loadChildren: () => import("./pages/review/review.module").then(m => m.ReviewPageModule)
	},
	{
		path: "shipping-address",
		loadChildren: () => import("./pages/shipping-address/shipping-address.module").then(m => m.ShippingAddressPageModule)
	},
	{
		path: "shipping",
		loadChildren: () => import("./pages/shipping/shipping.module").then(m => m.ShippingPageModule)
	},
	{
		path: "wishlist",
		loadChildren: () => import("./pages/wishlist/wishlist.module").then(m => m.WishlistPageModule)
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
