import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@prood/ui/components/card"

export const metadata = { title: "API keys" }

export default function ApiKeysPage() {
  const apiBase = process.env.COMMERCE_API_URL ?? "http://localhost:3005/v1"

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <h2 className="font-heading text-xl font-medium">API keys</h2>
        <p className="text-sm text-muted-foreground">
          Machine and agent access to your store via the Commerce API.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization-scoped keys</CardTitle>
          <CardDescription>
            Keys are verified by the API app and must include JSON metadata:
            <code className="mx-1 rounded bg-muted px-1 py-0.5 text-xs">
              {`{ "organizationId": "<your-org-id>", "scopes": ["storefront", "admin"] }`}
            </code>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-sm">
          <p>
            Send the secret as{" "}
            <code className="rounded bg-muted px-1 py-0.5">x-api-key</code> on
            requests to <code className="rounded bg-muted px-1 py-0.5">{apiBase}</code>.
          </p>
          <p>
            Interactive reference:{" "}
            <Link href="http://localhost:3003/docs/api" className="underline">
              docs / Commerce API
            </Link>
            . Agent Auth discovery:{" "}
            <code className="rounded bg-muted px-1 py-0.5">
              /.well-known/agent-configuration
            </code>
            .
          </p>
          <p className="text-muted-foreground">
            In-dashboard key creation UI is planned; use Better Auth&apos;s API key
            plugin against the shared database until then.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
