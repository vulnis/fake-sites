window.AAB.config.accounts = window.AAB.config.accounts || {};
// on/off switch for the navigation to the unified advice widget
$.extend(window.AAB.config.accounts, {'unifiedAdviseEnabled' : true});
window.top.cookiesettings = window.top.cookiesettings || {};
window.top.cookiesettings.config = window.top.cookiesettings.config || {};

$.extend(true, window.top.cookiesettings.config, {
    "msg_timeout" : 7000,
    "analytics": {
        "enabled": true,
        "url": "https://abnamro.d2.sc.omtrdc.net/b/ss/{suiteId}/1/{version}/0?pageName={pageName}&c17={prop17}&v71={prop71}",
        "suiteId": "abnamronl-et",
        "version": "H26--NS"
    },
    "functionalities": {
        "abtest": {
            "category": "noodzakelijk"
        },
        "chat": {
            "category": "gebruikerservaring"
        },
        "s_code": {
            "category": "noodzakelijk"
        },
        "webmarketing": {
            "category": "noodzakelijk"
        }
    },
    "categories": {
        "noodzakelijk": {
            "permissionNeeded": false
        },
        "gebruikerservaring": {
            "permissionNeeded": true
        },
        "externe cookies": {
            "permissionNeeded": true
        },
        "default": {
            "permissionNeeded": true
        }
    },
    "texts" : {
        "nl" : {
            "standard" : {
                "header": "Onze websites maken gebruik van cookies",
                "startscreen": "Als u cookies accepteert, kunt u onze websites makkelijker gebruiken,  vindt u sneller wat u zoekt en ziet u meer relevante informatie. Wilt u cookies accepteren?",
                "toastermessage" : "Uw keuze is opgeslagen. Blijft de cookiemelding terugkomen of wilt u uw keuze wijzigen? Onder aan elke pagina bij 'Privacy en cookies' kunt u dit aanpassen.",
                "explanationscreen": {
                    "title": "Als u wel cookies accepteert, kunt u ook:",
                    "list": [
                        {
                            "item": "online chatten met een medewerker"
                        },
                        {
                            "item": "informatie zien die persoonlijk of relevant voor u is"
                        },
                        {
                            "item": "gebruikmaken van de kantorenboek"
                        }
                    ]
                },
                "moreinfo" : [
                    {
                        "heading": "Waarom moet ik toestemming geven voor cookies?",
                        "subtexts": [
                            {
                                "title": "",
                                "text": "Wij zijn verplicht om op grond van de Telecommunicatiewet u toestemming te vragen voor het gebruik van bepaalde cookies."
                            }
                        ]
                    },
                    {
                        "heading": "Wat accepteer ik als ik cookies accepteer?",
                        "subtexts": [
                            {
                                "title": "",
                                "text": "ABN AMRO maakt onderscheid tussen cookies die noodzakelijk of functioneel zijn voor het gebruik en het verbeteren van de websites en cookies die dat niet zijn. ABN AMRO hoeft geen toestemming te vragen voor het gebruik van de noodzakelijke en functionele cookies. Als u geen cookies accepteert, wordt dus alleen gebruikgemaakt van deze cookies. Hierdoor worden bijvoorbeeld uw bankrekening en pasnummer onthouden voor het inloggen op Internet Bankieren. Noodzakelijke cookies zijn noodzakelijk voor een goede werking van de website. Zonder deze cookies werkt de website niet of kunt u bepaalde functies niet gebruiken. Functionele cookies zijn cookies waarmee wij, dankzij de analyse van het gebruik van de website,  de website kunnen verbeteren en gebruiksvriendelijker kunnen maken. Als u alle cookies accepteert, kunt u onze websites makkelijker gebruiken, vindt u sneller wat u zoekt en ziet u meer relevante informatie van ons op onze websites en op die van derden. U accepteert dan ook de cookies die niet noodzakelijk of functioneel  zijn voor het gebruik van de websites."
                            },
                            {
                                "title": "Voor welke websites geldt deze toestemming?",
                                "text": "U geeft toestemming voor alle websites binnen het domein van abnamro.nl. Dus bijvoorbeeld ook voor subdomein.abnamro.nl en ook voor abnamro.nl/subdomein."
                            }
                        ]
                    },
                    {
                        "heading": "Cookies waarvoor we uw toestemming vragen",
                        "subtexts": [
                            {
                                "title": "Proactieve chat",
                                "text": "Als u iets niet kunt vinden of als u hulp nodig heeft, bieden we u een chat aan met een medewerker van ABN AMRO. Op deze manier kunnen we u direct helpen."
                            },
                            {
                                "title": "Kantorenboek",
                                "text": "U kunt gebruikmaken van het kantorenboek om een snel een kantoor bij u in de buurt te vinden."
                            },
                            {
                                "title": "Relevante informatie en aanbiedingen",
                                "text": "Wij willen u op onze website en op de website van derden graag informatie laten zien waar u echt wat aan heeft. Wij schatten zo goed mogelijk in wat u interesseert en wat niet. Op basis van de pagina's die u bezoekt op onze website, krijgt u andere informatie te zien dan andere bezoekers. Hiermee maken we onze website relevanter voor u. Omdat u klant van ons bent kunnen we deze gegevens bovendien combineren met de informatie die wij al over u hebben. En kunnen wij u persoonlijkere en relevantere  informatie tonen en aanbiedingen doen waar u waarschijnlijk wat aan heeft en waar u van kunt profiteren. Dat kan binnen Internet Bankieren, op een ABN AMRO website en op websites van derden. Via Bankmail, e-mail of per post kan ook. Wij geven geen informatie over u aan derden voor commerci&#235;le doeleinden zonder uw toestemming te vragen."
                            },
                            {
                                "title": "Herhalingsmeter",
                                "text": "Heeft u een aanbieding al meer keren gezien zonder hier op te klikken? Dan bent u kennelijk niet ge&#239;nteresseerd. U krijgt dan iets anders te zien dat mogelijk wel interessant voor u is."
                            },
                            {
                                "title": "Tonen van een banner van onze websites of op een andere website",
                                "text": "Op basis van de pagina's die u bezoekt op onze website, krijgt u een van onze banners te zien op een andere website. Hierdoor kunnen we onze aanbiedingen persoonlijker en relevanter maken."
                            }
                        ]
                    },
                    {
                        "heading": "Belangrijk voor u om te weten",
                        "subtexts": [
                            {
                                "title": "Wat zijn cookies?",
                                "text": "Een cookie is een klein tekstbestand dat naar uw internetbrowser wordt gestuurd. Voorbeelden van internetbrowsers zijn Internet Explorer, Safari, Google Chrome en Mozilla. De cookie wordt dan opgeslagen in uw internetbrowser. Een cookie is meestal een uniek nummer waaraan gegevens gekoppeld kunnen worden. Dankzij een cookie hoeft u niet elke keer uw gegevens in te voeren, want cookies onthouden bijvoorbeeld uw rekeningnummer als u dat invult en wat voor soort klant u bent (priv&#233;, zakelijk of private banking)."
                            },
                            {
                                "title": "Wat doet ABN AMRO met cookies?",
                                "text": "ABN AMRO gebruikt cookies om verschillende redenen: We onderzoeken hoe (groepen van) bezoekers met onze website omgaan, zodat we de site kunnen verbeteren. We kunnen u beter informeren over onze diensten en producten. Voor het maken van analyses voor onderzoek. Om de website te verbeteren zodat u zo eenvoudig mogelijk kunt vinden wat u zoekt. Uw instellingen en voorkeuren worden onthouden en dat maakt een volgend bezoek aan de site gemakkelijker."
                            },
                            {
                                "title": "Hoe lang geef ik toestemming voor cookies?",
                                "text": "ABN AMRO legt vast of u toestemming heeft gegeven een cookie te plaatsen. Elk jaar krijgt u opnieuw de vraag of u de cookie accepteert. U kunt dan opnieuw uw toestemming geven voor het plaatsen van de cookie. Dit geldt ook voor cookies die langer dan 1 jaar geldig zijn."
                            }
                            ,
                            {
                                "title": "Meer informatie over privacy- en cookies",
                                "text": "Wilt u meer weten over het beleid rond privacy en cookies van ABN AMRO? Hier kunt u onderaan elke pagina meer informatie over vinden via 'Privacy- en cookies'."
                            }
                        ]
                    }
                ],
                "buttons" : {
                    "accept" : "ja, accepteer cookies",
                    "decline" : "nee, liever niet",
                    "moreinformation" : "meer informatie over cookies",
                    "reject" : "nee, liever niet"
                }
            },
            "repeat" : {
                "header": "Waarom cookies?",
                "startscreen": "Om onze website voor u te verbeteren en makkelijker toegankelijk te maken, gebruiken wij cookies. Als u cookies accepteert ziet u meer informatie die voor u interessant is. Als u accepteert betekent dit niet dat wij uw gegevens met anderen delen. Wilt u cookies accepteren?",
                "toastermessage" : "Uw keuze is opgeslagen. Blijft de cookiemelding terugkomen of wilt u uw keuze wijzigen? Onder aan elke pagina bij 'Privacy en cookies' kunt u dit aanpassen.",
                "explanationscreen": {
                    "title": "Als u cookies accepteert, ziet u meer informatie die voor u interessant is.  Dit betekent onder meer het volgende:",
                    "list": [
                        {
                            "item": "U vindt makkelijker onze kantoren op de website"
                        },
                        {
                            "item": "Wij kunnen onze informatie gerichter aan u aanbieden"
                        },
                        {
                            "item": "U kunt online chatten met een adviseur"
                        }
                    ]
                },
                "moreinfo" : [
                    {
                        "heading": "Waarom moet ik toestemming geven voor cookies?",
                        "subtexts": [
                            {
                                "title": "",
                                "text": "Wij zijn verplicht om op grond van de Telecommunicatiewet u toestemming te vragen voor het gebruik van bepaalde cookies."
                            }
                        ]
                    },
                    {
                        "heading": "Wat accepteer ik als ik cookies accepteer?",
                        "subtexts": [
                            {
                                "title": "",
                                "text": "ABN AMRO maakt onderscheid tussen cookies die noodzakelijk of functioneel zijn voor het gebruik en het verbeteren van de websites en cookies die dat niet zijn. ABN AMRO hoeft geen toestemming te vragen voor het gebruik van de noodzakelijke en functionele cookies. Als u geen cookies accepteert, wordt dus alleen gebruikgemaakt van deze cookies. Hierdoor worden bijvoorbeeld uw bankrekening en pasnummer onthouden voor het inloggen op Internet Bankieren. Noodzakelijke cookies zijn noodzakelijk voor een goede werking van de website. Zonder deze cookies werkt de website niet of kunt u bepaalde functies niet gebruiken. Functionele cookies zijn cookies waarmee wij, dankzij de analyse van het gebruik van de website,  de website kunnen verbeteren en gebruiksvriendelijker kunnen maken. Als u alle cookies accepteert, kunt u onze websites makkelijker gebruiken, vindt u sneller wat u zoekt en ziet u meer relevante informatie van ons op onze websites en op die van derden. U accepteert dan ook de cookies die niet noodzakelijk of functioneel  zijn voor het gebruik van de websites."
                            },
                            {
                                "title": "Voor welke websites geldt deze toestemming?",
                                "text": "U geeft toestemming voor alle websites binnen het domein van abnamro.nl. Dus bijvoorbeeld ook voor subdomein.abnamro.nl en ook voor abnamro.nl/subdomein."
                            }
                        ]
                    },
                    {
                        "heading": "Cookies waarvoor we uw toestemming vragen",
                        "subtexts": [
                            {
                                "title": "Proactieve chat",
                                "text": "Als u iets niet kunt vinden of als u hulp nodig heeft, bieden we u een chat aan met een medewerker van ABN AMRO. Op deze manier kunnen we u direct helpen."
                            },
                            {
                                "title": "Kantorenboek",
                                "text": "U kunt gebruikmaken van het kantorenboek om een snel een kantoor bij u in de buurt te vinden."
                            },
                            {
                                "title": "Relevante informatie en aanbiedingen",
                                "text": "Wij willen u op onze website en op de website van derden graag informatie laten zien waar u echt wat aan heeft. Wij schatten zo goed mogelijk in wat u interesseert en wat niet. Op basis van de pagina's die u bezoekt op onze website, krijgt u andere informatie te zien dan andere bezoekers. Hiermee maken we onze website relevanter voor u. Omdat u klant van ons bent kunnen we deze gegevens bovendien combineren met de informatie die wij al over u hebben. En kunnen wij u persoonlijkere en relevantere  informatie tonen en aanbiedingen doen waar u waarschijnlijk wat aan heeft en waar u van kunt profiteren. Dat kan binnen Internet Bankieren, op een ABN AMRO website en op websites van derden. Via Bankmail, e-mail of per post kan ook. Wij geven geen informatie over u aan derden voor commerci&#235;le doeleinden zonder uw toestemming te vragen."
                            },
                            {
                                "title": "Herhalingsmeter",
                                "text": "Heeft u een aanbieding al meer keren gezien zonder hier op te klikken? Dan bent u kennelijk niet ge&#239;nteresseerd. U krijgt dan iets anders te zien dat mogelijk wel interessant voor u is."
                            },
                            {
                                "title": "Tonen van een banner van onze websites of op een andere website",
                                "text": "Op basis van de pagina's die u bezoekt op onze website, krijgt u een van onze banners te zien op een andere website. Hierdoor kunnen we onze aanbiedingen persoonlijker en relevanter maken."
                            }
                        ]
                    },
                    {
                        "heading": "Belangrijk voor u om te weten",
                        "subtexts": [
                            {
                                "title": "Wat zijn cookies?",
                                "text": "Een cookie is een klein tekstbestand dat naar uw internetbrowser wordt gestuurd. Voorbeelden van internetbrowsers zijn Internet Explorer, Safari, Google Chrome en Mozilla. De cookie wordt dan opgeslagen in uw internetbrowser. Een cookie is meestal een uniek nummer waaraan gegevens gekoppeld kunnen worden. Dankzij een cookie hoeft u niet elke keer uw gegevens in te voeren, want cookies onthouden bijvoorbeeld uw rekeningnummer als u dat invult en wat voor soort klant u bent (priv&#233;, zakelijk of private banking)."
                            },
                            {
                                "title": "Wat doet ABN AMRO met cookies?",
                                "text": "ABN AMRO gebruikt cookies om verschillende redenen: We onderzoeken hoe (groepen van) bezoekers met onze website omgaan, zodat we de site kunnen verbeteren. We kunnen u beter informeren over onze diensten en producten. Voor het maken van analyses voor onderzoek. Om de website te verbeteren zodat u zo eenvoudig mogelijk kunt vinden wat u zoekt. Uw instellingen en voorkeuren worden onthouden en dat maakt een volgend bezoek aan de site gemakkelijker."
                            },
                            {
                                "title": "Hoe lang geef ik toestemming voor cookies?",
                                "text": "ABN AMRO legt vast of u toestemming heeft gegeven een cookie te plaatsen. Elk jaar krijgt u opnieuw de vraag of u de cookie accepteert. U kunt dan opnieuw uw toestemming geven voor het plaatsen van de cookie. Dit geldt ook voor cookies die langer dan 1 jaar geldig zijn."
                            }
                            ,
                            {
                                "title": "Meer informatie over privacy- en cookies",
                                "text": "Wilt u meer weten over het beleid rond privacy en cookies van ABN AMRO? Hier kunt u onderaan elke pagina meer informatie over vinden via 'Privacy- en cookies'."
                            }
                        ]
                    }
                ],
                "buttons" : {
                    "accept" : "ja, accepteer cookies",
                    "decline" : "nee, liever niet",
                    "moreinformation" : "meer informatie over cookies",
                    "reject" : "nee, liever niet"
                }
            }
        },
                "en" : {
                    "standard" : {
                        "header" : "Our websites use cookies",
                        "startscreen" : "We use cookies to improve our website and make it easier for you to use. Accepting cookies means that you will see more information that is interesting for you. It does not mean that we will pass on your data to third parties. Would you like to accept cookies?",
                        "toastermessage" : "Your choice has been saved. If you keep getting the cookie message or would like to change the setting, click on 'Privacy and cookie policy' at the bottom of the page.",
                        "explanationscreen" : {
                            "title" : "If you accept cookies, you will be able to:",
                            "list" : [{
                                    "item" : "Chat online with an ABN AMRO employee"
                                },{
                                    "item" : "See information that is personal or relevant to you"
                                },{
                                    "item" : "Use the office directory"
                            }]
                        },
                        "moreinfo" : [
                            {
                                "heading" : "Why must I give my permission to use cookies?",
                                "subtexts" : [{
                                    "title" : "",
                                    "text" : "The Dutch Telecommunications Act requires us to ask you for permission to use certain cookies."
                                }]
                            },
                            {
                                "heading" : "What am I accepting when I accept cookies?",
                                "subtexts" : [{
                                    "title" : "",
                                    "text" : "ABN AMRO distinguishes between cookies that are essential to use the website and functional cookies that improve the user experience. ABN AMRO does not have to ask for your permission to use essential and functional cookies. If you do not accept cookies, only these cookies will be used. These cookies are used to remember your bank account and debit card number when you log in to Internet Banking. Essential cookies ensure the website works properly. The website would not work properly without them and you would not be able to use certain functions. Functional cookies are cookies that help us improve the website and the user experience based on usage analyses. Accepting all cookies makes our website easier to use. You will find what you're looking for faster and will see more relevant information from us on our and third-party websites. This means that you have to accept the cookies that are neither essential nor functional."
                                    }, {
                                    "title" : "Which websites does the permission apply to?",
                                    "text" : "Your permission applies to the use of cookies on all of the websites in the abnamro.nl domain. This includes subdomain .abnamro.nl and abnamro.nl/subdomain."
                                    }
                                ]
                            },
                            {
                                "heading" : "Cookies for which we need your permission",
                                "subtexts" : [{
                                        "title" : "Proactive chat",
                                        "text" : "If you have trouble finding something or need help, you can chat directly with an ABN AMRO employee. This enables us to help you immediately."
                                    },{
                                        "title" : "Office directory",
                                        "text" : "The office directory is useful if you need to find an office in your neighbourhood."
                                    },{
                                        "title" : "Relevant information and offers",
                                        "text" : "We would like our website and those of third parties to display information that is relevant to you. We do our best to understand what you are interested in and tailor the information you see based on the pages you visit on our website. This is how we make our websites more interesting for you. If you are an ABN AMRO customer and are logged in, we can combine this information with the information you have already given us. This prevents us from displaying offers for products you already have. Instead, you will see information and offers for products and services that are meaningful because they are tailored to your situation. Offers can be displayed in Internet Banking, on the ABN AMRO website and on third-party websites or sent to you through Bankmail, email or by post. We do not provide any information about you to third parties for commercial purposes."
                                    },{
                                        "title" : "Repetition meter",
                                        "text" : "If you see an offer more than once and never click on it, it is clear that you are not interested. You will soon see something else that you may find more interesting."
                                    },{
                                        "title" : "Displaying one of our websites' banners on a third-party website",
                                        "text" : "Based on the pages that you visit on our website, one of our banners will be displayed on third-party websites. This enables us to personalize our offers and make them more meaningful."
                                    }
                                ]
                            },
                            {
                                "heading" : "Important information for you",
                                "subtexts" : [{
                                        "title" : "What are cookies?",
                                        "text" : "A cookie is a small text file that a website sends to your internet browser. Examples of internet browsers are Internet Explorer, Safari, Google Chrome and Mozilla Firefox. Cookies are stored in your internet browser. A cookie is usually a unique number to which data can be linked. Thanks to a cookie, you do not have to enter your details every time you log in because it remembers your account number if you enter it as well as the type of customer you are (private, commercial or personal)."
                                    },{
                                        "title" : "What does ABN AMRO do with cookies?",
                                        "text" : "ABN AMRO uses cookies to study how (groups of) users use our websites so we can improve them, inform you better about our products and services, analyse data for studies, and improve the website so you can find what you are looking for easily and quickly. Your settings and preferences are remembered, making later visits to the sites much easier."
                                    },{
                                        "title" : "How long is my permission to use cookies valid?",
                                        "text" : "ABN AMRO records whether you have given us permission to use cookies. Every year, you will be asked for permission to use cookies. This also applies to cookies that are valid for more than one year."
                                    },{
                                        "title" : "More information about privacy and cookies",
                                        "text" : "If you would like to know more about our privacy and cookie policy, simply click on 'Privacy and cookies' at the bottom of a page. "
                                    }
                                ]
                            }
                        ],
                        "buttons" : {
                            "accept" : "yes, accept cookies",
                            "decline" : "no, thank you",
                            "moreinformation" : "more information about cookies",
                            "reject" : "no, thank you"
                        }
                    },
                    "repeat" : {
                        "header" : "Why cookies?",
                        "startscreen" : "We use cookies to improve our websites and make it easier for you to use. Accepting cookies means that you will see more information that is interesting for you. It does not mean that we will pass on your data to third parties. Would you like to accept cookies?",
                        "toastermessage" : "Your choice has been saved. If you keep getting the cookie message or would like to change the setting, click on 'Privacy and cookie policy' at the bottom of the page.",
                        "explanationscreen" : {
                            "title" : "Accepting cookies means that you will see more information that is interesting for you.  Among other things, this means that",
                            "list" : [{
                                    "item" : "it's easier to find our branches on the website"
                                },{
                                    "item" : "you will receive information that is interesting for you"
                                },{
                                    "item" : "you can chat online with an advisor"
                                }
                            ]
                        },
                        "moreinfo" : [
                            {
                                "heading" : "Why must I give my permission to use cookies?",
                                "subtexts" : [{
                                    "title" : "",
                                    "text" : "The Dutch Telecommunications Act requires us to ask you for permission to use certain cookies."
                                }]
                            },
                            {
                                "heading" : "What am I accepting when I accept cookies?",
                                "subtexts" : [{
                                    "title" : "",
                                    "text" : "ABN AMRO distinguishes between cookies that are essential to use the website and functional cookies that improve the user experience. ABN AMRO does not have to ask for your permission to use essential and functional cookies. If you do not accept cookies, only these cookies will be used. These cookies are used to remember your bank account and debit card number when you log in to Internet Banking. Essential cookies ensure the website works properly. The website would not work properly without them and you would not be able to use certain functions. Functional cookies are cookies that help us improve the website and the user experience based on usage analyses. Accepting all cookies makes our website easier to use. You will find what you're looking for faster and will see more relevant information from us on our and third-party websites. This means that you have to accept the cookies that are neither essential nor functional."
                                    }, {
                                    "title" : "Which websites does the permission apply to?",
                                    "text" : "Your permission applies to the use of cookies on all of the websites in the abnamro.nl domain. This includes subdomain .abnamro.nl and abnamro.nl/subdomain."
                                    }
                                ]
                            },
                            {
                                "heading" : "Cookies for which we need your permission",
                                "subtexts" : [{
                                        "title" : "Proactive chat",
                                        "text" : "If you have trouble finding something or need help, you can chat directly with an ABN AMRO employee. This enables us to help you immediately."
                                    },{
                                        "title" : "Office directory",
                                        "text" : "The office directory is useful if you need to find an office in your neighbourhood."
                                    },{
                                        "title" : "Relevant information and offers",
                                        "text" : "We would like our website and those of third parties to display information that is relevant to you. We do our best to understand what you are interested in and tailor the information you see based on the pages you visit on our website. This is how we make our websites more interesting for you. If you are an ABN AMRO customer and are logged in, we can combine this information with the information you have already given us. This prevents us from displaying offers for products you already have. Instead, you will see information and offers for products and services that are meaningful because they are tailored to your situation. Offers can be displayed in Internet Banking, on the ABN AMRO website and on third-party websites or sent to you through Bankmail, email or by post. We do not provide any information about you to third parties for commercial purposes."
                                    },{
                                        "title" : "Repetition meter",
                                        "text" : "If you see an offer more than once and never click on it, it is clear that you are not interested. You will soon see something else that you may find more interesting."
                                    },{
                                        "title" : "Displaying one of our websites' banners on a third-party website",
                                        "text" : "Based on the pages that you visit on our website, one of our banners will be displayed on third-party websites. This enables us to personalize our offers and make them more meaningful."
                                    }
                                ]
                            },
                            {
                                "heading" : "Important information for you",
                                "subtexts" : [{
                                        "title" : "What are cookies?",
                                        "text" : "A cookie is a small text file that a website sends to your internet browser. Examples of internet browsers are Internet Explorer, Safari, Google Chrome and Mozilla Firefox. Cookies are stored in your internet browser. A cookie is usually a unique number to which data can be linked. Thanks to a cookie, you do not have to enter your details every time you log in because it remembers your account number if you enter it as well as the type of customer you are (private, commercial or personal)."
                                    },{
                                        "title" : "What does ABN AMRO do with cookies?",
                                        "text" : "ABN AMRO uses cookies to study how (groups of) users use our websites so we can improve them, inform you better about our products and services, analyse data for studies, and improve the website so you can find what you are looking for easily and quickly. Your settings and preferences are remembered, making later visits to the sites much easier."
                                    },{
                                        "title" : "How long is my permission to use cookies valid?",
                                        "text" : "ABN AMRO records whether you have given us permission to use cookies. Every year, you will be asked for permission to use cookies. This also applies to cookies that are valid for more than one year."
                                    },{
                                        "title" : "More information about privacy and cookies",
                                        "text" : "If you would like to know more about our privacy and cookie policy, simply click on 'Privacy and cookies' at the bottom of a page."
                                    }
                                ]
                            }
                        ],
                        "buttons" : {
                            "accept" : "yes, accept cookies",
                            "decline" : "no, thank you",
                            "moreinformation" : "more information about cookies",
                            "reject" : "no, thank you"
                        }
                    }
                }
            },
            "modalHTMLLocation": "/nl/widgetdelivery/unauthenticated/static/js/lib/internet/cookiesettings/cookiesettings.html",
            "modalJSLocation": "/nl/widgetdelivery/unauthenticated/static/js/lib/internet/cookiesettings/cookiesettings_html.js",
            "modalCSSLocation": "/nl/widgetdelivery/unauthenticated/oca/app/foundation/common/cookiesettings/style.css",
            "appJSLocation": "/nl/widgetdelivery/unauthenticated/static/js/lib/internet/cookiesettings/app.js",
            "modalLinkSelector": "a.mlf-js-reconsider-tracking",
            "trackingAllowedCookie": "allowcookies", 
            "showModal": true,
            "showRejectOption": false,
            "repeatModalTimes": 1,
            "repeatDays": 0.000694,
            "version": 1
});