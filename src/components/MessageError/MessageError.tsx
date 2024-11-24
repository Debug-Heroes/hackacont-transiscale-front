interface MessageErrorProps {
  message: string | undefined
}

export function MessageError({ message }: MessageErrorProps) {
  return (
    <p className="text-xs h-1 text-red-900 -mt-3">{message}</p>
  )
}
