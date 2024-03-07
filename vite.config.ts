import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["./src/__test__/**/*.tsx"],
    globals: true,
  },
});
