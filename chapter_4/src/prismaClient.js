// Equivalent to db.js in chapter 3 except without all that table structure
// which we defined in prisma/schema.prima
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default prisma