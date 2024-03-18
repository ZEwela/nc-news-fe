import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button.jsx"

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

const AlertView = ({handleReload}) => {
  return (
    <Alert className="m-4 min-w-80 w-auto" variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertDescription>
        Sorry something went wrong. Please try again or 
        <Button onClick={handleReload} variant="link">Reload</Button>
      </AlertDescription>
    </Alert>
  )
}

export default AlertView