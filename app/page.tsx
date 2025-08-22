"use client"
import { SiswaProps } from "@/services/data-types";
import { useEffect, useState } from "react"

const urlAPI = 'http://localhost:3001';

export default function Home() {
  const [dataSiswa, setDataSiswa] = useState([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date)
  }

  useEffect(() => {
    fetchDataSiswa();
  }, [])

  async function fetchDataSiswa() {
    const data = await fetch(`${urlAPI}`);
    const res = await data.json()
    setDataSiswa(res.data);
  }

  async function handleDelete(id: number) {
    await fetch(`${urlAPI}/${id}`, { method: "DELETE" })
    fetchDataSiswa();
  }

  return (
    <div className="text-center px-30 py-10">
      <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Data Siswa</h1>
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Kode
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3">
                Jurusan
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {
              dataSiswa.map((siswa: SiswaProps) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={siswa.id}>
                    <td className="px-6 py-4">
                      {siswa.kode}
                    </td>
                    <td className="px-6 py-4">
                      {siswa.nama}
                    </td>
                    <td className="px-6 py-4">
                      {siswa.alamat}
                    </td>
                    <td className="px-6 py-4">
                      {formatDate(siswa.tanggal)}
                    </td>
                    <td className="px-6 py-4">
                      {siswa.jurusan}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDelete(siswa.id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 cursor-pointer">Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
