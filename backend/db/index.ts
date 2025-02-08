import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

export const prisma = (env: { DIRECT_URL: string }) => {
  return new PrismaClient({
    datasourceUrl: env.DIRECT_URL, 
  }).$extends(withAccelerate())
}
