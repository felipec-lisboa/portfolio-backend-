import { cn } from '../lib/cn'

export default function Container({ className, ...props }) {
  return <div className={cn('container-padded', className)} {...props} />
}

