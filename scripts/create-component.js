const fs = require("fs");
const path = require("path");

// Obtener el nombre del componente desde los argumentos
const args = process.argv.slice(2);
const nameIndex = args.indexOf("--name");

if (nameIndex === -1 || !args[nameIndex + 1]) {
  console.error("Error: Debes proporcionar --name nombreDelComponente");
  process.exit(1);
}

const componentName = args[nameIndex + 1];

// Validar el nombre del componente
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error("Error: El nombre del componente debe comenzar con mayúscula y contener solo letras y números");
  process.exit(1);
}

// Rutas
const componentsDir = path.join(__dirname, "../src/components");
const componentDir = path.join(componentsDir, componentName);
const componentFile = path.join(componentDir, `${componentName}.tsx`);
const stylesFile = path.join(componentDir, "estilos.ts");
const indexFile = path.join(componentsDir, "index.ts");

// Verificar si el componente ya existe
if (fs.existsSync(componentDir)) {
  console.error(`Error: El componente ${componentName} ya existe`);
  process.exit(1);
}

// Crear la carpeta del componente
fs.mkdirSync(componentDir, { recursive: true });
console.log(`✓ Carpeta creada: ${componentDir}`);

// Crear el archivo del componente
const componentContent = `import { View } from "react-native";
import { styles } from "./estilos";

type TProps = {
    // Aquí van las propiedades del componente
};

export function ${componentName}(props: TProps) {
    return (
        <View style={styles.container}>
            ${componentName}
        </View>
    );
}
`;

fs.writeFileSync(componentFile, componentContent);
console.log(`✓ Componente creado: ${componentFile}`);

// Crear el archivo de estilos
const stylesContent = `import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
`;

fs.writeFileSync(stylesFile, stylesContent);
console.log(`✓ Estilos creados: ${stylesFile}`);

// Actualizar el archivo index.ts
const exportLine = `export { ${componentName} } from "./${componentName}/${componentName}";\n`;

if (fs.existsSync(indexFile)) {
  const currentContent = fs.readFileSync(indexFile, "utf-8");
  if (!currentContent.includes(`export { ${componentName} }`)) {
    const updatedContent = currentContent + exportLine;
    fs.writeFileSync(indexFile, updatedContent);
    console.log(`✓ Export agregado a index.ts`);
  } else {
    console.log(`⚠ El export ya existe en index.ts`);
  }
} else {
  fs.writeFileSync(indexFile, exportLine);
  console.log(`✓ Archivo index.ts creado`);
}

console.log(`\n✅ Componente ${componentName} creado exitosamente`);
