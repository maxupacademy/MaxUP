import React from 'react';
import katex from 'katex';

interface MathTextProps {
  text: string;
  className?: string;
  inline?: boolean;
}

/**
 * MathText Component
 * Parses Thai & English text mixed with LaTeX expressions.
 * Supports:
 * - Display math: $$ ... $$ or \[ ... \]
 * - Inline math: $ ... $ or \( ... \)
 * - Auto-detects standalone formulas with ^, _, \sqrt, \times, \frac
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '', inline = true }) => {
  if (!text) return null;

  // If text does not contain any math indicators, return plain text directly
  const hasMath = /[$]|\\[(\[]|\^|_|\\sqrt|\\frac|\\times|\\cdot|\\sum|\\int|\\alpha|\\beta|\\gamma|\\theta|\\pi|\\pm|\\le|\\ge|\\ne/.test(text);

  if (!hasMath) {
    return <span className={className}>{text}</span>;
  }

  // Helper to render KaTeX safely
  const renderKaTeX = (latex: string, isBlock: boolean = false) => {
    try {
      const cleanLatex = latex.trim();
      if (!cleanLatex) return '';
      return katex.renderToString(cleanLatex, {
        displayMode: isBlock,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return latex;
    }
  };

  // Split text by $$...$$ or $...$ or \(...\) or \[...\]
  // Regex pattern matching delimiters
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\))/g;
  const parts = text.split(regex);

  return (
    <span className={`inline-math-wrapper ${className}`}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Display math: $$...$$ or \[...\]
        if (
          (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) ||
          (part.startsWith('\\[') && part.endsWith('\\]') && part.length >= 4)
        ) {
          const formula = part.startsWith('$$') ? part.slice(2, -2) : part.slice(2, -2);
          return (
            <span
              key={index}
              className="my-1 block text-center overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: renderKaTeX(formula, true) }}
            />
          );
        }

        // Inline math: $...$ or \(...\)
        if (
          (part.startsWith('$') && part.endsWith('$') && part.length >= 2) ||
          (part.startsWith('\\(') && part.endsWith('\\)') && part.length >= 4)
        ) {
          const formula = part.startsWith('$') ? part.slice(1, -1) : part.slice(2, -2);
          return (
            <span
              key={index}
              className="inline-block px-0.5 align-baseline"
              dangerouslySetInnerHTML={{ __html: renderKaTeX(formula, false) }}
            />
          );
        }

        // Check if plain part contains standalone formulas like "a_n = a_1 + (n-1)d" or "x^2" or "\sqrt{...}"
        // Only trigger if it has LaTeX command syntax (\sqrt, \frac, etc.) without explicit $
        if (/\\[a-zA-Z]+|\^\{?[0-9a-zA-Z]+\}?|_\{?[0-9a-zA-Z]+\}?/.test(part) && !/[ก-๙]/.test(part)) {
          return (
            <span
              key={index}
              className="inline-block px-0.5 align-baseline"
              dangerouslySetInnerHTML={{ __html: renderKaTeX(part, false) }}
            />
          );
        }

        // Plain text segment
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
