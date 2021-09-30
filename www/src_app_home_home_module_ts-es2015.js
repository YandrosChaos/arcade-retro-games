(self["webpackChunkretro_arcade_games"] = self["webpackChunkretro_arcade_games"] || []).push([["src_app_home_home_module_ts"],{

/***/ 25362:
/*!**********************************************************!*\
  !*** ./src/app/commons/functions/responsive.function.ts ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "centerWordHorizontal": function() { return /* binding */ centerWordHorizontal; },
/* harmony export */   "centeredWordVertical": function() { return /* binding */ centeredWordVertical; },
/* harmony export */   "calculateHalfOfHalf": function() { return /* binding */ calculateHalfOfHalf; }
/* harmony export */ });
function centerWordHorizontal(width, word) {
    const characters = word.split('');
    const middle = width / 2;
    const centeredWordPosition = middle - (characters.length / 2 + 8);
    return centeredWordPosition;
}
function centeredWordVertical(heigth, word) {
    const middle = heigth / 2;
    const centeredWordPosition = middle - 8 / 2;
    return centeredWordPosition;
}
function calculateHalfOfHalf(input) {
    const half = input / 2;
    return half / 2;
}


/***/ }),

/***/ 41605:
/*!**************************************************!*\
  !*** ./src/app/game-loader/scenes/game.scene.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameScene": function() { return /* binding */ GameScene; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ 82356);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _game_loader_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-loader.page */ 74251);
/* harmony import */ var _k_boom_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./k-boom.config */ 97198);
/* harmony import */ var _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./k-boom.routes */ 19740);





class GameScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
    constructor() {
        super({
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.GAME_SCENE_NAME,
        });
    }
    init(params) {
        this.delta = 1000;
        this.lastBombTime = 0;
        this.bombsCaught = 0;
        this.bombsFallen = 0;
    }
    preload() {
        this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SOUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SOUND_PATH);
        this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.DEAD_SOUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.DEAD_SOUND_PATH);
        this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.MAIN_GAME_MUSIC_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.MAIN_GAME_MUSIC_PATH);
        this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BOMB_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BOMB_IMG_PATH);
        this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.FLOOR_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.FLOOR_IMG_PATH);
        this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BACKGROUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BACKGROUND_IMG_PATH);
        this.load.spritesheet(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.KABOOM_IMG_PATH, {
            frameWidth: 128,
            frameHeight: 128,
        });
    }
    create() {
        this.music = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.MAIN_GAME_MUSIC_SECTION_NAME, {
            volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_2__.GAMEPLAY_MUSIC_VOLUME,
            loop: true,
        });
        this.music.play();
        this.explosionSound = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SOUND_SECTION_NAME, {
            volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_2__.SOUND_EFFECTS_VOLUME,
        });
        this.deadSound = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.DEAD_SOUND_SECTION_NAME, {
            volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_2__.SOUND_EFFECTS_VOLUME,
        });
        const background = this.add.tileSprite(0, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight / 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth * 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight * 2, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BACKGROUND_SECTION_NAME);
        background.setAngle(90);
        this.floor = this.physics.add.staticGroup({
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.FLOOR_SECTION_NAME,
            frameQuantity: 2,
        });
        phaser__WEBPACK_IMPORTED_MODULE_0___default().Actions.PlaceOnLine(this.floor.getChildren(), new (phaser__WEBPACK_IMPORTED_MODULE_0___default().Geom.Line)(25, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight - 50, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth + 200, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight - 50));
        this.floor.refresh();
        this.info = this.add.text(10, 10, '', {
            font: '24px Minecraft Bold',
            color: '#FBFBAC',
        });
        this.anims.create({
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.KABOOM_ANIM_NAME,
            frames: this.anims.generateFrameNumbers(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SECTION_NAME, {
                start: 0,
                end: 15,
            }),
            frameRate: 16,
            repeat: 0,
            hideOnComplete: true,
        });
        this.explosions = this.add.group({
            defaultKey: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SECTION_NAME,
            maxSize: -1,
        });
    }
    update(time) {
        const diff = time - this.lastBombTime;
        if (diff > this.delta) {
            this.lastBombTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            this.emitBomb();
        }
        this.info.text =
            this.bombsCaught + ' caught - ' + this.bombsFallen + ' fallen (max 3)';
    }
    onClick(bomb) {
        return function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
                bomb.setVelocity(0, 0);
                this.bombsCaught += 1;
                this.time.delayedCall(100, function (bomb) {
                    return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
                        this.explosionEffect(bomb);
                        bomb.destroy();
                    });
                }, [bomb], this);
            });
        };
    }
    onFall(bomb) {
        return function () {
            return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
                this.bombsFallen += 1;
                this.time.delayedCall(100, function (bomb) {
                    return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
                        this.explosionEffect(bomb);
                        bomb.destroy();
                        if (this.bombsFallen > 2) {
                            this.gameOver();
                        }
                    });
                }, [bomb], this);
            });
        };
    }
    emitBomb() {
        const randomVelocity = phaser__WEBPACK_IMPORTED_MODULE_0___default().Math.Between(100, 200);
        const randomBombWidth = phaser__WEBPACK_IMPORTED_MODULE_0___default().Math.FloatBetween(0.12, 0.17);
        const x = phaser__WEBPACK_IMPORTED_MODULE_0___default().Math.Between(25, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth - 25);
        const y = 25;
        const bomb = this.physics.add.image(x, y, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BOMB_SECTION_NAME);
        bomb.setAngle(180);
        bomb.setDisplaySize(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth * randomBombWidth, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight * 0.15);
        bomb.setVelocity(0, randomVelocity);
        bomb.setInteractive();
        bomb.on('pointerdown', this.onClick(bomb), this);
        this.physics.add.collider(bomb, this.floor, this.onFall(bomb), null, this);
    }
    gameOver() {
        this.music.destroy();
        this.deadSound.play();
        this.scene.start(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.SCORE_SCENE_NAME, {
            bombsCaught: this.bombsCaught,
        });
    }
    explosionEffect(obj) {
        const explosion = this.explosions.get().setActive(true);
        explosion.setOrigin(0.5, 0.5);
        explosion.x = obj.x;
        explosion.y = obj.y;
        this.explosionSound.play();
        explosion.play(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.KABOOM_ANIM_NAME);
    }
}


/***/ }),

/***/ 97198:
/*!*****************************************************!*\
  !*** ./src/app/game-loader/scenes/k-boom.config.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MENU_MUSIC_VOLUME": function() { return /* binding */ MENU_MUSIC_VOLUME; },
/* harmony export */   "GAMEPLAY_MUSIC_VOLUME": function() { return /* binding */ GAMEPLAY_MUSIC_VOLUME; },
/* harmony export */   "SOUND_EFFECTS_VOLUME": function() { return /* binding */ SOUND_EFFECTS_VOLUME; }
/* harmony export */ });
const MENU_MUSIC_VOLUME = 0.5;
const GAMEPLAY_MUSIC_VOLUME = 0.2;
const SOUND_EFFECTS_VOLUME = 1;


/***/ }),

/***/ 19740:
/*!*****************************************************!*\
  !*** ./src/app/game-loader/scenes/k-boom.routes.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GAME_NAME": function() { return /* binding */ GAME_NAME; },
/* harmony export */   "WELCOME_SCENE_NAME": function() { return /* binding */ WELCOME_SCENE_NAME; },
/* harmony export */   "GAME_SCENE_NAME": function() { return /* binding */ GAME_SCENE_NAME; },
/* harmony export */   "SCORE_SCENE_NAME": function() { return /* binding */ SCORE_SCENE_NAME; },
/* harmony export */   "BACKGROUND_MENU_SECTION_NAME": function() { return /* binding */ BACKGROUND_MENU_SECTION_NAME; },
/* harmony export */   "BACKGROUND_SECTION_NAME": function() { return /* binding */ BACKGROUND_SECTION_NAME; },
/* harmony export */   "FLOOR_SECTION_NAME": function() { return /* binding */ FLOOR_SECTION_NAME; },
/* harmony export */   "BOMB_SECTION_NAME": function() { return /* binding */ BOMB_SECTION_NAME; },
/* harmony export */   "EXPLOSION_SECTION_NAME": function() { return /* binding */ EXPLOSION_SECTION_NAME; },
/* harmony export */   "MAIN_GAME_MUSIC_SECTION_NAME": function() { return /* binding */ MAIN_GAME_MUSIC_SECTION_NAME; },
/* harmony export */   "MENU_MUSIC_SECTION_NAME": function() { return /* binding */ MENU_MUSIC_SECTION_NAME; },
/* harmony export */   "MENU_MUSIC_PATH": function() { return /* binding */ MENU_MUSIC_PATH; },
/* harmony export */   "EXPLOSION_SOUND_SECTION_NAME": function() { return /* binding */ EXPLOSION_SOUND_SECTION_NAME; },
/* harmony export */   "DEAD_SOUND_SECTION_NAME": function() { return /* binding */ DEAD_SOUND_SECTION_NAME; },
/* harmony export */   "START_SOUND_SECTION_NAME": function() { return /* binding */ START_SOUND_SECTION_NAME; },
/* harmony export */   "KABOOM_ANIM_NAME": function() { return /* binding */ KABOOM_ANIM_NAME; },
/* harmony export */   "TITLE_FONT_NAME": function() { return /* binding */ TITLE_FONT_NAME; },
/* harmony export */   "TEXT_FONT_NAME": function() { return /* binding */ TEXT_FONT_NAME; },
/* harmony export */   "TITLE_BITMAP_FONT_PATH_PNG": function() { return /* binding */ TITLE_BITMAP_FONT_PATH_PNG; },
/* harmony export */   "TITLE_BITMAP_FONT_PATH_FNT": function() { return /* binding */ TITLE_BITMAP_FONT_PATH_FNT; },
/* harmony export */   "TEXT_BITMAP_FONT_PATH_PNG": function() { return /* binding */ TEXT_BITMAP_FONT_PATH_PNG; },
/* harmony export */   "TEXT_BITMAP_FONT_PATH_FNT": function() { return /* binding */ TEXT_BITMAP_FONT_PATH_FNT; },
/* harmony export */   "BACKGROUND_MENU_IMG_PATH": function() { return /* binding */ BACKGROUND_MENU_IMG_PATH; },
/* harmony export */   "BACKGROUND_IMG_PATH": function() { return /* binding */ BACKGROUND_IMG_PATH; },
/* harmony export */   "BOMB_IMG_PATH": function() { return /* binding */ BOMB_IMG_PATH; },
/* harmony export */   "FLOOR_IMG_PATH": function() { return /* binding */ FLOOR_IMG_PATH; },
/* harmony export */   "KABOOM_IMG_PATH": function() { return /* binding */ KABOOM_IMG_PATH; },
/* harmony export */   "MAIN_GAME_MUSIC_PATH": function() { return /* binding */ MAIN_GAME_MUSIC_PATH; },
/* harmony export */   "START_SOUND_PATH": function() { return /* binding */ START_SOUND_PATH; },
/* harmony export */   "DEAD_SOUND_PATH": function() { return /* binding */ DEAD_SOUND_PATH; },
/* harmony export */   "EXPLOSION_SOUND_PATH": function() { return /* binding */ EXPLOSION_SOUND_PATH; }
/* harmony export */ });
// game name
const GAME_NAME = 'K-BOOM!';
// scenes names
const WELCOME_SCENE_NAME = 'WelcomeScene';
const GAME_SCENE_NAME = 'GameScene';
const SCORE_SCENE_NAME = 'ScoreScene';
// section names
const BACKGROUND_MENU_SECTION_NAME = 'background-menu';
const BACKGROUND_SECTION_NAME = 'background';
const FLOOR_SECTION_NAME = 'floor';
const BOMB_SECTION_NAME = 'bomb';
const EXPLOSION_SECTION_NAME = 'kaboom';
const MAIN_GAME_MUSIC_SECTION_NAME = 'ingame-music';
const MENU_MUSIC_SECTION_NAME = 'menu-music';
const MENU_MUSIC_PATH = 'assets/games/k-boom/k-boom_menu.mp3';
const EXPLOSION_SOUND_SECTION_NAME = 'explosion-sound';
const DEAD_SOUND_SECTION_NAME = 'dead-sound';
const START_SOUND_SECTION_NAME = 'start-sound';
// animations names
const KABOOM_ANIM_NAME = 'explode';
//font names
const TITLE_FONT_NAME = 'Xenon';
const TEXT_FONT_NAME = 'Minecraft';
//assets
//xenon font resources
const TITLE_BITMAP_FONT_PATH_PNG = 'assets/fonts/xenon/Xenon.png';
const TITLE_BITMAP_FONT_PATH_FNT = 'assets/fonts/xenon/Xenon.fnt';
//minecraft font resources
const TEXT_BITMAP_FONT_PATH_PNG = 'assets/fonts/minecraft/minecraft-green.png';
const TEXT_BITMAP_FONT_PATH_FNT = 'assets/fonts/minecraft/minecraft-green.fnt';
//image paths
const BACKGROUND_MENU_IMG_PATH = 'assets/games/k-boom/menu_background.jpg';
const BACKGROUND_IMG_PATH = 'assets/games/k-boom/space.jpg';
const BOMB_IMG_PATH = 'assets/games/k-boom/meteo.png';
const FLOOR_IMG_PATH = 'assets/games/k-boom/sand.png';
const KABOOM_IMG_PATH = 'assets/games/k-boom/explode.png';
// music paths
const MAIN_GAME_MUSIC_PATH = 'assets/games/k-boom/IntergalacticOdyssey.ogg';
//sound paths
const START_SOUND_PATH = 'assets/games/k-boom/start-game.wav';
const DEAD_SOUND_PATH = 'assets/games/k-boom/deadnotification.wav';
const EXPLOSION_SOUND_PATH = 'assets/games/k-boom/explosion-sound-effect.mp3';


/***/ }),

/***/ 48298:
/*!***************************************************!*\
  !*** ./src/app/game-loader/scenes/score.scene.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScoreScene": function() { return /* binding */ ScoreScene; }
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ 82356);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _game_loader_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-loader.page */ 74251);
/* harmony import */ var _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./k-boom.routes */ 19740);



class ScoreScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
    constructor() {
        super({
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.SCORE_SCENE_NAME,
        });
        this.hintText = 'Touch to restart';
    }
    init(params) {
        this.score = params.bombsCaught;
    }
    preload() {
        this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.BACKGROUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.BACKGROUND_IMG_PATH);
    }
    update(time) {
        var _a;
        const seconds = Number((time / 1000).toFixed(0));
        (_a = this.hint) === null || _a === void 0 ? void 0 : _a.destroy();
        if (seconds % 2 !== 0) {
            this.hint = this.add.text(this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth), this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight) + 75, this.hintText, {
                font: '2rem Arial Bold',
                color: '#BC00FF',
            });
        }
    }
    create() {
        const background = this.add.tileSprite(0, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight / 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth * 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight * 2, _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.BACKGROUND_SECTION_NAME);
        background.setAngle(90);
        const resultText = 'Your score is ' + this.score;
        this.result = this.add.text(this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth), this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight) - 50, resultText, {
            font: '2rem Arial Bold',
            color: '#FBFBAC',
        });
        this.input.on('pointerdown', function ( /*pointer*/) {
            this.scene.start(_k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.WELCOME_SCENE_NAME);
        }, this);
    }
    calculateHalfOfHalf(input) {
        const half = input / 2;
        return half / 2;
    }
}


/***/ }),

/***/ 64578:
/*!*****************************************************!*\
  !*** ./src/app/game-loader/scenes/welcome.scene.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WelcomeScene": function() { return /* binding */ WelcomeScene; }
/* harmony export */ });
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! phaser */ 82356);
/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../commons/functions/responsive.function */ 25362);
/* harmony import */ var _game_loader_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-loader.page */ 74251);
/* harmony import */ var _k_boom_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./k-boom.config */ 97198);
/* harmony import */ var _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./k-boom.routes */ 19740);





class WelcomeScene extends (phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene) {
    constructor() {
        super({
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.WELCOME_SCENE_NAME,
        });
        this.hintText = 'Touch!';
    }
    preload() {
        this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.MENU_MUSIC_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.MENU_MUSIC_PATH);
        this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.START_SOUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.START_SOUND_PATH);
        this.load.bitmapFont(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_FONT_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_BITMAP_FONT_PATH_PNG, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_BITMAP_FONT_PATH_FNT);
        this.load.bitmapFont(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_FONT_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_BITMAP_FONT_PATH_PNG, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_BITMAP_FONT_PATH_FNT);
        this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.BACKGROUND_MENU_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.BACKGROUND_MENU_IMG_PATH);
    }
    create() {
        this.startGameSound = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.START_SOUND_SECTION_NAME, {
            volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_3__.SOUND_EFFECTS_VOLUME,
        });
        this.music = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.MENU_MUSIC_SECTION_NAME, {
            volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_3__.MENU_MUSIC_VOLUME,
            loop: true,
        });
        this.music.play();
        const background = this.add.tileSprite(0, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth * 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight * 2, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.BACKGROUND_MENU_SECTION_NAME);
        this.title = this.add.bitmapText((0,_commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__.calculateHalfOfHalf)(_game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth) / 2.5, (0,_commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__.calculateHalfOfHalf)(_game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight) - 100, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_FONT_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.GAME_NAME, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth / 5);
        this.input.on('pointerdown', function ( /*pointer*/) {
            this.startGameSound.play();
            this.music.destroy();
            this.scene.start(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.GAME_SCENE_NAME);
        }, this);
    }
    update(time) {
        var _a;
        const seconds = Number((time / 1000).toFixed(0));
        (_a = this.hint) === null || _a === void 0 ? void 0 : _a.destroy();
        if (seconds % 2 !== 0) {
            this.hint = this.add.bitmapText((0,_commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__.calculateHalfOfHalf)(_game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth) + 50, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight - 100, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_FONT_NAME, this.hintText, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth / 10);
        }
    }
}


/***/ }),

/***/ 52003:
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": function() { return /* binding */ HomePageRoutingModule; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 62267);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage,
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], HomePageRoutingModule);



/***/ }),

/***/ 3467:
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": function() { return /* binding */ HomePageModule; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 62267);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-routing.module */ 52003);







let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _home_routing_module__WEBPACK_IMPORTED_MODULE_1__.HomePageRoutingModule
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage]
    })
], HomePageModule);



/***/ }),

/***/ 62267:
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": function() { return /* binding */ HomePage; }
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./home.page.html */ 49764);
/* harmony import */ var _home_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss */ 2610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _game_loader_scenes_game_scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-loader/scenes/game.scene */ 41605);
/* harmony import */ var _game_loader_scenes_score_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game-loader/scenes/score.scene */ 48298);
/* harmony import */ var _game_loader_scenes_welcome_scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game-loader/scenes/welcome.scene */ 64578);








let HomePage = class HomePage {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() { }
    onNavigateTo() {
        this.router.navigate(['/game-loader'], {
            state: {
                gameName: 'K-BOOM!',
                scenes: [_game_loader_scenes_welcome_scene__WEBPACK_IMPORTED_MODULE_4__.WelcomeScene, _game_loader_scenes_game_scene__WEBPACK_IMPORTED_MODULE_2__.GameScene, _game_loader_scenes_score_scene__WEBPACK_IMPORTED_MODULE_3__.ScoreScene],
            },
        });
    }
    ngOnDestroy() { }
};
HomePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], HomePage);



/***/ }),

/***/ 2610:
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ 49764:
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>Games</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding ion-text-center\">\n  <ion-button (click)=\"onNavigateTo()\">Play K-BOOM</ion-button>\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_home_home_module_ts-es2015.js.map