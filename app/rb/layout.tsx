import { ReactNode } from 'react';

export default function RbLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      {children}
    </div>
  );
}