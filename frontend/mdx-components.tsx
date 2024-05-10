import { Code } from '@mantine/core';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    code: ({ children }) => {
      if (children?.toString().includes('{'))
        return <Code block>{children}</Code>;
      else return <Code>{children}</Code>;
    },
    ...components,
  };
}
