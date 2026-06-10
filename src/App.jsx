import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(
        `http://localhost:5000/search?company=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError("Could not connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const platforms = [
    {
      name: "LinkedIn",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: "🔵",
      url: results?.linkedin,
    },
    {
      name: "Twitter / X",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: "🐦",
      url: results?.twitter,
    },
    {
      name: "Google Search",
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: "🔍",
      url: results?.google,
    },
    ...(results?.officialWebsite
      ? [
          {
            name: results.officialWebsiteTitle || "Official Website",
            color: "bg-green-100 text-green-800 border-green-200",
            icon: "🌐",
            url: results.officialWebsite,
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Company Verifier
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Check if a company is legitimate before accepting any offer
        </p>

        {/* Search Box */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="Enter company name..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleCheck}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-200 rounded-lg px-4 py-3 mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-4">
              Showing results for{" "}
              <span className="font-semibold text-gray-700">
                "{results.company}"
              </span>
            </p>

            <div className="flex flex-col gap-3">
              {platforms
                .filter((p) => p.url)
                .map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between border rounded-lg px-4 py-3 hover:opacity-80 transition ${p.color}`}
                  >
                    <span className="font-medium">
                      {p.icon} {p.name}
                    </span>

                    <span className="text-sm underline">Open →</span>
                  </a>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-4">
              ⚠️ Always verify manually. Links open the platform's search —
              confirm the company page is official.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}