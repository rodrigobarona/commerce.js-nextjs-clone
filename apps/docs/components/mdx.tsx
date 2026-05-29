import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Pre } from 'fumadocs-ui/components/codeblock';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, ReactNode } from 'react';
import { APIPage } from '@/components/api-page';
import { MermaidDiagram } from '@/components/mermaid-diagram';
import { getMermaidChart, isMermaidPre } from '@/lib/mermaid-utils';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    APIPage,
    pre: ({ children, ...props }: ComponentProps<'pre'>) => {
      if (isMermaidPre(children)) {
        return <MermaidDiagram chart={getMermaidChart(children)} />;
      }

      return <Pre {...props}>{children}</Pre>;
    },
    code: ({
      className,
      children,
      ...props
    }: ComponentProps<'code'> & { children?: ReactNode }) => {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
