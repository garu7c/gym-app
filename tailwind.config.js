import { defineConfig } from "vite";
import tailwindcsss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcsss(),
    ],
})

module.exports = {
    darkmode: 'class',
}