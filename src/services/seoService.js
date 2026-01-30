/**
 * seoService.js
 * Gerenciamento de Meta Tags e Scripts de Rastreio (Analytics/Pixel)
 */

export const updateSEO = (seoData = {}) => {
    const { title, description, ogImage, siteTitle } = seoData;

    // 1. Título da Aba
    const finalTitle = title ? `${title} | ${siteTitle || 'Rainha da Paz'}` : siteTitle || 'Rainha da Paz';
    document.title = finalTitle;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || '';

    // 3. Open Graph Tags (Facebook/WhatsApp)
    updateMetaTag('og:title', finalTitle);
    updateMetaTag('og:description', description || '');
    if (ogImage) updateMetaTag('og:image', ogImage);
};

const updateMetaTag = (property, content) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
    }
    tag.content = content;
};

// Injeção de Scripts de Rastreio
export const injectTrackingScripts = (config = {}) => {
    const { ga_id, gtm_id, fb_pixel_id } = config;

    // Google Analytics (GA4)
    if (ga_id && !window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ga_id}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga_id}');
        `;
        document.head.appendChild(inlineScript);
    }

    // Google Tag Manager (GTM)
    if (gtm_id) {
        const gtmScript = document.createElement('script');
        gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtm_id}');`;
        document.head.appendChild(gtmScript);
    }

    // Facebook Pixel
    if (fb_pixel_id) {
        const pixelScript = document.createElement('script');
        pixelScript.innerHTML = `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${fb_pixel_id}');
        fbq('track', 'PageView');`;
        document.head.appendChild(pixelScript);
    }
};
