(self["webpackChunkretro_arcade_games"] = self["webpackChunkretro_arcade_games"] || []).push([["src_app_game-loader_game-loader_module_ts"],{

/***/ 25455:
/*!***********************************************************!*\
  !*** ./src/app/game-loader/game-loader-routing.module.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameLoaderPageRoutingModule": function() { return /* binding */ GameLoaderPageRoutingModule; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _game_loader_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loader.page */ 74251);




const routes = [
    {
        path: '',
        component: _game_loader_page__WEBPACK_IMPORTED_MODULE_0__.GameLoaderPage,
    },
];
let GameLoaderPageRoutingModule = class GameLoaderPageRoutingModule {
};
GameLoaderPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], GameLoaderPageRoutingModule);



/***/ }),

/***/ 41512:
/*!***************************************************!*\
  !*** ./src/app/game-loader/game-loader.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameLoaderPageModule": function() { return /* binding */ GameLoaderPageModule; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _game_loader_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game-loader.page */ 74251);
/* harmony import */ var _game_loader_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game-loader-routing.module */ 25455);







let GameLoaderPageModule = class GameLoaderPageModule {
};
GameLoaderPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _game_loader_routing_module__WEBPACK_IMPORTED_MODULE_1__.GameLoaderPageRoutingModule,
        ],
        declarations: [_game_loader_page__WEBPACK_IMPORTED_MODULE_0__.GameLoaderPage],
    })
], GameLoaderPageModule);



/***/ })

}]);
//# sourceMappingURL=src_app_game-loader_game-loader_module_ts-es2015.js.map