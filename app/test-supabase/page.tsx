'use client'

// import { createClient } from '@/utils/supabase/server'
import { useEffect, useState } from 'react'

export default function Page() {
  // const supabase = await createClient()
  // const { data: notes } = await supabase.from('notes').select()
  let [hello, setHello] = useState({name: ""})

  useEffect(() => {
    // 2. API를 호출하는 함수를 정의합니다.
    const fetchData = async () => {
      try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      
      // 3. 받은 데이터를 상태에 저장합니다.
      // (여기에 어떤 함수를 써서 data를 저장해야 할까요?)
      setHello(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      {/* <pre>{JSON.stringify(notes, null, 2)}</pre> */}
      <p className="mt-4 text-sm text-gray-500">
        Note: You need to create a 'notes' table in your Supabase project for this to show data.
        
      </p>
      <p>{hello.name}</p>
    </div>
  )
}
