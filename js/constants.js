
const CANVAS_W = 512;
const CANVAS_H = 448;

// 地图位置
const MAP_BASE_X = 32;
const MAP_BASE_Y = 16;
// 地图尺寸
const MAP_W = 416;
const MAP_H = 416;
const MAP_ROWS = 26;
const MAP_COLS = 26;
const BLOCK_W = MAP_W / MAP_ROWS;
const BLOCK_H = MAP_H / MAP_COLS;
const HOME_W = 32;
const HOME_H = 32;

// 地图中的块物体
const BLOCK_EMPTY = 0;
const BLOCK_CEMENT_BRICK = 1;
const BLOCK_STEEL_BRICK = 2;
const BLOCK_GRASS = 3;
const BLOCK_WATER = 4;
const BLOCK_ICE = 5;
const BLOCK_NAMES = ['cementBrick', 'steelBrick', 'grass', 'water', 'ice'];
const HOME = 9;
const ANOTHRE_HOME = 8;

// 方向常量, 用于坦克,子弹参数
const DIR_NONE = -1;
const DIR_UP = 0;
const DIR_DOWN = 1;
const DIR_LEFT = 2;
const DIR_RIGHT = 3;
const DIR_NAMES = ['Up', 'Down', 'Left', 'Right'];

const TANK_W = 32;
const TANK_H = 32;

const HOST_PLAYER = 1;
const HOST_HOSTILE = 2;


const BULLET_SIZE = 6;
