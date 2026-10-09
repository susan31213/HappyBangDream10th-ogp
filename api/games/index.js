// ゲームごとの設定・パースロジックを集約するインデックス
// 新しいゲームを追加する場合は、対応するファイルをこのディレクトリに作成し、
// ここに require & 登録する

const mygo = require('./mygo');
const roselia = require('./roselia');
const poppinparty = require('./poppinparty');

const GAME_CONFIGS = {
  [mygo.id]: mygo,
  [roselia.id]: roselia,
  [poppinparty.id]: poppinparty,
};

module.exports = GAME_CONFIGS;
