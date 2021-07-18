import { Notification } from 'rsuite'

export const notify = (
  title,
  description,
  type = 'open',
  placement = 'bottomEnd'
) => {
  Notification[type]({
    title,
    placement,
    description
  })
}
