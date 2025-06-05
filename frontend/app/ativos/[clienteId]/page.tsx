'use client';

import React from 'react';
import { AtivoForm } from '@/components/AtivoForm';

interface NovoAtivoPageProps {
  params: Promise<{ clienteId: string }>;
}

export default function NovoAtivoPage({ params }: NovoAtivoPageProps) {
  const { clienteId } = React.use(params);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Ativo</h1>
      <AtivoForm clienteId={clienteId} />
    </div>
  );
}
