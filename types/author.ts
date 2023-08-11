import type { Content, Media } from 'newt-client-js'

export interface Author extends Content {
  fullName: string
  profileImage?: Media
}
