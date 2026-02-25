# Chess Relay Server

一個基於 WebSocket 的西洋棋對戰中繼伺服器。

## 功能特色

- 🎮 建立/加入遊戲房間
- 🔄 即時同步棋步
- ⏱️ 支援計時器同步
- 👥 雙人對戰

## 安裝

需要 Node.js 環境。執行以下指令安裝依賴套件（ws）：

```bash
npm install
```

## 啟動伺服器

```bash
node server.js
```

伺服器預設運行於 `PORT` 環境變數指定的埠號，若未設定則使用 3000 埠。

## WebSocket API

### 連線

連線至 WebSocket 伺服器後，可透過 JSON 訊息進行以下操作：

### 訊息格式

#### 建立房間

**請求：**
```json
{ "action": "createRoom" }
```

**回應：**
```json
{ "action": "roomCreated", "room": "1234" }
```

#### 加入房間

**請求：**
```json
{ "action": "joinRoom", "room": "1234" }
```

**回應（成功）：**
```json
{ "action": "joinedRoom", "room": "1234" }
```

**回應（房間不存在）：**
```json
{ "action": "error", "message": "房間不存在" }
```

**房主收到通知：**
```json
{ "action": "playerJoined", "room": "1234" }
```

#### 開始遊戲

**請求：**
```json
{
  "action": "startGame",
  "room": "1234",
  "whiteTimeMs": 600000,
  "blackTimeMs": 600000,
  "incrementMs": 0,
  "hostColor": "white"
}
```

**廣播給房間內所有玩家：**
```json
{
  "action": "gameStart",
  "room": "1234",
  "whiteTimeMs": 600000,
  "blackTimeMs": 600000,
  "incrementMs": 0,
  "hostColor": "white",
  "serverTimestamp": 1234567890123
}
```

#### 落子

**請求：**
```json
{ "action": "move", "room": "1234", "from": "e2", "to": "e4" }
```

會轉發給房間內的其他玩家。

#### 投降

**請求：**
```json
{ "action": "surrender", "room": "1234" }
```

會轉發給房間內的其他玩家。

#### 離開房間

**請求：**
```json
{ "action": "leaveRoom", "room": "1234" }
```

**其他玩家收到通知：**
```json
{ "action": "playerLeft", "room": "1234" }
```

### 斷線處理

當玩家斷線時，房間內的其他玩家會收到：
```json
{ "action": "playerLeft", "room": "1234" }
```

## 部署

此伺服器可部署至 Render 或其他支援 Node.js 的平台，會自動使用 `PORT` 環境變數。

## 授權

本專案採用 ISC 授權條款。
