"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const yarns_plugin_1 = require("./config/plugins/yarns.plugin");
const server_app_1 = require("./presentation/server.app");
// console.log(yarg);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
// (async()=>await Promise.resolve())();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { b: base, l: limit, s: showTable, n: fileName, d: fileDestination } = yarns_plugin_1.yarg;
        server_app_1.ServerApp.run({ base, limit, showTable, fileName, fileDestination });
    });
}
