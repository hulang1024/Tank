class MapObjectFactory {
  static createByType (type) {
    let obj = null;
    switch (type) {
      case BLOCK_EMPTY:
        break;
      case BLOCK_CEMENT_BRICK:
        obj = new CementBrick();
        break;
      case BLOCK_STEEL_BRICK:
        obj = new SteelBrick();
        break;
      case BLOCK_WATER:
        obj = new Water();
        break;
      case BLOCK_GRASS:
        obj = new Grass();
        break;
      case BLOCK_ICE:
        obj = new Ice();
        break;
      case ANOTHRE_HOME:
      case HOME:
        obj = new Home();
        break;
    }

    return obj;
  }
}
