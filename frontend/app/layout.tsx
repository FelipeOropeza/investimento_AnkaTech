import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Painel de Clientes',
  description: 'Gerencie seus clientes facilmente',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
