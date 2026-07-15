export type SolutionSlug =
  | "construccion-modular"
  | "colegios-modulares"
  | "contenedores-modulares"
  | "tiny-houses"
  | "oficinas-modulares"
  | "naves-industriales"
  | "sanitarios-modulares"
  | "instalaciones-deportivas"
  | "self-storage"
  | "oficinas-de-ventas"
  | "cabinas-de-triaje"
  | "camerinos";

export interface Solution {
  slug: SolutionSlug;
  image: string;
  gallery: string[];
  projectType: string;
  video?: string;
}

const base = "/images/soluciones";

export const solutions: Solution[] = [
  {
    slug: "construccion-modular",
    image: `${base}/construccion-02.jpg`,
    gallery: [
      `${base}/construccion-02.jpg`,
      `${base}/construccion-01.jpg`,
      `${base}/construccion-03.jpg`,
      `${base}/construccion-04.jpg`,
    ],
    projectType: "construccion-modular",
  },
  {
    slug: "colegios-modulares",
    image: `${base}/colegios-01.jpg`,
    gallery: [
      `${base}/colegios-01.jpg`,
      `${base}/colegios-04.jpg`,
      `${base}/colegios-05.jpg`,
      `${base}/colegios-02.jpg`,
      `${base}/colegios-03.jpg`,
    ],
    projectType: "colegios",
  },
  {
    slug: "contenedores-modulares",
    image: `${base}/contenedores-01.jpg`,
    gallery: [
      `${base}/contenedores-01.jpg`,
      `${base}/contenedores-04.jpg`,
      `${base}/contenedores-02.jpg`,
      `${base}/contenedores-03.jpg`,
      `${base}/contenedores-06.jpg`,
      `${base}/contenedores-05.jpg`,
    ],
    projectType: "otros",
  },
  {
    slug: "tiny-houses",
    image: `${base}/tiny-01.jpg`,
    gallery: [`${base}/tiny-01.jpg`, `${base}/tiny-02.jpg`],
    projectType: "vivienda-modular",
  },
  {
    slug: "oficinas-modulares",
    image: `${base}/oficinas-01.jpg`,
    gallery: [`${base}/oficinas-01.jpg`, `${base}/oficinas-02.jpg`, `${base}/oficinas-03.jpg`],
    projectType: "oficinas",
  },
  {
    slug: "naves-industriales",
    image: `${base}/naves-01.jpg`,
    gallery: [`${base}/naves-01.jpg`, `${base}/naves-03.jpg`, `${base}/naves-02.jpg`],
    projectType: "otros",
  },
  {
    slug: "sanitarios-modulares",
    image: `${base}/sanitarios-01.jpg`,
    gallery: [`${base}/sanitarios-01.jpg`, `${base}/sanitarios-02.jpg`, `${base}/sanitarios-03.jpg`],
    projectType: "otros",
  },
  {
    slug: "instalaciones-deportivas",
    image: `${base}/deportivas-01.jpg`,
    gallery: [`${base}/deportivas-01.jpg`, `${base}/deportivas-03.jpg`, `${base}/deportivas-02.jpg`],
    projectType: "vestuarios",
  },
  {
    slug: "self-storage",
    image: `${base}/storage-01.jpg`,
    gallery: [
      `${base}/storage-01.jpg`,
      `${base}/storage-02.jpg`,
      `${base}/storage-03.jpg`,
      `${base}/storage-04.jpg`,
    ],
    projectType: "otros",
  },
  {
    slug: "oficinas-de-ventas",
    image: `${base}/ventas-01.jpg`,
    gallery: [`${base}/ventas-01.jpg`, `${base}/ventas-02.jpg`, `${base}/ventas-03.jpg`],
    projectType: "oficinas",
  },
  {
    slug: "cabinas-de-triaje",
    image: `${base}/triaje-01.jpg`,
    gallery: [`${base}/triaje-01.jpg`, `${base}/triaje-02.jpg`, `${base}/triaje-03.jpg`],
    projectType: "cabinas-de-triaje",
  },
  {
    slug: "camerinos",
    image: `${base}/camerinos-01.jpg`,
    gallery: [
      `${base}/camerinos-01.jpg`,
      `${base}/camerinos-03.jpg`,
      `${base}/camerinos-04.jpg`,
      `${base}/camerinos-02.jpg`,
    ],
    projectType: "vestuarios",
    video: "/videos/camerinos-malinche.mp4",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
