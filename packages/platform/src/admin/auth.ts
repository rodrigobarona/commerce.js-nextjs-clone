// ---------------------------------------------------------------------------
// Admin Auth — merchants authenticate via Better Auth (dashboard), not here.
// ---------------------------------------------------------------------------

import type { AdminUserSafe } from './types.js'

export function createAdminAuthDomain() {
  const notSupported = (method: string): never => {
    throw new Error(`${method} is handled by Better Auth on the dashboard`)
  }

  return {
    async login(): Promise<AdminUserSafe> {
      return notSupported('login')
    },
    async changePassword(): Promise<void> {
      return notSupported('changePassword')
    },
    async createAdmin(): Promise<AdminUserSafe> {
      return notSupported('createAdmin')
    },
    async listAdmins(): Promise<AdminUserSafe[]> {
      return notSupported('listAdmins')
    },
    async getAdmin(): Promise<AdminUserSafe> {
      return notSupported('getAdmin')
    },
    async deleteAdmin(): Promise<void> {
      return notSupported('deleteAdmin')
    },
    async seedInitialAdmin(): Promise<void> {
      // Merchants register via Better Auth on apps/dashboard.
    },
  }
}
