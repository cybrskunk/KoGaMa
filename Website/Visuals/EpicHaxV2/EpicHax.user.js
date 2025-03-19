// ==UserScript==
// @name         EH Theme
// @namespace    https://greasyfork.org/en/users/776013-nemesism
// @version      0.5.3
// @description  Aesthetic enough?
// @author       Devorkk, Simon
// @match        https://www.kogama.com/*
// @match        https://kogama.com.br/*
// @match        https://friends.kogama.com/*
// @icon         https://i.pinimg.com/564x/95/8a/dd/958adde3415a8e5c8b66a7175cca9278.jpg
// @grant        none
// ==/UserScript==


const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}


injectCss("EH Theme",`
/* more advanced stuff */
  :root {
        --bg: #17181c; /* background */
        --bg-dark: #121316;  /* darken */
        --main: #34cd63;  /* green */
        --tmain: #34cd6391;  /* sopmething4sure */
        --border: 1px solid #74747724  /* green border */
    }

::-webkit-scrollbar {
    width: 3px !important;
}
::-webkit-scrollbar-thumb {
    background-image: linear-gradient(45deg, var(--general), var(--general));
    border-radius: 2px;
}


#profile-news-feed ul.news-feed-thumbs>li.item, #root-page-mobile #profile-news-feed .feed-comments .comments form textarea, #profile-status-update form.status-message textarea {
	background-color: var(--bg-dark);
}

#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user {
	text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
#root-page-mobile #content #content-container {
	background: var(--bg);
}
._3TORb ._1Yhgq, ._3TORb ._3iXbw, ._3TORb ._2E1AL {
	background: var(--bg);
}

.o_DA6 .uwn5j, ._375XK ._2XaOw, ._375XK textarea, ._375XK .F3PyX {
	background-color: var(--bg);
	border:  none
}

.zUJzi {
	border: solid var(--main) 1px;
}

._375XK textarea {
	color: var(--main);
}

._375XK ._2XaOw ._1j2Cd._1Xzzq p {
background-color: hsl(0deg 3% 11% / 80%);
color: rgb(74 241 79);
text-shadow: 0 0 3px #b03352;
}
._375XK ._2XaOw ._1j2Cd p {
background-color: hsl(0deg 3% 11% / 80%);
text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
.pure-button, .pure-button-small {
	background-color: var(--bg-dark);
	color: var(--main);
	border-radius: 25px;
		border: solid var(--main) 1px;
}
	body#root-page-mobile header#pageheader #meta-nav>li.profile-notify #header-icon {
		fill: #bf4358;
		text-shadow: 0 0 10px #b84d66;
	}
	body#root-page-mobile header#pageheader #meta-nav>li.profile-notify .header-icon-count {
		background-color: var(--bg-dark);
		right: 2px;
		font-size: .800rem;
		color: var(--main);
	}

#root-page-mobile #header-notify-toggle #notify .container {
    background-color: #121316;
    background-color: #121316;
    border-radius: 0 0 0 2px;
    border-bottom: 3px solid rgba(0,0,0,.3);
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li .text {
    color: #b84d66;
    text-shadow: 0 0 5px #eb655b;
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li .count {
        background-color: #d63e5f;
}

#root-page-mobile #header-notify-toggle #notify .container .exit a {
    border: none;
    padding-right: 10px;
    margin-top: 15px;
}
#root-page-mobile #header-notify-toggle #notify .container header {
    background-color: #121316;
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-messages ul li .username {
    color: #34cd63;
}

.pure-form input[type=color]:focus, .pure-form input[type=date]:focus, .pure-form input[type=datetime-local]:focus, .pure-form input[type=datetime]:focus, .pure-form input[type=email]:focus, .pure-form input[type=month]:focus, .pure-form input[type=number]:focus, .pure-form input[type=password]:focus, .pure-form input[type=search]:focus, .pure-form input[type=tel]:focus, .pure-form input[type=text]:focus, .pure-form input[type=time]:focus, .pure-form input[type=url]:focus, .pure-form input[type=week]:focus, .pure-form select:focus, .pure-form textarea:focus {
    background-color: #121316;
}

#mobile-page #profile-edit form .birthday-form .select select {
    background-color: #121316;
    }

	.xp-bar .xp-text, .xp-bar .progress {
		display: none;
	}
body#root-page-mobile header#pageheader #meta-nav>li.profile-credits .xp-level a {
	width: 40px;
}

.pure-input-1, .pure-input-1-2
 {
	color: #2572e6;
	text-shadow: 0 0 5px #7f78cf;
}
#mobile-page #profile-edit form .birthday-form .select {
	background-color: transparent;
}

#mobile-page #profile-edit form .birthday-form .select select {
	color: #db937b;
	text-shadow: 0 0 5px #b53133;
}

.icon-menu:before {
	color: #40a2ed;
	text-shadow: 0 0 5px #31d1f5;
}

body#root-page-mobile header#pageheader #profile-extended .user-credits .xp-level {
	flex-basis: 100%;
	display: none;
}



#root-page-mobile .comments li .body:hover {
background: var(--bg-dark);
}




#mobile-page .content-shop .shop-list .shop-item:hover .shop-price {
	visibility: visible;
	border: var(--border);
	border-radius: 10px;
	color: var(--main);
	opacity: unset;
	position: unset;
	background: var(--bg); 
}

#mobile-page .content-shop .shop-list .shop-item .shop-name {
	text-shadow: 0 0 5px #fff;
}

#mobile-page #product-detail .product-purchase .product-image-avatar  {
	border-radius: 25px;
}
#mobile-page #product-detail .product-purchase .product-image-model {
	border-radius: 25px;
}


#mobile-page #product-detail #product-purchase-link {
	    margin-top: -42px;
}


#mobile-page .games-list .game-item .game-name-stats {
	visibility: visible;
	border: var(--border);
	border-radius: 10px;
	opacity: unset;
	position: unset;
	background: var(--bg); }

	#mobile-page .games-list .game-item .game-image {
		padding-top: 63.42%;
		margin: -4px -20px;
		transition: 500ms;
		background-position: center;
		border: solid var(--bg) 10px;
		border-radius: 22px;

	}
	#mobile-page .games-list .game-item .game-name {
		color: var(--main);
		margin: -8px -5px -2px;
			     text-shadow: 0 0 1px #7bb08b;
		}


.games-stats {
	font-family: Open Sans, sans-serif;
	font-weight: 700;
	color: #e8e8e8;
	text-align: left;
	font-size: .75rem;
	margin: -2px -11px -5px;
	float: left; color: white; }


}
} .game-item {
	transform: scale(1); }

#profile-news-feed ul.news-feed-thumbs > li.item, #root-page-mobile #profile-news-feed .feed-comments .comments form textarea, #profile-status-update form.status-message textarea {
	border-radius: 25px;

}



#mobile-page #profile-avatar-list section.create-avatar-info {
	background-color: var(--bg-dark);
	background-image: var(--bg-dark);;
	border-radius: 40px;
			border: solid var(--bg) 10px;
			margin: 0px 0px 0px;
}

#mobile-page #profile-avatar-list section.create-avatar-info .call-to-action, #mobile-page #profile-avatar-list section.create-avatar-info .signup-button {
	background-color: #fff

}



#mobile-page #profile-avatar-list .avatar-list .item .set-active {
	border-radius: 0 0 5px 5px;
	background-color: var(--main);
	text-shadow: 0 0 5px #bf4358;
color: #fff;
}

#mobile-page #profile-page .section-top .profile-badges .profile-badge-list li.item .unseen .icon-gift {
	background-color: #bf4358;
}

#mobile-page #profile-page .section-top .profile-badges .profile-badge-list li.item .unseen {
background: #bf4358;
    background-color: #bf4358;
        background-image: linear-gradient(180deg,#bf4358 0,#bf4358);
}

#root-page-mobile .comments li .header .username a {
	padding-right: 20px;
	padding-left: 20px;
}
#root-page-mobile .comments li .text {
	padding-left: 15px;
}

#mobile-page #game-play section.game-stats-social .like-container {
	border-radius: 25px;
}



.pure-button-primary, .pure-button-selected, a.pure-button-primary, a.pure-button-selected {
	text-shadow: 0 0 5px #bf4358;
color: #e03a56;
background-color: #fff;
border-radius: 40px;
border: none;
}

#profile-friends section#find-friends .control-group input {
	background-color: var(--bg-dark);
	border-radius: 25px;
	border: solid var(--main) 1px;
	color: var(--main);
}
#profile-friends ul.friends li .body button, #profile-friends ul.results li .body button {
	border-radius: 25px;
		border: solid var(--main) 1px;
		background-color: var(--bg-dark);
}
.pure-form label {
		color: var(--main);
			text-shadow: 0 0 5px #bf4358;
	}

body#root-page-mobile header#pageheader #profile-extended {
	background-color: var(--bg-dark);

}
#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .header .username a {
		text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}

#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message, #profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message{
	color: #808080;
}
#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message a, #profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message a {
	color: #42ed48;
	font-weight: bold;
}
.icon-crown:before, .icon-users:before, #mobile-page #profile-page .section-top .progression .xp .symbol, #mobile-page #profile-page .section-top .progression .gold i.sprite-icon_gold_dark  {
	color: #bf4358;
	font-weight: 100;
}


.input-fill {
	color: var(--main);
}

#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .body {
border-radius: 25px;
}



#mobile-page #product-detail header.product-header h1 {
    color: var(--main);

}
.pure-button-secondary, a.pure-button-secondary {
		border-radius: 25px;
		border: solid var(--main) 1px;
		background-color: var(--bg-dark);
		color: rgb(224, 58, 86);
		text-shadow: rgb(191, 67, 88) 0px 0px 5px;
}


#mobile-page #product-detail header.product-header .product-creator a {
	color: #48d1f0;
	text-shadow: #489cf0 0 0 5px;
}

.pure-button-hover, .pure-button:focus, .pure-button:hover, a.pure-button:hover {
 text-shadow: 0 0 5px #bf4358;
    color: #e03a56;
}
#mobile-page #product-detail #product-purchase-link .purchase-button {
border-radius: 40px;
}

.modal-container .modal-content .pure-button-primary {
color: #e03a56;

}


.modal-container .modal-content .pure-button-primary:hover {
text-shadow: 0 0 5px #bf4358;
    color: #e03a56;
    }




#root-page-mobile .comments li .body {
	background-color: var(--bg-dark);
	border-radius: 25px;
		border: solid var(--main) 1px;
}

#root-page-mobile .comments li .body .arrow-left {
	display: none;
}
#root-page-mobile .comments li .body .arrow-left-border {
	display: none;
}

#root-page-mobile .comments li .header .username a {
	text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}
#root-page-mobile .comments li .text {
	color: #818385;
}


.pure-form input[type=color], .pure-form input[type=date], .pure-form input[type=datetime-local], .pure-form input[type=datetime], .pure-form input[type=email], .pure-form input[type=month], .pure-form input[type=number], .pure-form input[type=password], .pure-form input[type=search], .pure-form input[type=tel], .pure-form input[type=text], .pure-form input[type=time], .pure-form input[type=url], .pure-form input[type=week], .pure-form select, .pure-form textarea {
	background-color: var(--bg-dark);
	border-radius: 25px;
	border:  solid #1980e0 1px;
}

#root-page-mobile .comments form>button {
		border-radius: 25px;
		border: solid var(--main) 1px;
		background-color: var(--bg-dark);
}





/* glows n shit */
#mobile-page #profile-page .section-top .profile-meta .profile-created-date {
text-shadow: 0 0 5px #bf4358;
color: #e03a56;
}

#mobile-page #profile-page .section-top .username h2 a {
    color: rgb(58, 189, 232) !important;
    text-shadow: rgb(43, 127, 237) 0px 0px 5px 
}

#mobile-page #profile-page .section-top .username h2 {
text-shadow: 0 0 5px #bf4358;
    color: #e03a56;
}


._3TORb ._2E1AL {
	     text-shadow: 0 0 3px #ffffff;
     color: #ffffff;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item {
	background-color: transparent;
} 
.icon-vintage-robot:before, .icon-cubeforce-fix:before  {
	display: none;
}
	#mobile-page #profile-page section.creations-custom .creation-list .creation-item .display-image {
		display: none;
	}

#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container {
		padding-top: 0%;
}

#mobile-page #profile-page section.creations-custom .creation-list .creation-item .display-image {
	border-radius: 25px;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption {
			color: #db515a;
				text-shadow: 0 0 5px #e82c39;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .creation-stats {
		color: #3abde8;
		text-shadow: 0 0 5px #2b7fed;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption-container {
background-color: rgba(0,0,0,.3);
		visibility: visible;
	border: solid var(--main) 1px;
	border-radius: 10px;
	opacity: unset;
	position: unset;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container  {
	display: none;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container .inner {
	border: none;
}

._3TORb ._1lvYU ._1taAL p._3zDi- {

	     text-shadow: 0 0 3px #34cd63;
color: var(--main);
}

#mobile-page #profile-page section.creations-custom .section-description .description-container .text {
		     text-shadow: 0 0 3px #707d7b;
     color: #3abde8;
}

._3TORb ._2E1AL ._4RanE {
		   text-shadow: 0 0 1px #496fc9;
 color: #3abde8;
}

#mobile-page #profile-page .section-top .progression .progression-item .data {
	   text-shadow: 0 0 1px #7bb08b;
 color: var(--main);
}


._375XK .F3PyX ._2XzvN {
		     text-shadow: 0 0 1px #7bb08b;
 color: var(--main);
}

.zUJzi .o_DA6 .uwn5j ._3DYYr ._28mON header {
		     text-shadow: 0 0 1px #7bb08b;
 color: var(--main);
 border-right: none;
}

.zUJzi .o_DA6 .uwn5j {
border: none;
}

.uwn5j ._3DYYr ._1j2Cd {
	display: none;
}


#profile-news-feed ul.news-feed-thumbs>li.item .feed-comments .comments .paging .paginator a {
	  color: var(--main);
}

/* Purchase Confirmation */

#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content {
	border-radius: 25px;
	background-color: var(--bg-dark);
}

#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content .transaction-message {
	color: var(--tmain);
}

#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content .gold {
	    color: rgb(58, 189, 232) !important;
    text-shadow: rgb(43, 127, 237) 0px 0px 5px 
}

/* Username Change Confirmation */

#mobile-page #profile-username .modal-content {
		border:  solid #1980e0 1px;
			border-radius: 25px;
	background-color: var(--bg-dark);
		
}

.modal-container .modal-content .x {
	background-color: transparent;
}

#mobile-page #profile-username button.confirm-button .price, #mobile-page #profile-username button.purchase-button .price {
		    color: rgb(58, 189, 232) !important;
    text-shadow: rgb(43, 127, 237) 0px 0px 5px 
}

.modal-container .modal-content h3, .modal-container .modal-content h4 {
	color: rgb(219, 81, 90);
    text-shadow: rgb(232, 44, 57) 0px 0px 5px;
}

#mobile-page #profile-username .username-change-info ul li {
	color: var(--tmain);
}


.modal-container .modal-content {
	 	color: rgb(219, 81, 90);
    text-shadow: rgb(232, 44, 57) 0px 0px 5;
}



}`)
