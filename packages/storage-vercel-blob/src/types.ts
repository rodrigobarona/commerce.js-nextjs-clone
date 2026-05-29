/** Configuration for {@link VercelBlobStorageProvider}. */
export interface VercelBlobConfig {
  /**
   * Read-write token (`vercel_blob_rw_...`). Defaults to
   * `process.env.BLOB_READ_WRITE_TOKEN`.
   */
  token?: string
  /**
   * Public base URL for served objects, e.g.
   * `https://<store>.public.blob.vercel-storage.com`. If omitted, it is
   * derived from the token's store id.
   */
  publicBaseUrl?: string
  /**
   * Whether `put` appends a random suffix to the pathname. Defaults to
   * `false` so storage keys map deterministically to public URLs.
   */
  addRandomSuffix?: boolean
}
