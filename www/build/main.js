webpackJsonp([0],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_compat_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_compat_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_compat_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(290);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import 'rxjs/add/operator/map';


// Plugin storage

var UsuarioProvider = /** @class */ (function () {
    function UsuarioProvider(http, registroProvider, alertCtrl, modalCtrl, _cs, platform, storage) {
        this.http = http;
        this.registroProvider = registroProvider;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this._cs = _cs;
        this.platform = platform;
        this.storage = storage;
        this.descuento = false;
        this.cargar_storage();
    }
    UsuarioProvider.prototype.activo = function () {
        if (this.token) {
            return true;
        }
        else {
            return false;
        }
    };
    UsuarioProvider.prototype.inactivo = function () {
        if (this.token) {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioProvider.prototype.loguearse = function (usuario, contrasena) {
        var _this = this;
        var clave = usuario + contrasena;
        return this.registroProvider.getUsuario(clave).map(function (res) {
            if (res[0] != null) {
                _this.token = res[0].clave;
                _this.id_usuario = res[0].id;
                _this.usuario = res[0].usuario;
                // Guardar Storage
                _this.guardar_storage();
                _this.registroProvider.getReservas(_this.id_usuario).subscribe(function (res) {
                    if (res.length >= 5) {
                        _this.descuento = true;
                    }
                });
            }
            else {
                _this.alertCtrl.create({
                    title: "Error al iniciar",
                    subTitle: "Usuario no encontrado",
                    buttons: ["OK"]
                }).present();
            }
        });
    };
    UsuarioProvider.prototype.cerrar_sesion = function () {
        this.token = null;
        this.id_usuario = null;
        this.alertCtrl.create({
            title: "Cerrar Sesión",
            subTitle: " Se cerró la sesión correctamente",
            buttons: ["OK"]
        }).present();
        // Guardar Storage
        this.guardar_storage();
        this.descuento = false;
    };
    UsuarioProvider.prototype.guardar_storage = function () {
        if (this.platform.is("cordova")) {
            // dispositivo
            this.storage.set('token', this.token);
            this.storage.set('id_usuario', this.id_usuario);
            this.storage.set('usuario', this.usuario);
        }
        else {
            // computadora
            if (this.token) {
                localStorage.setItem("token", this.token);
                localStorage.setItem("id_usuario", this.id_usuario);
                localStorage.setItem("usuario", this.usuario);
            }
            else {
                localStorage.removeItem("token");
                localStorage.removeItem("id_usuario");
                localStorage.removeItem("usuario");
            }
        }
    };
    UsuarioProvider.prototype.cargar_storage = function () {
        var _this = this;
        var promesa = new Promise(function (resolve, reject) {
            if (_this.platform.is("cordova")) {
                // dispositivo
                _this.storage.ready()
                    .then(function () {
                    _this.storage.get("token")
                        .then(function (token) {
                        if (token) {
                            _this.token = token;
                        }
                    });
                    _this.storage.get("id_usuario")
                        .then(function (id_usuario) {
                        if (id_usuario) {
                            _this.id_usuario = id_usuario;
                        }
                        resolve();
                    });
                    _this.storage.get("usuario")
                        .then(function (usuario) {
                        if (usuario) {
                            _this.usuario = usuario;
                        }
                        resolve();
                    });
                });
            }
            else {
                // computadora
                if (localStorage.getItem("token")) {
                    // Existe items en el localstorage
                    _this.token = localStorage.getItem("token");
                    _this.id_usuario = localStorage.getItem("id_usuario");
                    _this.usuario = localStorage.getItem("usuario");
                }
                resolve();
            }
        });
        return promesa;
    };
    UsuarioProvider.prototype.ver_residuo = function (ventana) {
        var modal;
        if (!this.token) {
            // mostrar el login
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["k" /* LoginPage */]);
            modal.present();
        }
        else {
            this.ventana = ventana;
            this._cs.ver_residuo();
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["u" /* ResiduosPage */]);
            modal.present();
        }
    };
    UsuarioProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_2__providers_registro_registro__["a" /* RegistroProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], UsuarioProvider);
    return UsuarioProvider;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_compat_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_compat_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_compat_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_index_paginas__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import 'rxjs/add/operator/map';



// paginas del modal

var CarritoProvider = /** @class */ (function () {
    function CarritoProvider(http, modalCtrl, registroProvider) {
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.registroProvider = registroProvider;
        this.id_residuo = "1";
        this.id_volumen = "1";
        this.noreciclaje = true;
        this.estado_reserva = true;
        this.estado_pago = false;
        this.reserva_estado = false;
        this.estado_eliminado = false;
    }
    CarritoProvider.prototype.ver_login = function () {
        var modal;
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_index_paginas__["k" /* LoginPage */]);
        modal.present();
    };
    CarritoProvider.prototype.ver_volumen = function () {
        var _this = this;
        var modal;
        this.registroProvider.getVolumenes().subscribe(function (res) {
            _this.volumenes = res;
        });
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_index_paginas__["x" /* VolumenPage */]);
        modal.present();
    };
    CarritoProvider.prototype.ver_foto = function () {
        var modal;
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_index_paginas__["h" /* FotoPage */]);
        modal.present();
    };
    CarritoProvider.prototype.ver_residuo = function () {
        var _this = this;
        this.registroProvider.getResiduos().subscribe(function (res) {
            _this.residuos = res;
        });
    };
    CarritoProvider.prototype.ver_estacionamiento = function () {
        var _this = this;
        this.registroProvider.getEstacionamientos().subscribe(function (res) {
            _this.estacionamientos = res;
        });
    };
    CarritoProvider.prototype.ver_incidencia = function (listado, id_usuario) {
        var _this = this;
        this.listado = listado;
        if (this.listado == true) {
            this.registroProvider.getIncidencias().subscribe(function (res) {
                _this.incidencias = res;
            });
        }
        else {
            this.registroProvider.getIncidenciasUsuario(id_usuario).subscribe(function (res) {
                if (res.length == 0) {
                    _this.noreciclaje = false;
                }
                else {
                    _this.incidencias = res;
                }
            });
        }
    };
    CarritoProvider.prototype.ver_espacio = function (id) {
        var _this = this;
        this.registroProvider.getEspacio(id).subscribe(function (res) {
            _this.espacio = res;
        });
    };
    CarritoProvider.prototype.ver_registrarse = function () {
        var modal;
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_index_paginas__["s" /* RegistrarsePage */]);
        modal.present();
    };
    CarritoProvider.prototype.pago_tarjeta = function () {
        var modal;
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_index_paginas__["w" /* TarjetaPage */]);
        modal.present();
    };
    CarritoProvider.prototype.pago_paypal = function () {
        var modal;
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_index_paginas__["p" /* PaypalPage */]);
        modal.present();
    };
    CarritoProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* ModalController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__["a" /* RegistroProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__["a" /* RegistroProvider */]) === "function" && _c || Object])
    ], CarritoProvider);
    return CarritoProvider;
    var _a, _b, _c;
}());

//# sourceMappingURL=carrito.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductoPage = /** @class */ (function () {
    function ProductoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.producto = {};
    }
    ProductoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-producto',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\producto\producto.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n    <ion-title>Producto</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\producto\producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
    ], ProductoPage);
    return ProductoPage;
}());

//# sourceMappingURL=producto.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_carrito_carrito__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, viewCtrl, _us, _cs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._us = _us;
        this._cs = _cs;
        this.usuario = "";
        this.contrasena = "";
        this.clave = "";
    }
    LoginPage.prototype.loguearse = function () {
        var _this = this;
        this._us.loguearse(this.usuario, this.contrasena)
            .subscribe(function () {
            if (_this._us.activo()) {
                _this.viewCtrl.dismiss(true);
            }
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\login\login.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button icon-only ion-button\n\n              (click)="viewCtrl.dismiss()">\n\n        <ion-icon name="arrow-round-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Iniciar sesión</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <br>\n\n  <div style="text-align: center">\n\n    <img src="../../assets/imgs/login.png" style="max-width: 40%">\n\n  </div>\n\n\n\n  <ion-list>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Usuario</ion-label>\n\n    <ion-input type="email" [(ngModel)]="usuario"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Contraseña</ion-label>\n\n    <ion-input type="password" [(ngModel)]="contrasena"></ion-input>\n\n  </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <br>\n\n  <br>\n\n\n\n  <button ion-button block\n\n          [disabled]=" usuario.length < 5 || contrasena.length < 5 "\n\n          (click)="loguearse()">\n\n    Ingresar\n\n  </button>\n\n  <br>\n\n\n\n  <h6 text-center style="font-size: 14px">¿No tiene una cuenta?</h6>\n\n\n\n  <br>\n\n  <button id="registrarse" ion-button block\n\n          (click)="_cs.ver_registrarse()">\n\n    Registrarse\n\n  </button>\n\n  <br><br>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_carrito_carrito__["a" /* CarritoProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductosProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_compat_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_compat_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_compat_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import 'rxjs/add/operator/map';

var ProductosProvider = /** @class */ (function () {
    function ProductosProvider(http) {
        this.http = http;
        this.pagina = 0;
        this.productos = [];
        this.lineas = [];
        this.por_categoria = [];
        this.resultados = [];
    }
    ProductosProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ProductosProvider);
    return ProductosProvider;
}());

//# sourceMappingURL=productos.js.map

/***/ }),

/***/ 196:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 196;

/***/ }),

/***/ 238:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 238;

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistroProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_operators__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_compat_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_compat_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_compat_add_operator_map__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { HttpClient } from '@angular/common/http';




var RegistroProvider = /** @class */ (function () {
    function RegistroProvider(db) {
        this.usuarioCollection = db.collection('Usuario');
        this.comentarioCollection = db.collection('Comentario');
        this.reciclajeCollection = db.collection('Reciclaje');
        this.incidenciaCollection = db.collection('Incidencia');
        this.recomendacionCollection = db.collection('Recomendacion');
        this.residuoCollection = db.collection('Residuo');
        this.volumenCollection = db.collection('Volumen');
        //============================================================================================
        this.estacionamientoCollection = db.collection('Estacionamiento');
        this.espacioCollection = db.collection('Espacio');
        this.reservaCollection = db.collection('Reserva');
        this.user = db;
        this.espacio = db;
        this.reserva = db;
        this.incidencia = db;
        this.usuarios = this.usuarioCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.comentarios = this.comentarioCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.reciclajes = this.reciclajeCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.incidencias = this.incidenciaCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.recomendaciones = this.recomendacionCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.residuos = this.residuoCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.volumenes = this.volumenCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        //==========================================================================================================0
        this.estacionamientos = this.estacionamientoCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.espacios = this.espacioCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
        this.reservas = this.reservaCollection.snapshotChanges().pipe(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_operators__["map"])(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                var id = a.payload.doc.id;
                return __assign({ id: id }, data);
            });
        }));
    }
    RegistroProvider.prototype.getUsuarios = function () {
        return this.usuarios;
    };
    RegistroProvider.prototype.getUsuario1 = function (id) {
        return this.usuarioCollection.doc(id).valueChanges();
    };
    RegistroProvider.prototype.getUsuario = function (clave) {
        return this.user.collection('Usuario', function (ref) { return ref.where('clave', '==', clave); }).valueChanges();
    };
    RegistroProvider.prototype.updateUsuario = function (usuario, id) {
        return this.usuarioCollection.doc(id).update(usuario);
    };
    RegistroProvider.prototype.removeUsuario = function (id) {
        return this.usuarioCollection.doc(id).delete();
    };
    RegistroProvider.prototype.addUsuario = function (usuario, id) {
        return this.usuarioCollection.doc(id).set(usuario);
    };
    RegistroProvider.prototype.getComentarios = function () {
        return this.comentarios;
    };
    RegistroProvider.prototype.updateComentarios = function (comentario, id) {
        return this.comentarioCollection.doc(id).update(comentario);
    };
    RegistroProvider.prototype.removeComentario = function (id) {
        return this.comentarioCollection.doc(id).delete();
    };
    RegistroProvider.prototype.addComentario = function (comentario, id) {
        return this.comentarioCollection.doc(id).set(comentario);
    };
    RegistroProvider.prototype.addReciclaje = function (reciclaje, id) {
        return this.reciclajeCollection.doc(id).set(reciclaje);
    };
    RegistroProvider.prototype.addIncidencia = function (incidencia, id) {
        return this.incidenciaCollection.doc(id).set(incidencia);
    };
    RegistroProvider.prototype.getIncidencias = function () {
        return this.incidencias;
    };
    RegistroProvider.prototype.getIncidenciasUsuario = function (id_usuario) {
        return this.incidencia.collection('Incidencia', function (ref) { return ref.where('id_usuario', '==', id_usuario); }).valueChanges();
    };
    RegistroProvider.prototype.updateIncidencias = function (incidencia, id) {
        return this.incidenciaCollection.doc(id).update(incidencia);
    };
    RegistroProvider.prototype.removeIncidencia = function (id) {
        return this.incidenciaCollection.doc(id).delete();
    };
    RegistroProvider.prototype.getRecomendaciones = function () {
        return this.recomendaciones;
    };
    RegistroProvider.prototype.getResiduos = function () {
        return this.residuos;
    };
    RegistroProvider.prototype.getVolumenes = function () {
        return this.volumenes;
    };
    //===============================================================================================================
    RegistroProvider.prototype.getEstacionamientos = function () {
        return this.estacionamientos;
    };
    RegistroProvider.prototype.getEspacio = function (id) {
        return this.espacioCollection.doc(id).valueChanges();
    };
    RegistroProvider.prototype.updateEspacio = function (espacio, id) {
        return this.espacioCollection.doc(id).update(espacio);
    };
    RegistroProvider.prototype.getReservas = function (id_usuario) {
        return this.reserva.collection('Reserva', function (ref) { return ref.where('id_usuario', '==', id_usuario); }).valueChanges();
    };
    RegistroProvider.prototype.getTodasReservas = function () {
        return this.reservas;
    };
    RegistroProvider.prototype.getReserva = function (fecha) {
        return this.reservaCollection.doc(fecha).valueChanges();
    };
    RegistroProvider.prototype.updateReserva = function (reserva, id) {
        return this.reservaCollection.doc(id).update(reserva);
    };
    RegistroProvider.prototype.updateReservaEstado = function (id) {
        this.reservaCollection.doc(id).update({ "estado_pago": "Pago Realizado" });
    };
    RegistroProvider.prototype.updateReservaEstado2 = function (id) {
        this.reservaCollection.doc(id).update({ "estado": "Finalizado" });
    };
    RegistroProvider.prototype.addReserva = function (reserva, id) {
        return this.reservaCollection.doc(id).set(reserva);
    };
    RegistroProvider.prototype.removeReserva = function (id) {
        return this.reservaCollection.doc(id).delete();
        //   var query = this.reserva.collection('Reserva', ref => ref.where('fecha', '==', id)).valueChanges();
        //   query.subscribe(res => {
        //     console.log(res);
        //   });
        //   // query.get().then(function(querySnapshot) {
        //   //   querySnapshot.forEach(function(doc) {
        //   //     doc.ref.delete();
        //   //   });
        //   // });
    };
    RegistroProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["AngularFirestore"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["AngularFirestore"]) === "function" && _a || Object])
    ], RegistroProvider);
    return RegistroProvider;
    var _a;
}());

//# sourceMappingURL=registro.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__producto_producto__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, _cs, _us) {
        this.navCtrl = navCtrl;
        this._cs = _cs;
        this._us = _us;
        this.productoPage = __WEBPACK_IMPORTED_MODULE_3__producto_producto__["a" /* ProductoPage */];
        this._cs.ver_incidencia(true, this._us.id_usuario);
    }
    HomePage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons start>\n\n      <button ion-button icon-only\n\n              *ngIf="_us.inactivo()"\n\n              (click)="_cs.ver_login()">\n\n        Login<ion-icon name="contact"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n\n\n    <ion-buttons start>\n\n      <button ion-button icon-only\n\n              *ngIf="_us.activo()">\n\n        {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only\n\n              *ngIf="_us.activo()"\n\n              (click)="_us.cerrar_sesion()">\n\n        <ion-icon name="log-out"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n\n\n    <ion-title>\n\n      Inicio\n\n    </ion-title>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding class="fondo-home">\n\n\n\n  <!-- <ion-refresher (ionRefresh)="doRefresh($event)">\n\n    <ion-refresher-content></ion-refresher-content>\n\n  </ion-refresher> -->\n\n  <p class="texto">Reciclaje y ciudad limpia</p>\n\n\n\n  <!-- <ion-infinite-scroll (ionInfinite)="siguiente_pagina($event)">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll> -->\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__["a" /* UsuarioProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__["a" /* UsuarioProvider */]) === "function" && _c || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdenesDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_compra_compra__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_carrito_carrito__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrdenesDetallePage = /** @class */ (function () {
    function OrdenesDetallePage(navCtrl, navParams, modalCtrl, _us, _cs, _rs) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this._us = _us;
        this._cs = _cs;
        this._rs = _rs;
        this.orden = {};
        this.usuario = this.navParams.get("usuario");
        this.reserva = this.navParams.get("reserva");
        this.espacio = this.navParams.get("espacio");
        this._rs.getEspacio(this.espacio.id.stringValue).subscribe(function (res) {
            _this.espacio_actual = res;
        });
        this._rs.getReserva(this._cs.fecha_reserva).subscribe(function (res) {
            if (res != null) {
                _this.reserva_pago = res.estado_pago;
                _this.estado = res.estado;
            }
        });
    }
    OrdenesDetallePage.prototype.pagar = function () {
        var modal;
        this._cs.total = this.reserva.total;
        modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__pages_compra_compra__["a" /* CompraPage */]);
        modal.present();
    };
    OrdenesDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ordenes-detalle',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\ordenes-detalle\ordenes-detalle.html"*/'<ion-header>\n\n\n\n    <ion-navbar color="dark">\n\n\n\n        <ion-buttons start>\n\n            <button ion-button icon-only *ngIf="_us.inactivo()" (click)="_cs.ver_login()">\n\n            <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n\n\n        <ion-buttons start>\n\n            <button ion-button icon-only *ngIf="_us.activo()">\n\n            {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n            <button ion-button icon-only *ngIf="_us.activo()" (click)="_us.cerrar_sesion()">\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n        <ion-title>Mi Reserva</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n    <br>\n\n    <ion-card *ngIf="_us.id_usuario != null" color="blanco">\n\n        <ion-item color="primary">\n\n            <ion-icon name="pin" slot="start"></ion-icon>\n\n            <ion-label style="font-weight: bold;">Reserva 1</ion-label>\n\n            <ion-label *ngIf="_cs.cronometro2" style="font-weight: bold">Tiempo Restante: {{_cs.cronometro2}}</ion-label>\n\n        </ion-item>\n\n        <ion-card-content color="primary">\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Usuario:</span><span>   {{usuario.usuario.stringValue}}</span></span><br>\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Placa:</span><span>   {{usuario.placa.stringValue}}</span></span><br>\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Fecha y hora de reserva:</span><span>   {{reserva.fecha}}</span></span><br>\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Horas de reserva:</span><span>   {{reserva.horas}}</span></span><br>\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Precio:</span><span>   S/. {{reserva.total}}</span></span><br>\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Estado de la reserva:</span><span *ngIf="estado">   {{estado}}</span></span><br>\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Estado de pago:</span><span *ngIf="reserva_pago">   {{reserva_pago}}</span></span><br>\n\n            <span style="line-height: 50px"><span style="font-weight: bold">Estado de ocupación:</span ><span *ngIf="espacio_actual && espacio_actual.estado_ocupacion == \'0\'" style="color:#f53d3d; font-weight: bold">   POR LLEGAR</span>\n\n            <span *ngIf="espacio_actual && espacio_actual.estado_ocupacion == \'1\'" style="color: #32db64; font-weight: bold">   LLEGÓ</span></span><br>\n\n            <div style="text-align: center; margin-top: 50px">\n\n                <button *ngIf="(espacio_actual && espacio_actual.estado_ocupacion == \'0\') || reserva_pago == \'Pago Realizado\'" ion-button disabled>Pagar</button>\n\n            </div>\n\n\n\n            <div style="text-align: center; margin-top: 50px">\n\n                <button *ngIf="espacio_actual && espacio_actual.estado_ocupacion == \'1\' && reserva_pago == \'Por pagar\'" ion-button (click)="pagar()">Pagar</button>\n\n            </div>\n\n\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\ordenes-detalle\ordenes-detalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_registro_registro__["a" /* RegistroProvider */]])
    ], OrdenesDetallePage);
    return OrdenesDetallePage;
}());

//# sourceMappingURL=ordenes-detalle.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CompraPage = /** @class */ (function () {
    function CompraPage(navCtrl, navParams, viewCtrl, _cs, _us) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._cs = _cs;
        this._us = _us;
    }
    CompraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-compra',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\compra\compra.html"*/'<!--\n\n  Generated template for the CompraPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar  color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button icon-only ion-button\n\n              (click)="viewCtrl.dismiss()">\n\n        <ion-icon name="arrow-round-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Confirmación de Compra</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <br>\n\n  <br>\n\n  <h6 text-center>Ya puedes confirmar tu compra</h6>\n\n  <h5 text-center style="font-weight: bold"> {{ _us.usuario }} </h5>\n\n  <br>\n\n  <br>\n\n\n\n  <ion-list>\n\n    <button ion-item (click)="_cs.pago_tarjeta()"><ion-icon name="ios-card"></ion-icon>  Pagar con tarjeta            <img src="../../assets/imgs/visa.png" height="20" width="32"> <img src="../../assets/imgs/mastercard.png" height="28" width="28"></button>\n\n    <button ion-item (click)="_cs.pago_paypal()"><ion-icon name="ios-card"></ion-icon>  Pagar con paypal              <img src="../../assets/imgs/paypal.png" height="32" width="32"></button>\n\n  </ion-list>\n\n\n\n  <br>\n\n  <br>\n\n  <h5 text-center>Total: {{ _cs.total | currency:\'S/. \':symbol }}</h5>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\compra\compra.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], CompraPage);
    return CompraPage;
}());

//# sourceMappingURL=compra.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstacionamientoDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_espacios_espacios__ = __webpack_require__(295);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EstacionamientoDetallePage = /** @class */ (function () {
    function EstacionamientoDetallePage(navCtrl, navParams, alertCtrl, _cs, _us, _rs) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this._cs = _cs;
        this._us = _us;
        this._rs = _rs;
        this.incidencia = {};
        this.espacios = __WEBPACK_IMPORTED_MODULE_5__pages_espacios_espacios__["a" /* EspaciosPage */];
        this.disponible = 0;
        this.mireciclaje = false;
        this.incidencia = this.navParams.get("incidencia");
        this.incidencia.id_residuo.get().then(function (res) {
            _this.residuo = res._document.proto.fields.tipo.stringValue;
        });
        this.incidencia.id_volumen.get().then(function (res) {
            _this.volumen = res._document.proto.fields.tipo.stringValue;
        });
        //   for(var i = 0; i < this.estacionamiento.espacio.length; i++){
        //         this.estacionamiento.espacio[i].get().then(res => {
        //           //console.log(res._document.proto.fields.id.stringValue);
        //           this.ocupacion = res._document.proto.fields.estado_ocupacion.stringValue;
        //           this.reservacion = res._document.proto.fields.estado_reservacion.stringValue;
        //           //this.espacio.push(res._document.proto.fields);
        //           if(this.ocupacion == "0" && this.reservacion == "0"){
        //             this.disponible++;
        //           }
        //         })
        //   }
    }
    EstacionamientoDetallePage.prototype.ngOnInit = function () {
        // if(this._us.id_usuario){
        //   this._rs.getReservas(this._us.id_usuario).subscribe(res => {
        //     if(res.length >= 5){
        //       this.descuento = Math.round(this.estacionamiento.costo*0.8*10)/10;
        //     }
        //   });
        // }
    };
    EstacionamientoDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estacionamiento-detalle',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\estacionamiento-detalle\estacionamiento-detalle.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n    \n\n      <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.inactivo()"\n\n                  (click)="_cs.ver_login()">\n\n            <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n    \n\n        <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()">\n\n            {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()"\n\n                  (click)="_us.cerrar_sesion()">\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n    <ion-title>Detalle</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n    <h5 padding style="text-align: center; font-weight: bold">{{incidencia.titulo}}</h5>\n\n\n\n    <div style="text-align: center">\n\n        <img [src]="incidencia.imagen" style="max-width: 100%">\n\n      </div>\n\n\n\n      <h6 style="font-size: 14px; padding: 0px">Ubicación:           {{incidencia.ubicacion}}</h6>\n\n      <h6 style="font-size: 14px; padding: 0px">Descripción:                   {{incidencia.descripcion}}</h6>\n\n      <h6 style="font-size: 14px; padding: 0px">Residuo:                        <span style="color: green;">{{residuo}}</span></h6>\n\n      <h6 style="font-size: 14px; padding: 0px">Volumen:            <span style="color: green;">{{volumen}}</span></h6>\n\n      <h6 style="font-size: 14px; padding: 0px">Fecha:                        {{incidencia.fecha}}</h6>\n\n      <h6 style="font-size: 14px; padding: 0px">Hora:                             {{incidencia.hora}}</h6>\n\n      <h6 style="font-size: 14px; padding: 0px;">Estado:                       <span style="color: red;">No recogido</span></h6>\n\n      <!-- <h6 *ngIf="!descuento" style="font-size: 14px; padding: 0px">Costo por hora:     S/. {{estacionamiento.costo}}</h6>\n\n      <h6 *ngIf="descuento" style="font-size: 14px; padding: 0px">Costo por hora:     <span style="text-decoration: line-through">S/. {{estacionamiento.costo}}</span>  <span style="color: red">(-20%)</span>  ->  <span style="color: blue">S/.{{descuento}}</span></h6> -->\n\n\n\n      <button id="reserva" ion-button block\n\n              [navPush]="espacios"\n\n              [navParams]="{ estacionamiento: estacionamiento }"\n\n        >\n\n    Cambiar estado\n\n  </button>\n\n  <br><br>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\estacionamiento-detalle\estacionamiento-detalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__["a" /* RegistroProvider */]])
    ], EstacionamientoDetallePage);
    return EstacionamientoDetallePage;
}());

//# sourceMappingURL=estacionamiento-detalle.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EspaciosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_espacios_detalle_espacios_detalle__ = __webpack_require__(296);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EspaciosPage = /** @class */ (function () {
    function EspaciosPage(navCtrl, navParams, _cs, _us) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._cs = _cs;
        this._us = _us;
        this.estacionamiento = {};
        this.espacios = [];
        this.espaciosdetalle = __WEBPACK_IMPORTED_MODULE_4__pages_espacios_detalle_espacios_detalle__["a" /* EspaciosDetallePage */];
        this.estacionamiento = this.navParams.get("estacionamiento");
        //this.espacios = this.estacionamiento.espacio;
        for (var i = 0; i < this.estacionamiento.espacio.length; i++) {
            this.estacionamiento.espacio[i].get().then(function (res) {
                //console.log(res._document.proto.fields.id.stringValue);
                _this.espacios.push(res._document.proto.fields);
                //console.log(res);
            });
        }
        //console.log(this.espacios);
    }
    EspaciosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-espacios',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\espacios\espacios.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n      <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.inactivo()"\n\n                  (click)="_cs.ver_login()">\n\n            <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n    \n\n        <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()">\n\n            {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()"\n\n                  (click)="_us.cerrar_sesion()">\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n    <ion-title>Espacios</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <h6 padding>Escoja el espacio que va a reservar en el estacionamiento:</h6>\n\n  <br>\n\n  <!-- <ion-list>\n\n      <button id="reserva" ion-item\n\n              *ngFor="let espacio of espacios"\n\n              (click)="_cs.ver_espacio(espacio.id.stringValue)"\n\n              [navPush]="espaciosdetalle"\n\n              [navParams]="{ estacionamiento: estacionamiento }"\n\n      >\n\n      <ion-icon name="ios-arrow-forward"></ion-icon>\n\n          Espacio {{espacio.id.stringValue}}\n\n    </button>\n\n  </ion-list> -->\n\n\n\n  <table id="tablero">\n\n  \n\n    <tr>\n\n      <td><div id="caseta2"></div></td>\n\n      <td></td>\n\n      <td></td>\n\n      <td></td>\n\n    </tr>\n\n    \n\n    <tr>\n\n      <td class="ruta"></td>\n\n      <td class="ruta"></td>\n\n      <td class="ruta"></td>\n\n      <td class="ruta"></td>\n\n      \n\n    </tr>\n\n    <tr>\n\n      <td></td>\n\n      <td></td>\n\n      <td></td>\n\n      <td></td>\n\n     \n\n    </tr>\n\n    <tr>\n\n      <td class="espacio" *ngFor="let espacio of espacios"\n\n      (click)="_cs.ver_espacio(espacio.id.stringValue)"\n\n      [navPush]="espaciosdetalle"\n\n      [navParams]="{ estacionamiento: estacionamiento }">\n\n        <button *ngIf="espacio.estado_reservacion.stringValue == \'1\' && espacio.estado_ocupacion.stringValue == \'0\'" class="espacio2" id="1" style="background-color: #F77917">{{espacio.id.stringValue}}</button>\n\n        <button *ngIf="espacio.estado_reservacion.stringValue == \'0\' && espacio.estado_ocupacion.stringValue == \'0\'" class="espacio2" id="1">{{espacio.id.stringValue}}</button>\n\n        <button *ngIf="espacio.estado_ocupacion.stringValue == \'1\'" class="espacio2" id="1" style="background-color: red">{{espacio.id.stringValue}}</button>\n\n      </td>\n\n      \n\n    </tr>\n\n  </table>\n\n  <br><br>\n\n  <ion-card style="margin-top: 100%">\n\n    <ion-card-content  color="black">\n\n        <br>\n\n        <div>\n\n          <h5 padding style="font-weight: bold">Leyenda:</h5>\n\n          <div style="display: -webkit-box">\n\n            <div class="circulo" style="background: green"></div>\n\n            <span style="margin-left: 5px">Caseta</span>\n\n            <div class="circulo" style="background: #808080"></div>\n\n            <span style="margin-left: 5px">Pista</span>\n\n            <div class="circulo" style="background: #454545"></div>\n\n            <span style="margin-left: 5px">Espacio Libre</span>\n\n          </div>\n\n          <br>\n\n          <div style="display: -webkit-box">\n\n            <div class="circulo" style="background: #F77917"></div>\n\n            <span style="margin-left: 5px">Reservado</span>\n\n            <div class="circulo" style="background: red"></div>\n\n            <span style="margin-left: 5px">Ocupado</span>\n\n          </div>\n\n          <br><br>\n\n        </div>\n\n    </ion-card-content>\n\n</ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\espacios\espacios.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], EspaciosPage);
    return EspaciosPage;
}());

//# sourceMappingURL=espacios.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EspaciosDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_registro_registro__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EspaciosDetallePage = /** @class */ (function () {
    function EspaciosDetallePage(navCtrl, navParams, modalCtrl, alertCtrl, db, _cs, _us, _rs) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this._cs = _cs;
        this._us = _us;
        this._rs = _rs;
        //espacio: any;
        this.descuento = 0;
        this.maxTime = 60;
        this.horas = "";
        this.fecha_reg = new Date();
        this.fecha = this.fecha_reg.getDate() + "-" + (this.fecha_reg.getMonth() + 1) + "-" + this.fecha_reg.getFullYear() + "   " + this.fecha_reg.getHours() + ":" + this.fecha_reg.getMinutes() + ":" + this.fecha_reg.getSeconds();
        //this.espacio = this.navParams.get("espacio");
        this.estacionamiento = this.navParams.get("estacionamiento");
        this.costo = this.estacionamiento.costo;
        this.descuento = 0;
        if (this._us.id_usuario) {
            this._rs.getReservas(this._us.id_usuario).subscribe(function (res) {
                if (res.length >= 5) {
                    _this.descuento = Math.round(_this.estacionamiento.costo * 0.8 * 10) / 10;
                }
            });
        }
    }
    EspaciosDetallePage.prototype.reservar = function () {
        var _this = this;
        var modal;
        this._cs.estado_pago = false;
        this._cs.reserva_estado = false;
        this._cs.estado_eliminado = false;
        this._cs.estado_reserva = true;
        if (!this._us.token) {
            // mostrar el login
            modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
            modal.present();
        }
        else {
            this.alertCtrl.create({
                title: "Reserva",
                subTitle: "Su vacante fue reservada con éxito",
                buttons: [{ text: "OK",
                        handler: function () {
                            _this.alertCtrl.create({
                                title: "Reserva",
                                subTitle: "Su tiempo máximo para llegar al espacio y realizar el pago de 15 minutos",
                                buttons: [{ text: "OK",
                                        handler: function () {
                                            _this.navCtrl.popToRoot();
                                        } }]
                            }).present();
                        } }]
            }).present();
            if (this.descuento != 0) {
                var total = this.descuento * this.horas;
            }
            else {
                var total2 = this.costo * this.horas;
            }
            this._cs.fecha_reserva = this.fecha;
            var espacio = { estado_ocupacion: this._cs.espacio.estado_ocupacion, estado_reservacion: "1", id: this._cs.espacio.id };
            this._rs.updateEspacio(espacio, this._cs.espacio.id);
            var reserva = { espacio: this.db.doc('/Espacio/' + this._cs.espacio.id).ref, estacionamiento: this.db.doc('/Estacionamiento/' + this.estacionamiento.id).ref,
                id_usuario: this._us.id_usuario, estado_pago: "Por pagar", estado: "En proceso", fecha: this.fecha, horas: Number(this.horas), total: total, usuario: this.db.doc('/Usuario/' + this._us.id_usuario).ref };
            this._rs.addReserva(reserva, this.fecha);
            //this.carga(); 
            //this.tiempo(); 
            this.StartTimer();
        }
    };
    //   carga(){
    //     var contador_s = 0;
    //     var contador_m = 0;
    //     // var s = document.getElementById("segundos");
    //     // var m = document.getElementById("minutos");
    //     this.cronometro = setInterval(
    //         function(){
    //           if(contador_m.toString()+":"+contador_s.toString() != "0:15"){
    //             if(contador_s==60)
    //             {
    //                 contador_s=0;
    //                 contador_m++;
    //                 //m.innerHTML = contador_m;
    //                 if(contador_m==60)
    //                 {
    //                     contador_m=0;
    //                 }
    //             }
    //             //s.innerHTML = contador_s;
    //             contador_s++;
    //             console.log(contador_m+":"+contador_s);
    //           }else{
    //             clearInterval(this.cronometro);
    //             console.log("Finalizado");
    //           }
    //         }
    //         ,1000);
    //  }
    //  tiempo(){
    //    setTimeout(function(){
    //     alert("Reserva eliminada");
    //     //this.alertCtrl.create({
    //     //   title: "Reserva eliminada",
    //     //   subTitle: "Usted no llegó en el tiempo establecido",
    //     //   enableBackdropDismiss: true,
    //     //   buttons: ["OK"]
    //     // }).present();
    //    }, 10000);
    //  }
    EspaciosDetallePage.prototype.StartTimer = function () {
        var _this = this;
        this.timer = setTimeout(function (x) {
            if (_this.maxTime <= 0 || _this._cs.espacio.estado_ocupacion == "1") { }
            _this.maxTime -= 1;
            //console.log(this.maxTime);
            _this._cs.cronometro = _this.maxTime;
            if (_this.maxTime > 0 && (_this._cs.espacio.estado_ocupacion == "0" || _this._cs.estado_pago == false) && _this._cs.estado_eliminado == false) {
                //this.hidevalue = false;
                _this.StartTimer();
            }
            else {
                if (_this._cs.espacio.estado_ocupacion == "1" && _this._cs.estado_pago == true) {
                    _this._cs.cronometro = null;
                    alert("Ha comenzado a transcurrir su tiempo de reserva");
                    _this.maxTime2 = _this.horas * 20;
                    _this.StartTimer2();
                }
                else {
                    if (_this._cs.estado_eliminado == true) {
                    }
                    else {
                        alert("Reserva eliminada");
                        _this._rs.removeReserva(_this.fecha);
                        var espacio = { estado_ocupacion: _this._cs.espacio.estado_ocupacion, estado_reservacion: "0", id: _this._cs.espacio.id };
                        _this._rs.updateEspacio(espacio, _this._cs.espacio.id);
                        _this._cs.estado_reserva = false;
                        //this.hidevalue = true;
                    }
                }
            }
        }, 1000);
    };
    EspaciosDetallePage.prototype.StartTimer2 = function () {
        var _this = this;
        this.timer2 = setTimeout(function (x) {
            _this.maxTime2 -= 1;
            _this._cs.cronometro2 = _this.maxTime2;
            if (_this.maxTime2 > 0) {
                if (_this.maxTime2 == 10) {
                    alert("Quedan 10 segundos para que termine su reserva");
                }
                //this.hidevalue = false;
                _this.StartTimer2();
            }
            else {
                _this._rs.updateReservaEstado2(_this.fecha);
                var espacio = { estado_ocupacion: _this._cs.espacio.estado_ocupacion, estado_reservacion: "0", id: _this._cs.espacio.id };
                _this._rs.updateEspacio(espacio, _this._cs.espacio.id);
                _this._cs.reserva_estado = true;
                alert("Reserva finalizada");
                //this.navCtrl.popToRoot();
            }
        }, 1000);
    };
    EspaciosDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-espacios-detalle',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\espacios-detalle\espacios-detalle.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar  color="dark">\n\n\n\n      <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.inactivo()"\n\n                  (click)="_cs.ver_login()">\n\n            <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n    \n\n        <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()">\n\n            {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()"\n\n                  (click)="_us.cerrar_sesion()">\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n    <ion-title>Reservar Espacio</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <div *ngIf="_cs.espacio">\n\n    <h5 padding style="text-align: center; font-weight: bold">{{_cs.espacio.id}}</h5>\n\n\n\n    <!-- <div style="text-align: center">\n\n        <img [src]="estacionamiento.imagen" style="max-width: 100%">\n\n      </div> -->\n\n\n\n      <h6 *ngIf="_cs.espacio.estado_ocupacion == \'0\'" style="font-size: 14px; padding: 0px">Estado de ocupación:                 <span style="color: blue">Libre</span></h6>\n\n      <h6 *ngIf="_cs.espacio.estado_ocupacion == \'1\'" style="font-size: 14px; padding: 0px">Estado de ocupación:        <span style="color: red">Ocupado</span></h6>\n\n      <h6 *ngIf="_cs.espacio.estado_reservacion == \'0\'" style="font-size: 14px; padding: 0px">Estado de reservación:        <span style="color: blue">No reservado</span></h6>\n\n      <h6 *ngIf="_cs.espacio.estado_reservacion == \'1\'" style="font-size: 14px; padding: 0px">Estado de reservación:        <span style="color: red">En reserva</span></h6>\n\n      <h6 *ngIf="descuento == 0" style="font-size: 14px; padding: 0px">Costo por hora:                          S/. {{costo}}</h6>\n\n      <h6 *ngIf="descuento" style="font-size: 14px; padding: 0px">Costo por hora:     <span style="text-decoration: line-through">S/. {{estacionamiento.costo}}</span>  <span style="color: red">(-20%)</span>  ->  <span style="color: blue">S/.{{descuento}}</span></h6>\n\n\n\n      <ion-item *ngIf="_cs.espacio.estado_ocupacion == \'0\' && _cs.espacio.estado_reservacion == \'0\'">\n\n        <ion-label floating>Ingrese cantidad de horas a reservar</ion-label>\n\n          <ion-input type="number" [(ngModel)]="horas"></ion-input>\n\n      </ion-item>\n\n    \n\n      <button *ngIf="_cs.espacio.estado_ocupacion == \'0\' && _cs.espacio.estado_reservacion == \'0\'" id="reserva" ion-button block [disabled]=" horas.length < 1" (click)="reservar()">Reservar ahora</button>\n\n      <button *ngIf="_cs.espacio.estado_ocupacion != \'0\' || _cs.espacio.estado_reservacion != \'0\'" id="reserva" disabled ion-button block>Reservar ahora</button>\n\n    \n\n    </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\espacios-detalle\espacios-detalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["AngularFirestore"],
            __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_registro_registro__["a" /* RegistroProvider */]])
    ], EspaciosDetallePage);
    return EspaciosDetallePage;
}());

//# sourceMappingURL=espacios-detalle.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(289);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_0__home_home__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__carrito_carrito__ = __webpack_require__(607);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__carrito_carrito__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapa_mapa__ = __webpack_require__(608);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_2__mapa_mapa__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(161);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_3__login_login__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ordenes_ordenes__ = __webpack_require__(610);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_4__ordenes_ordenes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ordenes_detalle_ordenes_detalle__ = __webpack_require__(292);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_5__ordenes_detalle_ordenes_detalle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__publicacion_publicacion__ = __webpack_require__(611);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_6__publicacion_publicacion__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__producto_producto__ = __webpack_require__(160);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_7__producto_producto__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tabs_tabs__ = __webpack_require__(612);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_8__tabs_tabs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__busqueda_busqueda__ = __webpack_require__(613);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_9__busqueda_busqueda__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__registrarse_registrarse__ = __webpack_require__(614);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_10__registrarse_registrarse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__compra_compra__ = __webpack_require__(293);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_11__compra_compra__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__paypal_paypal__ = __webpack_require__(615);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_12__paypal_paypal__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__tarjeta_tarjeta__ = __webpack_require__(616);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_13__tarjeta_tarjeta__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__estacionamiento_estacionamiento__ = __webpack_require__(617);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_14__estacionamiento_estacionamiento__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__estacionamiento_detalle_estacionamiento_detalle__ = __webpack_require__(294);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_15__estacionamiento_detalle_estacionamiento_detalle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__espacios_espacios__ = __webpack_require__(295);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_16__espacios_espacios__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__espacios_detalle_espacios_detalle__ = __webpack_require__(296);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_17__espacios_detalle_espacios_detalle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__historial_historial__ = __webpack_require__(618);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_18__historial_historial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__reportes_reportes__ = __webpack_require__(619);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_19__reportes_reportes__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__mantenimiento_mantenimiento__ = __webpack_require__(623);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_20__mantenimiento_mantenimiento__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__residuos_residuos__ = __webpack_require__(624);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_21__residuos_residuos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__volumen_volumen__ = __webpack_require__(625);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_22__volumen_volumen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__foto_foto__ = __webpack_require__(626);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_23__foto_foto__["a"]; });
























//# sourceMappingURL=index.paginas.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(545);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_viewer__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__app_component__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_home_home__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_storage__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_index_services__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













//import { CarritoProvider } from '../providers/carrito/carrito';
//import { ProductosProvider } from '../providers/productos/productos';
//import { UsuarioProvider } from '../providers/usuario/usuario';
// storage

// servicios

// Paginas

var firebaseConfig = {
    apiKey: "AIzaSyDKkhH0qtvg7FFP5k8SM4eY1gKVavB-KxE",
    authDomain: "paginaweb-6a5ae.firebaseapp.com",
    databaseURL: "https://paginaweb-6a5ae.firebaseio.com",
    projectId: "paginaweb-6a5ae",
    storageBucket: "paginaweb-6a5ae.appspot.com",
    messagingSenderId: "668264152386"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["b" /* CarritoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["m" /* MapaPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["k" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["o" /* OrdenesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["n" /* OrdenesDetallePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["r" /* PublicacionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["v" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["a" /* BusquedaPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["q" /* ProductoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["s" /* RegistrarsePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["c" /* CompraPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["w" /* TarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["p" /* PaypalPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["g" /* EstacionamientoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["f" /* EstacionamientoDetallePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["e" /* EspaciosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["d" /* EspaciosDetallePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["i" /* HistorialPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["t" /* ReportesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["l" /* MantenimientoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["u" /* ResiduosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["x" /* VolumenPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["h" /* FotoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_13__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_angularfire2__["AngularFireModule"].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2_firestore__["AngularFirestoreModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_11__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_12__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["b" /* CarritoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["m" /* MapaPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["k" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["o" /* OrdenesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["n" /* OrdenesDetallePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["r" /* PublicacionPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["v" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["a" /* BusquedaPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["q" /* ProductoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["s" /* RegistrarsePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["c" /* CompraPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["w" /* TarjetaPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["p" /* PaypalPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["g" /* EstacionamientoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["f" /* EstacionamientoDetallePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["e" /* EspaciosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["d" /* EspaciosDetallePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["i" /* HistorialPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["t" /* ReportesPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["l" /* MantenimientoPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["u" /* ResiduosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["x" /* VolumenPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_index_paginas__["h" /* FotoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__providers_index_services__["a" /* CarritoProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_index_services__["d" /* UsuarioProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_index_services__["b" /* ProductosProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_index_services__["c" /* RegistroProvider */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_photo_viewer__["a" /* PhotoViewer */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { HomePage } from '../pages/home/home';

var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_index_paginas__["v" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //statusBar.styleDefault();
            statusBar.styleLightContent();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarritoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CarritoPage = /** @class */ (function () {
    function CarritoPage(navCtrl, navParams, _cs, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._cs = _cs;
        this.viewCtrl = viewCtrl;
    }
    CarritoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-carrito',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\carrito\carrito.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button icon-only ion-button\n\n              (click)="viewCtrl.dismiss()">\n\n        <ion-icon name="arrow-round-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Carrito de Compras</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\carrito\carrito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]])
    ], CarritoPage);
    return CarritoPage;
}());

//# sourceMappingURL=carrito.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__index_paginas__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_photo_viewer__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_compat_add_operator_map__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_compat_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_compat_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_leaflet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_leaflet__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Geolocation } from '@ionic-native/geolocation';







var MapaPage = /** @class */ (function () {
    function MapaPage(navCtrl, navParams, _us, _cs, _rs, viewer, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._us = _us;
        this._cs = _cs;
        this._rs = _rs;
        this.viewer = viewer;
        this.platform = platform;
        //map: any;
        this.vmapa = true;
        this.estacionamiento = __WEBPACK_IMPORTED_MODULE_5__index_paginas__["g" /* EstacionamientoPage */];
        this.view = new __WEBPACK_IMPORTED_MODULE_6__ionic_native_photo_viewer__["a" /* PhotoViewer */]();
        // this.platform.ready().then(() =>{
        //   var photoUrl = "https://e.rpp-noticias.io/normal/2018/12/06/573857_721892.jpg";
        //   var title = "Foto Ejemplo";
        //   var options = {
        //     share: true
        //   }
        //   this.viewer.show(photoUrl, title, options);
        // })
    }
    MapaPage.prototype.ionViewDidEnter = function () {
        this.drawMap(this.view, this._cs);
    };
    MapaPage.prototype.ionViewWillLeave = function () {
        //document.append("<div id='map' style='width: 100%; height: 100%;'></div>"); 
    };
    MapaPage.prototype.drawMap = function (view, _cs) {
        document.getElementById('map').remove();
        var parent = document.createElement("div");
        parent.setAttribute('id', 'map');
        // parent.setAttribute('style', 'width: 100%; height: 100%');
        document.getElementById('ga').getElementsByClassName('scroll-content')[0].appendChild(parent);
        var map = __WEBPACK_IMPORTED_MODULE_8_leaflet__["map"]('map').setView([-0.1836298, -78.4821206], 13);
        __WEBPACK_IMPORTED_MODULE_8_leaflet__["tileLayer"]('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: 'AppTuto',
            maxZoom: 18
        }).addTo(map);
        //web location
        map.locate({ setView: true });
        //when we have a location draw a marker and accuracy circle
        function onLocationFound(e) {
            var radius = Math.round(e.accuracy / 2);
            //console.log(e.latlng.lat, e.latlng.lng);
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"](e.latlng).addTo(map)
                .bindPopup("Estás dentro de los " + radius + " metros desde este punto").openPopup();
            for (var i = 0; i < _cs.incidencias.length; i++) {
                var titulo = _cs.incidencias[i].titulo;
                var imagen = _cs.incidencias[i].imagen;
                __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: _cs.incidencias[i].latitud, lng: _cs.incidencias[i].longitud }).addTo(map).bindPopup(_cs.incidencias[i].titulo + "<img src=" + _cs.incidencias[i].imagen + " alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>").on('click', function () {
                    var photoUrl = imagen;
                    var title = titulo;
                    var options = {
                        share: true
                    };
                    view.show(photoUrl, title, options);
                });
            }
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.046848, lng: -77.001806 }).addTo(map).bindPopup("Estacionamiento La Muralla <img src='https://e.rpp-noticias.io/normal/2018/12/06/573857_721892.jpg' style='max-width:100%;width:auto;height:auto;'>")
                .on('click', function () {
                var photoUrl = "https://e.rpp-noticias.io/normal/2018/12/06/573857_721892.jpg";
                var title = "Foto Ejemplo";
                var options = {
                    share: true
                };
                view.show(photoUrl, title, options);
            });
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.046545, lng: -77.000514 }).addTo(map).bindPopup("Estacionamiento Fenix");
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.082429, lng: -76.985826 }).addTo(map).bindPopup("Estacionamiento Javier Prado");
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.053906, lng: -77.043302 }).addTo(map).bindPopup("Estacionamiento Metro Alf. Ugarte");
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -11.995110539390058, lng: -77.0609673857689 }).addTo(map).bindPopup("Estacionamiento Mega Plaza");
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.077637717148855, lng: -77.08165258169176 }).addTo(map).bindPopup("Estacionamiento Plaza San Miguel");
            //Leaflet.marker({lat: -12.057155, lng: -77.0801286}).addTo(map).bindPopup("Puerta 03 UNMSM <img src='/assets/imgs/Pta 3.jpg' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.059382, lng: -77.0794179 }).addTo(map).bindPopup("Puerta 02 UNMSM <img src='/assets/imgs/Pta3.png' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.0537523, lng: -77.0850158 }).addTo(map).bindPopup("Puerta 07 UNMSM <img src='/assets/imgs/Pta3.png' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["marker"]({ lat: -12.0610049, lng: -77.0864591 }).addTo(map).bindPopup("Puerta 01   UNMSM <img src='/assets/imgs/Pta3.png' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
            var ubicacion = document.getElementsByClassName('leaflet-marker-icon');
            for (var j = 1; j < ubicacion.length; j++) {
                ubicacion[j].setAttribute("id", "playa" + j);
                var playaid = document.getElementById("playa" + j);
                playaid.setAttribute("src", "/assets/images/basura.png");
            }
            __WEBPACK_IMPORTED_MODULE_8_leaflet__["circle"](e.latlng, radius).addTo(map);
        }
        map.on('locationfound', onLocationFound);
        //alert on location error
        function onLocationError(e) {
            alert(e.message);
        }
        map.on('locationerror', onLocationError);
    };
    MapaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mapa',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\mapa\mapa.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n      <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.inactivo()"\n\n                  (click)="_cs.ver_login()">\n\n            <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n    \n\n        <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()">\n\n            {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()"\n\n                  (click)="_us.cerrar_sesion()">\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n    <ion-title>Mapa</ion-title>\n\n    <ion-buttons end>\n\n\n\n        <button ion-button icon-only\n\n                (click)="_cs.ver_incidencia(vmapa, _us.id_usuario)"\n\n                [navPush]="estacionamiento">\n\n          <ion-icon name="md-list-box"></ion-icon>\n\n        </button>\n\n  \n\n        &nbsp;\n\n        &nbsp;\n\n  \n\n      </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content id="ga" [attr.noScroll]="shouldScroll">\n\n  <div id="map"></div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\mapa\mapa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__["a" /* RegistroProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_photo_viewer__["a" /* PhotoViewer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], MapaPage);
    return MapaPage;
}());

//# sourceMappingURL=mapa.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdenesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_ordenes_detalle_ordenes_detalle__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index_paginas__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_carrito_carrito__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var OrdenesPage = /** @class */ (function () {
    function OrdenesPage(navCtrl, navParams, alertCtrl, _us, _cs, _rs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this._us = _us;
        this._cs = _cs;
        this._rs = _rs;
        this.incidencia = __WEBPACK_IMPORTED_MODULE_4__index_paginas__["g" /* EstacionamientoPage */];
        this.vreciclaje = true;
        this.mireciclaje = false;
        //espacio : any = [];
        this.ordenesDetalle = __WEBPACK_IMPORTED_MODULE_2__pages_ordenes_detalle_ordenes_detalle__["a" /* OrdenesDetallePage */];
        this.login = __WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */];
        this._cs.estado_reserva = true;
    }
    OrdenesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.estacionamiento = null;
        if (this._us.id_usuario && this._cs.fecha_reserva) {
            this._rs.getReserva(this._cs.fecha_reserva).subscribe(function (res) {
                //console.log(res);
                _this.reservas = res;
                if (res != null) {
                    res.estacionamiento.get().then(function (res) {
                        var r;
                        r = res;
                        _this.estacionamiento = r._document.proto.fields;
                    });
                    res.espacio.get().then(function (res) {
                        var r;
                        r = res;
                        if (r._document.proto) {
                            _this.espacio = r._document.proto.fields;
                        }
                    });
                    res.usuario.get().then(function (res) {
                        var r;
                        r = res;
                        _this.usuario = r._document.proto.fields;
                    });
                }
            });
        }
    };
    // ionViewWillLeave(){
    //   if(this._us.id_usuario == null)
    //     this.estacionamiento = null;
    // }
    OrdenesPage.prototype.eliminarReserva = function () {
        this._rs.removeReserva(this.reservas.fecha);
        this.alertCtrl.create({
            title: "Eliminado",
            subTitle: "Reserva eliminada correctamente",
            buttons: ["OK"]
        }).present();
        var espacio = { estado_ocupacion: this.espacio.estado_ocupacion.stringValue, estado_reservacion: "0", id: this.espacio.id.stringValue };
        this._rs.updateEspacio(espacio, this.espacio.id.stringValue);
        this.estacionamiento = null;
        this._cs.estado_eliminado = true;
    };
    OrdenesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ordenes',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\ordenes\ordenes.html"*/'<ion-header>\n\n\n\n    <ion-navbar color="dark">\n\n\n\n        <ion-buttons start>\n\n            <button ion-button icon-only *ngIf="_us.inactivo()" [navPush]="login">\n\n            <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n\n\n        <ion-buttons start>\n\n            <button ion-button icon-only *ngIf="_us.activo()">\n\n            {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n            <button ion-button icon-only *ngIf="_us.activo()" (click)="_us.cerrar_sesion()">\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n        <ion-title>Reciclaje</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n    \n\n    <div style="text-align: center">\n\n        <img src="../../assets/imgs/mireciclaje.jpg" style="max-width: 80%; padding-top: 42px">\n\n      </div>\n\n      <br><br>\n\n      <button style="width: 70%; margin-left: 50px;" ion-button block (click)="_us.ver_residuo(vreciclaje)"\n\n              >\n\n        Reciclar\n\n      </button>\n\n      <br><br>\n\n      <button style="width: 70%; margin-left: 50px;" ion-button block (click)="_cs.ver_incidencia(mireciclaje, _us.id_usuario)"  \n\n                                                                      [navPush]="incidencia"\n\n              >\n\n        Mi reciclaje\n\n      </button>\n\n\n\n\n\n\n\n    <ion-card *ngIf="reservas && estacionamiento != null && _us.id_usuario != null && _cs.estado_reserva == true && reservas.estado != \'Finalizado\'">\n\n        <ion-item color="primary">\n\n            <ion-icon name="pin" slot="start"></ion-icon>\n\n            <ion-label style="font-weight: bold">Reserva 1</ion-label>\n\n            <ion-label *ngIf="_cs.cronometro" style="font-weight: bold">Tiempo Restante: {{_cs.cronometro}}</ion-label>\n\n        </ion-item>\n\n\n\n        <ion-card-content color="primary">\n\n            <br>\n\n            <div style="text-align: right">\n\n                <button ion-button [navPush]="ordenesDetalle" [navParams]="{usuario : usuario, reserva : reservas, espacio : espacio}">Ver</button>\n\n                <button ion-button color="danger" (click)="eliminarReserva()">Eliminar</button>\n\n                <!-- <button *ngIf="espacio && espacio.estado_ocupacion.stringValue == \'0\'" ion-button color="danger" (click)="eliminarReserva()">Eliminar</button>\n\n                <button *ngIf="espacio && espacio.estado_ocupacion.stringValue == \'1\'" ion-button disabled color="danger" (click)="eliminarReserva()">Eliminar</button> -->\n\n            </div>\n\n            <br>\n\n            <span *ngIf="estacionamiento">{{estacionamiento.nombre.stringValue}} - </span>\n\n            <span *ngIf="espacio">{{espacio.id.stringValue}}</span>\n\n        </ion-card-content>\n\n    </ion-card>\n\n\n\n\n\n</ion-content>\n\n\n\n<!-- <ion-content *ngIf="estacionamiento == null || _us.id_usuario == null || _cs.estado_reserva == false || reservas.estado == \'Finalizado\'">\n\n\n\n    <div text-center class="carrito_vacio">\n\n        <ion-icon name="ios-list-box-outline" class="icon-5x">\n\n        </ion-icon>\n\n        <br> No tienes reciclajes\n\n    </div>\n\n\n\n</ion-content> -->'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\ordenes\ordenes.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__["a" /* UsuarioProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_usuario_usuario__["a" /* UsuarioProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__providers_carrito_carrito__["a" /* CarritoProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__providers_carrito_carrito__["a" /* CarritoProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__providers_registro_registro__["a" /* RegistroProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_registro_registro__["a" /* RegistroProvider */]) === "function" && _f || Object])
    ], OrdenesPage);
    return OrdenesPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=ordenes.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_productos_productos__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__producto_producto__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PublicacionPage = /** @class */ (function () {
    function PublicacionPage(navCtrl, navParams, viewCtrl, _cs, _us, _ps) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._cs = _cs;
        this._us = _us;
        this._ps = _ps;
        this.productoPage = __WEBPACK_IMPORTED_MODULE_3__producto_producto__["a" /* ProductoPage */];
        this.estado = true;
        this.vpublicacion = false;
        this.categoria = {};
    }
    PublicacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-publicacion',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\publicacion\publicacion.html"*/'\n\n<ion-header>\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons start>\n\n      <button ion-button icon-only\n\n              *ngIf="_us.inactivo()"\n\n              (click)="_cs.ver_login()">\n\n        Login<ion-icon name="contact"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n\n\n    <ion-buttons start>\n\n      <button ion-button icon-only\n\n              *ngIf="_us.activo()">\n\n        {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n      </button>\n\n      <button ion-button icon-only\n\n              *ngIf="_us.activo()"\n\n              (click)="_us.cerrar_sesion()">\n\n        <ion-icon name="log-out"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n\n\n    <ion-title>\n\n      Publicar Incidencia\n\n    </ion-title>\n\n\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div style="text-align: center">\n\n    <img src="../../assets/imgs/publicar.jpg" style="max-width: 80%; padding-top: 84px">\n\n  </div>\n\n  <br><br>\n\n  <button id="publicacion" ion-button block (click)="_us.ver_residuo(vpublicacion)"\n\n          >\n\n    Publicar\n\n  </button>\n\n  <!-- <ion-list radio-group>\n\n    <ion-list-header>\n\n      Selecciona el tipo de residuo\n\n    </ion-list-header>\n\n    <ion-item>\n\n      <ion-label>PHP</ion-label>\n\n      <ion-radio checked="true" value="PHP" (click)="cambiar()"></ion-radio>\n\n    </ion-item>\n\n  \n\n    <ion-item>\n\n      <ion-label>Ruby</ion-label>\n\n      <ion-radio value="Ruby"></ion-radio>\n\n    </ion-item>\n\n  \n\n    <ion-item>\n\n      <ion-label>Java</ion-label>\n\n      <ion-radio value="Java"></ion-radio>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n\n\n<ion-content *ngIf="estado == false" padding>\n\n  <br><br>\n\n    <h1>YAAAA</h1> -->\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\publicacion\publicacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_productos_productos__["a" /* ProductosProvider */]])
    ], PublicacionPage);
    return PublicacionPage;
}());

//# sourceMappingURL=publicacion.js.map

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_paginas__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = /** @class */ (function () {
    function TabsPage(_us) {
        this._us = _us;
        this.tab1 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["j" /* HomePage */];
        this.tab2 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["r" /* PublicacionPage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["m" /* MapaPage */];
        this.tab4 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["o" /* OrdenesPage */];
        this.tab5 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["i" /* HistorialPage */];
        this.tab6 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["t" /* ReportesPage */];
        this.tab7 = __WEBPACK_IMPORTED_MODULE_2__index_paginas__["l" /* MantenimientoPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\tabs\tabs.html"*/'\n\n<ion-tabs *ngIf="_us.id_usuario == null || _us.id_usuario != \'75012728\'" color="dark">\n\n  <ion-tab tabIcon="home" tabTitle="Inicio" [root]="tab1"></ion-tab>\n  <ion-tab tabIcon="add" tabTitle="Incidencia" [root]="tab2"></ion-tab>\n  <ion-tab tabIcon="pin" tabTitle="Mapa" [root]="tab3"></ion-tab>\n  <ion-tab tabIcon="ios-trash-outline" tabTitle="Reciclaje" [root]="tab4"></ion-tab>\n  <!-- <ion-tab tabIcon="ios-list-box-outline" tabTitle="Historial" [root]="tab4"></ion-tab> -->\n\n\n</ion-tabs>\n\n<ion-tabs *ngIf="_us.id_usuario == \'75012728\'" color="dark">\n\n  <ion-tab tabIcon="home" tabTitle="Inicio" [root]="tab1"></ion-tab>\n  <ion-tab tabIcon="md-clipboard" tabTitle="Reportes" [root]="tab5"></ion-tab>\n  <ion-tab tabIcon="md-construct" tabTitle="Mantenimiento" [root]="tab6"></ion-tab>\n\n\n</ion-tabs>\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\tabs\tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusquedaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_productos_productos__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index_paginas__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BusquedaPage = /** @class */ (function () {
    function BusquedaPage(navCtrl, navParams, _ps) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._ps = _ps;
        this.productoPage = __WEBPACK_IMPORTED_MODULE_3__index_paginas__["q" /* ProductoPage */];
    }
    BusquedaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-busqueda',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\busqueda\busqueda.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n    <ion-title text-center>Historial</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\busqueda\busqueda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_productos_productos__["a" /* ProductosProvider */]])
    ], BusquedaPage);
    return BusquedaPage;
}());

//# sourceMappingURL=busqueda.js.map

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrarsePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegistrarsePage = /** @class */ (function () {
    function RegistrarsePage(navCtrl, alertCtrl, navParams, viewCtrl, registroProvider, _cs, _us) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.registroProvider = registroProvider;
        this._cs = _cs;
        this._us = _us;
        // conductor: Usuario = {id: "75159634", nombres:"Kevin Gustavo", apellidos:"Rojas Orihuela", celular:"987456123",
        //                   correo:"kevin.rojas@gmial.com", placa:"FS5-741", usuario:"kevin.rojas", contraseña:"987123", clave:"kevin.rojas987123"};
        this.dni = "";
        this.nombres = "";
        this.apellidos = "";
        this.celular = "";
        this.correo = "";
        this.usuario = "";
        this.contrasena = "";
        this.clave = "";
    }
    RegistrarsePage.prototype.ngOnInit = function () {
        // this.registroProvider.getTodos().subscribe(res => {
        //   this.todos = res;
        //   console.log(res);
        // });
        // this.registroProvider.getTodo("75012728").subscribe(res => {
        //   if(res != undefined)
        //   console.log(res);
        //   else{
        //     console.log("No se encuentra usuario");
        //   }
        // }
        // );
    };
    RegistrarsePage.prototype.guardarUsuario = function () {
        this.clave = this.usuario + this.contrasena;
        var conductor = { id: this.dni, nombres: this.nombres, apellidos: this.apellidos, celular: this.celular,
            correo: this.correo, usuario: this.usuario, contraseña: this.contrasena, clave: this.clave };
        this.registroProvider.addUsuario(conductor, conductor.id);
        this.alertCtrl.create({
            title: "Felicidades",
            subTitle: "Registro de cuenta con éxito",
            buttons: ["OK"]
        }).present();
        this.viewCtrl.dismiss(true);
    };
    RegistrarsePage.prototype.remove = function (item) {
        this.registroProvider.removeUsuario(item.id);
    };
    RegistrarsePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-registrarse',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\registrarse\registrarse.html"*/'<!--\n\n  Generated template for the RegistrarsePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button icon-only ion-button\n\n              (click)="viewCtrl.dismiss()">\n\n        <ion-icon name="arrow-round-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Registrarse</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <ion-list>\n\n\n\n  <ion-item>\n\n      <ion-label floating>DNI</ion-label>\n\n        <ion-input [(ngModel)]="dni"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Nombres</ion-label>\n\n     <ion-input [(ngModel)]="nombres"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Apellidos</ion-label>\n\n     <ion-input [(ngModel)]="apellidos"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Correo</ion-label>\n\n    <ion-input type="email" [(ngModel)]="correo"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Celular</ion-label>\n\n    <ion-input type="number" [(ngModel)]="celular"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Usuario</ion-label>\n\n     <ion-input [(ngModel)]="usuario"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Contraseña</ion-label>\n\n    <ion-input type="password" [(ngModel)]="contrasena"></ion-input>\n\n  </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <br>\n\n\n\n  <button ion-button block\n\n          [disabled]=" usuario.length < 5 || contrasena.length < 5 "\n\n          (click)="guardarUsuario()">\n\n    Registrar\n\n\n\n  </button>\n\n  <br><br>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\registrarse\registrarse.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_registro_registro__["a" /* RegistroProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], RegistrarsePage);
    return RegistrarsePage;
}());

//# sourceMappingURL=registrarse.js.map

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaypalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the PaypalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PaypalPage = /** @class */ (function () {
    function PaypalPage(navCtrl, navParams, viewCtrl, _cs, _us) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._cs = _cs;
        this._us = _us;
        this.correo = "";
        this.contrasena = "";
    }
    PaypalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-paypal',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\paypal\paypal.html"*/'<!--\n\n  Generated template for the PaypalPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar  color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button icon-only ion-button\n\n              (click)="viewCtrl.dismiss()">\n\n        <ion-icon name="arrow-round-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Confirmación de Compra</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <div align="center">\n\n  <img src="../../assets/imgs/paypal2.png" height="65" width="168">\n\n  </div>\n\n  <br>\n\n  <h5>Pagar con Paypal</h5>\n\n  <br>\n\n\n\n  <ion-list>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Correo electrónico</ion-label>\n\n    <ion-input type="email" [(ngModel)]="correo"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Contraseña</ion-label>\n\n    <ion-input type="password" [(ngModel)]="contrasena"></ion-input>\n\n  </ion-item>\n\n\n\n  </ion-list>\n\n  \n\n  <br>\n\n  <div style="text-align: center">\n\n    <button ion-button\n\n            [disabled]=" correo.length < 5 || contrasena.length < 5 "\n\n            >\n\n      Iniciar Sesión\n\n    </button>\n\n  </div>\n\n  <h6 text-center style="color:rgba(0,0,0,0.5)">¿Ha olvidado su correo electrónico o contraseña?</h6>\n\n  <br>\n\n  <br>\n\n\n\n  <h6 text-center>¿Aún no tienes cuenta?</h6>\n\n\n\n  <br>\n\n  <br>\n\n  <div style="text-align: center">\n\n    <button ion-button\n\n            >\n\n      Crear una Cuenta\n\n    </button>\n\n  </div>\n\n  <br><br>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\paypal\paypal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], PaypalPage);
    return PaypalPage;
}());

//# sourceMappingURL=paypal.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TarjetaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TarjetaPage = /** @class */ (function () {
    function TarjetaPage(navCtrl, navParams, viewCtrl, alertCtrl, _cs, _us, _rs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this._cs = _cs;
        this._us = _us;
        this._rs = _rs;
        this.numero = "";
        this.myDate = "";
        this.cvv = "";
    }
    TarjetaPage.prototype.realizar_compra = function () {
        var _this = this;
        this._cs.estado_pago = false;
        this._rs.getReserva(this._cs.fecha_reserva).subscribe(function (res) {
            if (res != null)
                _this._rs.updateReservaEstado(res.fecha);
        });
        this.alertCtrl.create({
            title: "Pago Realizado",
            subTitle: "Pago realizado correctamente de la reserva",
            buttons: ["OK"]
        }).present();
        this._cs.estado_pago = true;
        this.navCtrl.popToRoot();
    };
    TarjetaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tarjeta',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\tarjeta\tarjeta.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n    <ion-buttons left>\n\n      <button icon-only ion-button\n\n              (click)="viewCtrl.dismiss()">\n\n        <ion-icon name="arrow-round-back"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>Confirmación de Compra</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <h3>Total: {{ _cs.total  | currency:\'S/. \':symbol }}</h3>\n\n  <br>\n\n  <br>\n\n  <ion-list>\n\n      <ion-label><ion-icon name="ios-card"></ion-icon>  Pagar con tarjeta            <img src="../../assets/imgs/visa.png" height="20" width="32"> <img src="../../assets/imgs/mastercard.png" height="28" width="28"></ion-label>\n\n  <ion-item>\n\n    <ion-label floating>Número de tarjeta (16 Dígitos)</ion-label>\n\n    <ion-input type="tel" maxlength="16" [(ngModel)]="numero"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Fecha de expiración (DD/MM/YYYY)</ion-label>\n\n    <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="myDate"></ion-datetime>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>CVV (3 o 4 Dígitos)</ion-label>\n\n    <ion-input type="tel" maxlength="4" [(ngModel)]="cvv"></ion-input>\n\n  </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <br>\n\n\n\n  <div style="text-align: center">\n\n    <button ion-button\n\n            [disabled]=" numero.length < 16 || myDate.length == 0 || cvv.length < 3 "\n\n            (click)="realizar_compra()">\n\n      Completar Compra\n\n    </button>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\tarjeta\tarjeta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_registro_registro__["a" /* RegistroProvider */]])
    ], TarjetaPage);
    return TarjetaPage;
}());

//# sourceMappingURL=tarjeta.js.map

/***/ }),

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstacionamientoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_estacionamiento_detalle_estacionamiento_detalle__ = __webpack_require__(294);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the EstacionamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EstacionamientoPage = /** @class */ (function () {
    function EstacionamientoPage(navCtrl, navParams, viewCtrl, alertCtrl, _cs, _us) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this._cs = _cs;
        this._us = _us;
        this.estacionamientoDetalle = __WEBPACK_IMPORTED_MODULE_4__pages_estacionamiento_detalle_estacionamiento_detalle__["a" /* EstacionamientoDetallePage */];
    }
    EstacionamientoPage.prototype.ngOnInit = function () {
    };
    EstacionamientoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-estacionamiento',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\estacionamiento\estacionamiento.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n        <ion-buttons start>\n\n            <button ion-button icon-only\n\n                    *ngIf="_us.inactivo()"\n\n                    (click)="_cs.ver_login()">\n\n              <ion-icon name="contact"></ion-icon>\n\n            </button>\n\n          </ion-buttons>\n\n      \n\n      \n\n          <ion-buttons start>\n\n            <button ion-button icon-only\n\n                    *ngIf="_us.activo()">\n\n              {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n            </button>\n\n            <button ion-button icon-only\n\n                    *ngIf="_us.activo()"\n\n                    (click)="_us.cerrar_sesion()">\n\n              <ion-icon name="log-out"></ion-icon>\n\n            </button>\n\n          </ion-buttons>\n\n\n\n    <ion-title>Incidencias</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content *ngIf="_cs.listado == true">\n\n  <h6 padding>Escoja la incidencia más cercano a usted:</h6>\n\n    <ion-list>\n\n        <button ion-item\n\n                *ngFor="let incidencia of _cs.incidencias"\n\n                [navPush]="estacionamientoDetalle"\n\n                [navParams]="{ incidencia: incidencia }"\n\n                >\n\n    \n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n            {{ incidencia.titulo }}\n\n        </button>\n\n        <!-- <button ion-item>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n              Puerta 1 UNMSM\n\n          </button>\n\n        <button ion-item>\n\n        <ion-icon name="ios-arrow-forward"></ion-icon>\n\n            Puerta 2 UNMSM\n\n        </button>\n\n        <button ion-item>\n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n              Puerta 3 UNMSM\n\n          </button>\n\n          <button ion-item>\n\n            <ion-icon name="ios-arrow-forward"></ion-icon>\n\n                Puerta 7 UNMSM\n\n            </button> -->\n\n      </ion-list>\n\n\n\n</ion-content>\n\n\n\n<ion-content *ngIf="_cs.listado == false && (_us.id_usuario != null && _cs.noreciclaje != false)">\n\n\n\n  <h6 padding>Mis reciclajes:</h6>\n\n    <ion-list>\n\n        <button ion-item\n\n                *ngFor="let incidencia of _cs.incidencias"\n\n                [navPush]="estacionamientoDetalle"\n\n                [navParams]="{ incidencia: incidencia }"\n\n                >\n\n    \n\n          <ion-icon name="ios-arrow-forward"></ion-icon>\n\n            {{ incidencia.titulo }}\n\n        </button>\n\n      </ion-list>\n\n\n\n</ion-content>\n\n\n\n<ion-content *ngIf="_cs.listado == false && (_us.id_usuario == null || _cs.noreciclaje == false)">\n\n\n\n    <div text-center class="carrito_vacio">\n\n        <ion-icon name="ios-list-box-outline" class="icon-5x">\n\n        </ion-icon>\n\n        <br> No tienes reciclajes\n\n    </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\estacionamiento\estacionamiento.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], EstacionamientoPage);
    return EstacionamientoPage;
}());

//# sourceMappingURL=estacionamiento.js.map

/***/ }),

/***/ 618:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HistorialPage = /** @class */ (function () {
    function HistorialPage(navCtrl, navParams, _us, _cs, _rs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._us = _us;
        this._cs = _cs;
        this._rs = _rs;
        this.reservas = [];
    }
    HistorialPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.reservas = [];
        if (this._us.id_usuario) {
            this._rs.getReservas(this._us.id_usuario).subscribe(function (res) {
                _this.reservas = [];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].estado == "Finalizado")
                        _this.reservas.push(res[i]);
                }
            });
        }
    };
    HistorialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-historial',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\historial\historial.html"*/'\n\n<ion-header>\n\n\n\n  <ion-navbar color="dark">\n\n\n\n      <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.inactivo()"\n\n                  (click)="_cs.ver_login()">\n\n            <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n    \n\n    \n\n        <ion-buttons start>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()">\n\n            {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n\n          </button>\n\n          <button ion-button icon-only\n\n                  *ngIf="_us.activo()"\n\n                  (click)="_us.cerrar_sesion()">\n\n            <ion-icon name="log-out"></ion-icon>\n\n          </button>\n\n        </ion-buttons>\n\n\n\n    <ion-title>Historial</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <br>\n\n  <h5 style="color: blue; text-align: center">Nro |      Fecha y Hora     | Horas |  Pago</h5>\n\n  <hr>\n\n  <h6 *ngFor="let reserva of reservas">      {{reservas.indexOf(reserva)+1}}      {{reserva.fecha}}        {{reserva.horas}}          S/. {{reserva.total}}</h6>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\historial\historial.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_registro_registro__["a" /* RegistroProvider */]])
    ], HistorialPage);
    return HistorialPage;
}());

//# sourceMappingURL=historial.js.map

/***/ }),

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReportesPage = /** @class */ (function () {
    function ReportesPage(navCtrl, navParams, _us, _rs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._us = _us;
        this._rs = _rs;
        this.monto1 = 0;
        this.monto2 = 0;
        this.monto3 = 0;
        this.monto4 = 0;
        this.monto5 = 0;
        this.monto6 = 0;
        this.monto7 = 0;
        this.cantidad1 = 0;
        this.cantidad2 = 0;
        this.cantidad3 = 0;
        this.cantidad4 = 0;
        this.cantidad5 = 0;
        this.cantidad6 = 0;
        this.cantidad7 = 0;
        this.cJavierPrado = 0;
        this.cMetro = 0;
        this.cMegaPlaza = 0;
        this.cPlaza = 0;
        this.promedio = 0;
    }
    ReportesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this._rs.getTodasReservas().subscribe(function (res) {
            _this.monto1 = 0;
            _this.monto2 = 0;
            _this.monto3 = 0;
            _this.monto4 = 0;
            _this.monto5 = 0;
            _this.monto6 = 0;
            _this.monto7 = 0;
            _this.cantidad1 = 0;
            _this.cantidad2 = 0;
            _this.cantidad3 = 0;
            _this.cantidad4 = 0;
            _this.cantidad5 = 0;
            _this.cantidad6 = 0;
            _this.cantidad7 = 0;
            _this.cJavierPrado = 0;
            _this.cMetro = 0;
            _this.cMegaPlaza = 0;
            _this.cPlaza = 0;
            _this.promedio = 0;
            for (var i = 0; i < res.length; i++) {
                res[i].estacionamiento.get().then(function (res) {
                    var r;
                    r = res;
                    if (r._document.proto.fields.nombre.stringValue == "Estacionamiento Javier Prado")
                        _this.cJavierPrado = _this.cJavierPrado + 1;
                    if (r._document.proto.fields.nombre.stringValue == "Estacionamiento Metro Alf. Ugarte")
                        _this.cMetro = _this.cMetro + 1;
                    if (r._document.proto.fields.nombre.stringValue == "Estacionamiento Mega Plaza")
                        _this.cMegaPlaza = _this.cMegaPlaza + 1;
                    if (r._document.proto.fields.nombre.stringValue == "Estacionamiento Plaza San Miguel")
                        _this.cPlaza = _this.cPlaza + 1;
                });
                if (res[i].fecha.substring(0, 8) == "9-7-2019") {
                    _this.monto1 = _this.monto1 + res[i].total;
                    _this.cantidad1 = _this.cantidad1 + 1;
                }
                if (res[i].fecha.substring(0, 9) == "10-7-2019") {
                    _this.monto2 = _this.monto2 + res[i].total;
                    _this.cantidad2 = _this.cantidad2 + 1;
                }
                if (res[i].fecha.substring(0, 9) == "11-7-2019") {
                    _this.monto3 = _this.monto3 + res[i].total;
                    _this.cantidad3 = _this.cantidad3 + 1;
                }
                if (res[i].fecha.substring(0, 9) == "12-7-2019") {
                    _this.monto4 = _this.monto4 + res[i].total;
                    _this.cantidad4 = _this.cantidad4 + 1;
                }
                if (res[i].fecha.substring(0, 9) == "13-7-2019") {
                    _this.monto5 = _this.monto5 + res[i].total;
                    _this.cantidad5 = _this.cantidad5 + 1;
                }
                if (res[i].fecha.substring(0, 9) == "14-7-2019") {
                    _this.monto6 = _this.monto6 + res[i].total;
                    _this.cantidad6 = _this.cantidad6 + 1;
                }
                if (res[i].fecha.substring(0, 9) == "15-7-2019") {
                    _this.monto7 = _this.monto7 + res[i].total;
                    _this.cantidad7 = _this.cantidad7 + 1;
                }
                _this.promedio = _this.promedio + (res[i].horas / (res.length));
            }
            setTimeout(function () {
                _this.barChart = _this.getBarChart();
                _this.barChart2 = _this.getBarChart2();
                _this.lineChart = _this.getLineChart();
            }, 500);
            setTimeout(function () {
                _this.pieChart = _this.getPieChart();
                _this.doughnutChart = _this.getDoughnutChart();
            }, 1000);
        });
    };
    ReportesPage.prototype.getChart = function (context, charType, data, options) {
        return new __WEBPACK_IMPORTED_MODULE_4_chart_js___default.a(context, {
            data: data,
            options: options,
            type: charType
        });
    };
    ReportesPage.prototype.getBarChart = function () {
        var data = {
            labels: ['9/07/19', '10/07/19', '11/07/19', '12/07/19', '13/07/19', '14/07/19', '15/07/19'],
            datasets: [{
                    label: 'Total (S/.)',
                    data: [this.monto1, this.monto2, this.monto3, this.monto4, this.monto5, this.monto6, this.monto7],
                    backgroundColor: [
                        'rgb(20, 0, 255)',
                        'rgb(20, 0, 255)',
                        'rgb(20, 0, 255)',
                        'rgb(20, 0, 255)',
                        'rgb(20, 0, 255)',
                        'rgb(20, 0, 255)',
                        'rgb(20, 0, 255)'
                    ],
                    borderWidth: 1
                }]
        };
        var options = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
    };
    ReportesPage.prototype.getBarChart2 = function () {
        var data = {
            labels: ['9/07/19', '10/07/19', '11/07/19', '12/07/19', '13/07/19', '14/07/19', '15/07/19'],
            datasets: [{
                    label: 'Reservaciones',
                    data: [this.cantidad1, this.cantidad2, this.cantidad3, this.cantidad4, this.cantidad5, this.cantidad6, this.cantidad7],
                    backgroundColor: [
                        'rgb(200, 6, 0)',
                        'rgb(200, 6, 0)',
                        'rgb(200, 6, 0)',
                        'rgb(200, 6, 0)',
                        'rgb(200, 6, 0)',
                        'rgb(200, 6, 0)',
                        'rgb(200, 6, 0)'
                    ],
                    borderWidth: 1
                }]
        };
        var options = {
            scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        };
        return this.getChart(this.barCanvas2.nativeElement, 'bar', data, options);
    };
    ReportesPage.prototype.getLineChart = function () {
        var data = {
            labels: ['9/07/19', '15/07/19'],
            datasets: [{
                    label: 'Promedio',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgb(0, 178, 255)',
                    borderColor: 'rgb(231, 205, 35)',
                    borderCapStyle: 'butt',
                    borderJoinStyle: 'miter',
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [Math.round(this.promedio * 100) / 100, Math.round(this.promedio * 100) / 100],
                    scanGaps: false,
                }
                // , {
                //   label: 'Meu segundo Dataset',
                //   fill: false,
                //   lineTension: 0.1,
                //   backgroundColor: 'rgb(117, 0, 49)',
                //   borderColor: 'rgb(51, 50, 46)',
                //   borderCapStyle: 'butt',
                //   borderJoinStyle: 'miter',
                //   pointRadius: 1,
                //   pointHitRadius: 10,
                //   data:[29, 135, 13, 70],
                //   scanGaps: false,
                // }
            ]
        };
        return this.getChart(this.lineCanvas.nativeElement, 'line', data);
    };
    ReportesPage.prototype.getPieChart = function () {
        var data = {
            labels: ['Javier Prado', 'Metro Alf. Ugarte', 'Mega Plaza', 'Plaza San Miguel'],
            datasets: [{
                    data: [this.cJavierPrado, this.cMetro, this.cMegaPlaza, this.cPlaza],
                    backgroundColor: ['rgb(200, 6, 0)', 'rgb(36, 0, 255)', 'rgb(242, 255, 0)', 'rgb(24, 255, 0)']
                }]
        };
        return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
    };
    ReportesPage.prototype.getDoughnutChart = function () {
        var data = {
            labels: ['Javier Prado', 'Metro Alf. Ugarte', 'Mega Plaza', 'Plaza San Miguel'],
            datasets: [{
                    label: 'Teste Chart',
                    data: [this.cJavierPrado, this.cMetro, this.cMegaPlaza, this.cPlaza],
                    backgroundColor: [
                        'rgb(0, 244, 97)',
                        'rgb(37, 39, 43)',
                        'rgb(255, 207, 0)',
                        'rgb(36, 0, 255)'
                    ]
                }]
        };
        return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('barCanvas'),
        __metadata("design:type", Object)
    ], ReportesPage.prototype, "barCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('barCanvas2'),
        __metadata("design:type", Object)
    ], ReportesPage.prototype, "barCanvas2", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], ReportesPage.prototype, "lineCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('pieCanvas'),
        __metadata("design:type", Object)
    ], ReportesPage.prototype, "pieCanvas", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('doughnutCanvas'),
        __metadata("design:type", Object)
    ], ReportesPage.prototype, "doughnutCanvas", void 0);
    ReportesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reportes',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\reportes\reportes.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n      <ion-buttons start>\n          <button ion-button icon-only *ngIf="_us.inactivo()" [navPush]="login">\n          <ion-icon name="contact"></ion-icon>\n        </button>\n      </ion-buttons>\n\n\n      <ion-buttons start>\n          <button ion-button icon-only *ngIf="_us.activo()">\n          {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n        </button>\n          <button ion-button icon-only *ngIf="_us.activo()" (click)="_us.cerrar_sesion()">\n          <ion-icon name="log-out"></ion-icon>\n        </button>\n      </ion-buttons>\n    <ion-title>Reportes</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-header style="background-color: whitesmoke">\n      Costos totales diarios\n    </ion-card-header>\n    <ion-card-content>\n      <br>\n      <canvas #barCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header style="background-color: whitesmoke">\n      Cantidad de reservaciones diarias\n    </ion-card-header>\n    <ion-card-content>\n      <br>\n      <canvas #barCanvas2></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header style="background-color: whitesmoke">\n        Promedio de tiempos de reservas\n    </ion-card-header>\n    <ion-card-content>\n      <br>\n      <canvas #lineCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header style="background-color: whitesmoke">\n      Reservaciones por estacionamiento\n    </ion-card-header>\n    <ion-card-content>\n      <br>\n      <canvas #pieCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <ion-card-header style="background-color: whitesmoke">\n      Reservaciones por estacionamiento\n    </ion-card-header>\n    <ion-card-content>\n      <br>\n      <canvas #doughnutCanvas></canvas>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\reportes\reportes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_registro_registro__["a" /* RegistroProvider */]])
    ], ReportesPage);
    return ReportesPage;
}());

//# sourceMappingURL=reportes.js.map

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 297,
	"./af.js": 297,
	"./ar": 298,
	"./ar-dz": 299,
	"./ar-dz.js": 299,
	"./ar-kw": 300,
	"./ar-kw.js": 300,
	"./ar-ly": 301,
	"./ar-ly.js": 301,
	"./ar-ma": 302,
	"./ar-ma.js": 302,
	"./ar-sa": 303,
	"./ar-sa.js": 303,
	"./ar-tn": 304,
	"./ar-tn.js": 304,
	"./ar.js": 298,
	"./az": 305,
	"./az.js": 305,
	"./be": 306,
	"./be.js": 306,
	"./bg": 307,
	"./bg.js": 307,
	"./bm": 308,
	"./bm.js": 308,
	"./bn": 309,
	"./bn.js": 309,
	"./bo": 310,
	"./bo.js": 310,
	"./br": 311,
	"./br.js": 311,
	"./bs": 312,
	"./bs.js": 312,
	"./ca": 313,
	"./ca.js": 313,
	"./cs": 314,
	"./cs.js": 314,
	"./cv": 315,
	"./cv.js": 315,
	"./cy": 316,
	"./cy.js": 316,
	"./da": 317,
	"./da.js": 317,
	"./de": 318,
	"./de-at": 319,
	"./de-at.js": 319,
	"./de-ch": 320,
	"./de-ch.js": 320,
	"./de.js": 318,
	"./dv": 321,
	"./dv.js": 321,
	"./el": 322,
	"./el.js": 322,
	"./en-SG": 323,
	"./en-SG.js": 323,
	"./en-au": 324,
	"./en-au.js": 324,
	"./en-ca": 325,
	"./en-ca.js": 325,
	"./en-gb": 326,
	"./en-gb.js": 326,
	"./en-ie": 327,
	"./en-ie.js": 327,
	"./en-il": 328,
	"./en-il.js": 328,
	"./en-nz": 329,
	"./en-nz.js": 329,
	"./eo": 330,
	"./eo.js": 330,
	"./es": 331,
	"./es-do": 332,
	"./es-do.js": 332,
	"./es-us": 333,
	"./es-us.js": 333,
	"./es.js": 331,
	"./et": 334,
	"./et.js": 334,
	"./eu": 335,
	"./eu.js": 335,
	"./fa": 336,
	"./fa.js": 336,
	"./fi": 337,
	"./fi.js": 337,
	"./fo": 338,
	"./fo.js": 338,
	"./fr": 339,
	"./fr-ca": 340,
	"./fr-ca.js": 340,
	"./fr-ch": 341,
	"./fr-ch.js": 341,
	"./fr.js": 339,
	"./fy": 342,
	"./fy.js": 342,
	"./ga": 343,
	"./ga.js": 343,
	"./gd": 344,
	"./gd.js": 344,
	"./gl": 345,
	"./gl.js": 345,
	"./gom-latn": 346,
	"./gom-latn.js": 346,
	"./gu": 347,
	"./gu.js": 347,
	"./he": 348,
	"./he.js": 348,
	"./hi": 349,
	"./hi.js": 349,
	"./hr": 350,
	"./hr.js": 350,
	"./hu": 351,
	"./hu.js": 351,
	"./hy-am": 352,
	"./hy-am.js": 352,
	"./id": 353,
	"./id.js": 353,
	"./is": 354,
	"./is.js": 354,
	"./it": 355,
	"./it-ch": 356,
	"./it-ch.js": 356,
	"./it.js": 355,
	"./ja": 357,
	"./ja.js": 357,
	"./jv": 358,
	"./jv.js": 358,
	"./ka": 359,
	"./ka.js": 359,
	"./kk": 360,
	"./kk.js": 360,
	"./km": 361,
	"./km.js": 361,
	"./kn": 362,
	"./kn.js": 362,
	"./ko": 363,
	"./ko.js": 363,
	"./ku": 364,
	"./ku.js": 364,
	"./ky": 365,
	"./ky.js": 365,
	"./lb": 366,
	"./lb.js": 366,
	"./lo": 367,
	"./lo.js": 367,
	"./lt": 368,
	"./lt.js": 368,
	"./lv": 369,
	"./lv.js": 369,
	"./me": 370,
	"./me.js": 370,
	"./mi": 371,
	"./mi.js": 371,
	"./mk": 372,
	"./mk.js": 372,
	"./ml": 373,
	"./ml.js": 373,
	"./mn": 374,
	"./mn.js": 374,
	"./mr": 375,
	"./mr.js": 375,
	"./ms": 376,
	"./ms-my": 377,
	"./ms-my.js": 377,
	"./ms.js": 376,
	"./mt": 378,
	"./mt.js": 378,
	"./my": 379,
	"./my.js": 379,
	"./nb": 380,
	"./nb.js": 380,
	"./ne": 381,
	"./ne.js": 381,
	"./nl": 382,
	"./nl-be": 383,
	"./nl-be.js": 383,
	"./nl.js": 382,
	"./nn": 384,
	"./nn.js": 384,
	"./pa-in": 385,
	"./pa-in.js": 385,
	"./pl": 386,
	"./pl.js": 386,
	"./pt": 387,
	"./pt-br": 388,
	"./pt-br.js": 388,
	"./pt.js": 387,
	"./ro": 389,
	"./ro.js": 389,
	"./ru": 390,
	"./ru.js": 390,
	"./sd": 391,
	"./sd.js": 391,
	"./se": 392,
	"./se.js": 392,
	"./si": 393,
	"./si.js": 393,
	"./sk": 394,
	"./sk.js": 394,
	"./sl": 395,
	"./sl.js": 395,
	"./sq": 396,
	"./sq.js": 396,
	"./sr": 397,
	"./sr-cyrl": 398,
	"./sr-cyrl.js": 398,
	"./sr.js": 397,
	"./ss": 399,
	"./ss.js": 399,
	"./sv": 400,
	"./sv.js": 400,
	"./sw": 401,
	"./sw.js": 401,
	"./ta": 402,
	"./ta.js": 402,
	"./te": 403,
	"./te.js": 403,
	"./tet": 404,
	"./tet.js": 404,
	"./tg": 405,
	"./tg.js": 405,
	"./th": 406,
	"./th.js": 406,
	"./tl-ph": 407,
	"./tl-ph.js": 407,
	"./tlh": 408,
	"./tlh.js": 408,
	"./tr": 409,
	"./tr.js": 409,
	"./tzl": 410,
	"./tzl.js": 410,
	"./tzm": 411,
	"./tzm-latn": 412,
	"./tzm-latn.js": 412,
	"./tzm.js": 411,
	"./ug-cn": 413,
	"./ug-cn.js": 413,
	"./uk": 414,
	"./uk.js": 414,
	"./ur": 415,
	"./ur.js": 415,
	"./uz": 416,
	"./uz-latn": 417,
	"./uz-latn.js": 417,
	"./uz.js": 416,
	"./vi": 418,
	"./vi.js": 418,
	"./x-pseudo": 419,
	"./x-pseudo.js": 419,
	"./yo": 420,
	"./yo.js": 420,
	"./zh-cn": 421,
	"./zh-cn.js": 421,
	"./zh-hk": 422,
	"./zh-hk.js": 422,
	"./zh-tw": 423,
	"./zh-tw.js": 423
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 622;

/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MantenimientoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_registro_registro__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MantenimientoPage = /** @class */ (function () {
    function MantenimientoPage(navCtrl, navParams, _us, _rs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._us = _us;
        this._rs = _rs;
        this.estado = "0";
        this.estado2 = "0";
        this.contador1 = 0;
        this.contador2 = 0;
    }
    MantenimientoPage.prototype.ionViewDidLoad = function () {
        this.StartTimer();
        this.StartTimer2();
    };
    MantenimientoPage.prototype.StartTimer = function () {
        var _this = this;
        this.timer = setTimeout(function (x) {
            _this._rs.getEspacio("JP1").subscribe(function (res) {
                if (_this.contador1 == 5) {
                    _this.contador1 = 0;
                    alert("Debe hacer mantenimiento del sensor ultrasonido JP1");
                }
                if (_this.estado == res.estado_ocupacion) {
                    //console.log(this.contador1);
                }
                else {
                    _this.estado = res.estado_ocupacion;
                    _this.contador1 = _this.contador1 + 1;
                    //console.log(this.contador1);
                }
            });
            _this.StartTimer();
        }, 1000);
    };
    MantenimientoPage.prototype.StartTimer2 = function () {
        var _this = this;
        this.timer2 = setTimeout(function (x) {
            _this._rs.getEspacio("M1").subscribe(function (res) {
                if (_this.contador2 == 5) {
                    _this.contador2 = 0;
                    alert("Debe hacer mantenimiento del sensor ultrasonido M1");
                }
                if (_this.estado2 == res.estado_ocupacion) {
                    //console.log(this.contador2);
                }
                else {
                    _this.estado2 = res.estado_ocupacion;
                    _this.contador2 = _this.contador2 + 1;
                    //console.log(this.contador2);
                }
            });
            _this.StartTimer2();
        }, 1000);
    };
    MantenimientoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mantenimiento',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\mantenimiento\mantenimiento.html"*/'\n<ion-header>\n\n  <ion-navbar color="dark">\n      <ion-buttons start>\n          <button ion-button icon-only *ngIf="_us.inactivo()" [navPush]="login">\n          <ion-icon name="contact"></ion-icon>\n        </button>\n      </ion-buttons>\n\n\n      <ion-buttons start>\n          <button ion-button icon-only *ngIf="_us.activo()">\n          {{ _us.usuario }} <ion-icon name="contact"></ion-icon>\n        </button>\n          <button ion-button icon-only *ngIf="_us.activo()" (click)="_us.cerrar_sesion()">\n          <ion-icon name="log-out"></ion-icon>\n        </button>\n      </ion-buttons>\n    <ion-title>Mantenimiento</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <br>\n    <ion-card> \n        <ion-card-header style="background-color: #488aff; color: white; font-weight: bold">\n          Uso del Sensor Ultrasonido\n        </ion-card-header>\n        <ion-card-content color="primary">\n          <br>\n          E.Javier Prado (JP1) :              {{contador1}}/5 <br>\n          E.Metro Alf. Ugarte (JP2) :      {{contador2}}/5 <br>\n          E.Mega Plaza <br>\n          E.Plaza San Miguel \n        </ion-card-content>\n      </ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\mantenimiento\mantenimiento.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_usuario_usuario__["a" /* UsuarioProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_registro_registro__["a" /* RegistroProvider */]])
    ], MantenimientoPage);
    return MantenimientoPage;
}());

//# sourceMappingURL=mantenimiento.js.map

/***/ }),

/***/ 624:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResiduosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResiduosPage = /** @class */ (function () {
    function ResiduosPage(navCtrl, navParams, viewCtrl, _cs, _us) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._cs = _cs;
        this._us = _us;
    }
    ResiduosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-residuos',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\residuos\residuos.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-buttons left>\n      <button icon-only ion-button\n              (click)="viewCtrl.dismiss()">\n        <ion-icon name="arrow-round-back"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title *ngIf="_us.ventana==false">Publicar Incidencia</ion-title>\n    <ion-title *ngIf="_us.ventana==true">Reciclar</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list radio-group [(ngModel)]="_cs.id_residuo">\n    <ion-list-header>\n      Selecciona el tipo de residuo\n    </ion-list-header>\n\n     <!-- <button ion-item\n                *ngFor="let estacionamiento of _cs.estacionamientos"\n                [navPush]="estacionamientoDetalle"\n                [navParams]="{ estacionamiento: estacionamiento }"\n                >\n    \n          <ion-icon name="ios-arrow-forward"></ion-icon>\n            {{ estacionamiento.nombre }}\n        </button> -->\n    \n    <ion-item *ngFor="let residuo of _cs.residuos">\n      <ion-label><img src={{residuo.img}} alt=""/>   {{residuo.tipo}}</ion-label>\n      <ion-radio *ngIf="residuo.id==\'1\'" checked="true"  value={{residuo.id}} (click)="_cs.ver_volumen()"></ion-radio>\n      <ion-radio *ngIf="residuo.id!=\'1\'" value={{residuo.id}} (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n\n    <!-- <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/electronicos.png" alt=""></ion-img>   Electrónicos</ion-label>\n      <ion-radio checked="true" value="electronicos" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/medicamentos.png" alt=""></ion-img>   Medicamentos</ion-label>\n      <ion-radio value="medicamentos" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/neumatico.png" alt=""></ion-img>   Neumáticos</ion-label>\n      <ion-radio value="neumaticos" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/organico.png" alt=""></ion-img>   Orgánicos</ion-label>\n      <ion-radio value="organicos" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/pila.png" alt=""></ion-img>   Pilas</ion-label>\n      <ion-radio value="pilas" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/plastico.png" alt=""></ion-img>   Plásticos</ion-label>\n      <ion-radio value="plastico" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/ropa.png" alt=""></ion-img>   Ropas</ion-label>\n      <ion-radio value="ropa" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/vertido.png" alt=""></ion-img>   Vertidos</ion-label>\n      <ion-radio value="vertido" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/vidrio.png" alt=""></ion-img>   Vidrios</ion-label>\n      <ion-radio value="vidrio" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/TipoResiduo/otros.png" alt=""></ion-img>   Otros</ion-label>\n      <ion-radio value="otros" (click)="_cs.ver_volumen()"></ion-radio>\n    </ion-item> -->\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\residuos\residuos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_usuario__["a" /* UsuarioProvider */]])
    ], ResiduosPage);
    return ResiduosPage;
}());

//# sourceMappingURL=residuos.js.map

/***/ }),

/***/ 625:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VolumenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VolumenPage = /** @class */ (function () {
    function VolumenPage(navCtrl, navParams, viewCtrl, _cs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._cs = _cs;
    }
    VolumenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-volumen',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\volumen\volumen.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-buttons left>\n      <button icon-only ion-button\n              (click)="viewCtrl.dismiss()">\n        <ion-icon name="arrow-round-back"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title>Publicar Incidencia</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-list radio-group [(ngModel)]="_cs.id_volumen">\n    <ion-list-header>\n      Selecciona el volumen del residuo\n    </ion-list-header>\n\n    <ion-item *ngFor="let volumen of _cs.volumenes">\n      <ion-label><img src={{volumen.img}} alt=""/>   {{volumen.tipo}}</ion-label>\n      <ion-radio *ngIf="volumen.id==\'1\'" checked="true"  value={{volumen.id}} (click)="_cs.ver_foto()"></ion-radio>\n      <ion-radio *ngIf="volumen.id!=\'1\'" value={{volumen.id}} (click)="_cs.ver_foto()"></ion-radio>\n    </ion-item>\n\n    <!-- <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/Volumen/cabe_mano.png" alt=""></ion-img>   Cabe en una mano</ion-label>\n      <ion-radio checked="true" value="mano" (click)="_cs.ver_foto()"></ion-radio>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/Volumen/cabe_mochila.png" alt=""></ion-img>   Cabe en una mochila</ion-label>\n      <ion-radio value="mochila" (click)="_cs.ver_foto()"></ion-radio>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/Volumen/cabe_maletero.png" alt=""></ion-img>   Cabe en un maletero</ion-label>\n      <ion-radio value="maletero" (click)="_cs.ver_foto()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/Volumen/cabe_contenedor.png" alt=""></ion-img>   Cabe en un contenedor</ion-label>\n      <ion-radio value="contenedor" (click)="_cs.ver_foto()"></ion-radio>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/Volumen/cabe_camion.png" alt=""></ion-img>   Cabe en un camión</ion-label>\n      <ion-radio value="camion" (click)="_cs.ver_foto()"></ion-radio>\n    </ion-item>\n\n    <ion-item>\n      <ion-label><ion-img src="../../assets/imgs/Iconos/Volumen/mas_grande.png" alt=""></ion-img>   Más grande</ion-label>\n      <ion-radio value="grande" (click)="_cs.ver_foto()"></ion-radio>\n    </ion-item> -->\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\volumen\volumen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_carrito_carrito__["a" /* CarritoProvider */]])
    ], VolumenPage);
    return VolumenPage;
}());

//# sourceMappingURL=volumen.js.map

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_registro_registro__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var FotoPage = /** @class */ (function () {
    function FotoPage(navCtrl, navParams, viewCtrl, alertCtrl, db, geolocation, _cs, _us, _rs, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.geolocation = geolocation;
        this._cs = _cs;
        this._us = _us;
        this._rs = _rs;
        this.camera = camera;
        this.image = null;
        this.base64Image = "";
        this.titulo = "";
        this.ubicacion = "";
        this.descripcion = "";
        this.latitud = 0;
        this.longitud = 0;
        this.getGeolocation();
    }
    FotoPage.prototype.getGeolocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (geoposition) {
            _this.latitud = geoposition.coords.latitude;
            _this.longitud = geoposition.coords.longitude;
        });
    };
    FotoPage.prototype.takePicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    FotoPage.prototype.publicar = function () {
        var date = new Date();
        var fecha;
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var d = new Date();
        var hora = d.toLocaleTimeString();
        if (month < 10) {
            fecha = day + "-0" + month + "-" + year;
        }
        else {
            fecha = day + "-" + month + "-" + year;
        }
        var incidencia = { id_usuario: this._us.id_usuario, id_residuo: this.db.doc('/Residuo/' + this._cs.id_residuo).ref, id_volumen: this.db.doc('/Volumen/' + this._cs.id_volumen).ref, titulo: this.titulo, descripcion: this.descripcion, ubicacion: this.ubicacion, latitud: this.latitud, longitud: this.longitud, imagen: this.base64Image, fecha: fecha, hora: hora };
        this._rs.addIncidencia(incidencia, fecha + ' ' + hora);
        this.alertCtrl.create({
            title: "Registrado",
            subTitle: "Incidencia publicada con éxito",
            buttons: ["OK"]
        }).present();
        this.navCtrl.popToRoot();
    };
    FotoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-foto',template:/*ion-inline-start:"C:\Users\andyu\Desktop\reciclaje\src\pages\foto\foto.html"*/'<ion-header>\n\n  <ion-navbar color="dark">\n\n    <ion-buttons left>\n      <button icon-only ion-button\n              (click)="viewCtrl.dismiss()">\n        <ion-icon name="arrow-round-back"></ion-icon>\n      </button>\n    </ion-buttons>\n\n    <ion-title>Publicar Incidencia</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <!-- <button ion-button block (click)="getPicture()">Toma una foto</button>\n    <img [src]="image" *ngIf="image" /> -->\n  <br>\n\n  <ion-item>\n    <ion-label floating>Título</ion-label>\n     <ion-input [(ngModel)]="titulo"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label floating>Ubicación</ion-label>\n     <ion-input [(ngModel)]="ubicacion"></ion-input>\n  </ion-item>\n  <br>\n  <ion-card>\n      <ion-item color="primary">\n          <ion-icon name="pin" slot="start"></ion-icon>\n          <ion-label style="font-weight: bold;">Descripción</ion-label>\n      </ion-item>\n\n      <ion-card-content color="primary">\n        <ion-input type="text" [(ngModel)]="descripcion"></ion-input>\n        <br><br><br>\n      </ion-card-content>\n  </ion-card>\n\n  <br><br>\n  <!-- <ion-card>\n      <ion-item color="primary">\n          <ion-icon name="pin" slot="start"></ion-icon>\n          <ion-label style="font-weight: bold;">Subir Foto</ion-label>\n      </ion-item>\n\n      <ion-card-content color="primary">\n        \n        <br><br><br>\n      </ion-card-content>\n  </ion-card> -->\n\n  <!-- <button ion-button id="registrar" block>Subir foto</button> -->\n  <ion-card>\n    <ion-card-content>\n      <button ion-button color="danger" icon-right block (click)="takePicture();">\n        Tomar Foto\n        <ion-icon name="camera">\n\n        </ion-icon>\n      </button>\n      <br>\n      <img *ngIf="base64Image" [src]="base64Image" [(ngModel)]="base64Image">\n    </ion-card-content>\n  </ion-card>\n  <!-- <img src=\'/assets/imgs/Pta3.png\' alt=\'\' style=\'max-width:100%;width:auto;height:auto;\' onclick=\'\'>" -->\n  <br><br>\n\n  <button id="registrar" ion-button block (click)="publicar()"\n          >\n    Registrar\n  </button>\n  <br><br>\n</ion-content>\n'/*ion-inline-end:"C:\Users\andyu\Desktop\reciclaje\src\pages\foto\foto.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ViewController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["AngularFirestore"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["AngularFirestore"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__["a" /* CarritoProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_carrito_carrito__["a" /* CarritoProvider */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__["a" /* UsuarioProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_usuario_usuario__["a" /* UsuarioProvider */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_6__providers_registro_registro__["a" /* RegistroProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_registro_registro__["a" /* RegistroProvider */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */]) === "function" && _k || Object])
    ], FotoPage);
    return FotoPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=foto.js.map

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__carrito_carrito__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__carrito_carrito__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__productos_productos__ = __webpack_require__(162);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__productos_productos__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__usuario_usuario__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__usuario_usuario__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__registro_registro__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__registro_registro__["a"]; });




//# sourceMappingURL=index.services.js.map

/***/ })

},[424]);
//# sourceMappingURL=main.js.map