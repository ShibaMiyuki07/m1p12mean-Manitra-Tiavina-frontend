import {Component} from "@angular/core";
import {HeaderComponent} from "../../../components/header/header.component";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {FooterComponent} from "../../../components/footer/footer.component";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../../models/User";
import {lastValueFrom} from "rxjs";
import {CartService} from "../../../services/cartApi/api-cart-service.service";
import {CartProduct} from "../../../models/apiResult/CartProduct";
import {PromotionService} from "../../../services/promotionApi/api-promotion-service.service";
import {CartServiceResult} from "../../../models/apiResult/CartService";
import {format} from "date-fns";
import {MechanicService} from "../../../services/mechanicApi/api-mechanic-service.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: [
    './checkout.component.css',
    '../../../../assets-bosh/css/font_awesome_all.css',
    '../../../../assets-bosh/css/flaticon.css',
    '../../../../assets-bosh/css/icomoon.css',
    '../../../../assets-bosh/css/owl.css',
    '../../../../assets-bosh/css/bootstrap.css',
    '../../../../assets-bosh/css/jquery.fancybox.min.css',
    '../../../../assets-bosh/css/animate.css',
    '../../../../assets-bosh/css/hover.css',
    '../../../../assets-bosh/css/global.css',
    '../../../../assets-bosh/css/nice_select.css',
    '../../../../assets-bosh/css/jquery_ui.css',
    '../../../../assets-bosh/css/elpath.css',
    '../../../../assets-bosh/css/progresscircle.css',
    '../../../../assets-bosh/css/hover.css',
    '../../../../assets-bosh/css/element_css/preloader.css',
    '../../../../assets-bosh/css/element_css/time-travel.css',
    '../../../../assets-bosh/css/element_css/categories.css',
    '../../../../assets-bosh/css/element_css/dot_style_one.css',
    '../../../../assets-bosh/css/element_css/owl_nav_one.css',
    '../../../../assets-bosh/css/element_css/pagination.css',
    '../../../../assets-bosh/css/element_css/bootsrap_tuchpin.css',
    '../../../../assets-bosh/css/element_css/search_popup.css',
    '../../../../assets-bosh/css/element_css/header_top.css',
    '../../../../assets-bosh/css/element_css/header_upper.css',
    '../../../../assets-bosh/css/element_css/header_lower.css',
    '../../../../assets-bosh/css/element_css/menu_sidebar.css',
    '../../../../assets-bosh/css/element_css/menu.css',
    '../../../../assets-bosh/css/element_css/mobile_menu.css',
    '../../../../assets-bosh/css/element_css/banner.css',
    '../../../../assets-bosh/css/element_css/cta_section.css',
    '../../../../assets-bosh/css/element_css/cart_section.css',
    '../../../../assets-bosh/css/element_css/check_box.css',
    '../../../../assets-bosh/css/element_css/check_out.css',
    '../../../../assets-bosh/css/element_css/xs_sidebar.css',
    '../../../../assets-bosh/css/element_css/page_title.css',
    '../../../../assets-bosh/css/element_css/feature_block_one.css',
    '../../../../assets-bosh/css/element_css/product_block_one.css',
    '../../../../assets-bosh/css/element_css/clients_one.css',
    '../../../../assets-bosh/css/element_css/newsletter_one.css',
    '../../../../assets-bosh/css/element_css/main_footer_one.css',
    '../../../../assets-bosh/css/element_css/footer_bottom_one.css',
    '../../../../assets-bosh/css/element_css/scroll_to_top.css',
    '../../../../assets-bosh/css/element_css/week_sale.css',
    '../../../../assets-bosh/css/element_css/add.css',
    '../../../../assets-bosh/css/element_css/brand.css',
    '../../../../assets-bosh/css/element_css/blog.css',
    '../../../../assets-bosh/css/responsive.css',
    '../../../../assets-bosh/css/style.css',
  ],
  imports: [
    HeaderComponent,
    LoaderComponent,
    FooterComponent,
    FormsModule
  ],
  standalone: true
})


export class CheckoutComponent {

  currentActiveMenu: string = 'checkout';
  cart: any;
  user: User | undefined;
  totalPanier: number = 0;
  totalPanierPromotion: number = 0;
  isLoading = true;
  listServices: any[] = [];
  listProducts: any[] = [];

  constructor(private authService: AuthService, protected cartService: CartService, private promotionService: PromotionService, private mechanicService: MechanicService) {}

  async ngOnInit() {
    this.cart = await lastValueFrom(this.cartService.loadCart());
    this.user = await lastValueFrom(this.authService.getUserById());
    await this.loadProducts();
    await this.loadServices();
    await this.calculateTotalPanier();
  }

  async loadServices() {
    this.listServices = await Promise.all(
      this.cart.services.map(async (item : CartServiceResult) => {
        try {
          const promotionCheck = await lastValueFrom(
            this.promotionService.checkServicePromotion(item.serviceId._id)
          );

          const dateFromItem = new Date(item.date); // ou new Date(item.date)
          const formattedDate = format(dateFromItem, "yyyy-MM-dd'T'HH:mm");
          console.log("date ", formattedDate);

          return {
            ...item,
            serviceId: {
              ...item.serviceId, // Conserve les infos du produit
              isInPromotion: promotionCheck?.isInPromotion || false,
              promotion: promotionCheck?.promotion || null
            },
            formattedDate: formattedDate,
          };
        } catch (error) {
          console.error(`Erreur promotion pour produit ${item.serviceId._id}`, error);
          return {
            ...item,
            serviceId: {
              ...item.serviceId,
              isInPromotion: false,
              promotion: null
            }
          };
        }
      })
    );
  }

  async loadProducts() {
    this.listProducts = await Promise.all(
      this.cart.products.map(async (item : CartProduct) => {
        try {
          const promotionCheck = await lastValueFrom(
            this.promotionService.checkProductPromotion(item.productId._id)
          );

          return {
            ...item, // Conserve toutes les propriétés existantes
            productId: {
              ...item.productId, // Conserve les infos du produit
              isInPromotion: promotionCheck?.isInPromotion || false,
              promotion: promotionCheck?.promotion || null
            },
            // La quantité reste inchangée (item.quantity)
          };
        } catch (error) {
          console.error(`Erreur promotion pour produit ${item.productId._id}`, error);
          return {
            ...item,
            productId: {
              ...item.productId,
              isInPromotion: false,
              promotion: null
            }
          };
        }
      })
    );
  }

  async calculateTotalPanier() {
    this.totalPanier = 0;
    this.totalPanierPromotion = 0;

    for (let i = 0; i < this.listProducts.length; i++) {
      let item = this.listProducts[i];
      this.totalPanier = this.totalPanier + (item.productId?.price * item.quantity || 0);
      if (item.productId.isInPromotion) {
        this.totalPanierPromotion = this.totalPanierPromotion + (this.calculateDiscountedPrice(item.productId.price, item.productId.promotion.discount) * item.quantity);
      } else {
        this.totalPanierPromotion = this.totalPanierPromotion + (item.productId.price * item.quantity);
      }
    }

    for (let i = 0; i < this.listServices.length; i++) {
      let item = this.listServices[i];
      this.totalPanier = this.totalPanier + item.serviceId.price;
      if (item.serviceId.isInPromotion) {
        this.totalPanierPromotion = this.totalPanierPromotion + this.calculateDiscountedPrice(item.serviceId.price, item.serviceId.promotion.discount);
      } else {
        this.totalPanierPromotion = this.totalPanierPromotion + item.serviceId.price;
      }
    }
  }

  calculateDiscountedPrice(originalPrice: number, discount: number): number {
    return originalPrice * (1 - discount / 100);
  }
}
