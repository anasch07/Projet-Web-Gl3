import { ReactNode } from 'react';

interface TableItemProps {
  children: ReactNode;
  className?: string;
}

export default function TableItem({ children, className }: TableItemProps) {
  return (
    //   align center text-center
    <td className={'px-6 py-4 text-sm font-medium text-gray-900 ' + className}>
      {children}
    </td>
  );
}
