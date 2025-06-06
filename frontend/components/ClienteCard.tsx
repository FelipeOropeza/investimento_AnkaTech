'use client';

import { useState } from 'react';
import { Cliente } from '@/types/cliente';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClienteAtivos } from './ClienteAtivos';

interface ClienteCardProps {
  cliente: Cliente;
}

export function ClienteCard({ cliente }: ClienteCardProps) {
  const [ativosVisiveis, setAtivosVisiveis] = useState(false);

  const toggleAtivos = () => {
    setAtivosVisiveis((prev) => !prev);
  };

  return (
    <div className="border p-4 rounded-md">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{cliente.nome}</p>
          <p className="text-sm text-gray-500">{cliente.email}</p>
          <p
            className={`text-sm ${
              cliente.status === 'ativo' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="outline" asChild>
            <Link href={`/clientes/${cliente.id}`}>Editar</Link>
          </Button>

          <Button variant="outline" onClick={toggleAtivos}>
            {ativosVisiveis ? 'Ocultar Ativos' : 'Ver Ativos'}
          </Button>
        </div>
      </div>

      {ativosVisiveis && <ClienteAtivos clienteId={cliente.id} />}
    </div>
  );
}
