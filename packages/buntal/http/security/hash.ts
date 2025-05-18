import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export function hash(password: string) {
  return hashSync(password, genSaltSync())
}

hash.compare = function (password: string, hashed: string) {
  return compareSync(password, hashed)
}
