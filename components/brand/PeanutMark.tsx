import type { SVGProps } from 'react';

/** The Fauzey peanut: a single shell silhouette. Used as logo mark and as placeholder artwork. */
export function PeanutMark({ detail = false, ...props }: SVGProps<SVGSVGElement> & { detail?: boolean }) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M30 6C14 6 4 16 4 30C4 44 14 54 30 54C42 54 50 48 54 44C58 40 62 40 66 44C70 48 78 54 90 54C106 54 116 44 116 30C116 16 106 6 90 6C78 6 70 12 66 16C62 20 58 20 54 16C50 12 42 6 30 6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {detail && (
        <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55">
          <path d="M18 20q6 4 12 0M16 32q8 4 16 0M20 44q6 3 12 0" />
          <path d="M78 20q6 4 12 0M76 32q8 4 16 0M80 44q6 3 12 0" />
        </g>
      )}
    </svg>
  );
}
