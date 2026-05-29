"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@prood/ui/components/button"
import { Input } from "@prood/ui/components/input"
import { Label } from "@prood/ui/components/label"
import { Textarea } from "@prood/ui/components/textarea"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@prood/ui/components/dialog"
import {
  fulfillOrderAction,
  refundOrderAction,
} from "@/app/(dashboard)/orders/actions"

export function OrderActions({
  orderId,
  canFulfill,
  canRefund,
}: {
  orderId: string
  canFulfill: boolean
  canRefund: boolean
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingUrl, setTrackingUrl] = useState("")
  const [fulfillNote, setFulfillNote] = useState("")
  const [refundNote, setRefundNote] = useState("")

  function handleFulfill() {
    startTransition(async () => {
      try {
        await fulfillOrderAction(orderId, {
          trackingNumber: trackingNumber || undefined,
          trackingUrl: trackingUrl || undefined,
          note: fulfillNote || undefined,
        })
        toast.success("Order fulfilled")
        router.refresh()
      } catch {
        toast.error("Could not fulfill order")
      }
    })
  }

  function handleRefund() {
    startTransition(async () => {
      try {
        await refundOrderAction(orderId, refundNote || undefined)
        toast.success("Order refunded")
        router.refresh()
      } catch {
        toast.error("Could not refund order")
      }
    })
  }

  return (
    <div className="flex items-center gap-2">
      {canFulfill ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">Fulfill</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fulfill order</DialogTitle>
              <DialogDescription>
                Add tracking details and mark this order as shipped.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="trackingNumber">Tracking number</Label>
                <Input
                  id="trackingNumber"
                  value={trackingNumber}
                  onChange={(event) => setTrackingNumber(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="trackingUrl">Tracking URL</Label>
                <Input
                  id="trackingUrl"
                  value={trackingUrl}
                  onChange={(event) => setTrackingUrl(event.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="fulfillNote">Note</Label>
                <Textarea
                  id="fulfillNote"
                  rows={2}
                  value={fulfillNote}
                  onChange={(event) => setFulfillNote(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button disabled={pending} onClick={handleFulfill}>
                {pending ? "Fulfilling..." : "Fulfill"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}

      {canRefund ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Refund
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Refund order</DialogTitle>
              <DialogDescription>
                This marks the order as refunded.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="refundNote">Note</Label>
              <Textarea
                id="refundNote"
                rows={2}
                value={refundNote}
                onChange={(event) => setRefundNote(event.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={pending}
                onClick={handleRefund}
              >
                {pending ? "Refunding..." : "Refund"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  )
}
