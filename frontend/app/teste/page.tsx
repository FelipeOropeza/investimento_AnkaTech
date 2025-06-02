'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'; // Ajuste para seu caminho real
import { Button } from '@/components/ui/button';

import { Portal } from '@radix-ui/react-portal';

const formSchema = z.object({
  status: z.enum(['ativo', 'inativo']),
});

type FormData = z.infer<typeof formSchema>;

export default function ClienteForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: 'ativo' },
  });

  const status = watch('status');

  const onSubmit = (data: FormData) => {
    alert(`Status selecionado: ${data.status}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-sm mx-auto mt-10">
      <div>
        <label htmlFor="status" className="block mb-1 font-semibold">
          Status
        </label>

        <Select
          value={status}
          onValueChange={(value) => setValue('status', value as 'ativo' | 'inativo')}
          aria-labelledby="status"
        >
          <SelectTrigger className="w-full border border-gray-300 rounded px-3 py-2">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <Portal>
            <SelectContent className="z-[9999] bg-white border border-gray-300 rounded shadow-lg mt-1">
              <SelectItem value="ativo" className="cursor-pointer px-3 py-2 hover:bg-gray-100">
                Ativo
              </SelectItem>
              <SelectItem value="inativo" className="cursor-pointer px-3 py-2 hover:bg-gray-100">
                Inativo
              </SelectItem>
            </SelectContent>
          </Portal>
        </Select>

        {errors.status && (
          <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Salvar
      </Button>
    </form>
  );
}
