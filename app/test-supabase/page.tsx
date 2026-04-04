import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
      <p className="mt-4 text-sm text-gray-500">
        Note: You need to create a 'notes' table in your Supabase project for this to show data.
      </p>
    </div>
  )
}
