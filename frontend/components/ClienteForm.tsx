'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clienteSchema, Cliente, FormData } from '@/types/cliente';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export function ClienteForm({ cliente }: { cliente?: Cliente }) {
  const router = useRouter();

  const { register, handleSubmit, formState, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: cliente?.nome ?? '',
      email: cliente?.email ?? '',
      status: cliente?.status ?? 'ativo',
    },
  });

  const status = watch('status');

  const onSubmit = async (data: FormData) => {
    if (cliente?.id) {
      await api.put(`/clients/${cliente.id}`, data);
    } else {
      await api.post('/clients', data);
    }
    router.push('/clients');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Nome</label>
        <Input {...register('nome')} />
        {formState.errors.nome && (
          <p className="text-red-500 text-sm">{formState.errors.nome.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <Input {...register('email')} />
        {formState.errors.email && (
          <p className="text-red-500 text-sm">{formState.errors.email.message}</p>
        )}
      </div>

      <div className="relative z-10">
        <label className="block mb-1">Status</label>
        <Select
          value={status}
          onValueChange={(value) => setValue('status', value as 'ativo' | 'inativo')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent className="z-50">
            <SelectItem value="ativo">Ativo</SelectItem>
            <SelectItem value="inativo">Inativo</SelectItem>
          </SelectContent>
        </Select>
        {formState.errors.status && (
          <p className="text-red-500 text-sm">{formState.errors.status.message}</p>
        )}
      </div>

      <Button type="submit">Salvar</Button>
    </form>
  );
}
