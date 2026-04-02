import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 border rounded-lg border-surface-200 bg-white shadow-sm">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium text-surface-900">{title}</h3>
        <p className="text-surface-500">{description}</p>
        {children}
      </div>
      {footer && (
        <div className="p-4 border-t rounded-b-lg border-surface-200 bg-surface-50 text-surface-500">
          {footer}
        </div>
      )}
    </div>
  );
}
