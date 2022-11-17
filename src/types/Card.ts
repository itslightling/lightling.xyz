import { SocialLink } from './SocialLink'

export interface Card {
  backgroundImage?: string
  backgroundImagePosition?: string
  featuredImage?: string
  featuredImagePosition?: string
  title: string
  description: string[]
  social?: SocialLink[]
}
