interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sale' | 'stock' | 'new' | 'info';
}

const variantClasses = {
  sale: 'bg-red-100 text-red-700',
  stock: 'bg-green-100 text-green-700',
  new: 'bg-blue-100 text-blue-700',
  info: 'bg-gray-100 text-gray-700',
};

export default function Badge({ children, variant = 'info' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
