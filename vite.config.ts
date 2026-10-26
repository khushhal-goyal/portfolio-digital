// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const lovableConfig = defineConfig({
  vite: {
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            maxSize: 400_000,
            groups: [
              {
                name: "three-vendor",
                test: /node_modules[\\/]three[\\/]/,
                priority: 20,
              },
              {
                name: "react-three-vendor",
                test: /node_modules[\\/]@react-three[\\/]/,
                priority: 10,
              },
            ],
          },
        },
      },
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

export default async (env: Parameters<typeof lovableConfig>[0]) => {
  const config = await lovableConfig(env);

  return {
    ...config,
    resolve: { ...config.resolve, tsconfigPaths: true },
    plugins: config.plugins?.filter(
      (plugin) =>
        !(
          plugin &&
          typeof plugin === "object" &&
          !Array.isArray(plugin) &&
          "name" in plugin &&
          plugin.name === "vite-tsconfig-paths"
        ),
    ),
  };
};
