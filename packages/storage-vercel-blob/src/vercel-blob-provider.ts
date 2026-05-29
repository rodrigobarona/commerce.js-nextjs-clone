// ---------------------------------------------------------------------------
// VercelBlobStorageProvider — Vercel Blob implementation of StorageProvider
// ---------------------------------------------------------------------------
//
// Server-side upload/delete map directly to @vercel/blob `put`/`del`.
// Vercel Blob does not use S3-style presigned PUT URLs; browser direct uploads
// use a client token + the `@vercel/blob/client` `upload()` helper (typically
// minted from a Route Handler). `createClientUploadToken()` exposes that token.
// ---------------------------------------------------------------------------

import { put, del } from '@vercel/blob'
import { generateClientTokenFromReadWriteToken } from '@vercel/blob/client'
import type {
  StorageProvider,
  UploadInput,
  StorageUploadResult,
  PresignedUrlOptions,
  PresignedUrlResult,
} from '@commercejs/types'

import type { VercelBlobConfig } from './types.js'

/** Derive the public base URL from a `vercel_blob_rw_<store>_<secret>` token. */
function deriveBaseUrl(token: string | undefined): string {
  if (!token) return ''
  const parts = token.split('_')
  const storeId = parts[3]
  if (!storeId) return ''
  return `https://${storeId.toLowerCase()}.public.blob.vercel-storage.com`
}

function joinKey(directory: string | undefined, filename: string): string {
  const clean = (s: string) => s.replace(/^\/+|\/+$/g, '')
  return directory ? `${clean(directory)}/${clean(filename)}` : clean(filename)
}

/**
 * Vercel Blob storage provider.
 *
 * @example
 * ```ts
 * const storage = new VercelBlobStorageProvider() // uses BLOB_READ_WRITE_TOKEN
 * const { url } = await storage.upload({
 *   filename: 'hero.jpg', mimeType: 'image/jpeg', content: bytes, directory: 'products',
 * })
 * ```
 */
export class VercelBlobStorageProvider implements StorageProvider {
  readonly id = 'vercel-blob'
  readonly name = 'Vercel Blob'

  private readonly token: string | undefined
  private readonly publicBaseUrl: string
  private readonly addRandomSuffix: boolean

  constructor(config: VercelBlobConfig = {}) {
    this.token = config.token ?? process.env.BLOB_READ_WRITE_TOKEN
    this.publicBaseUrl = config.publicBaseUrl ?? deriveBaseUrl(this.token)
    this.addRandomSuffix = config.addRandomSuffix ?? false
  }

  async upload(input: UploadInput): Promise<StorageUploadResult> {
    const key = joinKey(input.directory, input.filename)
    const result = await put(key, Buffer.from(input.content), {
      access: 'public',
      contentType: input.mimeType,
      addRandomSuffix: this.addRandomSuffix,
      ...(this.token ? { token: this.token } : {}),
    })
    return { key: result.pathname, url: result.url }
  }

  async delete(key: string): Promise<void> {
    // `del` accepts a full blob URL or a pathname; prefer the URL when known.
    const target = key.startsWith('http') ? key : this.getUrl(key) || key
    await del(target, this.token ? { token: this.token } : undefined)
  }

  getUrl(key: string): string {
    if (key.startsWith('http')) return key
    return this.publicBaseUrl ? `${this.publicBaseUrl}/${key}` : key
  }

  async getPresignedUploadUrl(
    _key: string,
    _options?: PresignedUrlOptions,
  ): Promise<PresignedUrlResult> {
    throw new Error(
      'Vercel Blob does not support S3-style presigned upload URLs. ' +
        'Use createClientUploadToken() with @vercel/blob/client upload() ' +
        '(via a handleUpload Route Handler) instead.',
    )
  }

  async getPresignedDownloadUrl(
    key: string,
    options?: PresignedUrlOptions,
  ): Promise<PresignedUrlResult> {
    // Public blobs are served from a stable URL and do not expire.
    const expiresIn = options?.expiresIn ?? 3600
    return {
      url: this.getUrl(key),
      method: 'GET',
      expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
    }
  }

  /**
   * Mint a client upload token for browser direct uploads via
   * `@vercel/blob/client`'s `upload()`.
   */
  async createClientUploadToken(
    pathname: string,
    options?: { maximumSizeInBytes?: number; allowedContentTypes?: string[] },
  ): Promise<string> {
    if (!this.token) {
      throw new Error('VercelBlobStorageProvider: token is required to create client upload tokens')
    }
    return generateClientTokenFromReadWriteToken({
      token: this.token,
      pathname,
      ...(options?.maximumSizeInBytes ? { maximumSizeInBytes: options.maximumSizeInBytes } : {}),
      ...(options?.allowedContentTypes ? { allowedContentTypes: options.allowedContentTypes } : {}),
    })
  }
}
