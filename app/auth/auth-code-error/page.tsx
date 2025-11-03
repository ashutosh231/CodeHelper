"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthCodeError() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>
            There was an error processing your authentication request. Please try signing in again.
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  )
}
