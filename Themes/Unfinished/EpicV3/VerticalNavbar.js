(function() {
    'use strict';
    const icons = [
        { alt: 'Play', link: 'https://i.imgur.com/xMQ8gIH.png', href: 'https://example.com/page1' },
        { alt: 'Build', link: 'https://i.imgur.com/6lAZCoU.png', href: 'https://example.com/page2' },
        { alt: 'Marketplace', link: 'https://i.imgur.com/g53Pklw.png', href: 'https://example.com/page3' },
        { alt: 'Profile', link: 'https://i.imgur.com/wMymZta.png', href: 'https://example.com/page4' },
        { alt: 'Icon 5', link: 'https://example.com/icon5', href: 'https://example.com/page5' },
        { alt: 'Icon 6', link: 'https://example.com/icon6', href: 'https://example.com/page6' },
        { alt: 'Icon 7', link: 'https://example.com/icon7', href: 'https://example.com/page7' }
    ];
    const navbar = document.createElement('div');
    navbar.id = 'vertical-navbar';
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.bottom = '0';
    navbar.style.left = '0';
    navbar.style.width = '50px';
    navbar.style.backgroundColor = '#25242479';
    navbar.style.backdropFilter = 'blur(9px)';
    navbar.style.zIndex = '9999';
    navbar.style.display = 'flex';
    navbar.style.flexDirection = 'column';
    navbar.style.justifyContent = 'space-between';
    navbar.style.alignItems = 'center';
    navbar.style.paddingTop = '20px';
    const menuGroup = document.createElement('div');
    menuGroup.style.display = 'flex';
    menuGroup.style.flexDirection = 'column';
    menuGroup.style.alignItems = 'center';
    menuGroup.style.top = '30%';
    menuGroup.style.position = 'relative';
    menuGroup.style.marginLeft = '5px';
    navbar.appendChild(menuGroup);
    icons.slice(0, 6).forEach(icon => {
        const anchor = document.createElement('a');
        anchor.href = icon.href;
        anchor.title = icon.alt;
        anchor.style.marginBottom = '10px';
        const img = document.createElement('img');
        img.src = icon.link;
        img.alt = icon.alt;
        img.style.width = '32px';
        img.style.height = '32px';
        img.style.filter = 'invert(1)';
        img.style.transition = 'filter 0.3s ease';
        anchor.appendChild(img);
        menuGroup.appendChild(anchor);
        anchor.addEventListener('mouseenter', () => {
            img.style.filter = 'invert(1) drop-shadow(0 0 11px #c74242c9)';
        });
        anchor.addEventListener('mouseleave', () => {
            img.style.filter = 'invert(1)';
        });
    });
    const creatorGroup = document.createElement('div');
    const creatorAnchor = document.createElement('a');
    creatorAnchor.href = icons[6].href;
    creatorAnchor.title = icons[6].alt;
    creatorAnchor.style.marginTop = 'auto';
    creatorAnchor.style.marginBottom = '10px';

    const creatorImg = document.createElement('img');
    creatorImg.src = icons[6].link;
    creatorImg.alt = icons[6].alt;
    creatorImg.style.width = '32px';
    creatorImg.style.height = '32px';
    creatorImg.style.filter = 'invert(1)';
    creatorAnchor.appendChild(creatorImg);
    creatorGroup.appendChild(creatorAnchor);
    navbar.appendChild(creatorGroup);

    document.body.appendChild(navbar);
    GM_addStyle(`
        #vertical-navbar a {
            display: block;
            text-align: center;
            color: white;
            text-decoration: none;
        }
        #vertical-navbar img {
            cursor: pointer;
            border-radius: 5px;
            transition: filter 0.3s ease;
        }
    `);

})();
