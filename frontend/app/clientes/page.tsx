'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Cliente } from '@/types/cliente';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

type Ativo = {
  id: number;
  nome: string;
  valorAtual: number;
  clienteId: number;
};

export default function ClientesPage() {
  const queryClient = useQueryClient();
  const [ativosVisiveis, setAtivosVisiveis] = useState<number | null>(null);

  const { data: clientes, isLoading } = useQuery({
    queryKey: ['clientes'],
    queryFn: async () => {
      const response = await api.get<Cliente[]>('/clients');
      return response.data;
    },
  });

  const { data: ativos } = useQuery({
    queryKey: ['ativos', ativosVisiveis],
    queryFn: async () => {
      if (!ativosVisiveis) return [];
      const response = await api.get<Ativo[]>(`/clients/${ativosVisiveis}/assets`);
      return response.data;
    },
    enabled: !!ativosVisiveis, // só busca quando abrir
  });

  const { mutate: ativarCliente } = useMutation({
    mutationFn: async (id: number) => {
      await api.patch(`/clients/${id}`, { status: 'ativo' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] });
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

      <div className="space-y-4">
        {clientes?.map((cliente) => (
          <div
            key={cliente.id}
            className="border p-4 rounded-md"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{cliente.nome}</p>
                <p className="text-sm text-gray-500">{cliente.email}</p>
                <p
                  className={`text-sm ${
                    cliente.status === 'ativo'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/clientes/${cliente.id}`}>Editar</Link>
                </Button>

                {cliente.status !== 'ativo' && (
                  <Button
                    onClick={() => ativarCliente(cliente.id)}
                  >
                    Ativar
                  </Button>
                )}

                <Button
                  variant="secondary"
                  onClick={() =>
                    setAtivosVisiveis(
                      ativosVisiveis === cliente.id ? null : cliente.id
                    )
                  }
                >
                  {ativosVisiveis === cliente.id
                    ? 'Ocultar Ativos'
                    : 'Ver Ativos'}
                </Button>
              </div>
            </div>

            {ativosVisiveis === cliente.id && (
              <div className="mt-4 bg-gray-50 p-3 rounded">
                <p className="font-medium mb-2">Ativos:</p>
                {ativos && ativos.length > 0 ? (
                  <ul className="space-y-1">
                    {ativos.map((ativo) => (
                      <li
                        key={ativo.id}
                        className="flex justify-between border-b pb-1"
                      >
                        <span>{ativo.nome}</span>
                        <span className="font-semibold">
                          € {ativo.valorAtual.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    Nenhum ativo cadastrado.
                  </p>
                )}
                <Button
                  size="sm"
                  className="mt-2"
                  asChild
                >
                  <Link href={`/clientes/${cliente.id}/ativos/novo`}>
                    Adicionar Ativo
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
