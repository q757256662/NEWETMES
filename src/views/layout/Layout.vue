<template>
	<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar class="navbar"></navbar>
    	<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
			<app-main class="app-main" style="min-height:750px"></app-main>
				<div class="footer">
      <!--页脚-->
				<footer>
						<strong>Copyright 2018
								<a href="http://www.etsystem.cn/" target="blank">©深圳布易科技有限公司</a>
								All Rights Reserved.
								<img src="static/img/logo-blank.png" style="padding:10px">
						</strong>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
  import { Navbar, Sidebar, AppMain } from 'views/layout';
	import Hamburger from "components/Hamburger";
	import {
    mapGetters
  } from "vuex";

  export default {
    name: 'layout',
    components: {
      Navbar,
			Sidebar,
      Hamburger,
      AppMain
    },
    computed: {
      sidebar() {
        return this.$store.state.app.sidebar;
			},
			...mapGetters(["sidebar", "name", "avatar"])
		},
		methods:{
			toggleSideBar() {
        this.$store.dispatch("ToggleSideBar");
      },
		}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	$suoxiao:36px;
	$zhengchang:150px;
	.app-wrapper {
		@include clearfix;
		position: relative;
		overflow-x: hidden;
		height: 100%;
		width: 100%;
		&.hideSidebar {
			.sidebar-container{
				width:$suoxiao;
				// overflow: inherit;
				overflow-y: visible;
			}
			.main-container {
				margin-left: $suoxiao;
			}
			.hamburger-container{
				transition:none;
				left:30px;
			}
		}
		.sidebar-container {
			// transition: width 0.28s ease-out;
			width: 150px;
			// min-width:150px;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
		}
		.main-container {
			// min-height: 100%;
			// transition: margin-left 0.28s ease-out;
			margin-left: 150px;
			// width:89%;
			min-width:900px;
			background: #eef0f63b
			// max-width: 1713px;
		}
		.app-main{
			// height:800px;
			// height:850px;
			// border:1px solid red;
			min-height:800px;
		}
		.footer {
			// border: 1px red solid;
			// position: absolute;
			// height: 50px;
			width: 600px;
			margin:0 auto;
			/* background-color: #FFFFFF; */
			line-height: 50px;
			text-align: center;
			/* box-sizing: border-box; */
			/* border-top: 1px solid #CCCCCC; */
			// bottom:0px;
		}
		.hamburger-container{
			position: fixed;
			left:145px;
			top:300px;
			transition:none;
			z-index:2000;
			&:hover{
				z-index:2000;
			}
		}

	}
</style>
