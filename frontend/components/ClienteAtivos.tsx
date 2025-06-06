'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Ativo } from '@/types/ativo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ClienteAtivosProps {
  clienteId: number;
}

export function ClienteAtivos({ clienteId }: ClienteAtivosProps) {
  const { data: ativos, isLoading } = useQuery({
    queryKey: ['ativos', clienteId],
    queryFn: async () => {
      const response = await api.get<Ativo[]>(`/clients/${clienteId}/assets`);
      return response.data;
    },
  });

  if (isLoading)
    return <p className="text-sm text-gray-500">Carregando ativos...</p>;

  return (
    <div className="mt-4 bg-gray-50 p-3 rounded">
      <p className="font-medium mb-2">Ativos:</p>
      {ativos && ativos.length > 0 ? (
        <ul className="space-y-1">
          {ativos.map((ativo) => (
            <li key={ativo.id} className="flex justify-between border-b pb-1">
              <span>{ativo.nome}</span>
              <span className="font-semibold">R$ {ativo.valorAtual.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">Nenhum ativo cadastrado.</p>
      )}
      <Button size="sm" className="mt-2" variant="outline" asChild>
        <Link href={`/ativos/${clienteId}`}>Adicionar Ativo</Link>
      </Button>
    </div>
  );
}
