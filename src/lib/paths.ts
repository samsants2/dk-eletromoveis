import path from "path";

/**
 * Diretório-base de dados graváveis (produtos + uploads).
 *
 * - Local / sem volume: usa a raiz do projeto (process.cwd()).
 * - Com volume persistente (ex.: Railway): defina DATA_DIR apontando para o
 *   mountPath do volume (ex.: DATA_DIR=/data). Assim os cadastros e as imagens
 *   sobrevivem a novos deploys.
 *
 * As imagens enviadas ficam em <DATA_DIR>/uploads e são servidas pela rota
 * /uploads/[...] (src/app/uploads/[...slug]/route.ts).
 */
export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : process.cwd();

export const PRODUCTS_FILE = path.join(DATA_DIR, "content", "products.json");

export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

/** Pastas de upload permitidas (evita escrita fora do previsto). */
export const UPLOAD_FOLDERS = ["produtos", "midia"] as const;
export type UploadFolder = (typeof UPLOAD_FOLDERS)[number];
