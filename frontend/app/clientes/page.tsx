'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Cliente } from '@/types/cliente';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClienteCard } from '@/components/ClienteCard';

export default function ClientesPage() {
  const { data: clientes, isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const response = await api.get<Cliente[]>('/clients');
      return response.data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
                <div className="flex gap-2">

        <Button variant="outline" asChild>
          <Link href="/clientes/novo">Adicionar Cliente</Link>
        </Button>
        <Button variant="outline" asChild>
            <Link href="/ativos">Lista Ativos</Link>
        </Button>
        </div>
      </div>

      <div className="space-y-4">
        {clientes?.map((cliente) => (
          <ClienteCard key={cliente.id} cliente={cliente} />
        ))}
      </div>
    </div>
  );
}
