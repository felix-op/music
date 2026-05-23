const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log("=== Creador de Servicios ===");
  
  // 1. Preguntar por el nombre del servicio (sólo prefijo)
  const prefixInput = await question("Nombre del Servicio (sólo prefijo, ej. Font): ");
  const trimmed = prefixInput.trim();
  
  if (!trimmed) {
    console.error("Error: El nombre del servicio no puede estar vacío.");
    rl.close();
    process.exit(1);
  }

  // Capitalizar la primera letra
  const prefix = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

  // Validar formato del prefijo
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(prefix)) {
    console.error("Error: El nombre del servicio debe contener solo letras y números.");
    rl.close();
    process.exit(1);
  }

  // 2. Preguntar el tipo de servicio
  console.log("\nSelecciona el tipo de servicio:");
  console.log("1. Provider + Context");
  console.log("2. Provider");
  console.log("3. Context");
  console.log("4. API");
  
  const optionInput = await question("Selección (1-4): ");
  rl.close();

  const option = optionInput.trim();
  if (!["1", "2", "3", "4"].includes(option)) {
    console.error("Error: Selección inválida. Debe ser del 1 al 4.");
    process.exit(1);
  }

  // Rutas base
  const servicesDir = path.join(__dirname, "../src/services");
  const providersDir = path.join(servicesDir, "providers");
  const contextsDir = path.join(servicesDir, "contexts");
  const apisDir = path.join(servicesDir, "apis");
  const indexFile = path.join(servicesDir, "index.ts");

  // Nombres de archivos y exports
  const providerName = `${prefix}Provider`;
  const contextName = `${prefix}Context`;
  const apiName = prefix.endsWith("s") || prefix.endsWith("S") ? prefix : `${prefix}s`;

  // Asegurar que la carpeta base services existe
  if (!fs.existsSync(servicesDir)) {
    fs.mkdirSync(servicesDir, { recursive: true });
    console.log(`✓ Carpeta creada: ${servicesDir}`);
  }

  let indexExports = [];

  // --- Selección 1: Provider + Context ---
  if (option === "1") {
    // Crear carpetas
    fs.mkdirSync(providersDir, { recursive: true });
    fs.mkdirSync(contextsDir, { recursive: true });

    const providerFile = path.join(providersDir, `${providerName}.tsx`);
    const contextFile = path.join(contextsDir, `${contextName}.ts`);

    if (fs.existsSync(providerFile) || fs.existsSync(contextFile)) {
      console.error(`Error: El proveedor o el contexto para ${prefix} ya existe.`);
      process.exit(1);
    }

    // Escribir Context
    const contextContent = `import { createContext } from "react";

export const ${contextName} = createContext<any>(null);
`;
    fs.writeFileSync(contextFile, contextContent);
    console.log(`✓ Contexto creado: ${contextFile}`);

    // Escribir Provider (Named Export)
    const providerContent = `import React, { ReactNode } from "react";
import { ${contextName} } from "../contexts/${contextName}";

type TProps = {
    children: ReactNode;
};

export function ${providerName}({ children }: TProps) {
    return (
        <${contextName}.Provider value={null}>
            {children}
        </${contextName}.Provider>
    );
}
`;
    fs.writeFileSync(providerFile, providerContent);
    console.log(`✓ Provider creado: ${providerFile}`);

    indexExports.push({
      line: `export { ${providerName} } from "./providers/${providerName}";\n`,
      check: `export { ${providerName} }`
    });
    indexExports.push({
      line: `export { ${contextName} } from "./contexts/${contextName}";\n`,
      check: `export { ${contextName} }`
    });
  }

  // --- Selección 2: Provider únicamente ---
  else if (option === "2") {
    fs.mkdirSync(providersDir, { recursive: true });
    const providerFile = path.join(providersDir, `${providerName}.tsx`);

    if (fs.existsSync(providerFile)) {
      console.error(`Error: El proveedor ${providerName} ya existe.`);
      process.exit(1);
    }

    // Escribir Provider (Named Export)
    const providerContent = `import React from "react";
import { Text } from "react-native";

export function ${providerName}() {
    return (
        <Text>${providerName}</Text>
    );
}
`;
    fs.writeFileSync(providerFile, providerContent);
    console.log(`✓ Provider creado: ${providerFile}`);

    indexExports.push({
      line: `export { ${providerName} } from "./providers/${providerName}";\n`,
      check: `export { ${providerName} }`
    });
  }

  // --- Selección 3: Context únicamente ---
  else if (option === "3") {
    fs.mkdirSync(contextsDir, { recursive: true });
    const contextFile = path.join(contextsDir, `${contextName}.ts`);

    if (fs.existsSync(contextFile)) {
      console.error(`Error: El contexto ${contextName} ya existe.`);
      process.exit(1);
    }

    const contextContent = `import { createContext } from "react";

export const ${contextName} = createContext<any>(null);
`;
    fs.writeFileSync(contextFile, contextContent);
    console.log(`✓ Contexto creado: ${contextFile}`);

    indexExports.push({
      line: `export { ${contextName} } from "./contexts/${contextName}";\n`,
      check: `export { ${contextName} }`
    });
  }

  // --- Selección 4: API ---
  else if (option === "4") {
    fs.mkdirSync(apisDir, { recursive: true });
    const apiFile = path.join(apisDir, `${apiName}.ts`);

    if (fs.existsSync(apiFile)) {
      console.error(`Error: La API ${apiName} ya existe.`);
      process.exit(1);
    }

    // Escribir API (Named Export only)
    const apiContent = `// API de ${apiName}
export const ${apiName}Api = {
    // Métodos de la API
    getAll: async () => {
        return [];
    }
};
`;
    fs.writeFileSync(apiFile, apiContent);
    console.log(`✓ API creada: ${apiFile}`);

    indexExports.push({
      line: `export { ${apiName}Api } from "./apis/${apiName}";\n`,
      check: `export { ${apiName}Api }`
    });
  }

  // Actualizar index.ts en src/services
  if (indexExports.length > 0) {
    let currentContent = "";
    if (fs.existsSync(indexFile)) {
      currentContent = fs.readFileSync(indexFile, "utf-8");
    }

    let updatedContent = currentContent;
    let appendedAny = false;

    for (const exp of indexExports) {
      if (!currentContent.includes(exp.check)) {
        // Asegurar salto de línea al final si no lo tiene
        if (updatedContent && !updatedContent.endsWith("\n")) {
          updatedContent += "\n";
        }
        updatedContent += exp.line;
        appendedAny = true;
      }
    }

    if (appendedAny) {
      fs.writeFileSync(indexFile, updatedContent);
      console.log(`✓ Export(s) agregado(s) a index.ts`);
    } else {
      console.log(`⚠ Los exports ya existían en index.ts`);
    }
  }

  console.log(`\n✅ Servicio creado exitosamente`);
}

main().catch((err) => {
  console.error("Error inesperado:", err);
  process.exit(1);
});
