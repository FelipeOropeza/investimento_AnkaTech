'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Cliente } from '@/types/cliente';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ClientesPage() {
  const { data, isLoading } = useQuery({
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
        <Button asChild>
          <Link href="/clientes/novo">Adicionar Cliente</Link>
        </Button>
      </div>

      <div className="space-y-2">
        {data?.map((cliente) => (
          <div
            key={cliente.id}
            className="border p-4 rounded-md flex justify-between"
          >
            <div>
              <p className="font-semibold">{cliente.nome}</p>
              <p className="text-sm text-gray-500">{cliente.email}</p>
              <p className={`text-sm ${cliente.status === 'ativo' ? 'text-green-600' : 'text-red-600'}`}>
                  {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href={`/clientes/${cliente.id}`}>Editar</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
