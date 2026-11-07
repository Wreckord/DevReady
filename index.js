import { app, PORT } from "./api endpoints/api_endpoints.js";

app.listen(
    PORT,
    ()=>console.log(`It's alive on http://localhost:${PORT}`)
)