import { BackgroundImage } from './BackgroundImage'
import { SocialLink } from './SocialLink'

export interface Card {
  wallpaper?: BackgroundImage
  featured?: BackgroundImage
  title: string
  description: string[]
  social?: SocialLink[]
}
