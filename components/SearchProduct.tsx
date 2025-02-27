"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (searchInputText: string) => {
    const params = new URLSearchParams(searchParams);

    if (searchInputText.trim().length === 0) {
      params.delete("query");
      setErrorMsg(null);
    } else if (searchInputText.trim().length < 3) {
      params.set("query", searchInputText.trim());
      setErrorMsg("Søgetekst skal minimum være 3 tegn");
    } else {
      params.set("query", searchInputText.trim());
      setErrorMsg(null);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <search className="flex w-full max-w-xl flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row w-full items-center gap-2 rounded-full bg-light p-4">
        <input
          type="text"
          placeholder="Søg..."
          className="h-full w-full bg-slate-100 p-2 rounded indent-2 text-xl"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
    </search>
  );
}
