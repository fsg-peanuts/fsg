import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface Base { label: string; error?: string; hint?: string; optional?: boolean; className?: string }

function Shell({ id, label, error, hint, optional, className, children }: Base & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-espresso">
        {label}{optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm font-medium text-espresso">{error}</p>}
    </div>
  );
}
const describe = (id: string, error?: string, hint?: string) => (error ? `${id}-err` : hint ? `${id}-hint` : undefined);

export function TextField({ label, error, hint, optional, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Shell {...{ id, label, error, hint, optional, className }}>
      <input id={id} className="field" aria-invalid={!!error} aria-describedby={describe(id, error, hint)} {...rest} />
    </Shell>
  );
}

export function TextArea({ label, error, hint, optional, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Shell {...{ id, label, error, hint, optional, className }}>
      <textarea id={id} rows={4} className="field" aria-invalid={!!error} aria-describedby={describe(id, error, hint)} {...rest} />
    </Shell>
  );
}

export function SelectField({ label, error, hint, optional, className, children, ...rest }: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Shell {...{ id, label, error, hint, optional, className }}>
      <select id={id} className="field" aria-invalid={!!error} aria-describedby={describe(id, error, hint)} {...rest}>{children}</select>
    </Shell>
  );
}
