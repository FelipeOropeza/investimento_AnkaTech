'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Cliente } from '@/types/cliente';
import { ClienteForm } from '@/components/ClienteForm';

export default function EditarClientePage() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['cliente', id],
    queryFn: async () => {
      const response = await api.get<Cliente>(`/clients/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente</h1>
      <ClienteForm cliente={data} />
    </div>
  );
}
