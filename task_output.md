> provider: groq

### components/ui/SmoothScrolling.tsx
```typescript
import { lenis } from '@studio-freight/lenis';
import type { ReactNode } from 'react';

interface SmoothScrollingProps {
  children: ReactNode;
}

const SmoothScrolling = ({ children }: SmoothScrollingProps) => {
  lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, t * t * t),
  });

  return <>{children}</>;
};

export default SmoothScrolling;
```

### app/template.tsx
```typescript
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TemplateProps {
  children: ReactNode;
}

const Template = ({ children }: TemplateProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
```

### app/layout.tsx (Modified)
```typescript
import type { ReactNode } from 'react';
import Head from 'next/head';
import SmoothScrolling from '../components/ui/SmoothScrolling';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SmoothScrolling>
      <Head>
        {/* Your head metadata here */}
      </Head>
      {children}
    </SmoothScrolling>
  );
};

export default Layout;
```