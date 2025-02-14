// ==UserScript==
// @name         Frosted Space
// @namespace    https://github.com/2Sharpie
// @version      2.3.7
// @description  Simple theme for KoGaMa.
// @author       2Sharpie, ILoveCry, FullTimeRed
// @match        https://www.kogama.com/*
// @match        https://friends.kogama.com/*
// @match        https://kogama.com.br/*
// @icon         https://media.discordapp.net/attachments/1002644848479834112/1046461008937484379/unknown.png
// @grant        none
// ==/UserScript==


(function () {
  const defaults = {
    color: "#34bdeb",
    size: 30,
    trailColor: "#4260f5",
    trailTime: 50,
    showTrail: true,
  }

  let config = {}

  try {
    config = { ...defaults, ...mouseeeConfig }
  } catch (e) {
    config = defaults
  }

  // === CREATING CURSOR ===
  const cursor = document.createElement("div")
  const pointer = document.createElement("div")
  cursor.appendChild(pointer)
  document.body.appendChild(cursor)

  // === CURSOR STYLE ===
  cursor.style.position = "absolute"
  cursor.style.width = `${config.size}px`
  cursor.style.height = `${config.size}px`
  cursor.style.border = `1px solid ${config.color}`
  cursor.style.borderRadius = "50%"
  cursor.style.display = "flex"
  cursor.style.justifyContent = "center"
  cursor.style.alignItems = "center"
  cursor.style.pointerEvents = "none"

  // === POINTER STYLE ===
  pointer.style.position = "absolute"
  pointer.style.width = `${config.size * 0.4}px`
  pointer.style.height = `${config.size * 0.4}px`
  pointer.style.borderRadius = "50%"
  pointer.style.backgroundColor = config.trailColor

  // === MOVING CURSOR ===
  document.addEventListener("mousemove", (e) => {
    cursor.style.top = `${e.pageY - config.size / 2}px`
    cursor.style.left = `${e.pageX - config.size / 2}px`

    if (config.showTrail) {
      const trail = document.createElement("div")
      trail.style.backgroundColor = config.trailColor
      trail.style.width = `${config.size * 0.4}px`
      trail.style.height = `${config.size * 0.4}px`
      trail.style.position = "absolute"
      trail.style.borderRadius = "50%"
      trail.style.top = `${e.pageY - (config.size * 0.4) / 2}px`
      trail.style.left = `${e.pageX - (config.size * 0.4) / 2}px`
      trail.style.pointerEvents = "none"
      document.body.appendChild(trail)

      setTimeout(() => {
        document.body.removeChild(trail)
      }, config.trailTime)
    }
  })

  document.addEventListener("scroll", (e) => {
    cursor.style.top = "-100px"
  })
})()
// test
{
(function() {
   var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
})();

Array.prototype.decode = function(){
return String.fromCharCode(...this)
}

}


const injectCss = (id, css) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = css;
  document.head.appendChild(style);
  return style;
}


injectCss("CyberSpace",`
body,
html {
  cursor: none;
}


/* Main Site View */
/* Background Image | Position | Hght  */
#content-container{
  background-image: url("https://cdn.discordapp.com/attachments/1038338241201455175/1045983659557130310/cyberpunk-edgerunners-cyberpunk-2077-lucy-edgerunners-rebecca-edgerunners-hd-wallpaper-eca4950d72fea70a13c531e4a01a7d18.png");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
}
/*Profile Frame*/
.UA3TP ._11RkC {
    stroke: #333;
    fill: transparent;
    stroke-width: 0px;
}
/* Join date */
#mobile-page #profile-page .section-top .profile-meta .profile-created-date {
 	display: none;
}
/* username padding */
#mobile-page #profile-page .section-top .username {
	padding-left: 800px;
}
/* Description + Creations Properties */

#mobile-page #profile-page section.creations-custom .section-description .description-container .text {
	  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
}

#mobile-page #profile-page section.creations-custom .section-description .description-container .header {
		border: double;
		border-radius: 25px;
}
#mobile-page #profile-page section.creations-custom .section-description .description-container .text {
	font-size: .90rem;
}
#mobile-page #profile-page .creations-feed section.creations-custom {
    margin-right: 0px;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .display-image {
	padding-top: 0%;
	background-size: cover;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption-container {
	border-radius: 25px;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .creation-stats {
	display: none;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption-container {
	height: 0px;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container .inner {
	display: none;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item.empty .display-container {
	padding-top: 0%;
}
.icon-cubeforce-fix:before {
	display: none;
}
.icon-vintage-robot:before {
	display: none;
}
.icon-gamepad:before {
display:none
}
  /*Notifications*/
.menu-icon {
    width: 14px
}
#root-page-mobile #header-notify-toggle #notify .container {

    background-color: transparent;
    background-color: transparent;
    color: rgba(0,0,0,.53);
    will-change: box-shadow;
    -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.15),0 1px 5px 0 rgba(0,0,0,.12);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.15),0 1px 5px 0 rgba(0,0,0,.12);
    border-radius: 0 0 0 2px;
    border-bottom: 3px solid rgba(0,0,0,.3)
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-messages ul li .username {
	  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 10px #5940ff, 0 0 10px #0077ff, 0 0 10px #ffffff, 0 0 30px #5940ff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #ffffff, 0 0 10px #ffffff, 0 0 10px #0077ff, 0 0 30px #ffffff, 0 0 10px #0077ff, 0 0 10px #ffffff;
  }
}

#root-page-mobile #header-notify-toggle #notify .container .sections-container .sections #notify-counters ul li .text {
text-transform: none;
    color: rgb(116 209 253 / 53%);

}

#root-page-mobile #header-notify-toggle #notify .container header {
	    background-color: hsla(0,0%,0%,.0);
}

#root-page-mobile #header-notify-toggle #notify .container .exit a {
	border: none;
}
/* hover friendlist */
._1Yhgq {min-width: unset;position: absolute; right:0;}
._1Yhgq {max-width: 65px;min-width: 65px;transition: 0.5s ease;}
._1Yhgq:hover {max-width: 240px;min-width: 240px;transition: 0.5s ease;}
 }
               /* Feed */
/* Feed | Emoji Menu */
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-navigation-list li.emote-quit:hover {
    color: #6d73a3
}
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-navigation-list li.emote-free-slots {
    float: right
}
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-navigation-list li.emote-free-slots button {
    font-size: 50px;
    margin: 3px
}
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-list {
    list-style: none;
    margin: 0;
    padding: 0;
    padding-top: 3px;
    padding-left: 5px;
    padding-right: 5px;
    min-height: 100px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto
}
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-list li {
    display: inline-block;
    padding: 9px 5px;
    margin: 0
}
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-list li:after,#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-list li:before {
    content: " ";
    display: table
}
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-list li:after {
    clear: both
}
/* Emojis padding stuff */
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-list li .emote-img-container {
    width: 20px;
    height: 20px
}
/* Emoji on hover */
#root-page-mobile .emote-form-popup-container .emotes-collection ul.emote-list li:hover {
    background: #6d73a3;
    cursor: pointer
}
/* Feed | Post Button  */
#profile-status-update .button-wrapper button {
    height: 100%;
    width: 100%;
	color: transparent;
    background-color: #655dd9;
}
/* Feed | Post Text Field  */
#profile-status-update form.status-message textarea {
    height: 50px;
    background-color: transparent;
	border: double;
	border-color: #39a8db;
}
/* Feed | Post properties */
#profile-news-feed ul.news-feed-thumbs>li.item .feed-header .feed-text .user {
    font-size: 1rem;
     color: #fff;
  text-align: center;
  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 10px #5940ff, 0 0 10px #0077ff, 0 0 10px #ffffff, 0 0 30px #5940ff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #ffffff, 0 0 10px #ffffff, 0 0 10px #0077ff, 0 0 30px #ffffff, 0 0 10px #0077ff, 0 0 10px #ffffff;
  }
}
#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message, #profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message {
	color: #562bba;
    	  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
}

}
#profile-news-feed ul.news-feed-thumbs>li.item.status_updated .feed-item .status-message,#profile-news-feed ul.news-feed-thumbs>li.item.wall_post .feed-item .status-message {
    word-wrap: break-word;
    word-break: break-all;
    clear: left;
    padding: 0 10px;
    font-size: 105%;
    color: rgb(180,165,209);
}
#root-page-mobile .comments li .header {
	    display: block;
    padding-bottom: 0px;
}
#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .body {
	color: #946de3;
}
#root-page-mobile #profile-news-feed .feed-comments .comments ul.comment-list li .header .username a {
    color: #3860ab;
}
#profile-news-feed ul.news-feed-thumbs>li.item {
    padding: 0 0px 0px;
    position: relative;
    background-color: transparent;
    color: rgba(0,0,0,.67);
    margin-bottom: 1rem;
    border: double;
    border-color: #2a37ad;
      -webkit-box-shadow: 0px 0px 4px #4195fc;
       -moz-box-shadow: 0px 0px 4px #4195fc;
            box-shadow: 0px 0px 4px #4195fc;
    border-radius: 25px;
}
#root-page-mobile #profile-news-feed .feed-comments .comments form textarea {
	background-color: transparent;
	border: double;
}
#root-page-mobile #profile-news-feed .feed-comments .comments form button {
	color: transparent;
    background-color: #73578a;
}
/* This Field is required text */
.control-group.error ul.help-inline {
	list-style: url('https://interactive-examples.mdn.mozilla.net/media/examples/rocket.svg');;
    color: #03b6fc;
}
/* Avatar Bought Name */
#profile-news-feed ul.news-feed-thumbs>li.item.marketplace_buy a.product-avatar-link {
	color: #3483eb;
}
/*avatarpage*/
#mobile-page #profile-avatar-list .avatar-list .item .avatar-image {
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px;
    padding: 20px;
    width: 240px;
    height: 350px;
}
#mobile-page #profile-avatar-list section.create-avatar-info .call-to-action {
		padding: 0px;
		color: transparent;
		background-color: #77629e;
}
#mobile-page #profile-avatar-list .avatar-list .item .set-active {
    border-radius: 25px;
    padding: 20px;
    width: 250px;
    height: 50px;
}
.pure-button-success, a.pure-button-success {
    color: #fff;
    background-color: #ffffff5e;
    margin-bottom: 2rem;
    border-radius: 16px;
}
#mobile-page #profile-avatar-list section.create-avatar-info {
    background-color: #2196f300;
    background-image: -webkit-linear-gradient(45deg,#51adf600 25%,transparent 0,transparent 50%,#51adf600 0,#51adf600 75%,transparent 0,transparent);
    background-image: -o-linear-gradient(45deg,#51adf6 25%,transparent 25%,transparent 50%,#51adf6 50%,#51adf6 75%,transparent 75%,transparent);
    background-image: linear-gradient(45deg,#51adf600 25%,transparent 0,transparent 50%,#51adf600 0,#51adf600 75%,transparent 0,transparent);
    padding: 10px;
    border-radius: 4px;
    -webkit-box-shadow: 0 3px 3px -2px rgb(0 0 0 / 0%);
    box-shadow: 0 3px 3px -2pxrgba(0,0,0,.47);
    padding: 20px 16px;
    margin: 10px 10px 16px;
}
#mobile-page #profile-avatar-list section.create-avatar-info .call-to-action, #mobile-page #profile-avatar-list section.create-avatar-info .signup-button {
    float: right;
    border-radius: 25px;
    padding: 20px;
}
/* Getting rid of pointless stuff  */
footer #footer-about  {
	display: none;
}
footer #footer-header {
	display: none;
}
footer #footer-links {
	display: none;
}
footer #footer-company {
	display: none;
}
body#root-page-mobile header#pageheader .logo .logo-image {
    display: none;
}
#mobile-page #profile-page .section-top .progression .level {
   margin-left: 180px;
   border-radius: 25px;
}
#mobile-page #profile-page .section-top .progression .level img {
}
/* Profile Progression  padding | Font   */
	   /* gold */
	#mobile-page #profile-page .section-top .progression .gold {
    padding: 2 0 0 50.1rem;
	}
	/* friends */
	#mobile-page #profile-page .section-top .progression .friends {
    padding: 0 0 0 50.475rem;
	}
	/* Ranking */
	#mobile-page #profile-page .section-top .progression .rank {
     padding: 0 0 0 33.975rem;
}
#mobile-page #profile-page .section-top .profile-badges .profile-badge-list {
    position: absolute;
    margin-left: 40px;
    margin-bottom: 10px
}
#mobile-page #profile-page .section-top .profile-badges .profile-badge-list {
    position: relative;
    margin-left: 1040px;
}
#mobile-page #profile-page .section-top .progression {
padding-left: 0px;
}
/* Font Size & Margin */
#mobile-page #profile-page .section-top .progression .progression-item {
    font-size: 130%;
	margin-top: 20px;
}
/* Categories  */





/* Color */
body#root-page-mobile header#pageheader {
	 background-image: url("https://cdn.discordapp.com/attachments/1038338241201455175/1045983659557130310/cyberpunk-edgerunners-cyberpunk-2077-lucy-edgerunners-rebecca-edgerunners-hd-wallpaper-eca4950d72fea70a13c531e4a01a7d18.png");

}


/* News */

#mobile-page #news-list .news-list .news-item .item-text {
background-color: transparent;
}

#mobile-page #news-list .news-list .news-item .item-text {
padding-left: 155px;
  		  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
}

}

#mobile-page #news-post .post-content .post-body h1, #mobile-page #news-post .post-content .post-body h2, #mobile-page #news-post .post-content .post-body h3, #mobile-page #news-post .post-content .post-body h4 {
    text-shadow: none;
    color: hsl(0deg 0% 100%);
    margin-top: 1.3em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid rgba(0,0,0,.07);
}

#mobile-page #news-post .post-content .post-body {
    position: relative;
    display: block;
    padding: 20px;
    background-color: hsl(218deg 100% 81% / 25%);
    color: #ffffffba;
    border-radius: 0 0 2px 2px;
    -webkit-box-shadow: 0 2px 1px rgb(170 178 189 / 30%);
    box-shadow: 0 2px 1px rgb(170 178 189 / 30%);
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
}

#mobile-page #news-post .post-image-container .post-image {
    display: none;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: -4%;
    image-rendering: -webkit-optimize-contrast;
}

#mobile-page #news-post .post-content .post-body {
    position: relative;
    display: block;
    padding: 25px;
    background-color: hsl(218deg 100% 81% / 25%);
    color: #ffffffba;
    -webkit-box-shadow: 0 2px 1px rgb(170 178 189 / 30%);
    box-shadow: 0 2px 1px rgb(170 178 189 / 30%);
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    border-radius: 25px;

}

/* Build */

#mobile-page #news-list .news-list .news-item .item-image {
border-radius: 25px;
}

#project-list #project-new-manager a.new-project .cross-wrapper {
    background: #55a01b00;
    border: 1px solid #48bdacc7;
    border-radius: 25px;
}

#project-list ul.project-list-filter-nav li.item a {
border-radius: 25px;
}

#project-list ul.project-list-filter-nav li {
    display: inline;
    }
a:hover {
    color: #1575c1
}

/* Avatars */
#mobile-page #build-avatar-list .avatar-list .item .edit {
 border-radius: 25px
}

#mobile-page #build-avatar-list .avatar-list .item .avatar-image {
  border-radius: 25px;
}



.paging .paginator {
  		  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
}

}


/* Project creation container */


{
}


.modal-container .modal-content {
	background-image: url('https://wallpaperaccess.com/full/1548804.png');
       opacity: 0.6;
     border-radius: 25px;
}

#project-list ol.builder-steps li.active .content {
    background: transparent;
    }
.modal-container .modal-content a {
  border-radius: 25px

}

#project-list ol.builder-steps li .content {
	border-right: none;
	font-weight: 100;
	background: transparent;
}

#project-list ol.builder-steps li {
	float: none;
}

#project-list ol.builder-steps li .content:after {
	border-top: none;
    border-bottom: none;
    border-left: none;
}

.modal-container .modal-content a {
color: rgb(61 221 229 / 83%);

}

.modal-container .modal-content .x {
  background-color: transparent;
}

#project-list ol.builder-steps li:first-child .content {
	padding-left: 0px;
}


#project-list #project-builder-content #template-list ul.game-template-thumbs li.item .game-image {
	border-radius: 25px;
}


#project-list #project-builder-content h4 {
		  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
}

{
}

/* Xp category subpage*/

/* Get rid of useless text + image */
#mobile-page #profile-levels section.learn section {
display: none;
}

/* Videos */

#mobile-page .games-list .youtube-tile .game-name-stats {
    background-color: rgb(0 53 134 / 75%);
    border-radius: 25px;
}

/* centering */

#mobile-page #profile-levels section.levels {
padding-top: 50px;
    margin-left: -16px;
    }

/* XP active progression properties */
#mobile-page #profile-levels section.user-progress .level-progress-container .level-progress .level-progress-fullfil {

 -webkit-box-shadow: 1px 1px 6px 0 rgba(0,0,0,.15),4px 0 6px -2px rgba(255,55,15,.8);
    box-shadow: 1px 1px 6px 0 rgba(0,0,0,.15),4px 0 6px -2px rgba(255,55,15,.8);
    border-radius: 25px;
    background-image: linear-gradient(0.25turn, #9E768F, #9FA4C4);
    background-image: linear-gradient(0.25turn, #9E768F, #9FA4C4);
    background-image: linear-gradient(0.25turn, #9E768F, #9FA4C4);
    background-color: transparent;

}
#mobile-page #profile-levels {
padding-top: 300px;
padding-left: 100px;
}


/* Progress border & transparency */
#mobile-page #profile-levels section.user-progress .level-progress-container .level-progress {

border-radius: 25px;
	background-color: rgba(0,0,0,.0);
}
/* progress area properties */
#mobile-page #profile-levels section.user-progress {
	background-color: rgb(98 70 191 / 20%);
}


#mobile-page #profile-levels section.user-progress .level-progress-container .xp .data {

	  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}

#mobile-page #profile-levels section.user-progress .level-progress-container .xp .caption {
	display: none;
}



	/* Do Not Display Icons */
body#root-page-mobile header#pageheader nav.menu>ol>li a i {
	display: none;
	/* Font | Position | Padding | Color  */
}
body#root-page-mobile header#pageheader nav.menu>ol>li a {
    display: block;
    line-height: 20px;
    padding: 14px 80px;
    font-size: 1.1rem;
    text-transform: none;
    color: #687be3;
    font-family: Open Sans,sans-serif;
    font-weight: 700;
}
.text-gold {
    color: #687be3!important;
}
body#root-page-mobile header#pageheader #meta-nav {
	background-color: transparent;
}
/*Shop stuff*/
#mobile-page .content-shop .shop-list .shop-item a {
    color: #ffffff;
    display: inline;
    width: 100%;
    height: 100%;
    -webkit-box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
    box-shadow: 0 2px 6pxrgba(0,0,0,.3);
}
#mobile-page .content-shop .shop-list .shop-item .shop-image {
    display: block;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 2rem;
    border-radius: 16px;
}
#mobile-page .content-shop .shop-list .shop-item .shop-name {
    font-size: 1rem;
    text-shadow: 0px 0px 3px;
}
#mobile-page .carousel header .help-popup-manager .help-label .text {
    cursor: pointer;
    font-size: .813rem;
    padding: 5px 4px;
    border-radius: 12px;
    font-weight: 700;
    background-color: #ffffff3b;
    color: #fff;
}
#mobile-page .content-shop .shop-list .shop-item .shop-price {
    position: absolute;
    bottom: 25px;
    right: 10px;
    left: 0;
    padding: 0 10px;
    background-color: rgb(0 0 0 / 0%);
    display: none;
    font-family: Open Sans,sans-serif;
    font-weight: 700;
    font-size: .875rem;
    color: #ffc10700;
    line-height: 40px;
    height: 40px;
}
#mobile-page .carousel header .help-popup-manager .help-container .modal-content {
    background-color: #00000030;
    color: hsla(0,0%,100%,.73);
    padding: 5px 4px;
    border-radius: 12px;
}
.pure-button-primary, .pure-button-selected, a.pure-button-primary, a.pure-button-selected {
    color: #fff;
    background-color: #ffffff33;
    margin-bottom: 0rem;
    border-radius: 9px;
}
.icon-lock:before {
	display: none;
}
.pure-button-primary {
	background-color: #3848a1 ;
	box-shadow: none;
}
.payment-shopping-basket .sub-total .h2 {
    color: transparent;
}
#mobile-page #product-detail #product-purchase-link .purchase-button {
	border-radius: 25px;
}
#mobile-page #profile-page section.creations-custom .creation-list .creation-item .caption-container {
    bottom: -80px;
    height: 81px;
    width: 100%;
    position: absolute;
    background-color: rgba(0,0,0,.5);
    border-radius: 25px
}
#mobile-page #product-detail #product-purchase-link {
    text-align: center;
    margin-top: -42px;
    overflow: hidden;
}
.pure-form input[type=color], .pure-form input[type=date], .pure-form input[type=datetime-local], .pure-form input[type=datetime], .pure-form input[type=email], .pure-form input[type=month], .pure-form input[type=number], .pure-form input[type=password], .pure-form input[type=search], .pure-form input[type=tel], .pure-form input[type=text], .pure-form input[type=time], .pure-form input[type=url], .pure-form input[type=week], .pure-form select, .pure-form textarea {
	border: double;
	border-color: #a28db3;
	background-color: transparent;
}
#mobile-page #product-detail .product-purchase .product-image-avatar {
	border-radius: 25px;
	box-shadow: none;
}
#mobile-page #product-detail header.product-header h1 {
	margin: 60px 40px 40px;
	color: hsla(191, 45%, 64%);
}
.pure-button-secondary, a.pure-button-secondary {
	background-color: transparent;
	color: rgba(54, 185, 217);
	text-shadow: none;
	font-size: 86%;
}
.icon-user:before {
	display: none;
}
.icon-cube:before {
	display: none;
}
#mobile-page .carousel .carousel-container .control-right {
	right: -15px;
}
/*comment*/
#root-page-mobile .comments li .body {
    position: relative;
    display: block;
    padding: 10px 14px;
    color: #000000;
    background: #ccd1d900;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 15px;
    -o-border-radius: 2px;
    -webkit-box-shadow: 0 2px 1px rgb(11 12 15 / 0%);
    box-shadow: 0 2px 1pxrgba(11,12,15,.3);
}
#root-page-mobile .comments li .body .arrow-left {
    border-color: transparent #ccd1d9 transparent transparent;
    left: -15px;
}
#root-page-mobile .comments li .body .arrow-left, #root-page-mobile .comments li .body .arrow-left-border {
    border-style: none;
    border-width: 8px;
    height: 0;
    width: 0;
    position: absolute;
    top: 10px;
}
.pure-form input[type=color], .pure-form input[type=date], .pure-form input[type=datetime-local], .pure-form input[type=datetime], .pure-form input[type=email], .pure-form input[type=month], .pure-form input[type=number], .pure-form input[type=password], .pure-form input[type=search], .pure-form input[type=tel], .pure-form input[type=text], .pure-form input[type=time], .pure-form input[type=url], .pure-form input[type=week], .pure-form select, .pure-form textarea {
    padding: 0.45em 0.5em;
    display: inline-block;
    border: none;
    border-radius: 1px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 16px;
    -o-border-radius: 2px;
    -webkit-box-shadow: inset 0 1px 3px rgb(80 80 80 / 10%);
    box-shadow: inset 0 1px 3px rgb(80 80 80 / 10%);
    -webkit-transition: border .3s linear;
    -o-transition: .3s linear border;
    transition: border .3s linear;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #f8f8f85c;
}
#root-page-mobile .comments li .header .username a {
	color: #4287f5;
	padding-right: 400px;
}
#root-page-mobile .comments li .text {
		 color: #5a1b63;
         animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
}

}
#mobile-page #product-detail .product-purchase .product-image {
	border-radius: 25px;
	box-shadow: none;
}
#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content {
	background-color: transparent;
}
#mobile-page #product-detail #product-purchase-link #purchase-confirm-container .modal-content .transaction-message {
	color: #8e6a9e;
}
/* Account settings */
}
body#root-page-mobile header#pageheader #meta-nav>li.menu>a {
	background-image: url('https://wallpaperaccess.com/full/2315752.jpg');
}
body#root-page-mobile header#pageheader #profile-extended {
	display: none;
    position: fixed;
    top: 48px;
    right: 0;
    z-index: 1012;
    width: 100%;
    max-width: 450px;
    height: 100%;
    min-height: 200px;
    background-color: transparent;
    -webkit-box-shadow: -4px 7px 10px rgb(0 0 0 / 30%);
    box-shadow: -4px 7px 10px rgb(0 0 0 / 30%);
    overflow-y: auto;
}
body#root-page-mobile header#pageheader #profile-extended .user-credits .xp-level a .level-image {
	display: none;
}
	body#root-page-mobile header#pageheader #profile-extended .user-credits .xp-level {
		display: none;
	}
body#root-page-mobile header#pageheader #profile-extended .user-credits .gold .data, body#root-page-mobile header#pageheader #profile-extended .user-credits .silver .data {
	background-color: transparent;
    display: block;
    margin: 10px 100 0px 0px;
    border-radius: 7px 5px 5px 7px;
    text-align: center;
    color: #ff0055;
}
body#root-page-mobile header#pageheader #profile-extended .username {
	background-color: transparent;
}
body#root-page-mobile header#pageheader #profile-extended .user-credits {
	background-color: transparent;
}
body#root-page-mobile header#pageheader #profile-extended .profile-links .arrow-top {
	display: none;
}
/* Chat box */




._375XK .F3PyX ._2XzvN {
	  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
{
}
.zUJzi .o_DA6 .uwn5j ._3DYYr ._28mON header {
	  animation: glow 1s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff, 0 0 10px #ffffff;
  }
}
}

{
}

._375XK ._2XaOw {
	padding: 0em;
}
.zUJzi .o_DA6 .uwn5j {
	    position: relative;
    height: 100%;
    border-right: 0px solid #5c343c;
    padding: 0;
}
.zUJzi .o_DA6 .uwn5j ._3DYYr._2dPu4 {
    border-left: 2px solid #4c7dd3;
}
._2XaOw {
background: transparent;
}
.uwn5j {
	background-color: rgba(0, 0, 0, 0.1);;
}

.zUJzi {
	background-color: transparent;
    box-shadow: 0 0 15px rgb(8 188 247 / 20%);
}

}
.F3PyX {
	background: #23272A;
}
._375XK textarea {
	background-color: rgba(0, 0, 0, 0);
    color: #91d6ed;
}
.uwn5j ._3DYYr ._1j2Cd {
display: none
}

._375XK {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 43px;
    z-index: 1015;
    background-color: #00000033;
    transition: top .2s ease-in-out;
}

._375XK ._2XaOw ._1j2Cd p {
	background-color: #0f78d9;
	border-radius: 25px;
    box-shadow: 0 0 7px rgb(81 154 181 / 80%);
}
._375XK ._2XaOw ._1j2Cd._1Xzzq p {
	background-color: hsl(209, 63%, 59%);
    color: #e1edec;
}
#mobile-page #profile-page .section-top .username h2 a {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation:
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}



#mobile-page #profile-page .section-top .username h2 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .5em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation:
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: royal; }
}




 /* RGB friendlist */
._3zDi- {
  font-family:arial black;
  font-size:16px;
  background-image:
    linear-gradient(to right, #16aee0,#0cb1e8,#4399b5,#0f84ab,#8ac1d4,#6e8991,#8085c4,#3876d9);
  -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  animation: rainbow-animations 1000s linear infinite;
}
@keyframes rainbow-animations {
    to {
        background-position: 4500vh;
}
}
/* Player & Game info - loading.webgl */
.sc-jhAzac gajmSX {
    display: none;
}
.jGYmVE:nth-child(1) {
	display: none;
}
.fRTvek {
	display: none;
}
.eZAUTq  {
	display: none;
}
.fLkmKE  {
	display: none;
}
.eSKQMi {
	display: none;
}
#unity #unity-player-container-wrapper.webgl-loading .container .game-image-container {
	  filter: blur(8px);
  -webkit-filter: blur(8px);
}
#unity #unity-player-container-wrapper.standalone .standalone-wrapper .game-image-container .game-image{
		  filter: blur(8px);
  -webkit-filter: blur(8px);
}
#mobile-page #game-play .creator-stats-container {
	display: none;
}
#mobile-page #game-play section.title h1 {
	margin: 50px;
    padding: 0px;
    padding-left: 365px;
    font-size: 4.25rem;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: unset;
    line-height: 48px;
    animation: glow 2s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 10px #5940ff, 0 0 10px #0077ff, 0 0 10px #ffffff, 0 0 30px #5940ff, 0 0 10px #ffffff;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #ffffff, 0 0 10px #ffffff, 0 0 10px #0077ff, 0 0 30px #ffffff, 0 0 10px #0077ff, 0 0 10px #ffffff;
  }
}
#mobile-page #game-play section.more-games .games-list {
	display: none;
}
#mobile-page #game-play section.description.visible {
	display: none;
}

/* Elite Purchase Tab Category */
.box.box-white {
	background-color: transparent;
}
._2jxuA ._1cijc.LK0a-, ._2jxuA .M3YMT.LK0a- {
	border-left-color: #8a8cde;
    background-color: transparent;
}
.text-green {
	color: #020596;
}
.btn-success {
	background-color: #6477c4;
    box-shadow: 0 5px 0 #49568a;
    color: #fff;
}
._2jxuA ._1t0C7 {
	display: none;
}
.p {
	color: #1b7ce3;
}
/* Useless stuff */
._3TORb {
	background-color: transparent;
}
._3TORb ._2E1AL {
    display: flex;
    padding: 2em;
    border-bottom: none;
}
._3TORb ._2E1AL ._4RanE {
    flex: 0;
}
._3TORb ._1Yhgq, ._3TORb ._3iXbw {
	background-color: transparent;
}
.xp-bar .xp-text {
	display: none;
}
.xp-bar .progress {
	display: none;
}
[class*=" icon-"]:before, [class^=icon-]:before {
		margin-right: 1.2em;
}
#root-page-mobile #header-notify-toggle #notify .container .exit {
		position: absolute;
    top: 10px;
    right: 5px;
    background-color: inherit;
    z-index: 3;
}
body#root-page-mobile header#pageheader #meta-nav>li.profile-credits .xp-level a {
	width: 40px;
}
body#root-page-mobile header#pageheader #meta-nav>li.profile-notify .header-icon-count {
	background-color: transparent;
    position: absolute;
    top: 0;
    right: -8px;
    font-size: .625rem;
    padding: 0 3px;
    margin-top: 3px;
    border-radius: 2px;
    font-family: Open Sans,sans-serif;
    font-weight: 700;
    cursor: pointer;
    will-change: box-shadow;
    -webkit-box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%);
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%);
    z-index: 1;
}
._3TORb ._1lvYU ._1Dx5s ._3n8oD {
	background-color: transparent;
    padding: 0.25em 0.5em;
    border-radius: 25px;
    font-size: .95em;
    font-weight: 700;
}
 }`)

