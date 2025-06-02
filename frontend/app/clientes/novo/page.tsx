import { ClienteForm } from '@/components/ClienteForm';

export default function NovoClientePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Novo Cliente</h1>
      <ClienteForm />
    </div>
  );
}
