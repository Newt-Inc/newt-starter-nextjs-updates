import type { Content, Media } from 'newt-client-js'
import type { Author } from '@/types/author'
import type { Category } from '@/types/category'

export interface Article extends Content {
  title: string
  slug: string
  meta?: {
    title?: string
    description?: string
    ogImage?: Media
  }
  body: string
  author: Author
  categories: Category[]
}
