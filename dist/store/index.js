"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignOut = exports.persistor = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage"));
const user_1 = __importDefault(require("./user"));
const ui_1 = __importDefault(require("./ui"));
const recommendations_1 = __importDefault(require("./recommendations"));
const conversations_1 = __importDefault(require("./conversations"));
const notifications_1 = __importDefault(require("./notifications"));
const connections_1 = __importDefault(require("./connections"));
const persistConfig = {
    key: "root",
    storage: storage_1.default,
    whitelist: [
        "user",
        "recommendations",
        "conversations",
        "ui",
        "notifications",
        "connections",
    ],
};
const rootReducer = (0, toolkit_1.combineReducers)({
    user: user_1.default,
    ui: ui_1.default,
    recommendations: recommendations_1.default,
    conversations: conversations_1.default,
    notifications: notifications_1.default,
    connections: connections_1.default,
});
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, rootReducer);
exports.store = (0, toolkit_1.configureStore)({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
const handleSignOut = () => {
    exports.persistor.purge();
};
exports.handleSignOut = handleSignOut;
//# sourceMappingURL=index.js.map