"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ativoSchema, AtivoFormData } from "@/types/ativo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface AtivoFormProps {
  clienteId: number;
}

export function AtivoForm({ clienteId }: AtivoFormProps) {
  const router = useRouter();

  const form = useForm<AtivoFormData>({
    resolver: zodResolver(ativoSchema),
    defaultValues: {
      nome: "",
      valorAtual: 0,
    },
  });

  const onSubmit = async (data: AtivoFormData) => {
    try {
      await api.post("/assets", {
        ...data,
        clienteId: Number(clienteId),
      });

      router.push("/clientes");
    } catch (error) {
      console.error("Erro ao cadastrar ativo:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Ativo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="valorAtual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Atual (R$)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={field.value === 0 ? "" : field.value}
                  onChange={(e) => {
                    const val = e.target.value;
                    field.onChange(val === "" ? 0 : parseFloat(val));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit">
          Cadastrar Ativo
        </Button>
      </form>
    </Form>
  );
}
