import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                home: resolve(import.meta.dirname, "index.html"),
                product: resolve(import.meta.dirname, "product.html"),
                cart: resolve(import.meta.dirname, "cart.html")
            }
        }
    }
});
