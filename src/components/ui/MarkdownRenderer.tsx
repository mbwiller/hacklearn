import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  text: string;
  className?: string;
}

/**
 * MarkdownRenderer Component
 *
 * Renders markdown content with full GitHub Flavored Markdown support,
 * LaTeX math expressions, and syntax-highlighted code blocks.
 * Styled to match the HackLearn design system with dark mode support.
 *
 * Features:
 * - Bold, italic, strikethrough, inline code
 * - Headers (h1-h6)
 * - Lists (ordered, unordered, task lists)
 * - Tables with proper styling
 * - Blockquotes with accent borders
 * - Code blocks with syntax highlighting
 * - LaTeX math (inline: $...$ and display: $$...$$)
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          // Headers with cyan accent
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-cyan-400 mb-4 mt-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-cyan-400 mb-3 mt-5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-cyan-300 mb-2 mt-4">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-slate-200 mb-2 mt-3">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-semibold text-slate-300 mb-2 mt-3">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-semibold text-slate-400 mb-2 mt-2">
              {children}
            </h6>
          ),

          // Paragraphs with proper spacing
          p: ({ children }) => (
            <p className="text-slate-300 mb-4 leading-relaxed">
              {children}
            </p>
          ),

          // Strong (bold) text
          strong: ({ children }) => (
            <strong className="font-bold text-slate-100">
              {children}
            </strong>
          ),

          // Emphasis (italic) text
          em: ({ children }) => (
            <em className="italic text-slate-200">
              {children}
            </em>
          ),

          // Strikethrough
          del: ({ children }) => (
            <del className="line-through text-slate-400">
              {children}
            </del>
          ),

          // Inline code
          code: ({ inline, children }) => {
            if (inline) {
              return (
                <code className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-sm">
                  {children}
                </code>
              );
            }
            return <>{children}</>;
          },

          // Code blocks with syntax highlighting
          pre: ({ children }) => {
            const codeElement = React.Children.toArray(children)[0] as React.ReactElement;
            const codeProps = codeElement?.props;
            const className = codeProps?.className || '';
            const matches = /language-(\w+)/.exec(className);
            const language = matches ? matches[1] : 'text';
            const code = String(codeProps?.children || '').replace(/\n$/, '');

            return (
              <div className="my-4 rounded-lg overflow-hidden border border-slate-700">
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: '#0f172a',
                    fontSize: '0.875rem',
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    },
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            );
          },

          // Unordered lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-slate-300">
              {children}
            </ul>
          ),

          // Ordered lists
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-slate-300">
              {children}
            </ol>
          ),

          // List items
          li: ({ children }) => (
            <li className="ml-4 leading-relaxed">
              {children}
            </li>
          ),

          // Blockquotes with purple accent
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-purple-500 pl-4 py-2 my-4 bg-purple-500/5 text-slate-300 italic">
              {children}
            </blockquote>
          ),

          // Tables with glassmorphism
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto">
              <table className="min-w-full border-collapse border border-slate-700">
                {children}
              </table>
            </div>
          ),

          // Table headers
          thead: ({ children }) => (
            <thead className="bg-slate-800/50">
              {children}
            </thead>
          ),

          // Table body
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-700">
              {children}
            </tbody>
          ),

          // Table rows
          tr: ({ children }) => (
            <tr className="hover:bg-slate-800/30 transition-colors">
              {children}
            </tr>
          ),

          // Table header cells
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-sm font-semibold text-cyan-400 border border-slate-700">
              {children}
            </th>
          ),

          // Table data cells
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-slate-300 border border-slate-700">
              {children}
            </td>
          ),

          // Horizontal rules
          hr: () => (
            <hr className="my-6 border-t border-slate-700" />
          ),

          // Links with hover effect
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
            >
              {children}
            </a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
