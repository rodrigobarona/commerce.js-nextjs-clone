import 'server-only'
import type { StorageProvider } from '@commercejs/types'
import { VercelBlobStorageProvider } from '@commercejs/storage-vercel-blob'
import { S3StorageProvider } from '@commercejs/storage-s3'
import { getCommerceConfig } from './env'

let cached: StorageProvider | null = null

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required for STORAGE_PROVIDER=s3`)
  return value
}

/**
 * Get the configured storage provider (singleton).
 * - `vercel-blob` (default): Vercel Blob via BLOB_READ_WRITE_TOKEN
 * - `s3`: any S3-compatible store (AWS, Cloudflare R2, MinIO, ...)
 */
export function getStorage(): StorageProvider {
  if (cached) return cached

  const { storageProvider } = getCommerceConfig()

  if (storageProvider === 's3') {
    cached = new S3StorageProvider({
      endpoint: required('S3_ENDPOINT'),
      region: process.env.S3_REGION ?? 'auto',
      bucket: required('S3_BUCKET'),
      accessKeyId: required('S3_ACCESS_KEY_ID'),
      secretAccessKey: required('S3_SECRET_ACCESS_KEY'),
      publicUrl: process.env.S3_PUBLIC_URL,
    })
  } else {
    cached = new VercelBlobStorageProvider()
  }

  return cached
}
