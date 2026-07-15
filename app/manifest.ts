import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Metalbox Prefabricados Modulares",
    short_name: "Metalbox",
    description:
      "Diseño, fabricación e instalación de construcción modular. Más de 35 años de experiencia.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0B",
    theme_color: "#0A0A0B",
    icons: [
      { src: "/images/logo-metalbox.png", sizes: "500x500", type: "image/png" },
    ],
  };
}
