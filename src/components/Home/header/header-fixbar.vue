<template>
    <div id="fixbar">
        <div id="header">
		<div class="container-collapse">
			<div class="mobile-nav-bar">
				<span id="mobile-menu-icon"><a href="#">☰</a></span>
				<div class="logo"><a href="#">The Best</a></div>
				<div id="header-cart-icon"><a href="#"><img src="../../../image/header-shopping-carticon.png"></a></div>
			</div>
			<div class="row header-bar">
				<div class="col-md-3 bg-light header-icon-left">
					<span><a href="#"><img src="../../../image/header-shopping-icon.png"></a></span>
					<span><a href="#"><img src="../../../image/header-man-icon.png"></a></span>
					<span><a href="#"><img src="../../../image/header-shopping-icon.png"></a></span>
					<span><a href="#">Blog</a></span>
				</div>

				<div class="col-lg-6 bg-light header-bar-middle">
					<span><a href="#">Free Shipping on Orders over $50</a></span>
				</div>

				<div class="col-lg-3 bg-light header-icon-right">
					<span><a href="#"><img src="../../../image/header-shopping-icon.png"></a></span>
					<span><a href="#"><img src="../../../image/header-man-icon.png"></a></span>
					<span><a href="#"><img src="../../../image/header-shopping-icon.png"></a></span>
					<span>
                            <router-link to="cart"> <a href="../cart/cart"><img src="../../../image/header-shopping-carticon.png">
                        </a></router-link></span>
				</div>

			</div>

        <div class="row header-second-bar">
                <div class="col-lg-6">
                    <div class="logo"><a href="#">The Best</a></div>
                </div>
                
                <div class="col-lg-6">
                    <div class="header-search-bar">
                            <input type="text" class="header-search form-control " placeholder="Search...">
                            <a href="#"><img class="search-icon" src="../../../image/header-search.png"></a>
                    </div>
                </div>
        </div>
                <div class="row">
                    <div class="col-md-12 bg-success header-promote">
                        <span>30% Off Spring Apparel & Bags.Shop Now Exclusions may apply</span>
                <Menu></Menu>

                    </div>
                </div>
        </div>
    </div>
</div>

</template>
<script>
import Menu from './header-menu.vue'
export default {
    components:{
        Menu
    }
    
}
</script>