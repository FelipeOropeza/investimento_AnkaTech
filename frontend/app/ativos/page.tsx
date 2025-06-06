'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api'; 
import { Ativo } from '@/types/ativo';

export default function AtivosPage() {
  const { data: ativos, isLoading, isError } = useQuery<Ativo[]>({
    queryKey: ['ativos'],
    queryFn: async () => {
      const response = await api.get('/assets');
      return response.data;
    },
  });

  if (isLoading) return <p>Carregando ativos...</p>;
  if (isError) return <p>Erro ao carregar ativos.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Ativos</h1>
      {ativos && ativos.length > 0 ? (
        <ul>
          {ativos.map((ativo) => (
            <li key={ativo.id} className="border-b py-2 flex justify-between">
              <span>{ativo.nome}</span>
              <span>R$ {ativo.valorAtual.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum ativo cadastrado.</p>
      )}
    </div>
  );
}
