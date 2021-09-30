(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  (self["webpackChunkretro_arcade_games"] = self["webpackChunkretro_arcade_games"] || []).push([["src_app_home_home_module_ts"], {
    /***/
    25362: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "centerWordHorizontal": function centerWordHorizontal() {
          return (
            /* binding */
            _centerWordHorizontal
          );
        },

        /* harmony export */
        "centeredWordVertical": function centeredWordVertical() {
          return (
            /* binding */
            _centeredWordVertical
          );
        },

        /* harmony export */
        "calculateHalfOfHalf": function calculateHalfOfHalf() {
          return (
            /* binding */
            _calculateHalfOfHalf
          );
        }
        /* harmony export */

      });

      function _centerWordHorizontal(width, word) {
        var characters = word.split('');
        var middle = width / 2;
        var centeredWordPosition = middle - (characters.length / 2 + 8);
        return centeredWordPosition;
      }

      function _centeredWordVertical(heigth, word) {
        var middle = heigth / 2;
        var centeredWordPosition = middle - 8 / 2;
        return centeredWordPosition;
      }

      function _calculateHalfOfHalf(input) {
        var half = input / 2;
        return half / 2;
      }
      /***/

    },

    /***/
    41605: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "GameScene": function GameScene() {
          return (
            /* binding */
            _GameScene
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! tslib */
      64762);
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! phaser */
      82356);
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _game_loader_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../game-loader.page */
      74251);
      /* harmony import */


      var _k_boom_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./k-boom.config */
      97198);
      /* harmony import */


      var _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./k-boom.routes */
      19740);

      var _GameScene = /*#__PURE__*/function (_phaser__WEBPACK_IMPO) {
        _inherits(_GameScene, _phaser__WEBPACK_IMPO);

        var _super = _createSuper(_GameScene);

        function _GameScene() {
          _classCallCheck(this, _GameScene);

          return _super.call(this, {
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.GAME_SCENE_NAME
          });
        }

        _createClass(_GameScene, [{
          key: "init",
          value: function init(params) {
            this.delta = 1000;
            this.lastBombTime = 0;
            this.bombsCaught = 0;
            this.bombsFallen = 0;
          }
        }, {
          key: "preload",
          value: function preload() {
            this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SOUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SOUND_PATH);
            this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.DEAD_SOUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.DEAD_SOUND_PATH);
            this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.MAIN_GAME_MUSIC_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.MAIN_GAME_MUSIC_PATH);
            this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BOMB_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BOMB_IMG_PATH);
            this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.FLOOR_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.FLOOR_IMG_PATH);
            this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BACKGROUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BACKGROUND_IMG_PATH);
            this.load.spritesheet(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.KABOOM_IMG_PATH, {
              frameWidth: 128,
              frameHeight: 128
            });
          }
        }, {
          key: "create",
          value: function create() {
            this.music = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.MAIN_GAME_MUSIC_SECTION_NAME, {
              volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_2__.GAMEPLAY_MUSIC_VOLUME,
              loop: true
            });
            this.music.play();
            this.explosionSound = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SOUND_SECTION_NAME, {
              volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_2__.SOUND_EFFECTS_VOLUME
            });
            this.deadSound = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.DEAD_SOUND_SECTION_NAME, {
              volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_2__.SOUND_EFFECTS_VOLUME
            });
            var background = this.add.tileSprite(0, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight / 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth * 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight * 2, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BACKGROUND_SECTION_NAME);
            background.setAngle(90);
            this.floor = this.physics.add.staticGroup({
              key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.FLOOR_SECTION_NAME,
              frameQuantity: 2
            });
            phaser__WEBPACK_IMPORTED_MODULE_0___default().Actions.PlaceOnLine(this.floor.getChildren(), new (phaser__WEBPACK_IMPORTED_MODULE_0___default().Geom.Line)(25, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight - 50, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth + 200, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight - 50));
            this.floor.refresh();
            this.info = this.add.text(10, 10, '', {
              font: '24px Minecraft Bold',
              color: '#FBFBAC'
            });
            this.anims.create({
              key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.KABOOM_ANIM_NAME,
              frames: this.anims.generateFrameNumbers(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SECTION_NAME, {
                start: 0,
                end: 15
              }),
              frameRate: 16,
              repeat: 0,
              hideOnComplete: true
            });
            this.explosions = this.add.group({
              defaultKey: _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.EXPLOSION_SECTION_NAME,
              maxSize: -1
            });
          }
        }, {
          key: "update",
          value: function update(time) {
            var diff = time - this.lastBombTime;

            if (diff > this.delta) {
              this.lastBombTime = time;

              if (this.delta > 500) {
                this.delta -= 20;
              }

              this.emitBomb();
            }

            this.info.text = this.bombsCaught + ' caught - ' + this.bombsFallen + ' fallen (max 3)';
          }
        }, {
          key: "onClick",
          value: function onClick(bomb) {
            return function () {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        bomb.setVelocity(0, 0);
                        this.bombsCaught += 1;
                        this.time.delayedCall(100, function (bomb) {
                          return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    this.explosionEffect(bomb);
                                    bomb.destroy();

                                  case 2:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee, this);
                          }));
                        }, [bomb], this);

                      case 3:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, this);
              }));
            };
          }
        }, {
          key: "onFall",
          value: function onFall(bomb) {
            return function () {
              return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        this.bombsFallen += 1;
                        this.time.delayedCall(100, function (bomb) {
                          return (0, tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    this.explosionEffect(bomb);
                                    bomb.destroy();

                                    if (this.bombsFallen > 2) {
                                      this.gameOver();
                                    }

                                  case 3:
                                  case "end":
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, this);
                          }));
                        }, [bomb], this);

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, this);
              }));
            };
          }
        }, {
          key: "emitBomb",
          value: function emitBomb() {
            var randomVelocity = phaser__WEBPACK_IMPORTED_MODULE_0___default().Math.Between(100, 200);
            var randomBombWidth = phaser__WEBPACK_IMPORTED_MODULE_0___default().Math.FloatBetween(0.12, 0.17);
            var x = phaser__WEBPACK_IMPORTED_MODULE_0___default().Math.Between(25, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth - 25);
            var y = 25;
            var bomb = this.physics.add.image(x, y, _k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.BOMB_SECTION_NAME);
            bomb.setAngle(180);
            bomb.setDisplaySize(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth * randomBombWidth, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight * 0.15);
            bomb.setVelocity(0, randomVelocity);
            bomb.setInteractive();
            bomb.on('pointerdown', this.onClick(bomb), this);
            this.physics.add.collider(bomb, this.floor, this.onFall(bomb), null, this);
          }
        }, {
          key: "gameOver",
          value: function gameOver() {
            this.music.destroy();
            this.deadSound.play();
            this.scene.start(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.SCORE_SCENE_NAME, {
              bombsCaught: this.bombsCaught
            });
          }
        }, {
          key: "explosionEffect",
          value: function explosionEffect(obj) {
            var explosion = this.explosions.get().setActive(true);
            explosion.setOrigin(0.5, 0.5);
            explosion.x = obj.x;
            explosion.y = obj.y;
            this.explosionSound.play();
            explosion.play(_k_boom_routes__WEBPACK_IMPORTED_MODULE_3__.KABOOM_ANIM_NAME);
          }
        }]);

        return _GameScene;
      }(phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene);
      /***/

    },

    /***/
    97198: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "MENU_MUSIC_VOLUME": function MENU_MUSIC_VOLUME() {
          return (
            /* binding */
            _MENU_MUSIC_VOLUME
          );
        },

        /* harmony export */
        "GAMEPLAY_MUSIC_VOLUME": function GAMEPLAY_MUSIC_VOLUME() {
          return (
            /* binding */
            _GAMEPLAY_MUSIC_VOLUME
          );
        },

        /* harmony export */
        "SOUND_EFFECTS_VOLUME": function SOUND_EFFECTS_VOLUME() {
          return (
            /* binding */
            _SOUND_EFFECTS_VOLUME
          );
        }
        /* harmony export */

      });

      var _MENU_MUSIC_VOLUME = 0.5;
      var _GAMEPLAY_MUSIC_VOLUME = 0.2;
      var _SOUND_EFFECTS_VOLUME = 1;
      /***/
    },

    /***/
    19740: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "GAME_NAME": function GAME_NAME() {
          return (
            /* binding */
            _GAME_NAME
          );
        },

        /* harmony export */
        "WELCOME_SCENE_NAME": function WELCOME_SCENE_NAME() {
          return (
            /* binding */
            _WELCOME_SCENE_NAME
          );
        },

        /* harmony export */
        "GAME_SCENE_NAME": function GAME_SCENE_NAME() {
          return (
            /* binding */
            _GAME_SCENE_NAME
          );
        },

        /* harmony export */
        "SCORE_SCENE_NAME": function SCORE_SCENE_NAME() {
          return (
            /* binding */
            _SCORE_SCENE_NAME
          );
        },

        /* harmony export */
        "BACKGROUND_MENU_SECTION_NAME": function BACKGROUND_MENU_SECTION_NAME() {
          return (
            /* binding */
            _BACKGROUND_MENU_SECTION_NAME
          );
        },

        /* harmony export */
        "BACKGROUND_SECTION_NAME": function BACKGROUND_SECTION_NAME() {
          return (
            /* binding */
            _BACKGROUND_SECTION_NAME
          );
        },

        /* harmony export */
        "FLOOR_SECTION_NAME": function FLOOR_SECTION_NAME() {
          return (
            /* binding */
            _FLOOR_SECTION_NAME
          );
        },

        /* harmony export */
        "BOMB_SECTION_NAME": function BOMB_SECTION_NAME() {
          return (
            /* binding */
            _BOMB_SECTION_NAME
          );
        },

        /* harmony export */
        "EXPLOSION_SECTION_NAME": function EXPLOSION_SECTION_NAME() {
          return (
            /* binding */
            _EXPLOSION_SECTION_NAME
          );
        },

        /* harmony export */
        "MAIN_GAME_MUSIC_SECTION_NAME": function MAIN_GAME_MUSIC_SECTION_NAME() {
          return (
            /* binding */
            _MAIN_GAME_MUSIC_SECTION_NAME
          );
        },

        /* harmony export */
        "MENU_MUSIC_SECTION_NAME": function MENU_MUSIC_SECTION_NAME() {
          return (
            /* binding */
            _MENU_MUSIC_SECTION_NAME
          );
        },

        /* harmony export */
        "MENU_MUSIC_PATH": function MENU_MUSIC_PATH() {
          return (
            /* binding */
            _MENU_MUSIC_PATH
          );
        },

        /* harmony export */
        "EXPLOSION_SOUND_SECTION_NAME": function EXPLOSION_SOUND_SECTION_NAME() {
          return (
            /* binding */
            _EXPLOSION_SOUND_SECTION_NAME
          );
        },

        /* harmony export */
        "DEAD_SOUND_SECTION_NAME": function DEAD_SOUND_SECTION_NAME() {
          return (
            /* binding */
            _DEAD_SOUND_SECTION_NAME
          );
        },

        /* harmony export */
        "START_SOUND_SECTION_NAME": function START_SOUND_SECTION_NAME() {
          return (
            /* binding */
            _START_SOUND_SECTION_NAME
          );
        },

        /* harmony export */
        "KABOOM_ANIM_NAME": function KABOOM_ANIM_NAME() {
          return (
            /* binding */
            _KABOOM_ANIM_NAME
          );
        },

        /* harmony export */
        "TITLE_FONT_NAME": function TITLE_FONT_NAME() {
          return (
            /* binding */
            _TITLE_FONT_NAME
          );
        },

        /* harmony export */
        "TEXT_FONT_NAME": function TEXT_FONT_NAME() {
          return (
            /* binding */
            _TEXT_FONT_NAME
          );
        },

        /* harmony export */
        "TITLE_BITMAP_FONT_PATH_PNG": function TITLE_BITMAP_FONT_PATH_PNG() {
          return (
            /* binding */
            _TITLE_BITMAP_FONT_PATH_PNG
          );
        },

        /* harmony export */
        "TITLE_BITMAP_FONT_PATH_FNT": function TITLE_BITMAP_FONT_PATH_FNT() {
          return (
            /* binding */
            _TITLE_BITMAP_FONT_PATH_FNT
          );
        },

        /* harmony export */
        "TEXT_BITMAP_FONT_PATH_PNG": function TEXT_BITMAP_FONT_PATH_PNG() {
          return (
            /* binding */
            _TEXT_BITMAP_FONT_PATH_PNG
          );
        },

        /* harmony export */
        "TEXT_BITMAP_FONT_PATH_FNT": function TEXT_BITMAP_FONT_PATH_FNT() {
          return (
            /* binding */
            _TEXT_BITMAP_FONT_PATH_FNT
          );
        },

        /* harmony export */
        "BACKGROUND_MENU_IMG_PATH": function BACKGROUND_MENU_IMG_PATH() {
          return (
            /* binding */
            _BACKGROUND_MENU_IMG_PATH
          );
        },

        /* harmony export */
        "BACKGROUND_IMG_PATH": function BACKGROUND_IMG_PATH() {
          return (
            /* binding */
            _BACKGROUND_IMG_PATH
          );
        },

        /* harmony export */
        "BOMB_IMG_PATH": function BOMB_IMG_PATH() {
          return (
            /* binding */
            _BOMB_IMG_PATH
          );
        },

        /* harmony export */
        "FLOOR_IMG_PATH": function FLOOR_IMG_PATH() {
          return (
            /* binding */
            _FLOOR_IMG_PATH
          );
        },

        /* harmony export */
        "KABOOM_IMG_PATH": function KABOOM_IMG_PATH() {
          return (
            /* binding */
            _KABOOM_IMG_PATH
          );
        },

        /* harmony export */
        "MAIN_GAME_MUSIC_PATH": function MAIN_GAME_MUSIC_PATH() {
          return (
            /* binding */
            _MAIN_GAME_MUSIC_PATH
          );
        },

        /* harmony export */
        "START_SOUND_PATH": function START_SOUND_PATH() {
          return (
            /* binding */
            _START_SOUND_PATH
          );
        },

        /* harmony export */
        "DEAD_SOUND_PATH": function DEAD_SOUND_PATH() {
          return (
            /* binding */
            _DEAD_SOUND_PATH
          );
        },

        /* harmony export */
        "EXPLOSION_SOUND_PATH": function EXPLOSION_SOUND_PATH() {
          return (
            /* binding */
            _EXPLOSION_SOUND_PATH
          );
        }
        /* harmony export */

      }); // game name


      var _GAME_NAME = 'K-BOOM!'; // scenes names

      var _WELCOME_SCENE_NAME = 'WelcomeScene';
      var _GAME_SCENE_NAME = 'GameScene';
      var _SCORE_SCENE_NAME = 'ScoreScene'; // section names

      var _BACKGROUND_MENU_SECTION_NAME = 'background-menu';
      var _BACKGROUND_SECTION_NAME = 'background';
      var _FLOOR_SECTION_NAME = 'floor';
      var _BOMB_SECTION_NAME = 'bomb';
      var _EXPLOSION_SECTION_NAME = 'kaboom';
      var _MAIN_GAME_MUSIC_SECTION_NAME = 'ingame-music';
      var _MENU_MUSIC_SECTION_NAME = 'menu-music';
      var _MENU_MUSIC_PATH = 'assets/games/k-boom/k-boom_menu.mp3';
      var _EXPLOSION_SOUND_SECTION_NAME = 'explosion-sound';
      var _DEAD_SOUND_SECTION_NAME = 'dead-sound';
      var _START_SOUND_SECTION_NAME = 'start-sound'; // animations names

      var _KABOOM_ANIM_NAME = 'explode'; //font names

      var _TITLE_FONT_NAME = 'Xenon';
      var _TEXT_FONT_NAME = 'Minecraft'; //assets
      //xenon font resources

      var _TITLE_BITMAP_FONT_PATH_PNG = 'assets/fonts/xenon/Xenon.png';
      var _TITLE_BITMAP_FONT_PATH_FNT = 'assets/fonts/xenon/Xenon.fnt'; //minecraft font resources

      var _TEXT_BITMAP_FONT_PATH_PNG = 'assets/fonts/minecraft/minecraft-green.png';
      var _TEXT_BITMAP_FONT_PATH_FNT = 'assets/fonts/minecraft/minecraft-green.fnt'; //image paths

      var _BACKGROUND_MENU_IMG_PATH = 'assets/games/k-boom/menu_background.jpg';
      var _BACKGROUND_IMG_PATH = 'assets/games/k-boom/space.jpg';
      var _BOMB_IMG_PATH = 'assets/games/k-boom/meteo.png';
      var _FLOOR_IMG_PATH = 'assets/games/k-boom/sand.png';
      var _KABOOM_IMG_PATH = 'assets/games/k-boom/explode.png'; // music paths

      var _MAIN_GAME_MUSIC_PATH = 'assets/games/k-boom/IntergalacticOdyssey.ogg'; //sound paths

      var _START_SOUND_PATH = 'assets/games/k-boom/start-game.wav';
      var _DEAD_SOUND_PATH = 'assets/games/k-boom/deadnotification.wav';
      var _EXPLOSION_SOUND_PATH = 'assets/games/k-boom/explosion-sound-effect.mp3';
      /***/
    },

    /***/
    48298: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "ScoreScene": function ScoreScene() {
          return (
            /* binding */
            _ScoreScene
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! phaser */
      82356);
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _game_loader_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../game-loader.page */
      74251);
      /* harmony import */


      var _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./k-boom.routes */
      19740);

      var _ScoreScene = /*#__PURE__*/function (_phaser__WEBPACK_IMPO2) {
        _inherits(_ScoreScene, _phaser__WEBPACK_IMPO2);

        var _super2 = _createSuper(_ScoreScene);

        function _ScoreScene() {
          var _this;

          _classCallCheck(this, _ScoreScene);

          _this = _super2.call(this, {
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.SCORE_SCENE_NAME
          });
          _this.hintText = 'Touch to restart';
          return _this;
        }

        _createClass(_ScoreScene, [{
          key: "init",
          value: function init(params) {
            this.score = params.bombsCaught;
          }
        }, {
          key: "preload",
          value: function preload() {
            this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.BACKGROUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.BACKGROUND_IMG_PATH);
          }
        }, {
          key: "update",
          value: function update(time) {
            var _a;

            var seconds = Number((time / 1000).toFixed(0));
            (_a = this.hint) === null || _a === void 0 ? void 0 : _a.destroy();

            if (seconds % 2 !== 0) {
              this.hint = this.add.text(this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth), this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight) + 75, this.hintText, {
                font: '2rem Arial Bold',
                color: '#BC00FF'
              });
            }
          }
        }, {
          key: "create",
          value: function create() {
            var background = this.add.tileSprite(0, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight / 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth * 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight * 2, _k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.BACKGROUND_SECTION_NAME);
            background.setAngle(90);
            var resultText = 'Your score is ' + this.score;
            this.result = this.add.text(this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformWidth), this.calculateHalfOfHalf(_game_loader_page__WEBPACK_IMPORTED_MODULE_1__.platformHeight) - 50, resultText, {
              font: '2rem Arial Bold',
              color: '#FBFBAC'
            });
            this.input.on('pointerdown', function () {
              this.scene.start(_k_boom_routes__WEBPACK_IMPORTED_MODULE_2__.WELCOME_SCENE_NAME);
            }, this);
          }
        }, {
          key: "calculateHalfOfHalf",
          value: function calculateHalfOfHalf(input) {
            var half = input / 2;
            return half / 2;
          }
        }]);

        return _ScoreScene;
      }(phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene);
      /***/

    },

    /***/
    64578: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "WelcomeScene": function WelcomeScene() {
          return (
            /* binding */
            _WelcomeScene
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! phaser */
      82356);
      /* harmony import */


      var phaser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var _commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../../commons/functions/responsive.function */
      25362);
      /* harmony import */


      var _game_loader_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../game-loader.page */
      74251);
      /* harmony import */


      var _k_boom_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./k-boom.config */
      97198);
      /* harmony import */


      var _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./k-boom.routes */
      19740);

      var _WelcomeScene = /*#__PURE__*/function (_phaser__WEBPACK_IMPO3) {
        _inherits(_WelcomeScene, _phaser__WEBPACK_IMPO3);

        var _super3 = _createSuper(_WelcomeScene);

        function _WelcomeScene() {
          var _this2;

          _classCallCheck(this, _WelcomeScene);

          _this2 = _super3.call(this, {
            key: _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.WELCOME_SCENE_NAME
          });
          _this2.hintText = 'Touch!';
          return _this2;
        }

        _createClass(_WelcomeScene, [{
          key: "preload",
          value: function preload() {
            this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.MENU_MUSIC_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.MENU_MUSIC_PATH);
            this.load.audio(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.START_SOUND_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.START_SOUND_PATH);
            this.load.bitmapFont(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_FONT_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_BITMAP_FONT_PATH_PNG, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_BITMAP_FONT_PATH_FNT);
            this.load.bitmapFont(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_FONT_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_BITMAP_FONT_PATH_PNG, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_BITMAP_FONT_PATH_FNT);
            this.load.image(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.BACKGROUND_MENU_SECTION_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.BACKGROUND_MENU_IMG_PATH);
          }
        }, {
          key: "create",
          value: function create() {
            this.startGameSound = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.START_SOUND_SECTION_NAME, {
              volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_3__.SOUND_EFFECTS_VOLUME
            });
            this.music = this.sound.add(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.MENU_MUSIC_SECTION_NAME, {
              volume: _k_boom_config__WEBPACK_IMPORTED_MODULE_3__.MENU_MUSIC_VOLUME,
              loop: true
            });
            this.music.play();
            var background = this.add.tileSprite(0, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth * 2, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight * 2, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.BACKGROUND_MENU_SECTION_NAME);
            this.title = this.add.bitmapText((0, _commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__.calculateHalfOfHalf)(_game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth) / 2.5, (0, _commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__.calculateHalfOfHalf)(_game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight) - 100, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TITLE_FONT_NAME, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.GAME_NAME, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth / 5);
            this.input.on('pointerdown', function () {
              this.startGameSound.play();
              this.music.destroy();
              this.scene.start(_k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.GAME_SCENE_NAME);
            }, this);
          }
        }, {
          key: "update",
          value: function update(time) {
            var _a;

            var seconds = Number((time / 1000).toFixed(0));
            (_a = this.hint) === null || _a === void 0 ? void 0 : _a.destroy();

            if (seconds % 2 !== 0) {
              this.hint = this.add.bitmapText((0, _commons_functions_responsive_function__WEBPACK_IMPORTED_MODULE_1__.calculateHalfOfHalf)(_game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth) + 50, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformHeight - 100, _k_boom_routes__WEBPACK_IMPORTED_MODULE_4__.TEXT_FONT_NAME, this.hintText, _game_loader_page__WEBPACK_IMPORTED_MODULE_2__.platformWidth / 10);
            }
          }
        }]);

        return _WelcomeScene;
      }(phaser__WEBPACK_IMPORTED_MODULE_0___default().Scene);
      /***/

    },

    /***/
    52003: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HomePageRoutingModule": function HomePageRoutingModule() {
          return (
            /* binding */
            _HomePageRoutingModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! tslib */
      64762);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./home.page */
      62267);

      var routes = [{
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage
      }];

      var _HomePageRoutingModule = function HomePageRoutingModule() {
        _classCallCheck(this, HomePageRoutingModule);
      };

      _HomePageRoutingModule = (0, tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0, _angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
      })], _HomePageRoutingModule);
      /***/
    },

    /***/
    3467: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HomePageModule": function HomePageModule() {
          return (
            /* binding */
            _HomePageModule
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! tslib */
      64762);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      38583);
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic/angular */
      80476);
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/forms */
      3679);
      /* harmony import */


      var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./home.page */
      62267);
      /* harmony import */


      var _home_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./home-routing.module */
      52003);

      var _HomePageModule = function HomePageModule() {
        _classCallCheck(this, HomePageModule);
      };

      _HomePageModule = (0, tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([(0, _angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, _home_routing_module__WEBPACK_IMPORTED_MODULE_1__.HomePageRoutingModule],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage]
      })], _HomePageModule);
      /***/
    },

    /***/
    62267: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */


      __webpack_require__.d(__webpack_exports__, {
        /* harmony export */
        "HomePage": function HomePage() {
          return (
            /* binding */
            _HomePage
          );
        }
        /* harmony export */

      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! tslib */
      64762);
      /* harmony import */


      var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! !raw-loader!./home.page.html */
      49764);
      /* harmony import */


      var _home_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./home.page.scss */
      2610);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/core */
      37716);
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/router */
      39895);
      /* harmony import */


      var _game_loader_scenes_game_scene__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../game-loader/scenes/game.scene */
      41605);
      /* harmony import */


      var _game_loader_scenes_score_scene__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../game-loader/scenes/score.scene */
      48298);
      /* harmony import */


      var _game_loader_scenes_welcome_scene__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../game-loader/scenes/welcome.scene */
      64578);

      var _HomePage = /*#__PURE__*/function () {
        function HomePage(router) {
          _classCallCheck(this, HomePage);

          this.router = router;
        }

        _createClass(HomePage, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }, {
          key: "onNavigateTo",
          value: function onNavigateTo() {
            this.router.navigate(['/game-loader'], {
              state: {
                gameName: 'K-BOOM!',
                scenes: [_game_loader_scenes_welcome_scene__WEBPACK_IMPORTED_MODULE_4__.WelcomeScene, _game_loader_scenes_game_scene__WEBPACK_IMPORTED_MODULE_2__.GameScene, _game_loader_scenes_score_scene__WEBPACK_IMPORTED_MODULE_3__.ScoreScene]
              }
            });
          }
        }, {
          key: "ngOnDestroy",
          value: function ngOnDestroy() {}
        }]);

        return HomePage;
      }();

      _HomePage.ctorParameters = function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router
        }];
      };

      _HomePage = (0, tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0, _angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
      })], _HomePage);
      /***/
    },

    /***/
    2610: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyJ9 */";
      /***/
    },

    /***/
    49764: function _(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title>Games</ion-title>\n  </ion-toolbar>\n</ion-header>\n<ion-content class=\"ion-padding ion-text-center\">\n  <ion-button (click)=\"onNavigateTo()\">Play K-BOOM</ion-button>\n</ion-content>\n";
      /***/
    }
  }]);
})();
//# sourceMappingURL=src_app_home_home_module_ts-es5.js.map