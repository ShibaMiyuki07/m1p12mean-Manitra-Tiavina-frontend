import {Component, AfterViewInit, Input} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
  ],
  templateUrl: './header.component.html',
  styleUrls: [
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
})
export class HeaderComponent {

  @Input() activeMenu: string = '';

  protected isConnected = this.checkConnection();

  protected username = localStorage.getItem("username");

  constructor(public authService: AuthService) {}

  private checkConnection(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  ngAfterViewInit() {
    $(".search-menu").on('click', () => {
      $("#menupop").fadeIn("slow");
    });

    $(".menupop-close").on('click', () => {
      $("#menupop").fadeOut("slow");
    });

    this.initMobileMenu();
  }

  initMobileMenu() {
    if ($('.mobile-menu').length) {
      const mobileMenuContent = $('.main-header .menu-area .main-menu').html();
      $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
      $('.sticky-header .main-menu').append(mobileMenuContent);

      $('.mobile-menu li.dropdown .dropdown-btn').on('click', (e: { currentTarget: any; }) => {
        const $target = $(e.currentTarget);
        $target.toggleClass('open');
        $target.prev('ul').slideToggle(500);
      });

      $('.mobile-nav-toggler').on('click', () => {
        $('body').addClass('mobile-menu-visible');
      });

      $('.mobile-menu .menu-backdrop, .mobile-menu .close-btn').on('click', () => {
        $('body').removeClass('mobile-menu-visible');
      });
    }
  }
}
