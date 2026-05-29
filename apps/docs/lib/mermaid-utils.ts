import { isValidElement, type ReactNode } from 'react';

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return '';
}

export function isMermaidPre(children: ReactNode): boolean {
  if (!isValidElement<{ className?: string; children?: ReactNode }>(children)) {
    return false;
  }

  const className = children.props.className ?? '';
  return className.includes('language-mermaid');
}

export function getMermaidChart(children: ReactNode): string {
  if (!isValidElement<{ children?: ReactNode }>(children)) {
    return '';
  }

  return extractText(children.props.children).replace(/\n$/, '');
}
