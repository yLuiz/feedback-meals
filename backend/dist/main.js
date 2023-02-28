"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const corsOrigins = ["http://localhost:3002", "http://147.1.5.47:3002"];
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true
    });
    app.enableCors({
        origin: corsOrigins,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map