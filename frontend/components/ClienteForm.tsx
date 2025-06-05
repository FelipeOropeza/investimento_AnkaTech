"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clienteSchema, Cliente, FormData } from "@/types/cliente";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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

import { Portal } from "@radix-ui/react-portal";

export function ClienteForm({ cliente }: { cliente?: Cliente }) {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: cliente?.nome ?? "",
      email: cliente?.email ?? "",
      status: cliente?.status ?? "ativo",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (cliente?.id) {
      await api.put(`/clients/${cliente.id}`, data);
    } else {
      await api.post("/clients", data);
    }
    router.push("/clientes");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Nome */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
                aria-labelledby="status"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                </FormControl>
                <Portal>
                  <SelectContent className="z-[9999] bg-white border border-gray-300 rounded shadow-lg mt-1">
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Portal>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="outline" type="submit">Salvar</Button>
      </form>
    </Form>
  );
}
