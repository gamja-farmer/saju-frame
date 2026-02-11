import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary';

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-primary text-white hover:opacity-90',
  secondary:
    'bg-transparent border border-accent-primary text-accent-primary hover:bg-accent-primary/5',
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const base = `inline-flex items-center justify-center h-[52px] px-lg rounded-button text-body font-body transition-opacity duration-200 ${variantStyles[variant]} ${className}`;

  if ('href' in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={base} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={base} {...buttonProps}>
      {children}
    </button>
  );
}
