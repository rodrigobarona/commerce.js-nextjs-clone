'use client';

import { renderMermaidSVG } from 'beautiful-mermaid';
import { useMemo } from 'react';

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const { svg, error } = useMemo(() => {
    try {
      return {
        svg: renderMermaidSVG(chart.trim(), {
          bg: 'var(--color-fd-background, var(--background, #ffffff))',
          fg: 'var(--color-fd-foreground, var(--foreground, #27272a))',
          accent: 'var(--color-fd-primary, var(--primary, #6366f1))',
          muted: 'var(--color-fd-muted-foreground, var(--muted-foreground, #71717a))',
          transparent: true,
          padding: 32,
          nodeSpacing: 28,
          layerSpacing: 48,
        }),
        error: null as Error | null,
      };
    } catch (err) {
      return {
        svg: null,
        error: err instanceof Error ? err : new Error(String(err)),
      };
    }
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-fd-border bg-fd-muted/30 p-4">
        <p className="mb-2 text-sm font-medium text-fd-destructive">
          Failed to render diagram
        </p>
        <pre className="overflow-x-auto text-xs text-fd-muted-foreground">
          {error.message}
        </pre>
      </div>
    );
  }

  return (
    <div
      className="not-prose my-6 flex justify-center overflow-x-auto rounded-xl border border-fd-border bg-fd-card/50 p-6 [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg! }}
    />
  );
}
