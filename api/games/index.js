// ゲームごとの設定・パースロジックを集約するインデックス
// 新しいゲームを追加する場合は、対応するファイルをこのディレクトリに作成し、
// ここに require & 登録する

const mygo = require('./mygo');

const GAME_CONFIGS = {
  [mygo.id]: mygo,
};

module.exports = GAME_CONFIGS;
