![logo](./docs/readme-logo.png)
# dndod

![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)
![GitHub package version](https://img.shields.io/github/package-json/v/badges/shields.svg?style=flat-square)

Simple and easy javascript modal library with no dependency.
[https://github.com/oigil/dndod](https://github.com/oigil/dndod)   
 
[Demo page](https://oigil.github.io/dndod/demo)


![clip](./docs/readme-clip.gif)
   
## Features
* Alert, Confirm, Notice action with modal popup.
* Customaziable options.
* No dependency.
* Supports capturing tab moves in modal.
* Supports closing modal with ESC key.
* TODO : WAI-ARIA

## Browser Support
* Chrome
* Safari
* Firefox
* IE 10+
* Edge
* Opera

## Getting Started
#### npm
````bash
$ npm install dndod
````

## Usage
#### ES6
```javascript
import dndod from 'dndod'
import 'dndod/dist/dndod-popup.min.css'
    
dndod.alert('Alert')
```

#### Browser
```html
<head>
    <link href="/node_modules/dndod/dist/dndod-popup.min.css" rel="stylesheet" type="text/css">
    <script src="/node_modules/dndod/dist/dndod-popup.min.js"></script>
</head>
<body>
    <script>
        dndod.alert("Alert");
    </script>
</body>
```

## Methods
#### dndod.alert(String, Object)
````javascript
dndod.alert("Message", options);
````
![alert](./docs/readme-alert.png)
        
#### dndod.confirm(String, Function(), Object)
````javascript
dndod.confirm("Message", function(popup) {
    console.log("confirmed!");
}, options);
````
![confirm](./docs/readme-confirm.png)

#### dndod.notice(String, Object)
````javascript
dndod.notice("Message", options);
````
![notice](./docs/readme-notice.png)

#### dndod.popup(Object)
```` javascript
dndod.popup({
    //Check detail options below 
});
````

## Options
````javascript
dndod.popup({
    prefixClass: String, //Prefix of classname. (Default : "dndod")
    title: String, //Title (Default : "")
    msg: String, //Message (Default : "")
    textAlign: String, //Alignment of title and message. (Default : "center")
    animation: String, //Animation types : "from-top", "from-bottom", "none" (Default : "from-top")
    animationDuration: Number, // Animation Duration in ms (Default : 250)
    disableCloseBtn: Boolean, // Do not generate close button on the top right corner. (Default : false)
    disableOutline: Boolean, // Hide browser-based outline style. (Default : false)
    enableHTML: Boolean, // Enable HTML codes in 'title' and 'msg'. (Default : false)
    events: {
        create: Function(popup), // Triggered after instance created.
        mount: Function(popup), // Triggered after DOM element attached to document's body.
        close: Function(popup), // Triggered after close method is called.
        unmount: Function(popup) // Triggered after DOM element detached from document's body.   
    },
    buttons: [  // ArrayList of buttons
        {
            text: String, //Button text
            type: String, //Button style types : "default", "primary", "info", "success", "warning", "danger" (Default: "default")
            handler: Function(event, popup) //Button click handler. Pass
        },
        ...
    ]
})
````

## Built With

* [Webpack](https://webpack.js.org)
* [Babel](https://babeljs.io)
* [SASS](https://sass-lang.com)

## Authors

* **Cavin Jo (<oigil.jo@gmail.com>)**


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

