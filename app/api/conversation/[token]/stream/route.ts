import bus from "@/lib/event-bus";

// Must run as Node.js — EventEmitter is not available on Edge runtime
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteParams = { params: Promise<{ token: string }> };

export async function GET(request: Request, { params }: RouteParams) {
  const { token } = await params;
  const encoder = new TextEncoder();

  let cleanup: (() => void) | undefined;

  const stream = new ReadableStream({
    start(controller) {
      const enqueue = (data: string) => {
        try {
          controller.enqueue(encoder.encode(data));
        } catch {
          // client disconnected
        }
      };

      // Send initial connection confirmation
      enqueue(`: connected\n\n`);

      // Forward bus events to this SSE client
      const handler = (payload: unknown) => {
        enqueue(`data: ${JSON.stringify(payload)}\n\n`);
      };

      bus.on(`conv:${token}`, handler);

      // Keep-alive ping every 25 s (prevents proxy timeouts)
      const ping = setInterval(() => {
        enqueue(`: ping\n\n`);
      }, 25_000);

      cleanup = () => {
        clearInterval(ping);
        bus.off(`conv:${token}`, handler);
        try {
          controller.close();
        } catch {
          // already closed
        }
      };

      request.signal.addEventListener("abort", cleanup);
    },
    cancel() {
      cleanup?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      Connection: "keep-alive",
    },
  });
}
