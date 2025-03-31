import {AfterViewInit, Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {FooterComponent} from "../../components/footer/footer.component";
import {LoaderComponent} from "../../components/loader/loader.component";
import {HeaderComponent} from "../../components/header/header.component";
import 'owl.carousel';
import {ApiProductServiceService} from "../../services/productApi/api-product-service.service";
import {GroupedProducts} from "../../models/apiResult/GroupedProducts";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../../../assets-bosh/css/font_awesome_all.css',
    '../../../assets-bosh/css/flaticon.css',
    '../../../assets-bosh/css/icomoon.css',
    '../../../assets-bosh/css/owl.css',
    '../../../assets-bosh/css/bootstrap.css',
    '../../../assets-bosh/css/jquery.fancybox.min.css',
    '../../../assets-bosh/css/animate.css',
    '../../../assets-bosh/css/hover.css',
    '../../../assets-bosh/css/global.css',
    '../../../assets-bosh/css/nice_select.css',
    '../../../assets-bosh/css/progresscircle.css',
    '../../../assets-bosh/css/jquery_ui.css',
    '../../../assets-bosh/css/elpath.css',
    '../../../assets-bosh/css/hover.css',
    '../../../assets-bosh/css/element_css/preloader.css',
    '../../../assets-bosh/css/element_css/time-travel.css',
    '../../../assets-bosh/css/element_css/categories.css',
    '../../../assets-bosh/css/element_css/instagram.css',
    '../../../assets-bosh/css/element_css/dot_style_one.css',
    '../../../assets-bosh/css/element_css/owl_nav_one.css',
    '../../../assets-bosh/css/element_css/pagination.css',
    '../../../assets-bosh/css/element_css/search_popup.css',
    '../../../assets-bosh/css/element_css/header_top.css',
    '../../../assets-bosh/css/element_css/header_upper.css',
    '../../../assets-bosh/css/element_css/header_lower.css',
    '../../../assets-bosh/css/element_css/menu_sidebar.css',
    '../../../assets-bosh/css/element_css/menu.css',
    '../../../assets-bosh/css/element_css/mobile_menu.css',
    '../../../assets-bosh/css/element_css/banner.css',
    '../../../assets-bosh/css/element_css/cta_section.css',
    '../../../assets-bosh/css/element_css/feature_block_one.css',
    '../../../assets-bosh/css/element_css/product_block_one.css',
    '../../../assets-bosh/css/element_css/clients_one.css',
    '../../../assets-bosh/css/element_css/newsletter_one.css',
    '../../../assets-bosh/css/element_css/main_footer_one.css',
    '../../../assets-bosh/css/element_css/footer_bottom_one.css',
    '../../../assets-bosh/css/element_css/scroll_to_top.css',
    '../../../assets-bosh/css/element_css/week_sale.css',
    '../../../assets-bosh/css/element_css/add.css',
    '../../../assets-bosh/css/element_css/brand.css',
    '../../../assets-bosh/css/element_css/blog.css',
    '../../../assets-bosh/css/responsive.css',
    '../../../assets-bosh/css/style.css',
  ],
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    LoaderComponent,
    HeaderComponent
  ],
  standalone: true
})
export class HomeComponent{

  countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  };

  currentActiveMenu: string = 'home';
  private countdownInterval: any;
  private carousel: any;
  groupedProducts: GroupedProducts[] = [];
  selectedCategory: string = 'Pneumatique';

  constructor(private productService: ApiProductServiceService) {}

  ngOnInit() {
    this.startCountdown();
    this.loadGroupedProducts();
  }

  ngAfterViewInit() {
    this.initOwlCarousel();
    this.initSingleItemCarousel();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    if (this.carousel) {
      this.carousel.trigger('destroy.owl.carousel');
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    // Ajoutez ici toute logique supplémentaire
  }

  private loadGroupedProducts() {

    this.productService.getProductsGroupedByCategory().subscribe({
      next: (data) => {
        this.groupedProducts = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  getSafeImagePath(filename: string): string {
    // Vérifie que le fichier existe
    const fullPath = `assets-bosh/images/product/${filename}`;
    console.log('Tentative de chargement :', fullPath); // Debug
    return fullPath;
  }

  private initOwlCarousel() {
    if ($('.banner-carousel').length) {
      $('.banner-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1000,
        autoplay: true,
        autoplayTimeout: 6000,
        navText: ['<span class="nav-arrow">‹</span>', '<span class="nav-arrow">›</span>'],
        responsive: {
          0: { items: 1 },
          600: { items: 1 },
          800: { items: 1 },
          1024: { items: 1 }
        },
        onTranslated: function() {
          // Réinitialise les animations à chaque changement de slide
          $('.owl-item').removeClass('temp-active');
          setTimeout(() => {
            $('.owl-item.active').addClass('temp-active');
          }, 50);
        },
        onInitialized: function() {
          $('.owl-item.active').addClass('temp-active');
        }
      });
    }
  }

  private initSingleItemCarousel() {
    if ($('.single-item-carousel').length) {
      this.carousel = $('.single-item-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 500,
        autoplay: true,
        navText: [
          '<span class="fas fa-angle-left"></span>',
          '<span class="fas fa-angle-right"></span>'
        ],
        responsive: {
          0: { items: 1 },
          480: { items: 1 },
          600: { items: 1 },
          800: { items: 1 },
          1200: { items: 1 }
        }
      });
    }
  }

  private formatNumber(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private startCountdown() {
    const countDownDate = new Date("Apr 6, 2025 15:37:25").getTime();

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        this.countdown = { days: '00', hours: '00', minutes: '00', seconds: '00' };
        clearInterval(this.countdownInterval);
        return;
      }

      this.countdown = {
        days: this.formatNumber(Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: this.formatNumber(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: this.formatNumber(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: this.formatNumber(Math.floor(distance % (1000 * 60) / 1000))
      };
    }, 1000);
  }
}
