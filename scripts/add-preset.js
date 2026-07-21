import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args.length < 4) {
  console.log("Usage: node scripts/add-preset.js <id> <label> <dark: true|false> <accentHex>");
  console.log("Example: node scripts/add-preset.js dracula-light 'Dracula Light' false '#ff79c6'");
  process.exit(1);
}

const [id, label, darkStr, accent] = args;
const dark = darkStr === "true";

const presetPath = path.join(__dirname, "../src/presets", `${id}.json`);
if (fs.existsSync(presetPath)) {
  console.error(`Preset file already exists at ${presetPath}`);
  process.exit(1);
}

const template = {
  id,
  label,
  dark,
  accent,
  colors: {
    surface: { hex: dark ? "#1e1e2e" : "#ffffff", opacity: 100 },
    sidebarBg: { hex: dark ? "#181825" : "#f5f5f5", opacity: 100 },
    topbarBg: { hex: dark ? "#181825" : "#f5f5f5", opacity: 100 },
    input: { hex: dark ? "#313244" : "#e0e0e0", opacity: 100 },
    main: { hex: accent, opacity: 100 },
    text: { hex: dark ? "#cdd6f4" : "#222222", opacity: 100 },
    secondaryText: { hex: dark ? "#a6adc8" : "#666666", opacity: 100 },
    strongText: { hex: dark ? "#cdd6f4" : "#111111", opacity: 100 },
    hint: { hex: dark ? "#6c7086" : "#999999", opacity: 100 },
    icon: { hex: dark ? "#b4befe" : "#444444", opacity: 100 },
    white: { hex: dark ? "#f5e0dc" : "#888888", opacity: 100 },
    hoverBG1: { hex: dark ? "#313244" : "#eeeeee", opacity: 100 },
    hoverBG2: { hex: accent, opacity: 100 },
    hoverFG: { hex: dark ? "#11111b" : "#ffffff", opacity: 100 },
    divider: { hex: dark ? "#45475a" : "#dddddd", opacity: 100 },
    border: { hex: dark ? "#45475a" : "#cccccc", opacity: 100 },
    shadow: { hex: dark ? "#11111b" : "#000000", opacity: 100 },
    red: { hex: "#ff5555", opacity: 100 },
    yellow: { hex: "#ffb86c", opacity: 100 },
    green: { hex: "#50fa7b", opacity: 100 }
  }
};

fs.writeFileSync(presetPath, JSON.stringify(template, null, 2) + "\n");
console.log(`✓ Created ${presetPath}`);
console.log("Remember to import and register it in src/ts/presets.ts");
